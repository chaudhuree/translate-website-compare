"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="relative">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative h-8 w-8 rounded-lg bg-zinc-100 ring-zinc-400 transition-all hover:ring-2 dark:bg-zinc-800"
      >
        <Sun
          className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          style={{ clipPath: "inset(0)" }}
        />
        <Moon
          className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          style={{ clipPath: "inset(0)" }}
        />
      </button>
    </div>
  )
}

export default ThemeToggle
