import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false)
    }, [location])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${isOpen ? 'navbar-menu-open' : ''}`}>
                <div className="navbar-inner container-wide">
                    <Link to="/" className="navbar-brand">
                        <div className="navbar-logo">
                            <span className="logo-icon">PS</span>
                        </div>
                        <span className="brand-text">PS IT<span className="brand-accent"> Solutions</span></span>
                    </Link>

                    <div className="navbar-links-desktop">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                                end={link.path === '/'}
                            >
                                {link.label}
                                <span className="nav-link-underline" />
                            </NavLink>
                        ))}
                    </div>

                    <div className="navbar-actions">
                        <div className="desktop-only">
                            <ThemeToggle />
                        </div>
                        <Link to="/contact" className="btn btn-primary btn-sm navbar-cta desktop-only">
                            <span>Get a Quote</span>
                        </Link>
                        <button
                            className="navbar-toggle"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu rendered OUTSIDE nav to avoid backdrop-filter containing block */}
            {isOpen && (
                <div className="navbar-mobile">
                    <div className="navbar-mobile-inner">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => `mobile-link ${isActive ? 'mobile-link-active' : ''}`}
                                    end={link.path === '/'}
                                >
                                    {link.label}
                                </NavLink>
                            </motion.div>
                        ))}
                        <div className="mobile-divider" />
                        <div className="mobile-theme-toggle">
                            <ThemeToggle />
                        </div>
                        <Link to="/contact" className="btn btn-primary btn-sm mobile-cta">
                            <span>Get a Quote</span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
