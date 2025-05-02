import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-xl font-bold">EUROBOMBAS</h3>
            <p className="text-sm text-secondary-foreground/80">
              Soluções em bombas hidráulicas e sistemas de bombeamento para diversas aplicações.
            </p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <Link href="#"className="text-secondary-foreground/80 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5"/>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#"className="text-secondary-foreground/80 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5"/>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#"className="text-secondary-foreground/80 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5"/>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/"className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/produtos?categoria=Bombas+Submersível"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Bombas Submersíveis
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?categoria=Bomba+Centrifuga"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Bombas Centrífugas
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?categoria=Bomba+Autoaspirante"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Bombas Autoaspirantes
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?categoria=Pressurizador"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Pressurizadores
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start justify-center sm:justify-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 text-primary"/>
                <span className="text-sm text-secondary-foreground/80">
                  Av. Industrial, 1000, São Paulo - SP, 00000-000
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Phone className="h-5 w-5 mr-2 shrink-0 text-primary"/>
                <span className="text-sm text-secondary-foreground/80">(11) 0000-0000</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Mail className="h-5 w-5 mr-2 shrink-0 text-primary"/>
                <span className="text-sm text-secondary-foreground/80">contato@eurobombas.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-secondary-foreground/20 text-center text-sm text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} Eurobombas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

