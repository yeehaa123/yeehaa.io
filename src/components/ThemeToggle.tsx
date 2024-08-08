import { Icon } from "@/components/Icon";
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

  return (<button onClick={() => setThemeState((theme) => (theme === "theme-light" ? "dark" : "theme-light"))}>
    <Icon name="Sun" className="hidden dark:block" />
    <Icon name="Moon" className="block dark:hidden" />
    <span className="sr-only">Switch to light / dark version</span>
  </button>)
}
