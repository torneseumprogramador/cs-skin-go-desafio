# 🔧 Refatoração: Separação de Interfaces

**Commit:** `99ac95a`  
**Data:** 04/11/2025  
**Objetivo:** Separar interfaces em arquivos próprios por domínio

---

## 📊 Resumo da Mudança

### Antes ❌
```
services/cases.ts
├── interface Case { ... }
├── interface Skin { ... }
├── interface CaseData { ... }
└── export const casesService { ... }

services/auth.ts
├── export interface User { ... }
└── export const authService { ... }

services/user.ts
├── export interface InventoryItem { ... }
├── export interface Transaction { ... }
├── export interface UserData { ... }
└── export const userService { ... }

app/api/cases/[id]/route.ts
├── interface Skin { ... }
├── interface CaseData { ... }
└── export async function GET() { ... }

(+ interfaces duplicadas em várias API routes)
```

### Depois ✅
```
types/
├── index.ts (re-exporta todos)
├── cases.types.ts
│   ├── export interface Case
│   ├── export interface Skin
│   └── export interface CaseData
├── auth.types.ts
│   ├── export interface User
│   ├── export interface StoredUser
│   ├── export interface LoginResponse
│   └── export interface RegisterResponse
├── user.types.ts
│   ├── export interface UserData
│   ├── export interface InventoryItem
│   ├── export interface Transaction
│   ├── export interface AddInventoryItemRequest
│   └── export interface AddInventoryItemResponse
└── README.md

services/cases.ts
├── import type { Case, CaseData } from "@/types/cases.types"
└── export const casesService { ... }

services/auth.ts
├── import type { User, LoginResponse, RegisterResponse } from "@/types/auth.types"
└── export const authService { ... }

services/user.ts
├── import type { UserData, ... } from "@/types/user.types"
└── export const userService { ... }

app/api/*/route.ts
├── import type { ... } from "@/types/..."
└── export async function GET/POST() { ... }
```

---

## 📁 Estrutura Criada

### Pasta `types/`

```
types/
├── index.ts                    # Re-exporta todos os tipos
├── README.md                   # Documentação completa
├── cases.types.ts              # 3 interfaces (Case, Skin, CaseData)
├── auth.types.ts               # 4 interfaces (User, StoredUser, LoginResponse, RegisterResponse)
└── user.types.ts               # 5 interfaces (UserData, InventoryItem, Transaction, ...)
```

---

## 📝 Mudanças por Arquivo

### 🆕 Arquivos Criados (5 arquivos)

#### 1. `types/cases.types.ts`
```typescript
export interface Case {
  id: string
  name: string
  price: number
  image: string
  rarity: string
  description: string
  isFree?: boolean
}

export interface Skin {
  name: string
  weapon: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  chance: number
  image: string
}

export interface CaseData {
  id: string
  name: string
  price: number
  image: string
  description: string
  skins: Skin[]
}
```

#### 2. `types/auth.types.ts`
```typescript
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface StoredUser extends User {
  password: string
}

export interface LoginResponse {
  success: boolean
  error?: string
  user?: User
}

export interface RegisterResponse {
  success: boolean
  error?: string
}
```

#### 3. `types/user.types.ts`
```typescript
export interface InventoryItem {
  id: string
  skinName: string
  skinImage: string
  rarity: string
  caseName: string
  wonAt: string
  value: number
}

export interface Transaction {
  id: string
  type: "deposit" | "case_open" | "withdrawal"
  amount: number
  description: string
  date: string
  caseName?: string
  skinWon?: string
}

export interface UserData {
  userId: string
  balance: number
  inventory: InventoryItem[]
  transactions: Transaction[]
}

export interface AddInventoryItemRequest {
  skinName: string
  skinImage: string
  rarity: string
  caseName: string
  value: number
}

export interface AddInventoryItemResponse {
  data: UserData
  item: InventoryItem
}
```

#### 4. `types/index.ts`
```typescript
// Cases
export type { Case, Skin, CaseData } from "./cases.types"

// Auth
export type { User, StoredUser, LoginResponse, RegisterResponse } from "./auth.types"

// User
export type {
  InventoryItem,
  Transaction,
  UserData,
  AddInventoryItemRequest,
  AddInventoryItemResponse,
} from "./user.types"
```

#### 5. `types/README.md`
- Documentação completa da pasta types
- Convenções de nomenclatura
- Exemplos de uso
- Guia para criar novos tipos

---

### 🔧 Arquivos Refatorados (12 arquivos)

#### Services (3 arquivos)

**1. `services/cases.ts`**
- ❌ Removido: 3 interfaces (Case, Skin, CaseData)
- ✅ Adicionado: `import type { Case, CaseData } from "@/types/cases.types"`
- Redução: ~25 linhas

**2. `services/auth.ts`**
- ❌ Removido: 1 interface (User)
- ✅ Adicionado: `import type { User, LoginResponse, RegisterResponse } from "@/types/auth.types"`
- ✅ Melhorado: Retorno tipado das funções
- Redução: ~5 linhas

**3. `services/user.ts`**
- ❌ Removido: 3 interfaces (InventoryItem, Transaction, UserData)
- ✅ Adicionado: `import type { UserData, InventoryItem, AddInventoryItemRequest, AddInventoryItemResponse } from "@/types/user.types"`
- ✅ Melhorado: Parâmetros e retornos tipados
- Redução: ~25 linhas

#### API Routes (8 arquivos)

**4. `app/api/cases/route.ts`**
- ❌ Removido: Mock sem tipagem
- ✅ Adicionado: `import type { Case } from "@/types/cases.types"`
- ✅ Melhorado: `const cases: Case[] = [...]`

**5. `app/api/cases/[id]/route.ts`**
- ❌ Removido: 2 interfaces duplicadas (Skin, CaseData)
- ✅ Adicionado: `import type { CaseData } from "@/types/cases.types"`
- Redução: ~15 linhas

**6. `app/api/auth/login/route.ts`**
- ❌ Removido: 1 interface duplicada (StoredUser)
- ✅ Adicionado: `import type { StoredUser, User } from "@/types/auth.types"`
- ✅ Melhorado: `const userResponse: User = {...}`
- Redução: ~6 linhas

**7. `app/api/auth/register/route.ts`**
- ❌ Removido: 1 interface duplicada (StoredUser)
- ✅ Adicionado: `import type { StoredUser } from "@/types/auth.types"`
- Redução: ~6 linhas

**8-11. `app/api/user/*.ts` (data, balance, inventory)**
- ❌ Removido: Interfaces duplicadas em cada arquivo
- ✅ Adicionado: Imports do `@/types/user.types`
- Redução total: ~75 linhas

#### Context (1 arquivo)

**12. `contexts/auth-context.tsx`**
- ❌ Removido: Imports de types dos services
- ✅ Adicionado: `import type { User } from "@/types/auth.types"`
- ✅ Adicionado: `import type { UserData } from "@/types/user.types"`
- Melhor separação de responsabilidades

---

## 📊 Estatísticas

### Arquivos
- **Criados:** 5 arquivos
- **Modificados:** 12 arquivos
- **Total:** 17 arquivos alterados

### Linhas de Código
- **Interfaces movidas:** ~150 linhas
- **Interfaces removidas (duplicadas):** ~120 linhas
- **Imports adicionados:** ~15 linhas
- **Documentação:** ~95 linhas (README)
- **Ganho líquido:** +70 linhas (incluindo docs)
- **Redução de duplicação:** -120 linhas

### Commits
```
99ac95a - refactor: separar interfaces em arquivos próprios
bd25003 - feat: implementar BFF completo com API Routes e Services
```

---

## ✅ Benefícios

### 1. **Organização**
- ✅ Um único lugar para definir tipos
- ✅ Fácil de encontrar e modificar
- ✅ Estrutura clara por domínio

### 2. **Manutenibilidade**
- ✅ Sem duplicação de código
- ✅ Mudanças propagam automaticamente
- ✅ Menos chance de inconsistências

### 3. **Reutilização**
- ✅ Tipos compartilhados entre camadas
- ✅ Import único via `@/types`
- ✅ Fácil de usar em novos arquivos

### 4. **Type Safety**
- ✅ TypeScript em toda a stack
- ✅ Validação em tempo de desenvolvimento
- ✅ Autocomplete melhorado

### 5. **Escalabilidade**
- ✅ Fácil adicionar novos domínios
- ✅ Estrutura clara para crescimento
- ✅ Padrão definido

---

## 🎯 Como Usar

### Importação Recomendada
```typescript
// Importar do index (recomendado)
import type { User, UserData, Case } from "@/types"

// Ou importar direto (mais específico)
import type { User } from "@/types/auth.types"
```

### Exemplo em Service
```typescript
// services/example.ts
import type { User, UserData } from "@/types"

export const exampleService = {
  async getUser(): Promise<User> {
    // implementação
  },
  
  async getUserData(): Promise<UserData> {
    // implementação
  }
}
```

### Exemplo em API Route
```typescript
// app/api/example/route.ts
import { NextResponse } from "next/server"
import type { User } from "@/types/auth.types"

export async function GET() {
  const user: User = {
    id: "1",
    name: "João",
    email: "joao@example.com",
    createdAt: new Date().toISOString()
  }
  
  return NextResponse.json({ user })
}
```

---

## 📚 Documentação Atualizada

- ✅ `BFF_DOCUMENTACAO_COMPLETA.md` - Atualizado com seção de types
- ✅ `types/README.md` - Documentação específica da pasta types
- ✅ `REFACTORING_TYPES.md` - Este documento

---

## 🔮 Próximos Passos (Opcional)

1. **Validação com Zod**
   ```typescript
   // types/cases.schema.ts
   import { z } from "zod"
   
   export const CaseSchema = z.object({
     id: z.string(),
     name: z.string(),
     price: z.number(),
     // ...
   })
   ```

2. **Geração de tipos a partir de schemas**
   ```typescript
   export type Case = z.infer<typeof CaseSchema>
   ```

3. **Testes de tipos**
   ```typescript
   // __tests__/types/cases.test.ts
   import type { Case } from "@/types/cases.types"
   
   test("Case type is correct", () => {
     const case: Case = {
       id: "test",
       name: "Test Case",
       // ...
     }
     expect(case).toBeDefined()
   })
   ```

---

## 🎉 Conclusão

A refatoração foi concluída com sucesso! Agora temos:

✅ **Interfaces separadas por domínio**  
✅ **Zero duplicação de código**  
✅ **Documentação completa**  
✅ **Fácil de manter e escalar**  
✅ **Type-safe em toda aplicação**  
✅ **Padrão claro definido**  

**Status:** 🟢 PRODUCTION READY

