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

const USER_DATA_KEY = "skinarena_user_data"

// Get user data from localStorage
export function getUserData(userId: string): UserData {
  if (typeof window === "undefined") {
    return { userId, balance: 0, inventory: [], transactions: [] }
  }

  const allData = localStorage.getItem(USER_DATA_KEY)
  const dataMap: Record<string, UserData> = allData ? JSON.parse(allData) : {}

  return (
    dataMap[userId] || {
      userId,
      balance: 0,
      inventory: [],
      transactions: [],
    }
  )
}

// Save user data to localStorage
export function saveUserData(data: UserData): void {
  const allData = localStorage.getItem(USER_DATA_KEY)
  const dataMap: Record<string, UserData> = allData ? JSON.parse(allData) : {}

  dataMap[data.userId] = data
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(dataMap))
}

// Add balance to user
export function addBalance(userId: string, amount: number, description: string): UserData {
  const data = getUserData(userId)

  data.balance += amount
  data.transactions.unshift({
    id: crypto.randomUUID(),
    type: "deposit",
    amount,
    description,
    date: new Date().toISOString(),
  })

  saveUserData(data)
  return data
}

// Deduct balance (for opening cases)
export function deductBalance(userId: string, amount: number, caseName: string): UserData | null {
  const data = getUserData(userId)

  if (data.balance < amount) {
    return null // Insufficient balance
  }

  data.balance -= amount
  data.transactions.unshift({
    id: crypto.randomUUID(),
    type: "case_open",
    amount: -amount,
    description: `Abertura de caixa: ${caseName}`,
    date: new Date().toISOString(),
    caseName,
  })

  saveUserData(data)
  return data
}

// Add item to inventory
export function addToInventory(userId: string, item: Omit<InventoryItem, "id" | "wonAt">): UserData {
  const data = getUserData(userId)

  const newItem: InventoryItem = {
    ...item,
    id: crypto.randomUUID(),
    wonAt: new Date().toISOString(),
  }

  data.inventory.unshift(newItem)
  saveUserData(data)
  return data
}

// Remove item from inventory (when selling)
export function removeFromInventory(userId: string, itemId: string): UserData {
  const data = getUserData(userId)
  data.inventory = data.inventory.filter((item) => item.id !== itemId)
  saveUserData(data)
  return data
}
