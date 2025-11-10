import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    console.log("[AUTH ME] Token encontrado:", authToken ? "✓ Sim" : "✗ Não")

    // Se não houver token, retorna null ao invés de 401 para evitar logs de erro
    if (!authToken) {
      console.log("[AUTH ME] Sem token - retornando user null")
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const apiUrl = getApiUrl("auth/me")
    console.log("[AUTH ME] Fazendo requisição para:", apiUrl)

    // Fazer requisição para a API real com o token
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken.value}`,
      },
    })

    console.log("[AUTH ME] Status da resposta:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[AUTH ME] Erro na resposta:", response.status, errorText)
      
      // Se o token expirou ou é inválido, limpar o cookie
      cookieStore.delete("auth_token")
      console.log("[AUTH ME] Cookie removido - sessão inválida")
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    const data = await response.json()
    console.log("[AUTH ME] Usuário autenticado:", data.user?.email || data.email)
    return NextResponse.json({ user: data.user || data })
  } catch (error) {
    console.error("[AUTH ME] Erro ao buscar usuário:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

