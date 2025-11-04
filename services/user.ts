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

export const userService = {
  async getUserData(): Promise<UserData> {
    const response = await fetch("/api/user/data")
    
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário")
    }
    
    const data = await response.json()
    return data.data
  },

  async addBalance(amount: number, description: string): Promise<UserData> {
    const response = await fetch("/api/user/balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, description }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao adicionar saldo")
    }

    const data = await response.json()
    return data.data
  },

  async deductBalance(amount: number, caseName: string): Promise<UserData> {
    const response = await fetch("/api/user/balance", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, caseName }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao deduzir saldo")
    }

    const data = await response.json()
    return data.data
  },

  async addToInventory(item: {
    skinName: string
    skinImage: string
    rarity: string
    caseName: string
    value: number
  }): Promise<{ data: UserData; item: InventoryItem }> {
    const response = await fetch("/api/user/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao adicionar item ao inventário")
    }

    const data = await response.json()
    return { data: data.data, item: data.item }
  },

  async removeFromInventory(itemId: string): Promise<UserData> {
    const response = await fetch(`/api/user/inventory?itemId=${itemId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao remover item do inventário")
    }

    const data = await response.json()
    return data.data
  },
}

