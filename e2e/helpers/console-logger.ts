import type { Page } from '@playwright/test';

/**
 * Helper para capturar e logar todos os eventos do console do navegador
 */
export function setupConsoleLogger(page: Page, testName: string) {
  // Capturar logs do console
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    
    // Cores para diferentes tipos de log
    const colors: Record<string, string> = {
      error: '\x1b[31m', // vermelho
      warning: '\x1b[33m', // amarelo
      log: '\x1b[36m', // ciano
      info: '\x1b[34m', // azul
    };
    
    const color = colors[type] || '\x1b[0m';
    const reset = '\x1b[0m';
    
    console.log(`${color}[BROWSER ${type.toUpperCase()}]${reset} [${testName}] ${text}`);
  });

  // Capturar erros de página
  page.on('pageerror', (error) => {
    console.error('\x1b[31m[PAGE ERROR]\x1b[0m', `[${testName}]`, error.message);
    console.error(error.stack);
  });

  // Capturar requisições com falha
  page.on('requestfailed', (request) => {
    console.error(
      '\x1b[31m[REQUEST FAILED]\x1b[0m',
      `[${testName}]`,
      request.method(),
      request.url(),
      request.failure()?.errorText
    );
  });

  // Capturar respostas com erro
  page.on('response', (response) => {
    const status = response.status();
    if (status >= 400) {
      console.error(
        '\x1b[31m[HTTP ERROR]\x1b[0m',
        `[${testName}]`,
        status,
        response.statusText(),
        response.url()
      );
    }
  });
}

