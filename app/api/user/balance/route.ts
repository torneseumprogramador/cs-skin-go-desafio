import { NextResponse } from "next/server"
import { cookies } from "next/headers"

interface InventoryItem {
  id: string
  skinName: string
  skinImage: string
  rarity: string
  caseName: string
  wonAt: string
  value: number
}

interface Transaction {
  id: string
  type: "deposit" | "case_open" | "withdrawal"
  amount: number
  description: string
  date: string
  caseName?: string
  skinWon?: string
}

interface UserData {
  userId: string
  balance: number
  inventory: InventoryItem[]
  transactions: Transaction[]
}

// Mock de dados dos usuários
const mockUserData: Record<string, UserData> = {}

async function getUserFromCookie() {
  const cookieStore = await cookies()
  const userSession = cookieStore.get("user_session")

  if (!userSession) {
    return null
  }

  try {
    return JSON.parse(userSession.value)
  } catch {
    return null
  }
}

function getMockUserData(userId: string): UserData {
  if (!mockUserData[userId]) {
    mockUserData[userId] = {
      userId,
      balance: 0,
      inventory: [],
      transactions: [],
    }
  }
  return mockUserData[userId]
}

function saveMockUserData(data: UserData) {
  mockUserData[data.userId] = data
}

// POST - Adicionar saldo
export async function POST(request: Request) {
  const user = await getUserFromCookie()

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const body = await request.json()
  const { amount, description } = body

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
  }

  const userData = getMockUserData(user.id)
  userData.balance += amount
  userData.transactions.unshift({
    id: crypto.randomUUID(),
    type: "deposit",
    amount,
    description: description || `Depósito de R$ ${amount.toFixed(2)}`,
    date: new Date().toISOString(),
  })

  saveMockUserData(userData)

  return NextResponse.json({ success: true, data: userData })
}

// PATCH - Deduzir saldo (para abertura de caixas)
export async function PATCH(request: Request) {
  const user = await getUserFromCookie()

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const body = await request.json()
  const { amount, caseName } = body

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
  }

  const userData = getMockUserData(user.id)

  if (userData.balance < amount) {
    return NextResponse.json({ error: "Saldo insuficiente" }, { status: 400 })
  }

  userData.balance -= amount
  userData.transactions.unshift({
    id: crypto.randomUUID(),
    type: "case_open",
    amount: -amount,
    description: `Abertura de caixa: ${caseName}`,
    date: new Date().toISOString(),
    caseName,
  })

  saveMockUserData(userData)

  return NextResponse.json({ success: true, data: userData })
}

