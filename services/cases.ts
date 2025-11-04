interface Case {
  id: string
  name: string
  price: number
  image: string
  rarity: string
  description: string
  isFree?: boolean
}

interface Skin {
  name: string
  weapon: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  chance: number
  image: string
}

interface CaseData {
  id: string
  name: string
  price: number
  image: string
  description: string
  skins: Skin[]
}

export const casesService = {
  async getAllCases(): Promise<Case[]> {
    const response = await fetch("/api/cases")
    if (!response.ok) {
      throw new Error("Erro ao buscar caixas")
    }
    const data = await response.json()
    return data.cases
  },

  async getCaseById(id: string): Promise<CaseData> {
    const response = await fetch(`/api/cases/${id}`)
    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes da caixa")
    }
    const data = await response.json()
    return data.case
  },
}

