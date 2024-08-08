import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<
    "theme-light" | "dark" | "system"
  >("theme-light")
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "theme-light")
  }, [])

  useEffect(() => {
    const isDark = theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  return (<Button
    onClick={() => setThemeState((theme) => (theme === "theme-light" ? "dark" : "theme-light"))}
    className="block w-auto rounded-full p-2 aspect-square bg-secondary-dark/90 text-offwhite dark:bg-secondary/90 hover:bg-secondary/50 hover:dark:bg-secondary/50 dark:text-offwhite">
    <Icon name="Sun" className="hidden dark:block" />
    <Icon name="Moon" className="block dark:hidden" />
    <span className="sr-only">Switch to light / dark version</span>
  </Button>)
}
