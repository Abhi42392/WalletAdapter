import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-3 right-3 z-50 inline-flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-3 py-2 shadow-sm hover:shadow transition active:scale-95"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
