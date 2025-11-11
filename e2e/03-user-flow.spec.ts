import { test, expect } from '@playwright/test';
import { setupConsoleLogger } from './helpers/console-logger';

test.describe('👤 Fluxo Completo do Usuário', () => {
  const testUser = {
    name: 'Fluxo Completo',
    email: `fluxo-${Date.now()}@example.com`,
    password: 'senha123456',
  };

  test('fluxo completo: registro → adicionar saldo → abrir caixa → verificar inventário', async ({ page }) => {
    setupConsoleLogger(page, 'fluxo-completo');
    
    // 1. REGISTRO
    console.log('📝 Registrando novo usuário...');
    await page.goto('/cadastro', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    
    // Preencher formulário com locators mais robustos
    await page.locator('input[type="text"]').first().fill(testUser.name);
    await page.locator('input[type="email"]').fill(testUser.email);
    
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(0).fill(testUser.password);
    await passwordInputs.nth(1).fill(testUser.password);
    
    // Aceitar termos - clicar nos labels visíveis
    await page.locator('label:has-text("concordo com os")').click();
    await page.locator('label:has-text("tenho 18 anos")').click();
    
    await page.waitForTimeout(500);
    
    await page.locator('button:has-text("Criar conta")').click();
    
    await page.waitForURL('/', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await expect(page.locator(`text=${testUser.name}`).first()).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Usuário registrado e logado!');
    
    // 2. VERIFICAR PERFIL
    console.log('👤 Acessando perfil...');
    
    // Clicar no botão do usuário no header
    const userButton = page.locator(`button:has-text("${testUser.name}")`).first();
    await userButton.waitFor({ state: 'visible', timeout: 10000 });
    await userButton.click();
    
    // Aguardar menu abrir
    await page.waitForTimeout(500);
    
    // Clicar em Perfil no menu dropdown
    await page.locator('text=Perfil').first().click();
    
    await page.waitForURL(/.*perfil/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('h1:has-text("Meu Perfil")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator(`text=${testUser.name}`)).toBeVisible();
    await expect(page.locator(`text=${testUser.email}`)).toBeVisible();
    
    console.log('✅ Perfil verificado!');
    
    // 3. ADICIONAR SALDO
    console.log('💰 Adicionando saldo...');
    
    await page.locator('a:has-text("Adicionar Saldo")').first().click();
    await page.waitForURL(/.*adicionar-saldo/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Selecionar valor rápido de R$ 100
    await page.locator('button:has-text("R$ 100")').click();
    await page.waitForTimeout(500);
    
    // Selecionar método de pagamento (PIX)
    await page.locator('button:has-text("PIX")').click();
    await page.waitForTimeout(500);
    
    // Confirmar adição
    await page.locator('button:has-text("Adicionar R$")').click();
    
    // Aguardar processamento (2 segundos simulados + tempo de resposta)
    await page.waitForTimeout(3000);
    
    // Verificar toast ou redirecionamento
    const successIndicator = page.locator('text=/Saldo adicionado|adicionados à sua conta/i');
    await expect(successIndicator.first()).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Saldo adicionado!');
    
    // 4. VOLTAR PARA HOME E VER CAIXAS
    console.log('📦 Navegando para caixas...');
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Aguardar caixas carregarem
    await page.waitForSelector('[href^="/caixa/"]', { state: 'visible', timeout: 10000 });
    
    // Clicar na primeira caixa
    const firstCase = page.locator('[href^="/caixa/"]').first();
    await firstCase.click();
    
    await page.waitForURL(/.*\/caixa\/.+/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    console.log('✅ Detalhes da caixa carregados!');
    
    // 5. ABRIR CAIXA
    console.log('🎰 Abrindo caixa...');
    
    // Aguardar botão de abrir caixa
    const openButton = page.locator('button:has-text("Abrir por")');
    await openButton.waitFor({ state: 'visible', timeout: 10000 });
    
    await openButton.click();
    
    // Aguardar abertura (pode demorar devido à API)
    await page.waitForTimeout(3000);
    
    // Aguardar toast de sucesso ou redirecionamento
    const caseOpenSuccess = page.locator('text=/Parabéns|ganhou|sucesso/i');
    await expect(caseOpenSuccess.first()).toBeVisible({ timeout: 15000 });
    
    console.log('✅ Caixa aberta com sucesso!');
    
    // Aguardar redirecionamento para inventário (timeout maior)
    await page.waitForURL(/.*inventario/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // 6. VERIFICAR INVENTÁRIO
    console.log('🎒 Verificando inventário...');
    await expect(page.getByRole('heading', { name: /Meu Inventário/i })).toBeVisible();
    
    // Deve ter pelo menos 1 item
    await expect(page.getByText(/1 item|itens no total/)).toBeVisible();
    
    console.log('✅ Item apareceu no inventário!');
    
    // 7. VERIFICAR HISTÓRICO
    console.log('📊 Verificando histórico...');
    await page.goto('/historico');
    
    await expect(page.getByRole('heading', { name: /Histórico de Transações/i })).toBeVisible();
    
    // Deve ter transações (depósito + abertura)
    await expect(page.getByText(/Depósito|Abertura/i)).toBeVisible();
    
    console.log('✅ Histórico verificado!');
    
    // 8. LOGOUT
    console.log('🚪 Fazendo logout...');
    
    const userButtonLogout = page.locator(`button:has-text("${testUser.name}")`).first();
    await userButtonLogout.waitFor({ state: 'visible', timeout: 10000 });
    await userButtonLogout.click();
    
    await page.waitForTimeout(500);
    
    await page.locator('text=Sair').first().click();
    
    await page.waitForTimeout(2000);
    
    // Verificar que voltou para estado não autenticado
    await expect(page.locator('a:has-text("Entrar"), button:has-text("Entrar")').first()).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Fluxo completo executado com sucesso! 🎉');
  });
});

