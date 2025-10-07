import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ReduxProvider } from "@/lib/store/provider"
import { siteConfig } from "@/lib/config"
import { Suspense } from "react"

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
        <main className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Analytics />
        </main>
    )
}
