.PHONY: help install dev build start lint clean test format

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

# Atalhos
i: install ## Atalho para install
d: dev ## Atalho para dev
b: build ## Atalho para build
s: start ## Atalho para start
l: lint ## Atalho para lint
c: clean ## Atalho para clean

