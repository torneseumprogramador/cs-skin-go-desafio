import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    // Se não houver token, retorna null ao invés de 401 para evitar logs de erro
    if (!authToken) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Fazer requisição para a API real com o token
    const response = await fetch(getApiUrl("auth/me"), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken.value}`,
      },
    })

    if (!response.ok) {
      // Se o token expirou ou é inválido, limpar o cookie
      cookieStore.delete("auth_token")
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    const data = await response.json()
    return NextResponse.json({ user: data.user || data })
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

