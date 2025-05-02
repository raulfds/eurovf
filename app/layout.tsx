import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://eurobombas.com.br"),
  title: "Eurobombas - Inovação e Tecnologia em Bombas de Água",
  description:
    "Líder em soluções de bombeamento com mais de 20 anos de experiência. Bombas d'água, pressurizadores e sistemas de bombeamento para aplicações residenciais, comerciais e industriais.",
  keywords: [
    "bombas de água",
    "pressurizadores",
    "bombas submersas",
    "bombas centrífugas",
    "sistemas de bombeamento",
    "Eurobombas",
    "bombas hidráulicas",
    "equipamentos de bombeamento",
  ],
  authors: [{ name: "Eurobombas"}],
  creator: "Eurobombas",
  publisher: "Eurobombas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoo-vaXk6PqMWSCCcxskjxyr8FasUxlYix.png",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoo-vaXk6PqMWSCCcxskjxyr8FasUxlYix.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://eurobombas.com.br",
    title: "Eurobombas - Inovação e Tecnologia em Bombas de Água",
    description:
      "Líder em soluções de bombeamento com mais de 20 anos de experiência. Especialistas em bombas d'água e sistemas de bombeamento.",
    siteName: "Eurobombas",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoo-vaXk6PqMWSCCcxskjxyr8FasUxlYix.png",
        width: 1200,
        height: 630,
        alt: "Eurobombas - Inovação e Tecnologia em Bombas de Água",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eurobombas - Inovação e Tecnologia em Bombas de Água",
    description: "Líder em soluções de bombeamento com mais de 20 anos de experiência.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoo-vaXk6PqMWSCCcxskjxyr8FasUxlYix.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://eurobombas.com.br",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoo-vaXk6PqMWSCCcxskjxyr8FasUxlYix.png"
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

