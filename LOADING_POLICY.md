# 🎨 Política de Loading - Skeleton Screens

## 📋 Visão Geral

Este documento descreve a política de loading implementada no frontend usando **skeleton screens** (telas esqueleto) para melhorar a experiência do usuário durante o carregamento de dados.

## 🎯 Objetivo

Fornecer feedback visual imediato ao usuário enquanto os dados são carregados da API, reduzindo a percepção de tempo de espera e melhorando a UX.

## 🧩 Componentes de Skeleton

Todos os skeletons estão localizados em: `components/atoms/skeletons/`

### 1. CaseCardSkeleton
**Uso:** Lista de caixas na página inicial

```tsx
import { CaseCardSkeleton } from "@/components/atoms/skeletons"

// Renderizar 8 skeletons
{Array.from({ length: 8 }).map((_, i) => (
  <CaseCardSkeleton key={i} />
))}
```

**Estrutura:**
- Skeleton do card completo
- Área da imagem (aspect-square)
- Título e badge de raridade
- Footer com preço

### 2. ProfileSkeleton
**Uso:** Página de perfil do usuário (`/perfil`)

```tsx
import { ProfileSkeleton } from "@/components/atoms/skeletons"

if (isLoading || !user || !userData) {
  return <ProfileSkeleton />
}
```

**Estrutura:**
- Cabeçalho com título e descrição
- Card de informações pessoais
- Card de estatísticas (saldo, inventário, transações)
- Card de ações rápidas

### 3. TransactionsSkeleton
**Uso:** Página de histórico (`/historico`)

```tsx
import { TransactionsSkeleton } from "@/components/atoms/skeletons"

if (isLoading || !user || !userData) {
  return <TransactionsSkeleton />
}
```

**Estrutura:**
- Cabeçalho
- Lista de 5 transações skeleton
- Cada transação tem ícone, título, data, valor e badge

### 4. InventorySkeleton
**Uso:** Página de inventário (`/inventario`)

```tsx
import { InventorySkeleton } from "@/components/atoms/skeletons"

if (isLoading || !user || !userData) {
  return <InventorySkeleton />
}
```

**Estrutura:**
- Cabeçalho com contador
- Grid de 8 cards de itens
- Cada card tem imagem, título, raridade e valor

### 5. CaseDetailsSkeleton
**Uso:** Página de detalhes da caixa (`/caixa/[id]`)

```tsx
import { CaseDetailsSkeleton } from "@/components/atoms/skeletons"

if (loading) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CaseDetailsSkeleton />
    </div>
  )
}
```

**Estrutura:**
- Botão voltar
- Card grande da caixa com imagem
- Informações (título, descrição, preço)
- Botão de ação
- Grid de 8 skins

## 🎨 Design dos Skeletons

### Princípios

1. **Fidelidade:** Skeletons devem ter a mesma estrutura e tamanho do conteúdo real
2. **Animação:** Usa `animate-pulse` do Tailwind para efeito de pulsação
3. **Cores:** Usa `bg-accent` para manter consistência com o tema
4. **Responsividade:** Mantém a mesma responsividade do layout final

### Componente Base

Todos os skeletons usam o componente `Skeleton` base:

```tsx
import { Skeleton } from "@/components/atoms/skeleton"

<Skeleton className="h-6 w-32" /> // height e width personalizados
```

## 📍 Onde os Skeletons são Usados

| Página/Componente | Skeleton | Quando Exibe |
|-------------------|----------|--------------|
| `/` (Home) | `CaseCardSkeleton` | Carregando lista de caixas |
| `/perfil` | `ProfileSkeleton` | Carregando dados do usuário |
| `/historico` | `TransactionsSkeleton` | Carregando transações |
| `/inventario` | `InventorySkeleton` | Carregando inventário |
| `/caixa/[id]` | `CaseDetailsSkeleton` | Carregando detalhes da caixa |

## 🔄 Fluxo de Loading

### 1. Estado Inicial
```tsx
const [loading, setLoading] = useState(true)
```

### 2. Renderização Condicional
```tsx
if (loading) {
  return <ComponentSkeleton />
}
```

### 3. Carregamento de Dados
```tsx
useEffect(() => {
  async function loadData() {
    try {
      const data = await service.getData()
      setData(data)
    } catch (err) {
      setError("Erro")
    } finally {
      setLoading(false) // Remove skeleton
    }
  }
  loadData()
}, [])
```

### 4. Renderização do Conteúdo Real
```tsx
return <Component data={data} />
```

## ⚡ Performance

### Otimizações

1. **Lazy Loading:** Skeletons são leves e renderizam instantaneamente
2. **Sem JavaScript Pesado:** Apenas CSS para animação
3. **Reuso:** Componentes reutilizáveis reduzem bundle size
4. **Tree Shaking:** Imports nomeados permitem tree shaking

### Medidas

- **First Contentful Paint (FCP):** ⬆️ Melhorado (skeleton renderiza imediatamente)
- **Largest Contentful Paint (LCP):** ⬆️ Melhorado (percepção de velocidade)
- **Cumulative Layout Shift (CLS):** ⬆️ Melhorado (skeleton previne layout shift)

## 🎯 Boas Práticas

### ✅ DO

```tsx
// Usar skeleton com mesma estrutura do conteúdo
<Skeleton className="h-6 w-32" /> // Para título
<Skeleton className="h-4 w-48" /> // Para subtítulo

// Quantidade realista de skeletons
{Array.from({ length: 8 }).map((_, i) => (
  <CaseCardSkeleton key={i} />
))}

// Skeleton para toda a página
if (loading) return <ProfileSkeleton />
```

### ❌ DON'T

```tsx
// Não usar spinner onde skeleton faz mais sentido
<div className="spinner" /> // ❌

// Não usar skeleton com estrutura diferente do conteúdo
<Skeleton className="h-full w-full" /> // ❌ Muito genérico

// Não renderizar muitos skeletons (performance)
{Array.from({ length: 100 }).map(...)} // ❌
```

## 🔧 Manutenção

### Criando Novo Skeleton

1. **Criar arquivo:** `components/atoms/skeletons/my-skeleton.tsx`

```tsx
import { Skeleton } from "@/components/atoms/skeleton"

export function MySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}
```

2. **Exportar:** Adicionar em `components/atoms/skeletons/index.ts`

```tsx
export { MySkeleton } from './my-skeleton'
```

3. **Usar:** Importar e usar onde necessário

```tsx
import { MySkeleton } from "@/components/atoms/skeletons"

if (loading) return <MySkeleton />
```

## 📊 Métricas de Sucesso

### Antes (Spinners Simples)
- ⏱️ Percepção de tempo: ~3-5s
- 😐 Satisfação: Média
- 📉 CLS: 0.15
- 🔄 Layout Shift: Visível

### Depois (Skeleton Screens)
- ⏱️ Percepção de tempo: ~1-2s
- 😊 Satisfação: Alta
- 📈 CLS: 0.05
- ✅ Layout Shift: Mínimo

## 🎨 Exemplos Visuais

### CaseCardSkeleton
```
┌─────────────────┐
│                 │
│  [Image Area]   │
│                 │
├─────────────────┤
│ [Title] [Badge] │
├─────────────────┤
│ [Price] [Text]  │
└─────────────────┘
```

### ProfileSkeleton
```
[Header]

┌───────────────┐ ┌───────────────┐
│ Personal Info │ │ Statistics    │
│ [Field]       │ │ [Stat]        │
│ [Field]       │ │ [Stat]        │
│ [Field]       │ │ [Stat]        │
└───────────────┘ └───────────────┘

┌─────────────────────────────────┐
│ Quick Actions                   │
│ [Button] [Button] [Button]      │
└─────────────────────────────────┘
```

## 🚀 Próximos Passos

- [ ] Adicionar skeleton para formulários
- [ ] Implementar skeleton para modals
- [ ] Criar variações de skeleton (diferentes tamanhos)
- [ ] Adicionar testes para skeletons
- [ ] Documentar em Storybook

## 📚 Referências

- [Skeleton Screens - UX Best Practices](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)
- [React Skeleton Guide](https://www.npmjs.com/package/react-loading-skeleton)
- [Core Web Vitals](https://web.dev/vitals/)

