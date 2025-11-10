import { NextResponse } from "next/server"
import { getApiUrl } from "@/lib/api-config"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Fazer requisição para a API real
    const response = await fetch(getApiUrl(`cases/${id}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Desabilitar cache para sempre buscar dados atualizados
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Case not found" }, { status: 404 })
      }
      throw new Error("Erro ao buscar detalhes do case")
    }

    const data = await response.json()
    
    // A API retorna { case: {...} }
    return NextResponse.json({ case: data.case || data })
  } catch (error) {
    console.error("Erro ao buscar case:", error)
    return NextResponse.json(
      { error: "Erro ao buscar detalhes da caixa" },
      { status: 500 }
    )
  }
}

