import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import type { UserData } from "@/types/user.types"

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

export async function GET() {
  const user = await getUserFromCookie()

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  // Retornar ou criar dados do usuário
  if (!mockUserData[user.id]) {
    mockUserData[user.id] = {
      userId: user.id,
      balance: 0,
      inventory: [],
      transactions: [],
    }
  }

  return NextResponse.json({ data: mockUserData[user.id] })
}

// Função auxiliar para obter dados do usuário
export function getMockUserData(userId: string): UserData {
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

// Função auxiliar para salvar dados do usuário
export function saveMockUserData(data: UserData) {
  mockUserData[data.userId] = data
}

