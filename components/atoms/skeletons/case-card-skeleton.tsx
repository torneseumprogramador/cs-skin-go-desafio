import { Card, CardContent, CardFooter } from "@/components/atoms/card"
import { Skeleton } from "@/components/atoms/skeleton"

export function CaseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <Skeleton className="aspect-square mb-4 rounded-lg" />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-card/50 border-t border-border p-4">
        <div className="w-full flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardFooter>
    </Card>
  )
}

