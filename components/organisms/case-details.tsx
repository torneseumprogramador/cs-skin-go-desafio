"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/button"
import { Card, CardContent } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
import { ArrowLeft, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Skin {
  name: string
  weapon: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  chance: number
  image: string
}

interface CaseDetailsProps {
  id: string
  name: string
  price: number
  image: string
  description: string
  skins: Skin[]
}

const rarityColors = {
  common: "bg-slate-500/20 text-slate-300 border-slate-500/50",
  uncommon: "bg-green-500/20 text-green-300 border-green-500/50",
  rare: "bg-blue-500/20 text-blue-300 border-blue-500/50",
  epic: "bg-purple-500/20 text-purple-300 border-purple-500/50",
  legendary: "bg-amber-500/20 text-amber-300 border-amber-500/50",
}

const rarityGradients = {
  common: "from-slate-500/10 to-slate-500/5",
  uncommon: "from-green-500/10 to-green-500/5",
  rare: "from-blue-500/10 to-blue-500/5",
  epic: "from-purple-500/10 to-purple-500/5",
  legendary: "from-amber-500/10 to-amber-500/5",
}

export function CaseDetails({ id, name, price, image, description, skins }: CaseDetailsProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleOpenCase = () => {
    router.push(`/login?redirect=/caixa/${id}`)
  }

  return (
    <div className="space-y-8">
      {/* Botão voltar */}
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Voltar às caixas
      </Button>

      {/* Cabeçalho da caixa */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
          <div className="relative bg-card border border-border rounded-2xl p-8">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain p-4" />
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{name}</h1>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>

          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <div className="text-3xl font-bold text-primary">{price === 0 ? "Grátis" : `R$ ${price.toFixed(2)}`}</div>
          </div>

          <Button
            size="lg"
            className="w-full lg:w-auto text-lg px-8 py-6"
            onClick={handleOpenCase}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <>
                <Lock className="h-5 w-5 mr-2" />
                Fazer login para abrir
              </>
            ) : (
              `Abrir por ${price === 0 ? "Grátis" : `R$ ${price.toFixed(2)}`}`
            )}
          </Button>
        </div>
      </div>

      {/* Conteúdo da caixa */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Conteúdo da caixa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skins.map((skin, index) => (
            <Card
              key={index}
              className={cn("overflow-hidden border-2 transition-all hover:scale-105", rarityColors[skin.rarity])}
            >
              <CardContent className="p-4">
                <div
                  className={cn(
                    "relative aspect-video mb-3 rounded-lg bg-gradient-to-br",
                    rarityGradients[skin.rarity],
                  )}
                >
                  <Image src={skin.image || "/placeholder.svg"} alt={skin.name} fill className="object-contain p-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{skin.name}</p>
                      <p className="text-xs text-muted-foreground">{skin.weapon}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {skin.rarity}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Chance:</span>
                    <span className="font-semibold">{(skin.chance * 100).toFixed(3)}%</span>
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
