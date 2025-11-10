import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Fazer requisição para a API real
    const response = await fetch(getApiUrl("auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "E-mail ou senha incorretos" },
        { status: response.status }
      )
    }

    // A API retorna { user, accessToken }
    const { user, accessToken } = data

    console.log("[LOGIN] Token recebido:", accessToken ? "✓ Sim" : "✗ Não")
    console.log("[LOGIN] Usuário:", user?.email)

    if (!accessToken) {
      console.error("[LOGIN] Token não foi retornado pela API!")
      console.error("[LOGIN] Dados recebidos:", data)
      return NextResponse.json(
        { error: "Erro de autenticação - token não recebido" },
        { status: 500 }
      )
    }

    // Armazenar o token JWT em um cookie httpOnly
    const cookieStore = await cookies()
    cookieStore.set("auth_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    console.log("[LOGIN] Token salvo no cookie ✓")

    // Retornar os dados do usuário (sem o token por segurança)
    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

