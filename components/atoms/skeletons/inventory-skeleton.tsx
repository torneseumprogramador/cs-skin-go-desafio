import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Skeleton } from "@/components/atoms/skeleton"
import { Package } from "lucide-react"

export function InventorySkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-9 w-56 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <Package className="h-5 w-5 text-primary" />
              <Skeleton className="h-6 w-8" />
            </div>
          </div>

          {/* Grid de itens */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video" />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-24 mt-2" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-3 w-28" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

