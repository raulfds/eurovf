"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Button onClick={() => router.push("/")}>Voltar para a página inicial</Button>
    </div>
  )
}

