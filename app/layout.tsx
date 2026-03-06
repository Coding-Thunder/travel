import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ReduxProvider } from "@/lib/store/provider"
import { siteConfig } from "@/lib/config"
import { Suspense } from "react"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import CallPopUp from "@/components/CallPopUp"

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} - Travel Booking Made Easy`,
  description: `Book flights and rental cars with ${siteConfig.brand.name}`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads Global Site Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16727173537"
          strategy="beforeInteractive"
        />

        <Script id="google-ads-gtag" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16727173537');
          `}
        </Script>
      </head>

      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} z-40 antialiased`}>
        <ReduxProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
          <Footer />
        </ReduxProvider>

        <CallPopUp />
      </body>
    </html>
  )
}