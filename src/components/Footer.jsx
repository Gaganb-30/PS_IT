import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowRight, FaWhatsapp } from 'react-icons/fa'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import './Footer.css'

const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
]

const services = [
    'Desktop Renting',
    'Laptop Renting',
    'Laptop Sales / Purchase',
    'CCTV Installation',
    'IT Hardware Support',
    'Networking Solutions',
]

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-glow" />
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand-col">
                        <Link to="/" className="footer-brand">
                            <div className="footer-logo">
                                <span className="logo-icon">PS</span>
                            </div>
                            <span className="footer-brand-text">PS IT<span className="brand-accent"> Solutions</span></span>
                        </Link>
                        <p className="footer-desc">
                            Your trusted IT partner for hardware rental, CCTV installation, and
                            networking services. Serving BPOs, offices, and businesses across Noida & Delhi NCR.
                        </p>
                        <div className="footer-socials">
                            <a href="https://wa.me/917983911594" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp"><FaWhatsapp /></a>
                            <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
                            <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="footer-link">
                                        <FaArrowRight className="footer-link-icon" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">Our Services</h4>
                        <ul className="footer-links">
                            {services.map(service => (
                                <li key={service}>
                                    <Link to="/services" className="footer-link">
                                        <FaArrowRight className="footer-link-icon" />
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">Contact Us</h4>
                        <div className="footer-contact-list">
                            <div className="footer-contact-item">
                                <HiLocationMarker className="footer-contact-icon" />
                                <span>Noida & Delhi NCR<br />Uttar Pradesh, India</span>
                            </div>
                            <div className="footer-contact-item">
                                <HiPhone className="footer-contact-icon" />
                                <span>7983911594</span>
                            </div>
                            <div className="footer-contact-item">
                                <HiMail className="footer-contact-icon" />
                                <span>info@psitsolutions.in</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} PS IT Solutions. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
