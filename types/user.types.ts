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

