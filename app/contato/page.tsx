"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Contato() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground">
              Estamos à disposição para atender suas necessidades e responder suas dúvidas.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="border-2 border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-4 text-primary"/>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Endereço</h3>
                      <p className="text-muted-foreground">
                        Av. Industrial, 1000
                        <br />
                        São Paulo - SP
                        <br />
                        CEP: 00000-000
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-4 text-primary"/>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Telefones</h3>
                      <p className="text-muted-foreground">
                        (11) 0000-0000
                        <br />
                        (11) 90000-0000
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-4 text-primary"/>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">E-mail</h3>
                      <p className="text-muted-foreground">
                        contato@eurobombas.com.br
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="font-semibold text-lg mb-4">Horário de Atendimento</h3>
                <p className="text-muted-foreground mb-2">Segunda a Sexta: 8h às 18h</p>                
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-border/40">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Envie sua mensagem</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name"placeholder="Seu nome completo"/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email"type="email"placeholder="seu@email.com"/>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone"placeholder="(00) 00000-0000"/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input id="subject"placeholder="Assunto da mensagem"/>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea id="message"placeholder="Digite sua mensagem"rows={6} />
                    </div>

                    <Button type="submit"className="w-full md:w-auto">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

