# 🎨 Estrutura Atomic Design - SkinArena

## 📊 Visão Geral da Arquitetura

```
cs-skin-go-desafio/
│
├── 📱 app/                          # Next.js App Router (Pages)
│   ├── layout.tsx                   # Layout raiz
│   ├── page.tsx                     # Página inicial
│   ├── login/
│   ├── cadastro/
│   ├── perfil/
│   ├── inventario/
│   ├── historico/
│   ├── adicionar-saldo/
│   ├── caixa/[id]/
│   └── ...
│
├── 🧩 components/                   # Atomic Design Components
│   │
│   ├── ⚛️ atoms/                    # Componentes Básicos (42 componentes)
│   │   ├── index.ts                # Barrel export
│   │   ├── button.tsx              # ✓ Migrado
│   │   ├── input.tsx               # ✓ Migrado
│   │   ├── label.tsx               # ✓ Migrado
│   │   ├── card.tsx                # ✓ Migrado
│   │   ├── badge.tsx               # ✓ Migrado
│   │   ├── checkbox.tsx            # ✓ Migrado
│   │   ├── dropdown-menu.tsx       # ✓ Migrado
│   │   ├── dialog.tsx              # ✓ Migrado
│   │   ├── select.tsx              # ✓ Migrado
│   │   ├── tabs.tsx                # ✓ Migrado
│   │   ├── toast.tsx               # ✓ Migrado
│   │   ├── tooltip.tsx             # ✓ Migrado
│   │   ├── separator.tsx           # ✓ Migrado
│   │   ├── skeleton.tsx            # ✓ Migrado
│   │   ├── spinner.tsx             # ✓ Migrado
│   │   ├── switch.tsx              # ✓ Migrado
│   │   ├── textarea.tsx            # ✓ Migrado
│   │   ├── table.tsx               # ✓ Migrado
│   │   ├── progress.tsx            # ✓ Migrado
│   │   └── ... (outros 23 componentes)
│   │
│   ├── 🧬 molecules/                # Combinações Simples
│   │   ├── index.ts                # Barrel export
│   │   ├── case-card.tsx           # ✓ Migrado - Card de caixa
│   │   └── auth-layout.tsx         # ✓ Migrado - Layout de autenticação
│   │
│   ├── 🦠 organisms/                # Componentes Complexos
│   │   ├── index.ts                # Barrel export
│   │   ├── header.tsx              # ✓ Migrado - Cabeçalho completo
│   │   ├── footer.tsx              # ✓ Migrado - Rodapé
│   │   ├── login-form.tsx          # ✓ Migrado - Formulário de login
│   │   ├── register-form.tsx       # ✓ Migrado - Formulário de cadastro
│   │   ├── case-grid.tsx           # ✓ Migrado - Grid de caixas
│   │   └── case-details.tsx        # ✓ Migrado - Detalhes da caixa
│   │
│   ├── 📄 templates/                # Estruturas de Página
│   │   └── (a ser implementado conforme necessário)
│   │
│   ├── theme-provider.tsx          # Provider de tema
│   └── README.md                   # Documentação completa
│
├── 🎣 hooks/                        # React Hooks customizados
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── 🔧 contexts/                     # Context API
│   └── auth-context.tsx
│
├── 📚 lib/                          # Utilitários
│   ├── utils.ts
│   ├── auth.ts
│   └── user-data.ts
│
└── 🎨 styles/                       # Estilos globais
    └── globals.css
```

---

## 🔄 Mapeamento de Migração

### Estrutura Antiga → Estrutura Nova

| Antiga Localização | Nova Localização | Tipo |
|-------------------|------------------|------|
| `components/ui/*` | `components/atoms/*` | ⚛️ Atoms |
| `components/cases/case-card.tsx` | `components/molecules/case-card.tsx` | 🧬 Molecule |
| `components/auth/auth-layout.tsx` | `components/molecules/auth-layout.tsx` | 🧬 Molecule |
| `components/layout/header.tsx` | `components/organisms/header.tsx` | 🦠 Organism |
| `components/layout/footer.tsx` | `components/organisms/footer.tsx` | 🦠 Organism |
| `components/auth/login-form.tsx` | `components/organisms/login-form.tsx` | 🦠 Organism |
| `components/auth/register-form.tsx` | `components/organisms/register-form.tsx` | 🦠 Organism |
| `components/cases/case-grid.tsx` | `components/organisms/case-grid.tsx` | 🦠 Organism |
| `components/cases/case-details.tsx` | `components/organisms/case-details.tsx` | 🦠 Organism |

---

## 📦 Inventário de Componentes

### ⚛️ Atoms (42 componentes)
Componentes UI básicos prontos para uso:

**Formulários:**
- `button`, `input`, `label`, `checkbox`, `radio-group`, `select`, `textarea`, `switch`, `form`, `field`

**Layout:**
- `card`, `separator`, `aspect-ratio`, `scroll-area`, `resizable`

**Navegação:**
- `tabs`, `breadcrumb`, `navigation-menu`, `menubar`, `pagination`, `sidebar`

**Feedback:**
- `alert`, `alert-dialog`, `toast`, `toaster`, `dialog`, `drawer`, `spinner`, `skeleton`, `progress`

**Overlay:**
- `dropdown-menu`, `context-menu`, `popover`, `tooltip`, `hover-card`, `sheet`

**Display:**
- `badge`, `avatar`, `table`, `accordion`, `collapsible`, `carousel`, `chart`

**Interação:**
- `button-group`, `toggle`, `toggle-group`, `input-group`, `input-otp`, `command`, `calendar`, `slider`, `kbd`

**Utilitários:**
- `empty`, `item`, `sonner`, `use-mobile`, `use-toast`

### 🧬 Molecules (2 componentes)
- `case-card` - Exibe uma caixa com imagem, nome, preço e raridade
- `auth-layout` - Layout split-screen para páginas de autenticação

### 🦠 Organisms (6 componentes)
- `header` - Cabeçalho com navegação e menu de usuário
- `footer` - Rodapé com links e informações
- `login-form` - Formulário completo de login
- `register-form` - Formulário completo de cadastro
- `case-grid` - Grid responsivo de caixas
- `case-details` - Visualização detalhada de uma caixa

---

## 🎯 Fluxo de Dados

```
┌─────────────────────────────────────────────┐
│            📱 Pages (app/)                  │
│   Gerenciam estado e dados específicos     │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│         📄 Templates (futuros)              │
│    Definem estrutura e layout da página    │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│         🦠 Organisms                        │
│   Componentes complexos com lógica         │
│   (Header, Forms, Grids)                   │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│         🧬 Molecules                        │
│   Combinações simples de componentes       │
│   (CaseCard, AuthLayout)                   │
└─────────────────┬───────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────┐
│         ⚛️ Atoms                           │
│   Componentes UI básicos                   │
│   (Button, Input, Card, Badge...)          │
└─────────────────────────────────────────────┘
```

---

## 📝 Exemplos de Uso

### Importando Atoms
```typescript
// Importação individual
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"

// Importação agrupada
import { Button, Input, Label, Card } from "@/components/atoms"
```

### Importando Molecules
```typescript
import { CaseCard, AuthLayout } from "@/components/molecules"
```

### Importando Organisms
```typescript
import { Header, Footer, LoginForm } from "@/components/organisms"
```

### Exemplo Completo
```typescript
// app/login/page.tsx
import { LoginForm } from "@/components/organisms/login-form"
import { AuthLayout } from "@/components/molecules/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
```

---

## ✅ Status da Migração

- [x] Estrutura de pastas criada
- [x] 42 Atoms migrados (100%)
- [x] 2 Molecules migrados (100%)
- [x] 6 Organisms migrados (100%)
- [x] Imports atualizados em todas as páginas
- [x] Arquivos index.ts (barrel exports) criados
- [x] Documentação completa criada
- [x] Estrutura antiga removida
- [ ] Templates a serem criados conforme necessidade

---

## 🚀 Próximos Passos

1. **Testes**: Verificar se todos os componentes estão funcionando
2. **Templates**: Criar templates conforme necessidade de layouts reutilizáveis
3. **Storybook** (opcional): Documentação visual dos componentes
4. **Testes Unitários**: Implementar testes por nível
5. **Performance**: Otimizar imports e bundle size

---

## 📚 Documentação Adicional

Consulte `components/README.md` para:
- Guia detalhado de cada nível
- Diretrizes de quando criar cada tipo
- Melhores práticas
- Exemplos práticos
- Referências externas

---

## 🎉 Benefícios Alcançados

✅ **Organização Clara**: Estrutura hierárquica fácil de navegar  
✅ **Escalabilidade**: Fácil adicionar novos componentes  
✅ **Reutilização**: Componentes menores e mais reutilizáveis  
✅ **Manutenibilidade**: Fácil localizar e modificar componentes  
✅ **Consistência**: Design system coerente  
✅ **Documentação**: Estrutura auto-documentada  
✅ **Onboarding**: Novos desenvolvedores entendem rápido  
✅ **Testabilidade**: Componentes menores são mais fáceis de testar  

---

**Data de Migração:** Novembro 2025  
**Status:** ✅ Completo  
**Metodologia:** Atomic Design por Brad Frost

