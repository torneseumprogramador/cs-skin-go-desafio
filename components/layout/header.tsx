"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut, Wallet } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, userData, logout } = useAuth()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <svg
                  className="h-6 w-6 text-white"
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

          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/adicionar-saldo">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">
                      R$ {(userData?.balance || 0).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/perfil">Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/inventario">Inventário</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/historico">Histórico</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/cadastro">Criar Conta</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
