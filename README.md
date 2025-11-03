# CS Skin GO - Desafio

Aplicação web para abertura de cases de CS:GO/CS2 desenvolvida com Next.js 16, React 19 e TypeScript.

## 🚀 Início Rápido

### Usando Makefile (Recomendado)

```bash
# Ver todos os comandos disponíveis
make help

# Instalar dependências
make install

# Iniciar servidor de desenvolvimento
make dev

# Fazer build de produção
make build

# Iniciar servidor de produção
make start
```

### Usando NPM diretamente

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Iniciar servidor de desenvolvimento
npm run dev

# Fazer build de produção
npm run build

# Iniciar servidor de produção
npm start

# Executar linter
npm run lint
```

## 📋 Comandos do Makefile

### Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `make help` | Mostra todos os comandos disponíveis |
| `make install` | Instala as dependências do projeto |
| `make dev` | Inicia o servidor de desenvolvimento (porta 3000) |
| `make build` | Faz o build de produção |
| `make start` | Inicia o servidor de produção |
| `make lint` | Executa o linter |
| `make lint-fix` | Executa o linter e corrige problemas automaticamente |

### Comandos de Limpeza

| Comando | Descrição |
|---------|-----------|
| `make clean` | Remove node_modules e .next |
| `make clean-install` | Remove tudo e reinstala as dependências |
| `make rebuild` | Remove tudo, reinstala e faz novo build |

### Comandos de Manutenção

| Comando | Descrição |
|---------|-----------|
| `make check` | Verifica se tudo está funcionando (lint + build) |
| `make update` | Atualiza as dependências |
| `make outdated` | Mostra dependências desatualizadas |
| `make info` | Mostra informações do projeto |
| `make serve` | Faz build e inicia servidor de produção |
| `make port-3000` | Libera a porta 3000 (mata processos usando ela) |

### Atalhos

| Atalho | Comando Completo |
|--------|------------------|
| `make i` | `make install` |
| `make d` | `make dev` |
| `make b` | `make build` |
| `make s` | `make start` |
| `make l` | `make lint` |
| `make c` | `make clean` |

## 🛠️ Tecnologias

- **Framework:** Next.js 16.0.0 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.x
- **Estilização:** Tailwind CSS 4.1.9
- **UI Components:** Radix UI
- **Forms:** React Hook Form + Zod
- **Gráficos:** Recharts
- **Tema:** next-themes

## 📁 Estrutura do Projeto

```
cs-skin-go-desafio/
├── app/                    # Páginas do Next.js (App Router)
│   ├── (auth)/            # Rotas de autenticação
│   ├── caixa/             # Página de abertura de cases
│   ├── inventario/        # Inventário do usuário
│   ├── historico/         # Histórico de aberturas
│   └── ...
├── components/            # Componentes React
│   ├── auth/             # Componentes de autenticação
│   ├── cases/            # Componentes de cases
│   ├── layout/           # Layout (header, footer)
│   └── ui/               # Componentes UI (shadcn/ui)
├── contexts/             # Contextos React
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e helpers
├── public/               # Arquivos estáticos
└── styles/               # Estilos globais

```

## 🔧 Configuração

### Requisitos

- Node.js 18.x ou superior
- NPM 10.x ou superior

### Instalação

1. Clone o repositório
2. Execute `make install` ou `npm install --legacy-peer-deps`
3. Execute `make dev` para iniciar o servidor de desenvolvimento
4. Acesse http://localhost:3000

### Build de Produção

```bash
# Fazer build
make build

# Iniciar servidor de produção
make start

# Ou fazer tudo de uma vez
make serve
```

## 📝 Notas

- O projeto usa `--legacy-peer-deps` devido à compatibilidade entre React 19 e algumas bibliotecas
- O arquivo `.npmrc` está configurado para usar automaticamente essa flag
- O TypeScript está configurado com modo estrito ativado
- O build gera 12 rotas, sendo 11 estáticas e 1 dinâmica

## 🐛 Troubleshooting

### Porta 3000 já está em uso
```bash
make port-3000
```

### Erro de cache do NPM
```bash
make clean-install
```

### Problemas com build
```bash
make rebuild
```

### Verificar se tudo está funcionando
```bash
make check
```

## 📄 Licença

Este projeto é privado e parte de um desafio técnico.
