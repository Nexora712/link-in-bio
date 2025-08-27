'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-lg bg-[#F8F8F8] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222] flex items-center justify-center">
        <Sun className="w-4 h-4" />
      </button>
    )
  }

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  const getIcon = () => {
    if (theme === 'system') return <Monitor className="w-4 h-4" />
    if (resolvedTheme === 'dark') return <Sun className="w-4 h-4" />
    return <Moon className="w-4 h-4" />
  }

  const getLabel = () => {
    if (theme === 'system') return 'System theme'
    if (resolvedTheme === 'dark') return 'Switch to light mode'
    return 'Switch to dark mode'
  }

  return (
    <button
      onClick={cycleTheme}
      className="w-9 h-9 rounded-lg bg-[#F8F8F8] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222] hover:bg-[#E5E5E5] dark:hover:bg-[#222222] transition-all duration-200 flex items-center justify-center"
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span className="text-[#444444] dark:text-[#CCCCCC]">
        {getIcon()}
      </span>
    </button>
  )
}
