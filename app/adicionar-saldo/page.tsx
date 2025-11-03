"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, CreditCard, Smartphone, DollarSign } from "lucide-react"
import { addBalance } from "@/lib/user-data"
import { useToast } from "@/hooks/use-toast"

export default function AdicionarSaldoPage() {
  const { user, userData, isLoading, refreshUserData } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<"credit" | "pix" | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const quickAmounts = [10, 25, 50, 100, 200, 500]

  const handleAddBalance = async () => {
    if (!user || !amount || !selectedMethod) return

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido maior que zero.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const methodName = selectedMethod === "credit" ? "Cartão de Crédito" : "PIX"
      addBalance(user.id, numAmount, `Depósito via ${methodName}`)
      refreshUserData()

      toast({
        title: "Saldo adicionado!",
        description: `R$ ${numAmount.toFixed(2).replace(".", ",")} foram adicionados à sua conta.`,
      })

      setAmount("")
      setSelectedMethod(null)
      setIsProcessing(false)
      router.push("/perfil")
    }, 2000)
  }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Adicionar Saldo</h1>
            <p className="text-muted-foreground">Escolha o valor e o método de pagamento</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Saldo Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">R$ {userData.balance.toFixed(2).replace(".", ",")}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valores Rápidos</CardTitle>
              <CardDescription>Selecione um valor pré-definido ou insira um valor personalizado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((value) => (
                  <Button
                    key={value}
                    variant={amount === value.toString() ? "default" : "outline"}
                    onClick={() => setAmount(value.toString())}
                    className="h-auto py-4"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold">R$ {value}</span>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-amount">Valor Personalizado</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Digite o valor"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Método de Pagamento</CardTitle>
              <CardDescription>Escolha como deseja realizar o pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                onClick={() => setSelectedMethod("credit")}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === "credit" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Cartão de Crédito</p>
                    <p className="text-sm text-muted-foreground">Aprovação instantânea</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedMethod("pix")}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === "pix" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">PIX</p>
                    <p className="text-sm text-muted-foreground">Pagamento rápido e seguro</p>
                  </div>
                </div>
              </button>
            </CardContent>
          </Card>

          <Button
            onClick={handleAddBalance}
            disabled={!amount || !selectedMethod || isProcessing}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processando...
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5 mr-2" />
                Adicionar R$ {amount ? Number.parseFloat(amount).toFixed(2).replace(".", ",") : "0,00"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
