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

    console.log("[USER DATA] Token encontrado:", authToken ? "✓ Sim" : "✗ Não")

    if (!authToken) {
      console.log("[USER DATA] Sem token no cookie")
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const apiUrl = getApiUrl("user/data")
    console.log("[USER DATA] Fazendo requisição para:", apiUrl)
    console.log("[USER DATA] Token (primeiros 20 chars):", authToken.substring(0, 20) + "...")

    // Fazer requisição para a API real
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log("[USER DATA] Status da resposta:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[USER DATA] Erro na resposta:", response.status, errorText)
      
      if (response.status === 401) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
      }
      throw new Error(`Erro ao buscar dados do usuário: ${response.status}`)
    }

    const data = await response.json()
    console.log("[USER DATA] Dados recebidos com sucesso ✓")
    
    // A API retorna os dados do usuário diretamente ou em um objeto data
    return NextResponse.json({ data: data.data || data })
  } catch (error) {
    console.error("[USER DATA] Erro ao buscar dados do usuário:", error)
    return NextResponse.json(
      { error: "Erro ao buscar dados do usuário" },
      { status: 500 }
    )
  }
}

