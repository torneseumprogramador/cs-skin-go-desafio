"use client"

import { useEffect, useState } from "react"
import { CaseCard } from "@/components/molecules/case-card"
import { CaseCardSkeleton } from "@/components/atoms/skeletons"
import { casesService } from "@/services/cases"
import type { Case } from "@/types/cases.types"

export function CaseGrid() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCases() {
      try {
        const data = await casesService.getAllCases()
        setCases(data)
      } catch (err) {
        setError("Erro ao carregar as caixas")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCases()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <CaseCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cases.map((caseItem) => (
        <CaseCard key={caseItem.id} {...caseItem} />
      ))}
    </div>
  )
}
