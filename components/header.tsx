"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center">
          <Link href="/"className="flex items-center space-x-2 md:space-x-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoo-vaXk6PqMWSCCcxskjxyr8FasUxlYix.png"
                alt="Eurobombas Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary tracking-tight">EUROBOMBAS</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          <Link href="/"className="text-base lg:text-lg font-medium hover-border-effect">
            Home
          </Link>
          <Link href="/sobre"className="text-base lg:text-lg font-medium hover-border-effect">
            Sobre Nós
          </Link>
          <Link href="/produtos"className="text-base lg:text-lg font-medium hover-border-effect">
            Produtos
          </Link>
          <Link href="/contato"className="text-base lg:text-lg font-medium hover-border-effect">
            Contato
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost"size="icon"className="md:hidden"onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6"/>
          <span className="sr-only">Abrir menu</span>
        </Button>
      </div>

      {/* Mobile Navigation - Melhorado com transição suave */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 border-t-2 border-border/40": "max-h-0"
        }`}
      >
        <nav className="container py-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-lg font-medium p-3 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/sobre"
              className="text-lg font-medium p-3 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              href="/produtos"
              className="text-lg font-medium p-3 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link
              href="/contato"
              className="text-lg font-medium p-3 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

