"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button aria-label="Toggle theme" variant="ghost" size="sm" className={className}>
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      aria-label="Toggle theme"
      variant="ghost"
      size="sm"
      className={`transition-all duration-200 hover:scale-105 ${className}`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  )
}