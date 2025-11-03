"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, HelpCircle, Send } from "lucide-react"

export default function SuportePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envio
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Central de Suporte
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Estamos aqui para ajudar. Entre em contato conosco ou consulte nossas perguntas frequentes.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange-500" />
              Perguntas Frequentes
            </h2>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Como funciona a abertura de caixas?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cada caixa contém uma variedade de skins com diferentes raridades. Ao abrir uma caixa, você receberá
                  aleatoriamente um dos itens disponíveis baseado nas probabilidades exibidas.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Como adiciono saldo à minha conta?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Acesse a página "Adicionar Saldo" no menu do seu perfil. Você pode depositar usando cartão de crédito
                  ou PIX. O saldo é creditado instantaneamente.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Posso retirar meus itens?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Os itens obtidos ficam disponíveis no seu inventário. Em breve, implementaremos funcionalidades para
                  troca e retirada de itens.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">As probabilidades são justas?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sim! Todas as probabilidades são exibidas claramente em cada caixa e nosso sistema utiliza geração de
                  números aleatórios certificada para garantir justiça.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Como posso ver meu histórico?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Acesse a página "Histórico" no menu do seu perfil para ver todas as suas transações, incluindo caixas
                  abertas, depósitos e itens ganhos.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-orange-500" />
              Entre em Contato
            </h2>

            <div className="bg-card border border-border rounded-lg p-6">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground">Obrigado pelo contato. Responderemos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Assunto</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      placeholder="Sobre o que você precisa de ajuda?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      placeholder="Descreva sua dúvida ou problema..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              )}
            </div>

            <div className="mt-6 bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                Outros Canais
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>E-mail:</strong> suporte@skinarena.com
                </p>
                <p>
                  <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
                </p>
                <p>
                  <strong>Tempo de resposta:</strong> Até 24 horas úteis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
