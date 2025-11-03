# 🎮 CS Skin Go - SkinArena

<div align="center">

![CS:GO](https://img.shields.io/badge/CS:GO-Skins-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**Plataforma de abertura de caixas de sorte e ganho de skins raras de CS:GO**

[Demo](#) • [Documentação](#-funcionalidades) • [Instalação](#-instalação)

</div>

---

## 📋 Sobre o Projeto

**SkinArena** é uma aplicação web moderna e interativa que simula a experiência de abertura de caixas (cases) de skins do jogo Counter-Strike: Global Offensive (CS:GO). Os usuários podem criar contas, adicionar saldo, abrir caixas de diferentes raridades e coletar skins valiosas em seu inventário virtual.

### 🎯 Objetivo

Proporcionar uma experiência gamificada de abertura de caixas com:
- Sistema de autenticação completo
- Gestão de saldo e transações
- Variedade de caixas com diferentes preços e raridades
- Inventário personalizado para cada usuário
- Sistema de probabilidades realista
- Interface moderna e responsiva

---

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- ✅ Cadastro de novos usuários
- ✅ Login com e-mail e senha
- ✅ Logout seguro
- ✅ Persistência de sessão no localStorage
- ✅ Proteção de rotas privadas

### 💰 Gestão de Saldo
- ✅ Adicionar saldo via múltiplos métodos (Cartão de Crédito, PIX)
- ✅ Valores rápidos predefinidos (R$ 10, R$ 25, R$ 50, R$ 100, R$ 200, R$ 500)
- ✅ Valor personalizado
- ✅ Histórico completo de transações
- ✅ Visualização de saldo em tempo real

### 🎁 Sistema de Caixas
Disponibiliza **12 tipos diferentes de caixas**:

| Caixa | Preço | Raridade | Descrição |
|-------|-------|----------|-----------|
| **Daily Case** | GRÁTIS | Comum | Caixa gratuita diária |
| **Low Case** | R$ 1,80 | Comum | Caixa básica com skins comuns |
| **Indirect Case** | R$ 3,00 | Incomum | Caixa com skins de qualidade média |
| **Medium Case** | R$ 4,50 | Raro | Caixa com skins raras |
| **Ultra Case** | R$ 6,00 | Épico | Caixa premium com skins épicas |
| **Ammo Case** | R$ 6,30 | Raro | Caixa militar com skins táticas |
| **Rust Case** | R$ 6,60 | Raro | Caixa enferrujada com skins vintage |
| **C4 Case** | R$ 7,20 | Épico | Caixa explosiva com skins poderosas |
| **Chocolate Case** | R$ 8,40 | Épico | Caixa doce com skins premium |
| **Ember Case** | R$ 9,00 | Lendário | Caixa flamejante com skins lendárias |
| **Toolbox Case** | R$ 12,00 | Lendário | Caixa contendo skins raras de armas |
| **Neon Case** | R$ 12,00 | Lendário | Caixa neon com as melhores skins |

Cada caixa contém:
- Múltiplas skins com diferentes raridades
- Sistema de probabilidades baseado em raridade
- Skins de armas variadas (AK-47, AWP, M4A4, Desert Eagle, etc.)
- Itens especiais (Facas, Luvas)

### 🎒 Inventário
- ✅ Visualização de todos os itens ganhos
- ✅ Informações detalhadas de cada skin (nome, raridade, valor, data)
- ✅ Sistema de badges por raridade
- ✅ Contador de itens
- ✅ Grid responsivo

### 📊 Histórico de Transações
- ✅ Registro completo de depósitos
- ✅ Histórico de aberturas de caixas
- ✅ Skins ganhas em cada abertura
- ✅ Timestamps de todas as ações

### 👤 Perfil do Usuário
- ✅ Visualização de dados pessoais
- ✅ Saldo atual
- ✅ Estatísticas de inventário
- ✅ Acesso rápido a funcionalidades

### 📱 Extras
- ✅ Páginas de Termos de Serviço
- ✅ Política de Privacidade
- ✅ Suporte ao usuário
- ✅ Design responsivo para mobile, tablet e desktop

---

## 🛠️ Tecnologias Utilizadas

### **Frontend Framework**
- **Next.js 16.0** - Framework React com SSR e App Router
- **React 19.2** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Superset JavaScript com tipagem estática

### **Estilização**
- **TailwindCSS 4.1** - Framework CSS utility-first
- **Tailwind Animate** - Animações CSS
- **PostCSS** - Processador CSS

### **Componentes UI**
- **Radix UI** - Componentes acessíveis e customizáveis
  - Accordion, Alert Dialog, Avatar, Badge, Button
  - Card, Carousel, Checkbox, Command, Dialog
  - Dropdown Menu, Form, Input, Label, Modal
  - Navigation Menu, Popover, Progress, Radio Group
  - ScrollArea, Select, Separator, Slider, Switch
  - Tabs, Toast, Tooltip, Toggle, e mais...

### **Bibliotecas Auxiliares**
- **Lucide React** - Ícones modernos e customizáveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas TypeScript
- **date-fns** - Manipulação de datas
- **Recharts** - Gráficos e visualizações
- **Sonner** - Sistema de notificações toast
- **Embla Carousel** - Carrossel de imagens
- **class-variance-authority** - Gerenciamento de variantes CSS
- **clsx & tailwind-merge** - Utilitários de classes CSS

### **Gerenciamento de Estado**
- **React Context API** - Gerenciamento de estado global (Auth, User Data)
- **localStorage** - Persistência de dados local

### **Analytics**
- **Vercel Analytics** - Análise de métricas e performance

---

## 📁 Estrutura do Projeto

```
cs-skin-go-desafio/
│
├── app/                          # App Router do Next.js
│   ├── adicionar-saldo/          # Página de adição de saldo
│   ├── cadastro/                 # Página de cadastro
│   ├── caixa/[id]/              # Página dinâmica de detalhes da caixa
│   ├── historico/                # Histórico de transações
│   ├── inventario/               # Inventário do usuário
│   ├── login/                    # Página de login
│   ├── perfil/                   # Perfil do usuário
│   ├── privacidade/              # Política de privacidade
│   ├── suporte/                  # Suporte
│   ├── termos/                   # Termos de serviço
│   ├── layout.tsx                # Layout global
│   ├── page.tsx                  # Página inicial
│   └── globals.css               # Estilos globais
│
├── components/                   # Componentes reutilizáveis
│   ├── auth/                     # Componentes de autenticação
│   │   ├── auth-layout.tsx
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── cases/                    # Componentes de caixas
│   │   ├── case-card.tsx
│   │   ├── case-details.tsx
│   │   └── case-grid.tsx
│   ├── layout/                   # Componentes de layout
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui/                       # Componentes UI do shadcn
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── ... (50+ componentes)
│   │   └── use-toast.ts
│   └── theme-provider.tsx        # Provider de tema dark/light
│
├── contexts/                     # Context API
│   └── auth-context.tsx          # Contexto de autenticação
│
├── hooks/                        # Custom Hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/                          # Utilitários e lógica de negócio
│   ├── auth.ts                   # Funções de autenticação
│   ├── user-data.ts              # Gerenciamento de dados do usuário
│   └── utils.ts                  # Funções auxiliares
│
├── public/                       # Arquivos estáticos
│   ├── *.jpg                     # Imagens das caixas e skins
│   └── *.svg                     # Logos e ícones
│
├── styles/                       # Estilos adicionais
│   └── globals.css
│
├── .gitignore                    # Arquivos ignorados pelo Git
├── components.json               # Configuração do shadcn/ui
├── next.config.mjs               # Configuração do Next.js
├── package.json                  # Dependências do projeto
├── pnpm-lock.yaml                # Lock file do pnpm
├── postcss.config.mjs            # Configuração do PostCSS
├── tsconfig.json                 # Configuração do TypeScript
└── README.md                     # Este arquivo
```

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18.17 ou superior
- **pnpm** (recomendado) ou npm/yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone git@github.com:torneseumprogramador/cs-skin-go-desafio.git
cd cs-skin-go-desafio
```

2. **Instale as dependências**
```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install

# Ou usando yarn
yarn install
```

3. **Execute o servidor de desenvolvimento**
```bash
# Usando pnpm
pnpm dev

# Ou usando npm
npm run dev

# Ou usando yarn
yarn dev
```

4. **Abra o navegador**
```
http://localhost:3000
```

---

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Cria build de produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm lint` | Executa o linter ESLint |

---

## 🎨 Configuração do Tema

A aplicação utiliza o sistema de temas do **shadcn/ui** com suporte a:
- 🌙 **Dark Mode** (padrão)
- ☀️ **Light Mode**
- 🎨 Cores customizáveis via CSS variables

### Paleta de Cores (Dark Mode)

- **Primary**: Laranja/Dourado (tema CS:GO)
- **Accent**: Cores vibrantes
- **Background**: Tons escuros
- **Muted**: Cinza médio
- **Border**: Bordas sutis

---

## 💾 Persistência de Dados

A aplicação utiliza **localStorage** para armazenar:

### 📦 Dados Armazenados

1. **`skinarena_users`** - Lista de usuários cadastrados
   - ID único
   - Nome
   - E-mail
   - Senha (⚠️ em produção deve ser hasheada)
   - Data de criação

2. **`skinarena_current_user`** - Usuário atual logado
   - Dados do usuário (sem senha)

3. **`skinarena_user_data`** - Dados de cada usuário
   - Saldo atual
   - Inventário de skins
   - Histórico de transações

### ⚠️ Importante
> Este projeto é um **protótipo/MVP** que utiliza localStorage para simplificar o desenvolvimento. 
> Em produção, recomenda-se implementar:
> - Backend com API REST ou GraphQL
> - Banco de dados (PostgreSQL, MongoDB, etc.)
> - Autenticação JWT ou OAuth
> - Bcrypt para hash de senhas
> - Validações server-side

---

## 🎲 Sistema de Probabilidades

Cada caixa possui skins com diferentes probabilidades de saída baseadas em raridade:

| Raridade | Cor | Probabilidade Típica |
|----------|-----|---------------------|
| **Comum** | Cinza | 40-50% |
| **Incomum** | Verde | 25-35% |
| **Raro** | Azul | 15-25% |
| **Épico** | Roxo | 8-15% |
| **Lendário** | Laranja/Vermelho | 1-6% |

As probabilidades são definidas individualmente para cada skin em cada caixa.

---

## 🔒 Segurança

### Implementado
- ✅ Proteção de rotas com redirecionamento
- ✅ Validação de formulários com Zod
- ✅ Verificação de saldo antes de abrir caixas
- ✅ Verificação de e-mail duplicado no cadastro

### Recomendações para Produção
- 🔐 Implementar autenticação JWT
- 🔐 Hash de senhas com bcrypt
- 🔐 Validações server-side
- 🔐 Rate limiting
- 🔐 HTTPS obrigatório
- 🔐 CORS configurado corretamente
- 🔐 Sanitização de inputs

---

## 🌐 Deploy

### Vercel (Recomendado)

1. **Faça push para o GitHub**
```bash
git push origin main
```

2. **Importe no Vercel**
- Acesse [vercel.com](https://vercel.com)
- Importe o repositório
- Deploy automático

### Outras Plataformas
- **Netlify**: Suporta Next.js
- **Railway**: Deploy de aplicações Node.js
- **DigitalOcean App Platform**: Deploy simples
- **AWS Amplify**: Integração com AWS

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é um **desafio educacional** e está disponível para fins de aprendizado.

---

## 👨‍💻 Autor

Desenvolvido como desafio técnico para demonstração de habilidades em:
- Next.js 16 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Gerenciamento de estado
- UI/UX moderno

---

## 📞 Suporte

Para dúvidas ou sugestões, utilize a página de **Suporte** dentro da aplicação ou abra uma issue no GitHub.

---

## 🎉 Agradecimentos

- **Radix UI** - Componentes acessíveis
- **shadcn/ui** - Sistema de design
- **Vercel** - Plataforma de deploy
- **CS:GO** - Inspiração para o projeto

---

<div align="center">

**Desenvolvido com ❤️ usando Next.js e React**

[![GitHub](https://img.shields.io/badge/GitHub-Repositório-black?style=for-the-badge&logo=github)](https://github.com/torneseumprogramador/cs-skin-go-desafio)

</div>

