"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Forum", href: "/" },
  { name: "Mentorship", href: "/mentorship" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              PreMed Forum
            </Link>
          </div>
          <div className="flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === item.href ? "bg-primary-foreground text-primary" : "hover:bg-primary-foreground/10",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

