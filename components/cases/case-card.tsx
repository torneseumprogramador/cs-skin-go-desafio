import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CaseCardProps {
  id: string
  name: string
  price: number
  image: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  isFree?: boolean
}

const rarityColors = {
  common: "bg-slate-500/20 text-slate-300 border-slate-500/50",
  uncommon: "bg-green-500/20 text-green-300 border-green-500/50",
  rare: "bg-blue-500/20 text-blue-300 border-blue-500/50",
  epic: "bg-purple-500/20 text-purple-300 border-purple-500/50",
  legendary: "bg-amber-500/20 text-amber-300 border-amber-500/50",
}

export function CaseCard({ id, name, price, image, rarity, isFree }: CaseCardProps) {
  return (
    <Link href={`/caixa/${id}`}>
      <Card className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
        <CardContent className="p-6">
          <div className="relative aspect-square mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg" />
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{name}</h3>
              <Badge variant="outline" className={cn("text-xs", rarityColors[rarity])}>
                {rarity}
              </Badge>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-card/50 border-t border-border p-4">
          <div className="w-full flex items-center justify-between">
            {isFree ? (
              <span className="text-lg font-bold text-accent">Grátis</span>
            ) : (
              <span className="text-lg font-bold text-primary">R$ {price.toFixed(2)}</span>
            )}
            <span className="text-sm text-muted-foreground">Clique para abrir</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
