"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { AuthLayout } from "@/components/molecules/auth-layout"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular envio de email de recuperação
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        {!submitted ? (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Recuperar Senha</h1>
              <p className="text-muted-foreground">
                Insira seu e-mail e enviaremos instruções para redefinir sua senha
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                {isLoading ? "Enviando..." : "Enviar instruções"}
              </Button>
            </form>

            <div className="text-center">
              <Link href="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para login
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">E-mail Enviado!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enviamos instruções de recuperação de senha para <strong>{email}</strong>. Verifique sua caixa de
                entrada e siga as instruções.
              </p>
            </div>
            <div className="space-y-3 pt-4">
              <Button asChild className="w-full" size="lg">
                <Link href="/login">Voltar para login</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Não recebeu o e-mail?{" "}
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setEmail("")
                  }}
                  className="text-primary hover:underline"
                >
                  Tentar novamente
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  )
}

