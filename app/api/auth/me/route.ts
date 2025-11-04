import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const userSession = cookieStore.get("user_session")

  if (!userSession) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  try {
    const user = JSON.parse(userSession.value)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
  }
}

