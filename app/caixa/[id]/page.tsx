import { notFound } from "next/navigation"
import { CaseDetails } from "@/components/organisms/case-details"
import { casesData } from "@/data/cases-data"

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const caseData = casesData[id]
  
  if (!caseData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CaseDetails {...caseData} />
    </div>
  )
}
