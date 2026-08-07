import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

function getInitialTheme() {
     const stored = localStorage.getItem("doubtdesk_theme");

     if (stored === "light" || stored === "dark") {
          return stored;
     }

     // Fall back to the user's OS preference the first time they visit
     const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
     ).matches;

     return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }) {
     const [theme, setTheme] = useState(getInitialTheme);

     useEffect(() => {
          const root = document.documentElement;

          if (theme === "dark") {
               root.classList.add("dark");
          } else {
               root.classList.remove("dark");
          }

          localStorage.setItem("doubtdesk_theme", theme);
     }, [theme]);

     const toggleTheme = () => {
          setTheme((prev) => (prev === "dark" ? "light" : "dark"));
     };

     return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
               {children}
          </ThemeContext.Provider>
     );
}

export function useTheme() {
     const context = useContext(ThemeContext);

     if (!context) {
          throw new Error("useTheme must be used within a ThemeProvider");
     }

     return context;
}