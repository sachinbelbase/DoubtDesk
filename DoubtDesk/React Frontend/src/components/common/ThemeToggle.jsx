import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
     const { theme, toggleTheme } = useTheme();

     const isDark = theme === "dark";

     return (
          <button
               onClick={toggleTheme}
               aria-label="Toggle dark mode"
               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
               {isDark ? (
                    <Sun size={20} className="text-gray-200" />
               ) : (
                    <Moon size={20} className="text-gray-700" />
               )}
          </button>
     );
}

export default ThemeToggle;