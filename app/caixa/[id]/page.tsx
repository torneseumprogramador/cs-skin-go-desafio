"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CaseDetails } from "@/components/organisms/case-details"
import { CaseDetailsSkeleton } from "@/components/atoms/skeletons"
import { casesService } from "@/services/cases"
import type { CaseData } from "@/types/cases.types"

export default function CasePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [caseData, setCaseData] = useState<CaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCase() {
      try {
        const data = await casesService.getCaseById(id)
        setCaseData(data)
      } catch (err) {
        setError("Erro ao carregar detalhes da caixa")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadCase()
    }
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CaseDetailsSkeleton />
      </div>
    )
  }

  if (error || !caseData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 text-xl mb-4">{error || "Caixa não encontrada"}</p>
          <button
            onClick={() => router.push("/")}
            className="text-primary hover:underline"
          >
            Voltar para home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CaseDetails {...caseData} />
    </div>
  )
}
