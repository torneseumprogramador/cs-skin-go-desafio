import { test, expect } from '@playwright/test';
import { setupConsoleLogger } from './helpers/console-logger';

test.describe('🔐 Autenticação', () => {
  const testUser = {
    name: 'Teste E2E User',
    email: `teste-e2e-${Date.now()}@example.com`,
    password: 'senha123456',
  };

  test('deve registrar um novo usuário', async ({ page }) => {
    setupConsoleLogger(page, 'auth-registro');
    await page.goto('/');
    
    // Clicar em Criar Conta
    await page.getByRole('link', { name: /Criar Conta/i }).click();
    await expect(page).toHaveURL(/.*cadastro/);
    
    // Verificar elementos do formulário
    await expect(page.getByRole('heading', { name: /Criar conta/i })).toBeVisible();
    
    // Preencher formulário
    await page.getByLabel(/Nome completo/i).fill(testUser.name);
    await page.getByLabel(/E-mail/i).fill(testUser.email);
    await page.getByLabel('Senha', { exact: true }).fill(testUser.password);
    await page.getByLabel(/Confirmar senha/i).fill(testUser.password);
    
    // Aceitar termos
    await page.getByLabel(/concordo com os/i).check();
    await page.getByLabel(/tenho 18 anos/i).check();
    
    // Submeter formulário
    await page.getByRole('button', { name: /Criar conta/i }).click();
    
    // Aguardar redirecionamento para home
    await page.waitForURL('/', { timeout: 10000 });
    
    // Verificar que está logado (deve aparecer o nome do usuário)
    await expect(page.getByText(testUser.name)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/R\$/)).toBeVisible();
  });

  test('deve fazer login com usuário existente', async ({ page }) => {
    setupConsoleLogger(page, 'auth-login');
    // Primeiro, criar o usuário
    await page.goto('/cadastro');
    
    await page.getByLabel(/Nome completo/i).fill(testUser.name);
    await page.getByLabel(/E-mail/i).fill(testUser.email);
    await page.getByLabel('Senha', { exact: true }).fill(testUser.password);
    await page.getByLabel(/Confirmar senha/i).fill(testUser.password);
    await page.getByLabel(/concordo com os/i).check();
    await page.getByLabel(/tenho 18 anos/i).check();
    await page.getByRole('button', { name: /Criar conta/i }).click();
    
    // Aguardar login automático
    await page.waitForURL('/', { timeout: 10000 });
    
    // Fazer logout
    await page.getByRole('button', { name: testUser.name }).click();
    await page.getByRole('menuitem', { name: /Sair/i }).click();
    
    // Aguardar logout
    await page.waitForTimeout(1000);
    
    // Ir para login
    await page.getByRole('link', { name: /Entrar/i }).click();
    await expect(page).toHaveURL(/.*login/);
    
    // Preencher formulário de login
    await page.getByLabel(/E-mail/i).fill(testUser.email);
    await page.getByLabel(/Senha/i).fill(testUser.password);
    await page.getByRole('button', { name: /Entrar/i }).click();
    
    // Verificar que está logado
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page.getByText(testUser.name)).toBeVisible({ timeout: 5000 });
  });

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    setupConsoleLogger(page, 'auth-erro');
    await page.goto('/login');
    
    // Tentar login com credenciais inválidas
    await page.getByLabel(/E-mail/i).fill('invalido@example.com');
    await page.getByLabel(/Senha/i).fill('senhaerrada');
    await page.getByRole('button', { name: /Entrar/i }).click();
    
    // Deve mostrar mensagem de erro
    await expect(page.getByText(/E-mail ou senha incorretos|Erro ao fazer login/i)).toBeVisible({ timeout: 5000 });
  });

  test('deve redirecionar após login com parâmetro redirect', async ({ page }) => {
    setupConsoleLogger(page, 'auth-redirect');
    // Primeiro, criar usuário
    await page.goto('/cadastro');
    const uniqueEmail = `redirect-test-${Date.now()}@example.com`;
    
    await page.getByLabel(/Nome completo/i).fill('Redirect Test');
    await page.getByLabel(/E-mail/i).fill(uniqueEmail);
    await page.getByLabel('Senha', { exact: true }).fill('senha123456');
    await page.getByLabel(/Confirmar senha/i).fill('senha123456');
    await page.getByLabel(/concordo com os/i).check();
    await page.getByLabel(/tenho 18 anos/i).check();
    await page.getByRole('button', { name: /Criar conta/i }).click();
    
    await page.waitForURL('/', { timeout: 10000 });
    
    // Fazer logout
    await page.getByRole('button', { name: 'Redirect Test' }).click();
    await page.getByRole('menuitem', { name: /Sair/i }).click();
    await page.waitForTimeout(1000);
    
    // Ir para login com redirect
    await page.goto('/login?redirect=/perfil');
    
    // Fazer login
    await page.getByLabel(/E-mail/i).fill(uniqueEmail);
    await page.getByLabel(/Senha/i).fill('senha123456');
    await page.getByRole('button', { name: /Entrar/i }).click();
    
    // Deve redirecionar para /perfil
    await expect(page).toHaveURL(/.*perfil/, { timeout: 10000 });
  });

  test('deve acessar página de recuperação de senha', async ({ page }) => {
    setupConsoleLogger(page, 'auth-recuperacao');
    await page.goto('/login');
    
    // Clicar em "Esqueceu a senha?"
    await page.getByRole('link', { name: /Esqueceu a senha/i }).click();
    await expect(page).toHaveURL(/.*recuperar-senha/);
    
    // Verificar elementos da página
    await expect(page.getByRole('heading', { name: /Recuperar Senha/i })).toBeVisible();
    
    // Preencher e enviar
    await page.getByLabel(/E-mail/i).fill('teste@example.com');
    await page.getByRole('button', { name: /Enviar instruções/i }).click();
    
    // Verificar mensagem de sucesso
    await expect(page.getByText(/E-mail Enviado/i)).toBeVisible({ timeout: 3000 });
  });
});

