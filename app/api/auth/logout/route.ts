import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth_token")

    // Fazer logout na API se houver token
    if (authToken) {
      await fetch(getApiUrl("auth/logout"), {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken.value}`,
        },
      })
    }

    // Limpar o cookie de autenticação
    cookieStore.delete("auth_token")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    // Mesmo com erro, limpar o cookie
    const cookieStore = await cookies()
    cookieStore.delete("auth_token")
    return NextResponse.json({ success: true })
  }
}

