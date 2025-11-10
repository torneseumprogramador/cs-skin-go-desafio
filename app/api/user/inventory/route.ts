import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getApiUrl } from "@/lib/api-config"

async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value
}

// POST - Adicionar item ao inventário
export async function POST(request: Request) {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const { skinName, skinImage, rarity, caseName, value } = body

    if (!skinName || !rarity || !caseName) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Fazer requisição para a API real
    const response = await fetch(getApiUrl("user/inventory"), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skinName, skinImage, rarity, caseName, value }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao adicionar item ao inventário" },
        { status: response.status }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: data.data || data,
      item: data.item 
    })
  } catch (error) {
    console.error("Erro ao adicionar item ao inventário:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

// DELETE - Remover item do inventário
export async function DELETE(request: Request) {
  try {
    const authToken = await getAuthToken()

    if (!authToken) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get("itemId")

    if (!itemId) {
      return NextResponse.json({ error: "ID do item não fornecido" }, { status: 400 })
    }

    // Fazer requisição para a API real
    const response = await fetch(getApiUrl(`user/inventory/${itemId}`), {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao remover item do inventário" },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true, data: data.data || data })
  } catch (error) {
    console.error("Erro ao remover item do inventário:", error)
    return NextResponse.json(
      { error: "Erro ao conectar com o servidor" },
      { status: 500 }
    )
  }
}

