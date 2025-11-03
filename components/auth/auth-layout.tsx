import type React from "react"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-primary/20 via-background to-accent/20 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden min-h-[600px] lg:min-h-[calc(100vh-180px)]">
        <div className="absolute inset-0 bg-[url('/abstract-tech-pattern.png')] opacity-5 bg-cover bg-center" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                SkinArena
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                Case Opening
              </span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 hidden lg:block">
          <h2 className="text-4xl font-bold text-balance">Abra caixas e ganhe skins raras</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Sistema de caixas de sorte com as melhores skins de CS:GO. Pague, abra e tenha a chance de ganhar itens
            raros e valiosos.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-accent">1000+</div>
              <div className="text-sm text-muted-foreground">Skins disponíveis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Caixas diferentes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 min-h-[600px] lg:min-h-[calc(100vh-180px)]">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
