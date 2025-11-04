import { NextResponse } from "next/server"
import type { StoredUser } from "@/types/auth.types"

// Mock de usuários (compartilhado entre rotas)
let mockUsers: StoredUser[] = []

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
  }

  // Verificar se o email já está cadastrado
  const existingUser = mockUsers.find((u) => u.email === email)
  if (existingUser) {
    return NextResponse.json({ error: "Este e-mail já está cadastrado" }, { status: 409 })
  }

  // Criar novo usuário
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password, // Em produção, deveria ser hasheado
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)

  return NextResponse.json({ success: true })
}

// Função auxiliar para obter todos os usuários
export function getMockUsers(): StoredUser[] {
  return mockUsers
}

// Função auxiliar para definir usuários (para sincronização)
export function setMockUsers(users: StoredUser[]) {
  mockUsers = users
}

