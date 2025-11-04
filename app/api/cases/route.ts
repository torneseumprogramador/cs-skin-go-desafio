import { NextResponse } from "next/server"
import { casesData } from "@/data/cases-data"
import type { Case } from "@/types/cases.types"

export async function GET() {
  // Converte o objeto de dados em array de Cases (sem as skins)
  const cases: Case[] = Object.values(casesData).map(({ id, name, price, image, description }) => ({
    id,
    name,
    price,
    image,
    description,
    rarity: getRarityByPrice(price),
    ...(price === 0 && { isFree: true }),
  }))

  return NextResponse.json({ cases })
}

// Helper para determinar raridade baseado no preço
function getRarityByPrice(price: number): "common" | "uncommon" | "rare" | "epic" | "legendary" {
  if (price === 0) return "common"
  if (price < 3) return "common"
  if (price < 5) return "uncommon"
  if (price < 7) return "rare"
  if (price < 9) return "epic"
  return "legendary"
}

