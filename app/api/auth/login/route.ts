import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import type { StoredUser, User } from "@/types/auth.types"

// Mock de usuários
let mockUsers: StoredUser[] = []

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
  }

  // Buscar usuário
  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 })
  }

  // Criar resposta sem a senha
  const userResponse: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }

  // Definir cookie de sessão
  const cookieStore = await cookies()
  cookieStore.set("user_session", JSON.stringify(userResponse), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  return NextResponse.json({ success: true, user: userResponse })
}

// Função auxiliar para adicionar usuário (usada pela API de registro)
export function addMockUser(user: StoredUser) {
  mockUsers.push(user)
}

// Função auxiliar para buscar usuário por email (usada pela API de registro)
export function findMockUserByEmail(email: string): StoredUser | undefined {
  return mockUsers.find((u) => u.email === email)
}

// Função auxiliar para obter todos os usuários
export function getMockUsers(): StoredUser[] {
  return mockUsers
}

