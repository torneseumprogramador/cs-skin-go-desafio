export interface Case {
  id: string
  name: string
  price: number
  image: string
  rarity: string
  description: string
  isFree?: boolean
}

export interface Skin {
  name: string
  weapon: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  chance: number
  image: string
}

export interface CaseData {
  id: string
  name: string
  price: number
  image: string
  description: string
  skins: Skin[]
}

