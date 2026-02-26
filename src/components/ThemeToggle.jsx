import { useTheme } from '../context/ThemeContext'
import { HiSun, HiMoon } from 'react-icons/hi'
import './ThemeToggle.css'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            className={`theme-toggle ${theme === 'light' ? 'theme-toggle-light' : ''}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className="theme-toggle-track">
                <div className="theme-toggle-icons">
                    <HiSun className="theme-icon theme-icon-sun" />
                    <HiMoon className="theme-icon theme-icon-moon" />
                </div>
                <div className="theme-toggle-thumb">
                    <div className="thumb-glow" />
                </div>
            </div>
        </button>
    )
}
