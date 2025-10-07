import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ReduxProvider } from "@/lib/store/provider"
import { siteConfig } from "@/lib/config"
import { Suspense } from "react"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} - Travel Booking Made Easy`,
  description: `Book flights and rental cars with ${siteConfig.brand.name}. Powered by ${siteConfig.brand.poweredBy}.`,
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ReduxProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
