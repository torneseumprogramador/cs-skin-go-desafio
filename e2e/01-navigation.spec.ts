import { test, expect } from '@playwright/test';
import { setupConsoleLogger } from './helpers/console-logger';

test.describe('🧭 Navegação e Layout', () => {
  test('deve carregar a página inicial corretamente', async ({ page }) => {
    setupConsoleLogger(page, 'navegacao-home');
    
    // Ir para home e aguardar carregamento completo
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    
    // Verificar título
    await expect(page).toHaveTitle(/SkinArena/, { timeout: 10000 });
    
    // Verificar header - usar locator mais específico
    await expect(page.locator('text=SkinArena').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Case Opening')).toBeVisible();
    
    // Verificar botões de autenticação - aguardar mais tempo
    await expect(page.locator('a:has-text("Entrar"), button:has-text("Entrar")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('a:has-text("Criar Conta"), button:has-text("Criar Conta")')).toBeVisible({ timeout: 10000 });
    
    // Verificar título principal
    await expect(page.locator('h1:has-text("CS:GO SKINS")')).toBeVisible({ timeout: 10000 });
    
    // Verificar footer
    await expect(page.locator('text=/Todos os direitos reservados|© 20\\d{2}/')).toBeVisible();
    await expect(page.locator('a:has-text("Termos de Uso")')).toBeVisible();
    await expect(page.locator('a:has-text("Privacidade")')).toBeVisible();
    await expect(page.locator('a:has-text("Suporte")')).toBeVisible();
  });

  test('deve navegar para páginas informativas', async ({ page }) => {
    setupConsoleLogger(page, 'navegacao-paginas');
    await page.goto('/');
    
    // Navegar para Termos
    await page.getByRole('link', { name: 'Termos de Uso' }).click();
    await expect(page).toHaveURL(/.*termos/);
    await expect(page.getByRole('heading', { name: /Termos de Uso/i })).toBeVisible();
    
    // Voltar e navegar para Privacidade
    await page.goto('/');
    await page.getByRole('link', { name: 'Privacidade' }).click();
    await expect(page).toHaveURL(/.*privacidade/);
    await expect(page.getByRole('heading', { name: /Política de Privacidade/i })).toBeVisible();
    
    // Voltar e navegar para Suporte
    await page.goto('/');
    await page.getByRole('link', { name: 'Suporte' }).click();
    await expect(page).toHaveURL(/.*suporte/);
    await expect(page.getByRole('heading', { name: /Central de Suporte/i })).toBeVisible();
  });

  test('deve exibir as caixas na página inicial', async ({ page }) => {
    setupConsoleLogger(page, 'navegacao-caixas');
    await page.goto('/');
    
    // Aguardar as caixas carregarem (skeleton ou caixas reais)
    await page.waitForTimeout(2000);
    
    // Verificar se há caixas sendo exibidas
    const caseCards = page.locator('[class*="grid"]').first();
    await expect(caseCards).toBeVisible();
  });
});

