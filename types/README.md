# 📁 Types - Interfaces e Tipos

Esta pasta contém todas as interfaces e tipos TypeScript utilizados na aplicação, separados por domínio.

## 📋 Estrutura

```
types/
├── index.ts           # Re-exporta todos os tipos
├── cases.types.ts     # Tipos relacionados a caixas e skins
├── auth.types.ts      # Tipos relacionados a autenticação
├── user.types.ts      # Tipos relacionados a dados do usuário
└── README.md          # Esta documentação
```

## 🎯 Convenções

### Nomenclatura
- Arquivos: `[dominio].types.ts`
- Interfaces: PascalCase (ex: `User`, `CaseData`)
- Um arquivo por domínio
- Cada arquivo contém apenas interfaces/types (sem lógica)

### Organização
- **cases.types.ts**: Caixas, skins e dados relacionados
- **auth.types.ts**: Usuário, login, registro
- **user.types.ts**: Inventário, transações, saldo

## 📖 Uso

### Importação Direta
```typescript
import type { User } from "@/types/auth.types"
import type { CaseData } from "@/types/cases.types"
import type { UserData } from "@/types/user.types"
```

### Importação via Index (Recomendado)
```typescript
import type { User, CaseData, UserData } from "@/types"
```

## 📚 Tipos Disponíveis

### Cases (`cases.types.ts`)
```typescript
Case          // Informações básicas da caixa
Skin          // Skin individual
CaseData      // Caixa completa com todas as skins
```

### Auth (`auth.types.ts`)
```typescript
User              // Usuário público (sem senha)
StoredUser        // Usuário com senha (apenas backend)
LoginResponse     // Resposta do login
RegisterResponse  // Resposta do registro
```

### User (`user.types.ts`)
```typescript
InventoryItem              // Item no inventário
Transaction                // Transação de saldo
UserData                   // Dados completos do usuário
AddInventoryItemRequest    // Request para adicionar item
AddInventoryItemResponse   // Response ao adicionar item
```

## ✅ Benefícios

1. **Separação de Responsabilidades**
   - Tipos separados da lógica de negócio
   - Fácil de encontrar e modificar

2. **Reutilização**
   - Tipos compartilhados entre services e BFF
   - Evita duplicação de código

3. **Type Safety**
   - TypeScript garante consistência
   - Erros detectados em tempo de desenvolvimento

4. **Manutenibilidade**
   - Um único lugar para definir tipos
   - Mudanças propagam automaticamente

## 🔧 Quando Criar Novos Tipos

- Criar novo arquivo `[dominio].types.ts` quando:
  - Adicionar novo domínio (ex: `payment.types.ts`)
  - Agrupar tipos relacionados
  
- Adicionar ao arquivo existente quando:
  - Expandir domínio existente
  - Tipos intimamente relacionados

## 📝 Exemplo de Novo Arquivo

```typescript
// types/payment.types.ts
export interface PaymentMethod {
  id: string
  type: "credit_card" | "pix" | "boleto"
  name: string
}

export interface PaymentTransaction {
  id: string
  amount: number
  method: PaymentMethod
  status: "pending" | "approved" | "rejected"
  createdAt: string
}
```

Depois adicionar ao `index.ts`:
```typescript
export type { PaymentMethod, PaymentTransaction } from "./payment.types"
```

