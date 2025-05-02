"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, Filter, X } from "lucide-react"
import produtosData from "@/data/produtos.json"

// Define the Product type based on our JSON structure
type Product = {
  id: string
  codigo_interno: string
  modelo: string
  categoria: string
  descricao: string
  ncm?: string
  codigo_ean?: string
  unidade?: string
  peso_bruto?: string
  largura?: string
  comprimento?: string
  altura?: string
  cubagem?: string
  cor?: string
  garantia?: string
  voltagem?: string
  ciclo?: string
  corrente_maxima?: string
  rede_eletrica?: string
  potencia_saida?: string
  tipo_protecao?: string
  mca?: string
  vazao_maxima?: string
  pressao_maxima?: string
  profundidade_maxima?: string
  temperatura_maxima?: string
  diametro_entrada?: string
  diametro_saida?: string
  acompanha_control_box?: string
  eixo?: string
  rotor?: string
  imagem_url: string
  imagem_url_2?: string
  imagem_url_3?: string
  imagem_url_4?: string
  imagem_url_5?: string
  imagem_url_6?: string
  imagem_url_7?: string
}

export default function Produtos() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(produtosData)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    categoria: searchParams.get("categoria") || "",
    voltagem: "",
    potencia: "",
  })
  // Estado para imagem principal de cada produto
  const [mainImages, setMainImages] = useState<{ [id: string]: string }>({})

  // Atualiza o estado das imagens principais quando os produtos filtrados mudam
  useEffect(() => {
    const initialImages: { [id: string]: string } = {}
    produtosData.forEach((product) => {
      initialImages[product.id] = product.imagem_url?.trim() || ""
    })
    setMainImages(initialImages)
  }, [])

  useEffect(() => {
    const results = produtosData.filter((product) => {
      const matchesSearch = Object.values(product).some(
        (value) => typeof value === "string"&& value.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      const matchesCategory = filters.categoria ? product.categoria === filters.categoria : true
      const matchesVoltagem = filters.voltagem ? product.voltagem?.includes(filters.voltagem) : true
      const matchesPotencia = filters.potencia ? product.potencia_saida?.includes(filters.potencia) : true
      return matchesSearch && matchesCategory && matchesVoltagem && matchesPotencia
    })
    setFilteredProducts(results)
    // Atualiza o estado das imagens principais para os produtos filtrados
    setMainImages((prev) => {
      const updated: { [id: string]: string } = { ...prev }
      results.forEach((product) => {
        if (!updated[product.id]) {
          updated[product.id] = product.imagem_url?.trim() || ""
        }
      })
      return updated
    })
  }, [searchTerm, filters])

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setFilters({
      categoria: "",
      voltagem: "",
      potencia: "",
    })
  }

  // Get unique values for filter dropdowns
  const categorias = [...new Set(produtosData.map((p) => p.categoria))].sort()
  const voltagens = [...new Set(produtosData.map((p) => p.voltagem).filter(Boolean))]
  const potencias = [...new Set(produtosData.map((p) => p.potencia_saida).filter(Boolean))]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Nossos Produtos</h1>
            <p className="text-lg text-muted-foreground">
              Encontre a solução ideal para sua necessidade de bombeamento
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 md:py-8 border-b-2 border-border/40">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:flex-none flex items-center gap-2 border-2 border-border/40"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4"/>
                Filtros
              </Button>

              {(searchTerm || filters.categoria || filters.voltagem || filters.potencia) && (
                <Button variant="ghost"className="flex-1 md:flex-none flex items-center gap-2"onClick={resetFilters}>
                  <X className="h-4 w-4"/>
                  Limpar
                </Button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 p-4 bg-muted rounded-lg border-2 border-border/40">
              <div>
                <Label htmlFor="categoria"className="mb-2 block">
                  Categoria
                </Label>
                <select
                  id="categoria"
                  className="w-full rounded-md border-2 border-border/40 bg-background px-3 py-2"
                  value={filters.categoria}
                  onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="voltagem"className="mb-2 block">
                  Voltagem
                </Label>
                <select
                  id="voltagem"
                  className="w-full rounded-md border-2 border-border/40 bg-background px-3 py-2"
                  value={filters.voltagem}
                  onChange={(e) => setFilters({ ...filters, voltagem: e.target.value })}
                >
                  <option value="">Todas as voltagens</option>
                  {voltagens.map((volt) => (
                    <option key={volt} value={volt}>
                      {volt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="potencia"className="mb-2 block">
                  Potência
                </Label>
                <select
                  id="potencia"
                  className="w-full rounded-md border-2 border-border/40 bg-background px-3 py-2"
                  value={filters.potencia}
                  onChange={(e) => setFilters({ ...filters, potencia: e.target.value })}
                >
                  <option value="">Todas as potências</option>
                  {potencias.map((pot) => (
                    <option key={pot} value={pot}>
                      {pot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="container">
          {filteredProducts.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-4 md:mb-6">Exibindo {filteredProducts.length} produtos</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => {
                  // Coletar todas as imagens disponíveis, removendo espaços
                  const thumbnails = [
                    product.imagem_url,
                    product.imagem_url_2,
                    product.imagem_url_3,
                    product.imagem_url_4,
                    product.imagem_url_5,
                    product.imagem_url_6,
                    product.imagem_url_7,
                  ].filter((url): url is string => Boolean(url)).map(url => url.trim());
                  return (
                    <div key={product.id} onClick={() => router.push(`/produtos/${product.id}`)}>
                      <Card className="product-card h-full border-2 border-transparent hover:border-primary cursor-pointer">
                        <CardContent className="p-3 md:p-4">
                          <div className="aspect-square relative mb-3 md:mb-4 bg-muted rounded-md overflow-hidden">
                            <Image
                              src={mainImages[product.id] || "/placeholder.svg"}
                              alt={product.modelo}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {/* Miniaturas */}
                          {thumbnails.length > 1 && (
                            <div className="flex gap-2 mb-3">
                              {thumbnails.map((thumb, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setMainImages((prev) => ({ ...prev, [product.id]: thumb }));
                                  }}
                                  className={`w-10 h-10 rounded border-2 ${mainImages[product.id] === thumb ? 'border-primary' : 'border-border/40'} overflow-hidden bg-white`}
                                >
                                  <Image
                                    src={thumb}
                                    alt={`Miniatura ${idx + 1}`}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-base md:text-lg mb-1 line-clamp-1">{product.modelo}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground mb-2">Cód: {product.codigo_interno}</p>
                            <p className="text-xs md:text-sm line-clamp-2 mb-3">{product.descricao}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {product.potencia_saida && (
                                <div className="bg-muted p-2 rounded-md border border-border/40">
                                  <span className="block font-medium">Potência</span>
                                  <span>{product.potencia_saida}</span>
                                </div>
                              )}
                              {product.mca && (
                                <div className="bg-muted p-2 rounded-md border border-border/40">
                                  <span className="block font-medium">MCA</span>
                                  <span>{product.mca}</span>
                                </div>
                              )}
                              {product.vazao_maxima && (
                                <div className="bg-muted p-2 rounded-md border border-border/40">
                                  <span className="block font-medium">Vazão Máx</span>
                                  <span>{product.vazao_maxima}</span>
                                </div>
                              )}
                              {product.voltagem && (
                                <div className="bg-muted p-2 rounded-md border border-border/40">
                                  <span className="block font-medium">Voltagem</span>
                                  <span>{product.voltagem}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground mb-6">Tente ajustar seus filtros ou termos de busca</p>
              <Button onClick={resetFilters}>Limpar Filtros</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

