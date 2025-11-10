import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value
}

// POST - Adicionar saldo
export async function POST(request: Request) {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, description } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
    }

    // Fazer requisição para a API real
    const response = await fetch(getApiUrl("user/balance"), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, description }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao adicionar saldo" },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true, data: data.data || data })
  } catch (error) {
    console.error("Erro ao adicionar saldo:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

// PATCH - Deduzir saldo (para abertura de caixas)
// Nota: A API backend usa POST em cases/:id/open para abrir caixa
// Este endpoint é mantido para compatibilidade, mas pode não ser usado
export async function PATCH(request: Request) {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const { amount, caseName } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 })
    }

    // Este endpoint pode ser removido se a funcionalidade de abrir caixa
    // estiver completamente implementada através de cases/:id/open
    return NextResponse.json(
      { error: "Use o endpoint de abertura de caixa específico" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Erro ao deduzir saldo:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

