import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const { id } = await params

    // Fazer requisição para a API real para abrir a caixa
    const response = await fetch(getApiUrl(`cases/${id}/open`), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao abrir caixa" },
        { status: response.status }
      )
    }

    // A API retorna { won: skin, balance: newBalance }
    return NextResponse.json({ 
      success: true, 
      won: data.won,
      balance: data.balance 
    })
  } catch (error) {
    console.error("Erro ao abrir caixa:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

