import { NextResponse } from "next/server"
import { getApiUrl } from "@/lib/api-config"

export async function GET() {
  try {
    // Fazer requisição para a API real
    const response = await fetch(getApiUrl("cases"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Desabilitar cache para sempre buscar dados atualizados
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Erro ao buscar caixas")
    }

    const data = await response.json()
    
    // A API retorna { cases: [...] }
    return NextResponse.json({ cases: data.cases || data })
  } catch (error) {
    console.error("Erro ao buscar cases:", error)
    return NextResponse.json(
      { error: "Erro ao buscar caixas" },
      { status: 500 }
    )
  }
}

