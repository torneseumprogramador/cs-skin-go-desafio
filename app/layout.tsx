import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Header } from "@/components/organisms/header"
import { Footer } from "@/components/organisms/footer"
import { Toaster } from "@/components/atoms/toaster"

export const metadata: Metadata = {
  title: "SkinArena - Caixas de Sorte",
  description: "Abra caixas e ganhe skins raras de CS:GO na SkinArena",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
