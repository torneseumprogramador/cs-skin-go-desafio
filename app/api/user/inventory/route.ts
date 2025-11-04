import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import type { UserData, InventoryItem } from "@/types/user.types"

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

// POST - Adicionar item ao inventário
export async function POST(request: Request) {
  const user = await getUserFromCookie()

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const body = await request.json()
  const { skinName, skinImage, rarity, caseName, value } = body

  if (!skinName || !rarity || !caseName) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
  }

  const userData = getMockUserData(user.id)

  const newItem: InventoryItem = {
    id: crypto.randomUUID(),
    skinName,
    skinImage: skinImage || "/placeholder.svg",
    rarity,
    caseName,
    wonAt: new Date().toISOString(),
    value: value || 0,
  }

  userData.inventory.unshift(newItem)
  saveMockUserData(userData)

  return NextResponse.json({ success: true, data: userData, item: newItem })
}

// DELETE - Remover item do inventário
export async function DELETE(request: Request) {
  const user = await getUserFromCookie()

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const itemId = searchParams.get("itemId")

  if (!itemId) {
    return NextResponse.json({ error: "ID do item não fornecido" }, { status: 400 })
  }

  const userData = getMockUserData(user.id)
  userData.inventory = userData.inventory.filter((item) => item.id !== itemId)
  saveMockUserData(userData)

  return NextResponse.json({ success: true, data: userData })
}

