"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import Image from "next/image"

export default function InventarioPage() {
  const { user, userData, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || !userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      Comum: "bg-gray-500",
      Incomum: "bg-green-500",
      Raro: "bg-blue-500",
      Épico: "bg-purple-500",
      Lendário: "bg-orange-500",
      Exótico: "bg-red-500",
    }
    return colors[rarity] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Meu Inventário</h1>
              <p className="text-muted-foreground">
                {userData.inventory.length} {userData.inventory.length === 1 ? "item" : "itens"} no total
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">{userData.inventory.length}</span>
            </div>
          </div>

          {userData.inventory.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Inventário Vazio</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Você ainda não possui nenhum item. Abra caixas para ganhar skins incríveis!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {userData.inventory.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-gradient-to-br from-muted to-background p-4">
                    <Image
                      src={item.skinImage || "/placeholder.svg"}
                      alt={item.skinName}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base line-clamp-2">{item.skinName}</CardTitle>
                      <Badge className={`${getRarityColor(item.rarity)} text-white shrink-0`}>{item.rarity}</Badge>
                    </div>
                    <CardDescription className="text-xs">{item.caseName}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Valor</span>
                      <span className="font-bold text-primary">R$ {item.value.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Ganho em {new Date(item.wonAt).toLocaleDateString("pt-BR")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
