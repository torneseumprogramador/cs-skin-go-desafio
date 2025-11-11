import { test, expect } from '@playwright/test';
import { setupConsoleLogger } from './helpers/console-logger';

test.describe('🔒 Rotas Protegidas', () => {
  test('deve redirecionar usuário não autenticado para login', async ({ page }) => {
    setupConsoleLogger(page, 'protected-routes-sem-auth');
    // Tentar acessar perfil sem estar logado
    await page.goto('/perfil');
    await expect(page).toHaveURL(/.*login/, { timeout: 5000 });
    
    // Tentar acessar inventário
    await page.goto('/inventario');
    await expect(page).toHaveURL(/.*login/, { timeout: 5000 });
    
    // Tentar acessar histórico
    await page.goto('/historico');
    await expect(page).toHaveURL(/.*login/, { timeout: 5000 });
    
    // Tentar acessar adicionar saldo
    await page.goto('/adicionar-saldo');
    await expect(page).toHaveURL(/.*login/, { timeout: 5000 });
  });

  test('usuário autenticado deve acessar rotas protegidas', async ({ page }) => {
    setupConsoleLogger(page, 'protected-routes-com-auth');
    
    // Registrar e logar
    const uniqueEmail = `protected-${Date.now()}@example.com`;
    
    await page.goto('/cadastro');
    await page.getByLabel(/Nome completo/i).fill('Protected Test');
    await page.getByLabel(/E-mail/i).fill(uniqueEmail);
    await page.getByLabel('Senha', { exact: true }).fill('senha123456');
    await page.getByLabel(/Confirmar senha/i).fill('senha123456');
    
    // Aceitar termos - clicar nos checkboxes diretamente
    await page.locator('#terms').check({ force: true });
    await page.locator('#age').check({ force: true });
    await page.getByRole('button', { name: /Criar conta/i }).click();
    
    await page.waitForURL('/', { timeout: 10000 });
    
    // Agora deve conseguir acessar as rotas protegidas
    await page.goto('/perfil');
    await expect(page).toHaveURL(/.*perfil/);
    await expect(page.getByRole('heading', { name: /Meu Perfil/i })).toBeVisible();
    
    await page.goto('/inventario');
    await expect(page).toHaveURL(/.*inventario/);
    await expect(page.getByRole('heading', { name: /Meu Inventário/i })).toBeVisible();
    
    await page.goto('/historico');
    await expect(page).toHaveURL(/.*historico/);
    await expect(page.getByRole('heading', { name: /Histórico/i })).toBeVisible();
    
    await page.goto('/adicionar-saldo');
    await expect(page).toHaveURL(/.*adicionar-saldo/);
    await expect(page.getByRole('heading', { name: /Adicionar Saldo/i })).toBeVisible();
  });
});

