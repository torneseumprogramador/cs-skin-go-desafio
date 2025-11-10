import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value
}

export async function GET() {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Fazer requisição para a API real
    const response = await fetch(getApiUrl("user/data"), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
      }
      throw new Error("Erro ao buscar dados do usuário")
    }

    const data = await response.json()
    
    // A API retorna os dados do usuário diretamente ou em um objeto data
    return NextResponse.json({ data: data.data || data })
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error)
    return NextResponse.json(
      { error: "Erro ao buscar dados do usuário" },
      { status: 500 }
    )
  }
}

