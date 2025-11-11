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
    await page.goto('/cadastro');
    
    await page.getByLabel(/Nome completo/i).fill(testUser.name);
    await page.getByLabel(/E-mail/i).fill(testUser.email);
    await page.getByLabel('Senha', { exact: true }).fill(testUser.password);
    await page.getByLabel(/Confirmar senha/i).fill(testUser.password);
    await page.getByLabel(/concordo com os/i).check();
    await page.getByLabel(/tenho 18 anos/i).check();
    await page.getByRole('button', { name: /Criar conta/i }).click();
    
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page.getByText(testUser.name)).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Usuário registrado e logado!');
    
    // 2. VERIFICAR PERFIL
    console.log('👤 Acessando perfil...');
    await page.getByRole('button', { name: testUser.name }).click();
    await page.getByRole('menuitem', { name: /Perfil/i }).click();
    await expect(page).toHaveURL(/.*perfil/);
    
    await expect(page.getByRole('heading', { name: /Meu Perfil/i })).toBeVisible();
    await expect(page.getByText(testUser.name)).toBeVisible();
    await expect(page.getByText(testUser.email)).toBeVisible();
    
    console.log('✅ Perfil verificado!');
    
    // 3. ADICIONAR SALDO
    console.log('💰 Adicionando saldo...');
    await page.getByRole('link', { name: /Adicionar Saldo/i }).click();
    await expect(page).toHaveURL(/.*adicionar-saldo/);
    
    // Selecionar valor rápido de R$ 100
    await page.getByRole('button', { name: /R\$ 100/i }).click();
    
    // Selecionar método de pagamento (PIX)
    await page.locator('button:has-text("PIX")').click();
    
    // Confirmar adição
    await page.getByRole('button', { name: /Adicionar R\$/i }).click();
    
    // Aguardar processamento e toast de sucesso
    await expect(page.getByText(/Saldo adicionado/i)).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Saldo adicionado!');
    
    // 4. VOLTAR PARA HOME E VER CAIXAS
    console.log('📦 Navegando para caixas...');
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Clicar na primeira caixa
    const firstCase = page.locator('[href^="/caixa/"]').first();
    await firstCase.click();
    
    await expect(page).toHaveURL(/.*\/caixa\/.+/);
    await page.waitForTimeout(1000);
    
    console.log('✅ Detalhes da caixa carregados!');
    
    // 5. ABRIR CAIXA
    console.log('🎰 Abrindo caixa...');
    const openButton = page.getByRole('button', { name: /Abrir por/i });
    await expect(openButton).toBeVisible();
    
    await openButton.click();
    
    // Aguardar abertura e toast de sucesso
    await expect(page.getByText(/Parabéns|ganhou/i)).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Caixa aberta com sucesso!');
    
    // Aguardar redirecionamento para inventário
    await page.waitForURL(/.*inventario/, { timeout: 5000 });
    
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
    await page.getByRole('button', { name: testUser.name }).click();
    await page.getByRole('menuitem', { name: /Sair/i }).click();
    
    await page.waitForTimeout(1000);
    
    // Verificar que voltou para estado não autenticado
    await expect(page.getByRole('link', { name: /Entrar/i })).toBeVisible();
    
    console.log('✅ Fluxo completo executado com sucesso! 🎉');
  });
});

