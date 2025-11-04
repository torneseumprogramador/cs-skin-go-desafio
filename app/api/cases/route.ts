import { NextResponse } from "next/server"
import type { Case } from "@/types/cases.types"

// Mock de dados das caixas
const cases: Case[] = [
  {
    id: "toolbox",
    name: "Toolbox Case",
    price: 12.0,
    image: "/yellow-toolbox-case-csgo.jpg",
    rarity: "legendary",
    description: "Caixa contendo skins raras de armas",
  },
  {
    id: "daily",
    name: "Daily Case",
    price: 0,
    image: "/blue-daily-case-csgo.jpg",
    rarity: "common",
    isFree: true,
    description: "Caixa gratuita diária",
  },
  {
    id: "low",
    name: "Low Case",
    price: 1.8,
    image: "/yellow-low-case-csgo.jpg",
    rarity: "common",
    description: "Caixa básica com skins comuns",
  },
  {
    id: "indirect",
    name: "Indirect Case",
    price: 3.0,
    image: "/green-indirect-case-csgo.jpg",
    rarity: "uncommon",
    description: "Caixa com skins de qualidade média",
  },
  {
    id: "medium",
    name: "Medium Case",
    price: 4.5,
    image: "/blue-medium-case-csgo.jpg",
    rarity: "rare",
    description: "Caixa com skins raras",
  },
  {
    id: "ultra",
    name: "Ultra Case",
    price: 6.0,
    image: "/red-ultra-case-csgo.jpg",
    rarity: "epic",
    description: "Caixa premium com skins épicas",
  },
  {
    id: "ammo",
    name: "Ammo Case",
    price: 6.3,
    image: "/green-ammo-case-csgo.jpg",
    rarity: "rare",
    description: "Caixa militar com skins táticas",
  },
  {
    id: "rust",
    name: "Rust Case",
    price: 6.6,
    image: "/rust-case-csgo.jpg",
    rarity: "rare",
    description: "Caixa enferrujada com skins vintage",
  },
  {
    id: "c4",
    name: "C4 Case",
    price: 7.2,
    image: "/c4-case-csgo.jpg",
    rarity: "epic",
    description: "Caixa explosiva com skins poderosas",
  },
  {
    id: "chocolate",
    name: "Chocolate Case",
    price: 8.4,
    image: "/chocolate-case-csgo.jpg",
    rarity: "epic",
    description: "Caixa doce com skins premium",
  },
  {
    id: "ember",
    name: "Ember Case",
    price: 9.0,
    image: "/ember-case-csgo-orange.jpg",
    rarity: "legendary",
    description: "Caixa flamejante com skins lendárias",
  },
  {
    id: "neon",
    name: "Neon Case",
    price: 12.0,
    image: "/neon-case-csgo-purple.jpg",
    rarity: "legendary",
    description: "Caixa neon com as melhores skins",
  },
]

export async function GET() {
  return NextResponse.json({ cases })
}

