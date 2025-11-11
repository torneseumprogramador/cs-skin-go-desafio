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
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Aguardar página carregar completamente
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    
    // Clicar em Criar Conta - buscar de forma mais robusta
    const createAccountLink = page.locator('a:has-text("Criar Conta"), button:has-text("Criar Conta")').first();
    await createAccountLink.waitFor({ state: 'visible', timeout: 10000 });
    await createAccountLink.click();
    
    // Aguardar navegação
    await page.waitForURL(/.*cadastro/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // Verificar elementos do formulário
    await expect(page.locator('h1:has-text("Criar conta")')).toBeVisible({ timeout: 10000 });
    
    // Preencher formulário - buscar inputs de forma mais robusta
    await page.locator('input[type="text"]').first().fill(testUser.name);
    await page.locator('input[type="email"]').fill(testUser.email);
    
    // Preencher senhas
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(0).fill(testUser.password);
    await passwordInputs.nth(1).fill(testUser.password);
    
    // Aceitar termos - clicar nos checkboxes diretamente (force pois Radix UI os esconde)
    await page.locator('#terms').check({ force: true });
    await page.locator('#age').check({ force: true });
    
    // Aguardar um pouco antes de submeter
    await page.waitForTimeout(500);
    
    // Submeter formulário
    const submitButton = page.locator('button:has-text("Criar conta")');
    await submitButton.click();
    
    // Aguardar redirecionamento para home com mais tempo
    await page.waitForURL('/', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    
    // Aguardar dados do usuário carregarem
    await page.waitForTimeout(2000);
    
    // Verificar que está logado (deve aparecer o nome do usuário e saldo)
    await expect(page.locator(`text=${testUser.name}`).first()).toBeVisible({ timeout: 10000 });
    // Verificar saldo no header (usando .first() para pegar apenas o do header)
    await expect(page.locator('text=/R\\$\\s*\\d/').first()).toBeVisible({ timeout: 5000 });
  });

  test('deve fazer login com usuário existente', async ({ page }) => {
    setupConsoleLogger(page, 'auth-login');
    // Primeiro, criar o usuário
    await page.goto('/cadastro');
    
    await page.getByLabel(/Nome completo/i).fill(testUser.name);
    await page.getByLabel(/E-mail/i).fill(testUser.email);
    await page.getByLabel('Senha', { exact: true }).fill(testUser.password);
    await page.getByLabel(/Confirmar senha/i).fill(testUser.password);
    
    // Aceitar termos - clicar nos checkboxes diretamente
    await page.locator('#terms').check({ force: true });
    await page.locator('#age').check({ force: true });
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
    await page.goto('/login', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    
    // Aguardar formulário carregar
    await page.waitForTimeout(1000);
    
    // Tentar login com credenciais inválidas - usar locators mais robustos
    await page.locator('input[type="email"]').fill('invalido@example.com');
    await page.locator('input[type="password"]').fill('senhaerrada');
    
    // Aguardar antes de clicar
    await page.waitForTimeout(500);
    
    // Clicar no botão de entrar
    await page.locator('button:has-text("Entrar")').click();
    
    // Aguardar a resposta da API e mensagem de erro aparecer
    await page.waitForTimeout(2000);
    
    // Deve mostrar mensagem de erro - buscar em todo o DOM
    const errorMessage = page.locator('text=/E-mail ou senha incorretos|Erro ao fazer login|incorretos|inválid/i');
    await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });
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
    
    // Aceitar termos - clicar nos checkboxes diretamente
    await page.locator('#terms').check({ force: true });
    await page.locator('#age').check({ force: true });
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

