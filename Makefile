.PHONY: help install dev build start lint clean test format test-e2e test-e2e-ui test-e2e-headed test-e2e-debug test-e2e-report

# Cores para output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RESET  := \033[0m

help: ## Mostra esta mensagem de ajuda
	@echo "$(GREEN)Comandos disponíveis:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(RESET) %s\n", $$1, $$2}'

install: ## Instala as dependências do projeto
	@echo "$(GREEN)Instalando dependências...$(RESET)"
	npm install --legacy-peer-deps

dev: ## Inicia o servidor de desenvolvimento
	@echo "$(GREEN)Iniciando servidor de desenvolvimento...$(RESET)"
	npm run dev

build: ## Faz o build de produção
	@echo "$(GREEN)Fazendo build de produção...$(RESET)"
	npm run build

start: ## Inicia o servidor de produção (requer build primeiro)
	@echo "$(GREEN)Iniciando servidor de produção...$(RESET)"
	npm start

lint: ## Executa o linter
	@echo "$(GREEN)Executando linter...$(RESET)"
	@npm run lint || echo "$(YELLOW)Linter não configurado ou com problemas$(RESET)"

lint-fix: ## Executa o linter e corrige problemas automaticamente
	@echo "$(GREEN)Executando linter com correção automática...$(RESET)"
	npm run lint -- --fix

clean: ## Remove node_modules e arquivos de build
	@echo "$(YELLOW)Removendo node_modules e .next...$(RESET)"
	rm -rf node_modules .next

clean-install: clean install ## Remove tudo e reinstala as dependências
	@echo "$(GREEN)Reinstalação completa concluída!$(RESET)"

rebuild: clean-install build ## Remove tudo, reinstala e faz novo build
	@echo "$(GREEN)Rebuild completo concluído!$(RESET)"

check: ## Verifica se tudo está funcionando (build)
	@echo "$(GREEN)Verificando projeto...$(RESET)"
	@make build
	@echo "$(GREEN)Verificação concluída com sucesso!$(RESET)"

update: ## Atualiza as dependências
	@echo "$(GREEN)Atualizando dependências...$(RESET)"
	npm update --legacy-peer-deps

outdated: ## Mostra dependências desatualizadas
	@echo "$(GREEN)Verificando dependências desatualizadas...$(RESET)"
	npm outdated

info: ## Mostra informações do projeto
	@echo "$(GREEN)Informações do Projeto:$(RESET)"
	@echo "Nome: $$(node -p "require('./package.json').name")"
	@echo "Versão: $$(node -p "require('./package.json').version")"
	@echo "Node: $$(node --version)"
	@echo "NPM: $$(npm --version)"

serve: build start ## Faz build e inicia servidor de produção

port-3000: ## Libera a porta 3000 (mata processos usando ela)
	@echo "$(YELLOW)Liberando porta 3000...$(RESET)"
	@lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Porta 3000 já está livre"

# Testes E2E
test-e2e: ## Executa testes E2E (headless)
	@echo "$(GREEN)Executando testes E2E...$(RESET)"
	@echo "$(YELLOW)⚠️  Certifique-se que o backend está rodando na porta 3001!$(RESET)"
	npm run test:e2e

test-e2e-ui: ## Executa testes E2E com interface visual (RECOMENDADO)
	@echo "$(GREEN)Abrindo interface visual dos testes E2E...$(RESET)"
	@echo "$(YELLOW)⚠️  Certifique-se que o backend está rodando na porta 3001!$(RESET)"
	npm run test:e2e:ui

test-e2e-headed: ## Executa testes E2E com browser visível (modo visual)
	@echo "$(GREEN)Executando testes E2E no modo visual...$(RESET)"
	@echo "$(YELLOW)⚠️  Certifique-se que o backend está rodando na porta 3001!$(RESET)"
	npm run test:e2e:headed

test-e2e-debug: ## Executa testes E2E em modo debug (passo a passo)
	@echo "$(GREEN)Iniciando testes E2E em modo debug...$(RESET)"
	@echo "$(YELLOW)⚠️  Certifique-se que o backend está rodando na porta 3001!$(RESET)"
	npm run test:e2e:debug

test-e2e-report: ## Mostra o relatório dos últimos testes E2E
	@echo "$(GREEN)Abrindo relatório dos testes E2E...$(RESET)"
	npm run test:e2e:report

test-e2e-install: ## Instala browsers do Playwright
	@echo "$(GREEN)Instalando browsers do Playwright...$(RESET)"
	npx playwright install chromium

# Testes E2E sem iniciar servidor (usar quando o dev já estiver rodando)
test-e2e-no-server: ## Executa testes E2E sem iniciar servidor (frontend deve estar rodando)
	@echo "$(GREEN)Executando testes E2E (assumindo que frontend está rodando)...$(RESET)"
	@echo "$(YELLOW)⚠️  Frontend deve estar em http://localhost:3000$(RESET)"
	@echo "$(YELLOW)⚠️  Backend deve estar em http://localhost:3001$(RESET)"
	npx playwright test --config=playwright.no-server.config.ts

test-e2e-ui-no-server: ## Interface visual dos testes E2E sem iniciar servidor
	@echo "$(GREEN)Abrindo interface visual (assumindo que frontend está rodando)...$(RESET)"
	@echo "$(YELLOW)⚠️  Frontend deve estar em http://localhost:3000$(RESET)"
	@echo "$(YELLOW)⚠️  Backend deve estar em http://localhost:3001$(RESET)"
	npx playwright test --ui --config=playwright.no-server.config.ts

test-e2e-verbose: ## Executa testes com output detalhado de erros
	@echo "$(GREEN)Executando testes E2E com logs detalhados...$(RESET)"
	@echo "$(YELLOW)⚠️  Certifique-se que o backend está rodando na porta 3001!$(RESET)"
	DEBUG=pw:api npx playwright test --reporter=list --config=playwright.no-server.config.ts

# Atalhos
i: install ## Atalho para install
d: dev ## Atalho para dev
b: build ## Atalho para build
s: start ## Atalho para start
l: lint ## Atalho para lint
c: clean ## Atalho para clean
t: test-e2e-ui ## Atalho para test-e2e-ui (modo visual recomendado)

