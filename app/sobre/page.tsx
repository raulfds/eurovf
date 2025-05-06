import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function SobreNos() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Sobre a <span className="text-primary">Eurobombas</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Há mais de 20 anos fornecendo soluções em bombeamento de alta qualidade para os mais diversos setores.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://i.ibb.co/sdQ9L3mn/place-Euro.png"
                alt="Sede da Eurobombas"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 border-y-2 border-border/40">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center">Nossa História</h2>
            <div className="space-y-6">
              <p>
                Fundada em 2003, a Eurobombas nasceu com o objetivo de oferecer soluções de bombeamento de alta
                qualidade para o mercado brasileiro. Iniciamos nossas atividades como uma pequena empresa familiar,
                focada na importação e distribuição de bombas hidráulicas europeias.
              </p>
              <p>
                Com o passar dos anos, expandimos nossa atuação e começamos a desenvolver produtos próprios, adaptados
                às necessidades específicas do mercado nacional. Hoje, contamos com uma ampla linha de bombas e sistemas
                de bombeamento, atendendo desde pequenas residências até grandes indústrias.
              </p>
              <p>
                Nossa trajetória é marcada pelo compromisso com a qualidade, inovação e atendimento personalizado.
                Investimos constantemente em tecnologia e capacitação de nossa equipe para oferecer sempre as melhores
                soluções aos nossos clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <p className="text-muted-foreground">Anos de experiência</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <p className="text-muted-foreground">Clientes atendidos</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Modelos de bombas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Missão, Visão e Valores</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-sm border-2 border-border/40">
              <h3 className="text-xl font-semibold mb-4 text-primary">Missão</h3>
              <p className="text-muted-foreground">
                Fornecer soluções em bombeamento que atendam às necessidades de nossos clientes com qualidade,
                eficiência e sustentabilidade, contribuindo para o desenvolvimento dos diversos setores da economia.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border-2 border-border/40">
              <h3 className="text-xl font-semibold mb-4 text-primary">Visão</h3>
              <p className="text-muted-foreground">
                Ser referência nacional em soluções de bombeamento, reconhecida pela excelência de seus produtos,
                inovação tecnológica e compromisso com a satisfação dos clientes.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border-2 border-border/40">
              <h3 className="text-xl font-semibold mb-4 text-primary">Valores</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0"/>
                  <span>Qualidade e excelência em tudo o que fazemos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0"/>
                  <span>Compromisso com a satisfação do cliente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0"/>
                  <span>Inovação e melhoria contínua</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0"/>
                  <span>Responsabilidade socioambiental</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0"/>
                  <span>Ética e transparência nas relações</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe and Infraestrutura sections removed */}
    </div>
  )
}

