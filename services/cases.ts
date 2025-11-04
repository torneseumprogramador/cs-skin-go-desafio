import type { Case, CaseData } from "@/types/cases.types"

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

