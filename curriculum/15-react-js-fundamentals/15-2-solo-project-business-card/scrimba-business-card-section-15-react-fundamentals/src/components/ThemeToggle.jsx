import { FaSun, FaMoon } from "react-icons/fa"
import '../styles/ThemeToggle.css'

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