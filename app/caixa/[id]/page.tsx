import { notFound } from "next/navigation"
import { CaseDetails } from "@/components/organisms/case-details"
import { casesService } from "@/services/cases"

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  try {
    const caseData = await casesService.getCaseById(id)

    return (
      <div className="container mx-auto px-4 py-8">
        <CaseDetails {...caseData} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}
