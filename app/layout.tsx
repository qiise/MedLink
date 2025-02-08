import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PreMed Forum",
  description: "A forum for premed students seeking advice and mentorship",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}

