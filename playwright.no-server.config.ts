import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright SEM iniciar o servidor automaticamente
 * Use quando o frontend já estiver rodando em outro terminal
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 60000, // 60 segundos por teste
  
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'playwright-report/results.json' }]
  ],
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'on',
    
    // Modo headful por padrão para visualização
    headless: false,
    
    // Deixa mais lento para melhor visualização
    slowMo: 300,
    
    // Timeouts aumentados
    navigationTimeout: 30000,
    actionTimeout: 15000,
    
    // Capturar erros do console
    launchOptions: {
      args: ['--enable-logging', '--v=1'],
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],

  // SEM webServer - assume que está rodando
});

