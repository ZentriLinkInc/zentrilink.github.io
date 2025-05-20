'use client'

import { useTheme } from '../../providers/ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg shadow-foreground/10 hover:shadow-foreground/30 shadow-md transition-shadow duration-200 cursor-pointer bg-background"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? (
                    <Moon className="h-5 w-5 text-primary" />
                ) : (
                    <Sun className="h-5 w-5 text-primary" />
                )}
            </button>
        </div>
    )
}