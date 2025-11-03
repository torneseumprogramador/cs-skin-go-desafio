import { CaseGrid } from "@/components/cases/case-grid"

export default function HomePage() {
  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                CS:GO SKINS
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Abra caixas de sorte e ganhe skins raras de CS:GO
            </p>
          </div>

          <CaseGrid />
        </div>
      </main>
    </div>
  )
}
