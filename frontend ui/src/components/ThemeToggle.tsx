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

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center justify-center p-2 h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none transition-colors"
      aria-label="Toggle theme"
    >
      <Sun
        size={20}
        className={`absolute transform transition-transform duration-200 ${
          theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
        } text-yellow-500`}
      />
      <Moon
        size={20}
        className={`absolute transform transition-transform duration-200 ${
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        } text-blue-500`}
      />
    </button>
  )
}

export default ThemeToggle
