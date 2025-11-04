"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
import { History, TrendingUp, TrendingDown, Package } from "lucide-react"

export default function HistoricoPage() {
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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "case_open":
        return <Package className="h-5 w-5 text-orange-500" />
      case "withdrawal":
        return <TrendingDown className="h-5 w-5 text-red-500" />
      default:
        return <History className="h-5 w-5" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-green-500"
      case "case_open":
        return "text-orange-500"
      case "withdrawal":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Histórico de Transações</h1>
            <p className="text-muted-foreground">
              {userData.transactions.length} {userData.transactions.length === 1 ? "transação" : "transações"} no total
            </p>
          </div>

          {userData.transactions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <History className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma Transação</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Você ainda não realizou nenhuma transação. Adicione saldo ou abra caixas para começar!
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Todas as Transações</CardTitle>
                <CardDescription>Histórico completo de depósitos e aberturas de caixas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-muted">{getTransactionIcon(transaction.type)}</div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                          {transaction.amount > 0 ? "+" : ""}R${" "}
                          {Math.abs(transaction.amount).toFixed(2).replace(".", ",")}
                        </p>
                        {transaction.type === "deposit" && (
                          <Badge variant="outline" className="text-green-500 border-green-500">
                            Depósito
                          </Badge>
                        )}
                        {transaction.type === "case_open" && (
                          <Badge variant="outline" className="text-orange-500 border-orange-500">
                            Abertura
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
