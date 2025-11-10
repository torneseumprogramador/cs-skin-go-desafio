import { Card, CardContent } from "@/components/atoms/card"
import { Skeleton } from "@/components/atoms/skeleton"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/atoms/button"

export function CaseDetailsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Botão voltar */}
      <Button variant="ghost" disabled className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Voltar às caixas
      </Button>

      {/* Cabeçalho da caixa */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="relative w-full max-w-lg aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
          <div className="relative bg-card border border-border rounded-2xl p-4 h-full">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center lg:text-left w-full">
          <div>
            <Skeleton className="h-12 w-64 mb-2 mx-auto lg:mx-0" />
            <Skeleton className="h-6 w-96 mx-auto lg:mx-0" />
          </div>

          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <Skeleton className="h-10 w-32" />
          </div>

          <Skeleton className="h-14 w-full lg:w-64 rounded-lg" />
        </div>
      </div>

      {/* Conteúdo da caixa */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="overflow-hidden border-2">
              <CardContent className="p-4">
                <Skeleton className="aspect-video mb-3 rounded-lg" />
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

