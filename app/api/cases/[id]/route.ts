import { NextResponse } from "next/server"
import { casesData } from "@/data/cases-data"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const caseData = casesData[id]

  if (!caseData) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  return NextResponse.json({ case: caseData })
}

