import { FaSun, FaMoon } from "react-icons/fa"

export default function ThemeToggle({ isDark, toggleTheme}){
    return(
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <FaSun/> : <FaMoon/>}
        </button>
    )
}