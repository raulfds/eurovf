"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Droplet, Settings, Zap } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter()
  const [lancamentos, setLancamentos] = useState<string[]>([]);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    async function fetchLancamentos() {
      const { data, error } = await supabase
        .from("produtos")
        .select("imagem_url, created_at")
        .order("created_at", { ascending: false })
        .limit(3);
      if (!error && data) {
        setLancamentos(data.map(p => p.imagem_url).filter(Boolean));
      }
    }
    fetchLancamentos();
  }, []);

  // Autoplay
  useEffect(() => {
    if (!carouselRef.current) return;
    const interval = setInterval(() => {
      if (carouselRef.current && carouselRef.current.next) {
        carouselRef.current.next();
      }
    }, 3500); // 3.5 segundos
    return () => clearInterval(interval);
  }, [lancamentos]);

  const imagensSlider = [
    "https://i.ibb.co/3yy6LGmt/042dd305-8fc6-4e73-963a-b737bb196e9a-1.png",
    ...lancamentos
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Bombas hidráulicas"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/80"/>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Soluções em <span className="text-primary">Bombas Hidráulicas</span> para sua Necessidade
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-[600px] mx-auto md:mx-0">
                Oferecemos uma ampla linha de bombas e sistemas de bombeamento para aplicações residenciais, comerciais
                e industriais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button onClick={() => router.push("/produtos")} size="lg">
                  Ver Produtos
                </Button>
                <Button variant="outline"size="lg"onClick={() => router.push("/contato")}>
                  Fale Conosco
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <Carousel ref={carouselRef}>
                  <CarouselContent>
                    {imagensSlider.map((url, idx) => (
                      <CarouselItem key={idx}>
                        <div className="relative">
                          <img src={url} alt={`Lançamento ${idx + 1}`} className="rounded-lg shadow-xl max-h-[600px] w-full object-cover mx-auto" />
                          {idx !== 0 && (
                            <span className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Lançamento</span>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que escolher a Eurobombas?</h2>
            <p className="text-muted-foreground max-w-[800px] mx-auto">
              Somos especialistas em soluções de bombeamento, oferecendo produtos de alta qualidade e atendimento
              personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="product-card border-2 border-transparent hover:border-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Settings className="h-8 w-8 text-primary"/>
                  </div>
                  <h3 className="text-xl font-semibold">Qualidade Garantida</h3>
                  <p className="text-muted-foreground">
                    Produtos com garantia e certificação de qualidade, seguindo os mais rigorosos padrões
                    internacionais.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="product-card border-2 border-transparent hover:border-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Zap className="h-8 w-8 text-primary"/>
                  </div>
                  <h3 className="text-xl font-semibold">Eficiência Energética</h3>
                  <p className="text-muted-foreground">
                    Bombas projetadas para oferecer o máximo desempenho com o menor consumo de energia.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="product-card border-2 border-transparent hover:border-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Droplet className="h-8 w-8 text-primary"/>
                  </div>
                  <h3 className="text-xl font-semibold">Soluções Completas</h3>
                  <p className="text-muted-foreground">
                    Oferecemos desde bombas individuais até sistemas completos de bombeamento para qualquer aplicação.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Nossos Produtos</h2>
              <p className="text-muted-foreground">Conheça nossa linha completa de bombas e sistemas</p>
            </div>
            <Button onClick={() => router.push("/produtos")}>
              Ver Todos <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div onClick={() => router.push("/produtos?categoria=Bombas+Submersível")} className="cursor-pointer group">
              <div className="product-card rounded-lg overflow-hidden border">
                <div className="aspect-square relative">
                  <Image
                    src="https://d26pdq3f5wxbiy.cloudfront.net/Custom/Content/Products/10/87/1087630_bomba-submersivel-para-esgoto-eurobombas-wq-15-20-2-2b-3cv-ip68-trifasica-220v-60hz-p01f063m252026_z1_638525751833899701.jpg"
                    alt="Bombas Submersíveis"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Bombas Submersíveis</h3>
                </div>
              </div>
            </div>

            <div onClick={() => router.push("/produtos?categoria=Bomba+Centrifuga")} className="cursor-pointer group">
              <div className="product-card rounded-lg overflow-hidden border">
                <div className="aspect-square relative">
                  <Image
                    src="https://d26pdq3f5wxbiy.cloudfront.net/Custom/Content/Products/10/87/1087638_bomba-centrifuga-eurobombas-eb500m-1-2cv-ip44-monofasica-220v-60hz-p01f042m252001_z1_638525789180800428.jpg"
                    alt="Bombas Centrífugas"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Bombas Centrífugas</h3>
                </div>
              </div>
            </div>

            <div
              onClick={() => router.push("/produtos?categoria=Bomba+Autoaspirante")}
              className="cursor-pointer group"
            >
              <div className="product-card rounded-lg overflow-hidden border">
                <div className="aspect-square relative">
                  <Image
                    src="https://d26pdq3f5wxbiy.cloudfront.net/Custom/Content/Products/10/86/1086008_bomba-autoaspirante-eurobombas-jetinox-400-monofasica-220v-p01f040m252001_z9_638629657579578238.jpg"
                    alt="Bombas Autoaspirantes"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Bombas Autoaspirantes</h3>
                </div>
              </div>
            </div>

            <div onClick={() => router.push("/produtos?categoria=Pressurizador")} className="cursor-pointer group">
              <div className="product-card rounded-lg overflow-hidden border">
                <div className="aspect-square relative">
                  <Image
                    src="https://d26pdq3f5wxbiy.cloudfront.net/Custom/Content/Products/10/89/1089506_pressurizador-eurobombas-ultra-press-eb-29-1-2cv-ip65-monofasico-220v-p01f004m252023_z1_638675390221518752.jpg"
                    alt="Pressurizadores"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Pressurizadores</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="product-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Excelentes produtos e atendimento. A bomba que adquirimos superou nossas expectativas em termos de
                    desempenho e economia de energia."
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">João Silva</p>
                    <p className="text-sm text-muted-foreground">Indústria Têxtil</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Suporte técnico de primeira qualidade. Resolveram rapidamente um problema de instalação e o sistema
                    funciona perfeitamente desde então."
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">Maria Oliveira</p>
                    <p className="text-sm text-muted-foreground">Condomínio Residencial</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="product-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Produtos de alta qualidade e durabilidade. Utilizamos as bombas da Eurobombas há mais de 5 anos sem
                    nenhum problema."
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">Carlos Santos</p>
                    <p className="text-sm text-muted-foreground">Fazenda Agrícola</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">Pronto para encontrar a solução ideal?</h2>
              <p className="max-w-[600px]">
                Entre em contato conosco para uma consultoria especializada e descubra a melhor opção para sua
                necessidade.
              </p>
            </div>
            <Button size="lg"variant="secondary"onClick={() => router.push("/contato")}>
              Fale com um Especialista
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

