"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ImageZoom } from "@/components/ui/image-zoom"
import { supabase } from "@/lib/supabaseClient"

export default function ProdutoDetalhe() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [produto, setProduto] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"especificacoes"| "detalhes">("especificacoes")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [produtosRelacionados, setProdutosRelacionados] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProduto() {
      if (id) {
        const { data, error } = await supabase
          .from("produtos")
          .select("*")
          .eq("id", id)
          .single();
        if (data) {
          setProduto(data);
          // Buscar produtos relacionados
          if (data.categoria) {
            const { data: relacionados } = await supabase
              .from("produtos")
              .select("*")
              .eq("categoria", data.categoria)
              .neq("id", id)
              .limit(4);
            setProdutosRelacionados(relacionados || []);
          }
        } else {
          router.push("/not-found");
        }
      }
    }
    fetchProduto();
  }, [id, router]);

  if (!produto) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg">Carregando produto...</p>
      </div>
    )
  }

  // Collect all available images
  const imagens = [
    produto.imagem_url,
    produto.imagem_url_2,
    produto.imagem_url_3,
    produto.imagem_url_4,
    produto.imagem_url_5,
    produto.imagem_url_6,
    produto.imagem_url_7,
  ].filter((url): url is string => Boolean(url)).map(url => url.trim())

  return (
    <div className="container py-8">
      <button
        onClick={() => router.push("/produtos")}
        className="flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1"/>
        Voltar para produtos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          {/* Main Image with Zoom */}
          <div className="border-2 border-border/40 rounded-lg overflow-hidden">
            <ImageZoom
              src={imagens[activeImageIndex] || "/placeholder.svg"}
              alt={produto.modelo}
              className="w-full aspect-square"
            />
          </div>

          {/* Miniaturas */}
          {imagens.length > 1 && (
            <div className="flex gap-2 mt-2">
              {imagens.map((imagem, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-16 h-16 rounded border-2 ${activeImageIndex === index ? 'border-primary' : 'border-border/40'} overflow-hidden bg-white`}
                  style={{ flex: '0 0 auto' }}
                >
                  <Image
                    src={imagem || "/placeholder.svg"}
                    alt={`${produto.modelo} - miniatura ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{produto.modelo}</h1>
            <p className="text-muted-foreground mb-4">Código: {produto.codigo_interno}</p>
            <p className="text-lg mb-6">{produto.descricao}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {produto.voltagem && produto.voltagem !== "N/A"&& (
                <div className="bg-muted p-3 rounded-md border border-border/40">
                  <span className="block font-medium">Voltagem</span>
                  <span className="text-lg">{produto.voltagem}V</span>
                </div>
              )}
              {produto.potencia_saida && produto.potencia_saida !== "N/A"&& (
                <div className="bg-muted p-3 rounded-md border border-border/40">
                  <span className="block font-medium">Potência</span>
                  <span className="text-lg">{produto.potencia_saida}</span>
                </div>
              )}
              {produto.mca && produto.mca !== "N/A"&& (
                <div className="bg-muted p-3 rounded-md border border-border/40">
                  <span className="block font-medium">MCA</span>
                  <span className="text-lg">{produto.mca}</span>
                </div>
              )}
              {produto.vazao_maxima && produto.vazao_maxima !== "N/A"&& (
                <div className="bg-muted p-3 rounded-md border border-border/40">
                  <span className="block font-medium">Vazão Máxima</span>
                  <span className="text-lg">{produto.vazao_maxima}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b-2 border-border/40 mb-6">
            <div className="flex">
              <button
                className={`py-3 px-4 font-medium border-b-2 ${
                  activeTab === "especificacoes"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }`}
                onClick={() => setActiveTab("especificacoes")}
              >
                Especificações Técnicas
              </button>
              <button
                className={`py-3 px-4 font-medium border-b-2 ${
                  activeTab === "detalhes"? "border-primary text-primary": "border-transparent text-muted-foreground"
                }`}
                onClick={() => setActiveTab("detalhes")}
              >
                Detalhes Adicionais
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "especificacoes"&& (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {produto.categoria && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-muted-foreground">{produto.categoria}</p>
                  </div>
                )}
                {produto.garantia && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Garantia</p>
                    <p className="text-muted-foreground">{produto.garantia} meses</p>
                  </div>
                )}
                {produto.ciclo && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Ciclo</p>
                    <p className="text-muted-foreground">{produto.ciclo}</p>
                  </div>
                )}
                {produto.corrente_maxima && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Corrente Máxima</p>
                    <p className="text-muted-foreground">{produto.corrente_maxima}</p>
                  </div>
                )}
                {produto.rede_eletrica && produto.rede_eletrica !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Rede Elétrica</p>
                    <p className="text-muted-foreground">{produto.rede_eletrica}</p>
                  </div>
                )}
                {produto.tipo_protecao && produto.tipo_protecao !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tipo de Proteção</p>
                    <p className="text-muted-foreground">{produto.tipo_protecao}</p>
                  </div>
                )}
                {produto.pressao_maxima && produto.pressao_maxima !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Pressão Máxima</p>
                    <p className="text-muted-foreground">{produto.pressao_maxima}</p>
                  </div>
                )}
                {produto.profundidade_maxima && produto.profundidade_maxima !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Profundidade Máxima</p>
                    <p className="text-muted-foreground">{produto.profundidade_maxima} mts</p>
                  </div>
                )}
                {produto.temperatura_maxima && produto.temperatura_maxima !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Temperatura Máxima</p>
                    <p className="text-muted-foreground">{produto.temperatura_maxima} ºC</p>
                  </div>
                )}
                {produto.diametro_entrada && produto.diametro_entrada !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Diâmetro Entrada</p>
                    <p className="text-muted-foreground">{produto.diametro_entrada}</p>
                  </div>
                )}
                {produto.diametro_saida && produto.diametro_saida !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Diâmetro Saída</p>
                    <p className="text-muted-foreground">{produto.diametro_saida}</p>
                  </div>
                )}
                {produto.acompanha_control_box && produto.acompanha_control_box !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Acompanha Control Box</p>
                    <p className="text-muted-foreground">{produto.acompanha_control_box}</p>
                  </div>
                )}
                {produto.eixo && produto.eixo !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Eixo</p>
                    <p className="text-muted-foreground">{produto.eixo}</p>
                  </div>
                )}
                {produto.rotor && produto.rotor !== "N/A"&& (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Rotor</p>
                    <p className="text-muted-foreground">{produto.rotor}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "detalhes"&& (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {produto.peso_bruto && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Peso Bruto</p>
                    <p className="text-muted-foreground">{produto.peso_bruto} kg</p>
                  </div>
                )}
                {produto.largura && produto.comprimento && produto.altura && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dimensões (L x C x A)</p>
                    <p className="text-muted-foreground">
                      {produto.largura} x {produto.comprimento} x {produto.altura} cm
                    </p>
                  </div>
                )}
                {produto.cubagem && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Cubagem</p>
                    <p className="text-muted-foreground">{produto.cubagem} m³</p>
                  </div>
                )}
                {produto.cor && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Cor</p>
                    <p className="text-muted-foreground">{produto.cor}</p>
                  </div>
                )}
                {produto.ncm && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">NCM</p>
                    <p className="text-muted-foreground">{produto.ncm}</p>
                  </div>
                )}
                {produto.codigo_ean && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Código EAN</p>
                    <p className="text-muted-foreground">{produto.codigo_ean}</p>
                  </div>
                )}
                {produto.unidade && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Unidade</p>
                    <p className="text-muted-foreground">{produto.unidade}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16 border-t-2 border-border/40 pt-8">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtosRelacionados.length > 0 ? (
            produtosRelacionados.map((product) => (
              <div key={product.id} onClick={() => router.push(`/produtos/${product.id}`)}>
                <Card className="product-card h-full border-2 border-transparent hover:border-primary cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-4 bg-muted rounded-md overflow-hidden">
                      <Image
                        src={product.imagem_url || "/placeholder.svg"}
                        alt={product.modelo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.modelo}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Cód: {product.codigo_interno}</p>
                      <p className="text-sm line-clamp-2">{product.descricao}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p>Nenhum produto relacionado encontrado.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

