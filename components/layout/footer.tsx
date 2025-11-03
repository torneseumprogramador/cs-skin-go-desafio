import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">© {currentYear} SkinArena. Todos os direitos reservados.</div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link href="/suporte" className="text-muted-foreground hover:text-foreground transition-colors">
              Suporte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
