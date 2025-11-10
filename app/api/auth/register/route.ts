import { NextResponse } from "next/server"
import { getApiUrl } from "@/lib/api-config"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Fazer requisição para a API real
    const response = await fetch(getApiUrl("auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao fazer cadastro" },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao fazer cadastro:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

