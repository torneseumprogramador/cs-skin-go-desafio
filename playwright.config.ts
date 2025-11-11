import { defineConfig, devices } from '@playwright/test';

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
    
    // Deixa mais lento para melhor visualização (reduzido de 500 para 300)
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

  // Servidor de desenvolvimento
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180000, // 3 minutos para o servidor iniciar
    stdout: 'pipe',
    stderr: 'pipe',
  },
});

