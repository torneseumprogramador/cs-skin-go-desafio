# 🎮 CS Skin GO - Plataforma de Cases

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Objetivo da Aplicação](#-objetivo-da-aplicação)
- [Funcionalidades](#-funcionalidades)
- [Início Rápido](#-início-rápido)
- [Comandos do Makefile](#-comandos-do-makefile)
- [Guia Detalhado de Comandos](#-guia-detalhado-de-comandos)
- [Tecnologias](#️-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Fluxos de Trabalho](#-fluxos-de-trabalho)
- [Troubleshooting](#-troubleshooting)
- [Deploy](#-deploy)

---

## 🎯 Sobre o Projeto

**CS Skin GO** é uma aplicação web moderna para abertura de cases de CS:GO/CS2, desenvolvida como parte de um desafio técnico. A plataforma oferece uma experiência completa de gamificação, permitindo que usuários abram cases virtuais, colecionem skins raras e gerenciem seu inventário.

## 🚀 Objetivo da Aplicação

A plataforma CS Skin GO foi desenvolvida para proporcionar uma experiência interativa e envolvente de abertura de cases de CS:GO/CS2. Os principais objetivos são:

### Objetivos Principais

1. **Sistema de Cases Interativo**
   - Permitir aos usuários abrir cases virtuais com animações fluidas
   - Exibir diferentes categorias de cases com raridades variadas
   - Simular a experiência real de abertura de cases do CS:GO/CS2

2. **Gestão de Inventário**
   - Gerenciar skins obtidas através da abertura de cases
   - Visualizar e organizar itens por raridade, tipo e valor
   - Acompanhar o histórico completo de aberturas

3. **Sistema de Autenticação e Usuários**
   - Registro e login de usuários
   - Perfil personalizado com estatísticas
   - Histórico de transações e aberturas

4. **Sistema de Saldo**
   - Adicionar saldo à conta
   - Gerenciar créditos para abertura de cases
   - Acompanhar gastos e ganhos

5. **Experiência do Usuário**
   - Interface moderna e responsiva
   - Tema claro/escuro
   - Animações e feedbacks visuais
   - Design intuitivo e acessível

### Público-Alvo

- Jogadores de CS:GO/CS2
- Entusiastas de skins e colecionáveis virtuais
- Usuários que buscam entretenimento gamificado

### Diferenciais

- ✨ Interface moderna com Tailwind CSS e Radix UI
- 🎨 Sistema de temas (claro/escuro)
- ⚡ Performance otimizada com Next.js 16
- 📱 Totalmente responsivo para mobile e desktop
- 🔒 Sistema de autenticação seguro
- 📊 Dashboard com estatísticas detalhadas

---

## ✨ Funcionalidades

### Páginas Principais

- **🏠 Home** - Página inicial com destaques de cases
- **🔐 Login/Cadastro** - Autenticação de usuários
- **📦 Cases** - Catálogo de cases disponíveis
- **🎁 Abertura de Case** - Página interativa para abrir cases
- **🎒 Inventário** - Gerenciamento de skins obtidas
- **📜 Histórico** - Registro de todas as aberturas
- **👤 Perfil** - Informações e estatísticas do usuário
- **💰 Adicionar Saldo** - Sistema de créditos
- **🆘 Suporte** - Central de ajuda
- **📄 Termos** - Termos de uso
- **🔒 Privacidade** - Política de privacidade

### Recursos Técnicos

- ⚡ **Server-Side Rendering (SSR)** com Next.js
- 🔄 **Static Site Generation (SSG)** para páginas estáticas
- 🎨 **Componentes Reutilizáveis** com Radix UI
- 📝 **Formulários Validados** com React Hook Form + Zod
- 🎭 **Context API** para gerenciamento de estado
- 🌙 **Tema Claro/Escuro** com next-themes
- 📊 **Gráficos Interativos** com Recharts

---

## 🚀 Início Rápido

### Requisitos

- **Node.js** 18.x ou superior
- **NPM** 10.x ou superior (ou pnpm/yarn)
- **Make** (opcional, mas recomendado)

### Instalação

#### Usando Makefile (Recomendado)

```bash
# 1. Clonar o repositório
git clone <url-do-repositório>
cd cs-skin-go-desafio

# 2. Instalar dependências
make install

# 3. Iniciar servidor de desenvolvimento
make dev
```

#### Usando NPM diretamente

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Iniciar servidor de desenvolvimento
npm run dev

# Fazer build de produção
npm run build

# Iniciar servidor de produção
npm start
```

### Acessar a Aplicação

Abra seu navegador e acesse: **http://localhost:3000**

---

## 📋 Comandos do Makefile

### Comandos Principais

| Comando | Atalho | Descrição |
|---------|--------|-----------|
| `make help` | - | Mostra todos os comandos disponíveis |
| `make install` | `make i` | Instala as dependências do projeto |
| `make dev` | `make d` | Inicia o servidor de desenvolvimento (porta 3000) |
| `make build` | `make b` | Faz o build de produção |
| `make start` | `make s` | Inicia o servidor de produção |
| `make serve` | - | Faz build e inicia servidor de produção |

### Comandos de Limpeza

| Comando | Atalho | Descrição |
|---------|--------|-----------|
| `make clean` | `make c` | Remove node_modules e .next |
| `make clean-install` | - | Remove tudo e reinstala as dependências |
| `make rebuild` | - | Remove tudo, reinstala e faz novo build |

### Comandos de Qualidade

| Comando | Atalho | Descrição |
|---------|--------|-----------|
| `make lint` | `make l` | Executa o linter |
| `make lint-fix` | - | Executa o linter e corrige automaticamente |
| `make check` | - | Verifica se tudo está funcionando (build) |

### Comandos de Manutenção

| Comando | Descrição |
|---------|-----------|
| `make update` | Atualiza as dependências |
| `make outdated` | Mostra dependências desatualizadas |
| `make info` | Mostra informações do projeto e ambiente |
| `make port-3000` | Libera a porta 3000 |

### Atalhos Rápidos

```bash
make i    # install
make d    # dev
make b    # build
make s    # start
make l    # lint
make c    # clean
```

---

## 📘 Guia Detalhado de Comandos

### 🎯 Comandos de Desenvolvimento

#### `make dev` ou `make d`
Inicia o servidor de desenvolvimento do Next.js na porta 3000.

```bash
make dev
```

**Quando usar:** Durante o desenvolvimento ativo. O servidor recarrega automaticamente ao detectar mudanças.

**Output esperado:**
```
Iniciando servidor de desenvolvimento...
▲ Next.js 16.0.0
- Local: http://localhost:3000
```

---

#### `make build` ou `make b`
Compila a aplicação para produção.

```bash
make build
```

**Quando usar:**
- Antes de fazer deploy
- Para verificar se não há erros de build
- Para testar a versão otimizada

**Output esperado:**
```
✓ Compiled successfully
✓ Generating static pages (12/12)
```

---

#### `make start` ou `make s`
Inicia o servidor de produção com os arquivos compilados.

```bash
make start
```

**Quando usar:** Depois de executar `make build`, para testar a versão de produção localmente.

**Requisito:** Executar `make build` primeiro.

---

#### `make serve`
Executa build e start em sequência.

```bash
make serve
```

**Equivalente a:** `make build && make start`

---

### 📦 Comandos de Instalação

#### `make install` ou `make i`
Instala todas as dependências do projeto.

```bash
make install
```

**Quando usar:**
- Primeira vez que clonar o repositório
- Depois de adicionar novas dependências
- Quando alguém do time adicionar novas bibliotecas

**Nota:** Usa `--legacy-peer-deps` automaticamente para resolver conflitos entre React 19 e algumas bibliotecas.

---

#### `make update`
Atualiza todas as dependências para as versões mais recentes compatíveis.

```bash
make update
```

**Atenção:** Teste bem após atualizar, pois pode introduzir breaking changes.

---

#### `make outdated`
Lista todas as dependências que têm versões mais recentes disponíveis.

```bash
make outdated
```

**Output esperado:**
```
Package      Current  Wanted  Latest
next         16.0.0   16.0.0  16.0.1
react        19.2.0   19.2.0  19.3.0
```

---

### 🧹 Comandos de Limpeza

#### `make clean` ou `make c`
Remove `node_modules` e `.next` (arquivos de build).

```bash
make clean
```

**Quando usar:**
- Problemas estranhos de cache
- Para liberar espaço em disco
- Antes de fazer backup do projeto

**O que remove:**
- `node_modules/` - Todas as dependências instaladas
- `.next/` - Arquivos de build do Next.js

---

#### `make clean-install`
Remove tudo e reinstala as dependências do zero.

```bash
make clean-install
```

**Quando usar:**
- Problemas persistentes de cache
- Após mudar de branch com dependências diferentes
- Quando `npm install` não está funcionando corretamente

---

#### `make rebuild`
Remove tudo, reinstala e faz novo build.

```bash
make rebuild
```

**Quando usar:**
- Para garantir um build completamente limpo
- Antes de deploy importante
- Quando houver erros de build inexplicáveis

---

### ✅ Comandos de Qualidade

#### `make lint` ou `make l`
Executa o linter (ESLint) no projeto.

```bash
make lint
```

**O que verifica:**
- Erros de sintaxe
- Problemas de estilo
- Más práticas
- Código não utilizado

---

#### `make lint-fix`
Executa o linter e corrige automaticamente.

```bash
make lint-fix
```

**O que corrige:**
- Indentação
- Espaços em branco
- Ponto e vírgula
- Aspas simples vs duplas

---

#### `make check`
Verifica se o build está funcionando.

```bash
make check
```

**Quando usar:**
- Antes de fazer push
- Antes de abrir um Pull Request
- Para validação rápida de qualidade

---

### ℹ️ Comandos de Informação

#### `make info`
Mostra informações sobre o projeto e ambiente.

```bash
make info
```

**Output:**
```
Informações do Projeto:
Nome: my-v0-project
Versão: 0.1.0
Node: v22.15.1
NPM: 10.9.2
```

---

#### `make help`
Mostra todos os comandos disponíveis.

```bash
make help
```

---

### 🔧 Comandos Utilitários

#### `make port-3000`
Libera a porta 3000 matando processos que a estão usando.

```bash
make port-3000
```

**Quando usar:** Ao receber erro "Port 3000 is already in use"

---

## 🛠️ Tecnologias

### Core

- **[Next.js 16.0.0](https://nextjs.org/)** - Framework React com SSR/SSG
- **[React 19.2.0](https://react.dev/)** - Biblioteca para interfaces
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - JavaScript com tipagem

### Estilização

- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Sistema de temas
- **[Lucide React](https://lucide.dev/)** - Ícones

### Formulários e Validação

- **[React Hook Form 7.60.0](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod 3.25.76](https://zod.dev/)** - Validação de schemas
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração Zod + RHF

### UI Components

- **[cmdk](https://cmdk.paco.me/)** - Command palette
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Recharts](https://recharts.org/)** - Gráficos
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrossel
- **[Vaul](https://vaul.emilkowal.ski/)** - Drawer component

### Utilitários

- **[clsx](https://github.com/lukeed/clsx)** - Condicionais de classes
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge de classes Tailwind
- **[date-fns](https://date-fns.org/)** - Manipulação de datas
- **[class-variance-authority](https://cva.style/)** - Variantes de componentes

---

## 📁 Estrutura do Projeto

```
cs-skin-go-desafio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz da aplicação
│   ├── page.tsx                 # Página inicial (Home)
│   ├── globals.css              # Estilos globais
│   │
│   ├── login/                   # Autenticação
│   │   └── page.tsx            
│   ├── cadastro/               
│   │   └── page.tsx            
│   │
│   ├── caixa/                   # Cases
│   │   └── [id]/               # Página dinâmica de abertura
│   │       └── page.tsx        
│   │
│   ├── inventario/              # Inventário de skins
│   │   └── page.tsx            
│   ├── historico/               # Histórico de aberturas
│   │   └── page.tsx            
│   │
│   ├── perfil/                  # Perfil do usuário
│   │   └── page.tsx            
│   ├── adicionar-saldo/         # Sistema de créditos
│   │   └── page.tsx            
│   │
│   ├── suporte/                 # Central de ajuda
│   │   └── page.tsx            
│   ├── termos/                  # Termos de uso
│   │   └── page.tsx            
│   └── privacidade/             # Política de privacidade
│       └── page.tsx            
│
├── components/                   # Componentes React
│   ├── auth/                    # Autenticação
│   │   ├── auth-layout.tsx     
│   │   ├── login-form.tsx      
│   │   └── register-form.tsx   
│   │
│   ├── cases/                   # Cases
│   │   ├── case-card.tsx       
│   │   ├── case-details.tsx    
│   │   └── case-grid.tsx       
│   │
│   ├── layout/                  # Layout
│   │   ├── header.tsx          
│   │   └── footer.tsx          
│   │
│   ├── ui/                      # Componentes UI (shadcn/ui)
│   │   ├── button.tsx          
│   │   ├── card.tsx            
│   │   ├── dialog.tsx          
│   │   ├── form.tsx            
│   │   ├── input.tsx           
│   │   └── ...                 # 50+ componentes
│   │
│   └── theme-provider.tsx       # Provider de temas
│
├── contexts/                     # Context API
│   └── auth-context.tsx         # Contexto de autenticação
│
├── hooks/                        # Custom Hooks
│   ├── use-mobile.ts           
│   └── use-toast.ts            
│
├── lib/                          # Utilitários
│   ├── auth.ts                  # Funções de autenticação
│   ├── user-data.ts             # Dados de usuário
│   └── utils.ts                 # Utilitários gerais
│
├── public/                       # Arquivos estáticos
│   ├── *.jpg                    # Imagens de cases
│   ├── *.png                    # Imagens de skins
│   └── *.svg                    # Logos e ícones
│
├── styles/                       # Estilos
│   └── globals.css              
│
├── .eslintrc.json               # Configuração ESLint
├── .gitignore                   # Git ignore
├── .npmrc                       # Configuração NPM
├── components.json              # Configuração shadcn/ui
├── Makefile                     # Comandos Make
├── next.config.mjs              # Configuração Next.js
├── package.json                 # Dependências
├── postcss.config.mjs           # Configuração PostCSS
├── README.md                    # Documentação
├── tailwind.config.ts           # Configuração Tailwind
└── tsconfig.json                # Configuração TypeScript
```

---

## 🚀 Fluxos de Trabalho

### Iniciando o Projeto (Primeira Vez)

```bash
# 1. Clonar repositório
git clone <url>
cd cs-skin-go-desafio

# 2. Instalar dependências
make install

# 3. Iniciar desenvolvimento
make dev
```

### Desenvolvimento Diário

```bash
# Iniciar servidor
make dev

# ... trabalhar no código ...

# Verificar qualidade antes de commit
make check
```

### Antes de Fazer Commit

```bash
# Verificar build
make check

# Se tudo estiver OK
git add .
git commit -m "feat: nova funcionalidade"
git push
```

### Preparando Deploy

```bash
# Build limpo completo
make rebuild

# Testar produção localmente
make serve

# Se tudo estiver OK, fazer deploy
```

### Resolvendo Problemas

```bash
# Reinstalar tudo do zero
make clean-install

# Ou rebuild completo
make rebuild
```

### Atualizando Dependências

```bash
# Ver o que está desatualizado
make outdated

# Atualizar
make update

# Verificar se não quebrou nada
make check
```

---

## 🐛 Troubleshooting

### Porta 3000 já está em uso

**Problema:** `Port 3000 is already in use`

**Solução:**
```bash
make port-3000
make dev
```

---

### Erro de cache do NPM

**Problema:** Erros estranhos após atualizar dependências

**Solução:**
```bash
make clean-install
```

---

### Problemas com build

**Problema:** Build falha sem motivo aparente

**Solução:**
```bash
make rebuild
```

---

### Comando `make` não encontrado

**Problema:** `make: command not found`

**Solução:**

**macOS:**
```bash
xcode-select --install
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install build-essential
```

**Windows:**
- Use WSL2 ou Git Bash
- Ou use os comandos NPM diretamente

---

### Conflitos de dependências

**Problema:** Erros ao instalar pacotes

**Solução:**

O projeto já está configurado para usar `--legacy-peer-deps` automaticamente através do arquivo `.npmrc`. Se ainda assim houver problemas:

```bash
make clean-install
```

---

### Erros de TypeScript

**Problema:** Erros de tipagem no build

**Solução:**

1. Verificar se todas as dependências estão instaladas:
```bash
make install
```

2. Limpar cache do TypeScript:
```bash
rm -rf .next
make build
```

---

## 🚀 Deploy

### Verificação Pré-Deploy

```bash
# 1. Verificar se tudo está funcionando
make check

# 2. Fazer build de produção
make build

# 3. Testar localmente
make start
```

### Deploy na Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte seu repositório
4. Configure as variáveis de ambiente (se necessário)
5. Deploy automático!

### Deploy em Outras Plataformas

O projeto Next.js 16 pode ser deployado em:

- **[Vercel](https://vercel.com)** (Recomendado)
- **[Netlify](https://netlify.com)**
- **[Railway](https://railway.app)**
- **[Render](https://render.com)**
- **[AWS Amplify](https://aws.amazon.com/amplify/)**

### Build de Produção Manual

```bash
# Build
npm run build

# Start
npm start
```

---

## 📝 Notas Importantes

### Dependências

- O projeto usa `--legacy-peer-deps` devido à compatibilidade entre React 19 e algumas bibliotecas
- O arquivo `.npmrc` já está configurado com essa flag
- Não é necessário passar manualmente ao instalar

### TypeScript

- Configurado com modo estrito (`strict: true`)
- Validação de tipos durante o build
- Suporte completo para JSX

### Rotas

O build gera **12 rotas**:
- **11 estáticas (○)** - Pré-renderizadas em build time
- **1 dinâmica (ƒ)** - `/caixa/[id]` - Renderizada sob demanda

### Performance

- Otimização automática de imagens
- Code splitting automático
- Server Components por padrão
- Static Generation quando possível

---

## 💡 Dicas

1. **Use `make help`** sempre que esquecer um comando
2. **Use atalhos** (`d`, `b`, `s`, etc.) para agilizar o desenvolvimento
3. **Execute `make check`** antes de commits importantes
4. **Use `make clean-install`** quando algo estranho acontecer
5. **Execute `make rebuild`** antes de deploys importantes
6. **Mantenha as dependências atualizadas** com `make update`
7. **Verifique versões desatualizadas** com `make outdated`

---

## 📚 Recursos e Documentação

### Documentação Oficial

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

### Ferramentas Úteis

- [Make Documentation](https://www.gnu.org/software/make/manual/)
- [NPM Documentation](https://docs.npmjs.com/)
- [Zod Documentation](https://zod.dev)
- [React Hook Form](https://react-hook-form.com/docs)

---

## 📄 Licença

Este projeto é privado e parte de um desafio técnico.

---

## 👥 Contribuindo

Este é um projeto de desafio técnico individual. Para dúvidas ou sugestões, entre em contato através dos canais apropriados.

---

## 📞 Suporte

Para suporte ou dúvidas:

- Acesse a página de Suporte da aplicação: `/suporte`
- Verifique a documentação completa neste README
- Use `make help` para ver todos os comandos disponíveis

---

<div align="center">

**Desenvolvido com ❤️ usando Next.js 16 e React 19**

⭐ **Dica:** Use `make help` para ver todos os comandos disponíveis!

</div>
