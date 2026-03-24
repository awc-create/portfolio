import { Geist, Geist_Mono } from "next/font/google"
import ClientLayout from "@/components/layout/ClientLayout"
import "@/styles/globals.scss"
import type { Metadata } from "next"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adaptive Works",
  description: "Full-Stack + DevOps. From concept to production.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
} 
