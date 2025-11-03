"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar, Wallet, Package, History } from "lucide-react"
import Link from "next/link"

export default function PerfilPage() {
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

  const memberSince = new Date(user.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
            <p className="text-muted-foreground">Gerencie suas informações pessoais e estatísticas</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Nome</label>
                  <p className="text-lg font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Membro desde
                  </label>
                  <p className="text-lg">{memberSince}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">Saldo Atual</span>
                  </div>
                  <span className="text-xl font-bold text-primary">
                    R$ {userData.balance.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Itens no Inventário</span>
                  </div>
                  <span className="text-xl font-bold">{userData.inventory.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <span className="font-medium">Total de Transações</span>
                  </div>
                  <span className="text-xl font-bold">{userData.transactions.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Link href="/adicionar-saldo">
                  <Wallet className="h-6 w-6" />
                  <span>Adicionar Saldo</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Link href="/inventario">
                  <Package className="h-6 w-6" />
                  <span>Ver Inventário</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Link href="/historico">
                  <History className="h-6 w-6" />
                  <span>Ver Histórico</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
