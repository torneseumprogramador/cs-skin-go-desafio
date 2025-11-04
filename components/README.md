# Estrutura de Componentes - Atomic Design

Esta aplicação utiliza o padrão **Atomic Design** para organizar os componentes de forma escalável e manutenível.

## 📚 O que é Atomic Design?

Atomic Design é uma metodologia criada por Brad Frost que divide componentes em 5 níveis hierárquicos, inspirado na química:

## 🏗️ Estrutura de Pastas

```
components/
├── atoms/              # Componentes básicos (primitivos)
├── molecules/          # Combinações simples de átomos
├── organisms/          # Componentes complexos
├── templates/          # Estruturas de página (layouts)
└── README.md          # Esta documentação
```

---

## ⚛️ Atoms (Átomos)

**Localização:** `components/atoms/`

Componentes básicos e primitivos que não podem ser divididos em partes menores. São os blocos de construção fundamentais da interface.

### Exemplos:
- `button.tsx` - Botões
- `input.tsx` - Campos de entrada
- `label.tsx` - Rótulos
- `badge.tsx` - Badges/etiquetas
- `card.tsx` - Cards base
- `checkbox.tsx` - Checkboxes
- `dropdown-menu.tsx` - Menus dropdown
- `dialog.tsx` - Diálogos
- `toast.tsx` - Notificações
- E todos os outros componentes UI básicos

### Características:
- Não dependem de outros componentes da aplicação
- Altamente reutilizáveis
- Geralmente recebem apenas props básicas
- Sem lógica de negócio

### Uso:
```typescript
import { Button, Input, Label } from "@/components/atoms"
// ou
import { Button } from "@/components/atoms/button"
```

---

## 🧬 Molecules (Moléculas)

**Localização:** `components/molecules/`

Combinações simples de átomos que formam funcionalidades específicas. São grupos relativamente simples de elementos da UI.

### Exemplos:
- `case-card.tsx` - Card de exibição de caixa (combina Card, Badge, Image)
- `auth-layout.tsx` - Layout de autenticação

### Características:
- Combinam 2 ou mais átomos
- Têm um propósito específico
- Ainda são reutilizáveis
- Lógica simples e focada

### Uso:
```typescript
import { CaseCard, AuthLayout } from "@/components/molecules"
```

---

## 🦠 Organisms (Organismos)

**Localização:** `components/organisms/`

Componentes complexos que combinam molecules e atoms para formar seções distintas de uma interface.

### Exemplos:
- `header.tsx` - Cabeçalho completo com navegação e menu de usuário
- `footer.tsx` - Rodapé da aplicação
- `login-form.tsx` - Formulário completo de login
- `register-form.tsx` - Formulário completo de cadastro
- `case-grid.tsx` - Grid de exibição de caixas
- `case-details.tsx` - Detalhes completos de uma caixa

### Características:
- Componentes relativamente complexos
- Combinam molecules e atoms
- Podem conter lógica de negócio
- Representam seções específicas da interface
- Geralmente específicos do domínio da aplicação

### Uso:
```typescript
import { Header, Footer, LoginForm } from "@/components/organisms"
```

---

## 📄 Templates

**Localização:** `components/templates/`

Estruturas de página que organizam organisms em layouts específicos. São esqueletos de páginas sem dados reais.

### Características:
- Organizam organisms em layouts
- Definem a estrutura da página
- Não contêm dados reais
- Focam na disposição dos elementos

### Uso:
```typescript
import { MainTemplate } from "@/components/templates"
```

---

## 📱 Pages (Páginas)

**Localização:** `app/` (Next.js App Router)

Instâncias específicas de templates preenchidas com dados reais. São as páginas finais da aplicação.

### Características:
- Usam templates com dados reais
- Específicas de cada rota
- Gerenciam estado da página
- Implementam lógica de negócio de nível mais alto

---

## 🎯 Diretrizes de Uso

### 1. **Quando criar um Atom?**
- Quando você tem um componente UI básico e reutilizável
- Quando o componente não depende de outros componentes customizados
- Quando pode ser usado em múltiplos contextos

### 2. **Quando criar uma Molecule?**
- Quando você combina 2+ átomos para uma funcionalidade específica
- Quando o componente é simples mas tem um propósito claro
- Quando é reutilizável em diferentes partes da aplicação

### 3. **Quando criar um Organism?**
- Quando você tem um componente complexo com lógica significativa
- Quando combina múltiplas molecules e atoms
- Quando representa uma seção específica da interface
- Quando contém lógica de negócio

### 4. **Quando criar um Template?**
- Quando você precisa definir a estrutura de uma página
- Quando o layout pode ser reutilizado com dados diferentes
- Quando organiza organisms em uma hierarquia de página

---

## 📦 Importações

Você pode importar componentes de duas formas:

### Importação individual:
```typescript
import { Button } from "@/components/atoms/button"
import { CaseCard } from "@/components/molecules/case-card"
import { Header } from "@/components/organisms/header"
```

### Importação agrupada (usando index.ts):
```typescript
import { Button, Input, Label } from "@/components/atoms"
import { CaseCard, AuthLayout } from "@/components/molecules"
import { Header, Footer } from "@/components/organisms"
```

---

## 🔄 Fluxo de Dependências

```
Pages → Templates → Organisms → Molecules → Atoms
```

**Regra importante:** Componentes de nível superior podem usar componentes de nível inferior, mas nunca o contrário.

✅ **Correto:**
- Organism pode usar Molecules e Atoms
- Molecule pode usar Atoms
- Page pode usar Templates, Organisms, Molecules e Atoms

❌ **Incorreto:**
- Atom não pode usar Molecules ou Organisms
- Molecule não pode usar Organisms

---

## 🎨 Benefícios desta Estrutura

1. **Reutilização**: Componentes menores são altamente reutilizáveis
2. **Manutenibilidade**: Fácil localizar e modificar componentes
3. **Escalabilidade**: Estrutura clara para crescimento do projeto
4. **Testabilidade**: Componentes menores são mais fáceis de testar
5. **Consistência**: Design system coerente em toda aplicação
6. **Documentação**: Hierarquia clara facilita onboarding
7. **Performance**: Componentes menores facilitam code splitting

---

## 📝 Exemplo Prático

### Construindo uma página de login:

```typescript
// atoms/button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>
}

// atoms/input.tsx
export function Input(props) {
  return <input {...props} />
}

// molecules/input-field.tsx
import { Label } from "@/components/atoms/label"
import { Input } from "@/components/atoms/input"

export function InputField({ label, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  )
}

// organisms/login-form.tsx
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"

export function LoginForm() {
  return (
    <form>
      <Input placeholder="Email" />
      <Input type="password" placeholder="Senha" />
      <Button>Entrar</Button>
    </form>
  )
}

// app/login/page.tsx
import { LoginForm } from "@/components/organisms/login-form"

export default function LoginPage() {
  return <LoginForm />
}
```

---

## 🚀 Próximos Passos

- Manter a consistência ao adicionar novos componentes
- Documentar componentes complexos
- Criar Storybook para visualizar componentes isoladamente (opcional)
- Implementar testes unitários por nível
- Revisar periodicamente a organização conforme o projeto cresce

---

## 📚 Referências

- [Atomic Design - Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

---

**Última atualização:** Novembro 2025

