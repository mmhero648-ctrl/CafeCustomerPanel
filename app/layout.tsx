import type { Metadata, Viewport } from 'next'
import { Vazirmatn, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const vazir = Vazirmatn({
  variable: '--font-vazir',
  subsets: ['arabic', 'latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'کافه راوی · سفارش از میز',
  description:
    'منوی دیجیتال و سفارش‌گیری کافه راوی — قهوه، صبحانه، شیرینی و باشگاه مشتریان',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#2c4332',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazir.variable} ${playfair.variable} ${jetbrains.variable} bg-background`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
