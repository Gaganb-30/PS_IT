import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiShieldCheck, HiClock, HiCurrencyDollar, HiSupport, HiLightningBolt, HiCube } from 'react-icons/hi'
import { FaLaptop, FaServer, FaNetworkWired, FaDesktop, FaStar, FaQuoteLeft, FaVideo, FaTools, FaBuilding, FaBriefcase, FaRocket, FaStore, FaGraduationCap, FaProjectDiagram } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './Home.css'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const stats = [
    { number: '⚡', label: 'Fast Installation & Support', icon: '⚡' },
    { number: '🏢', label: 'Business & BPO IT Setup', icon: '🏢' },
    { number: '💻', label: 'Rental + Sales + Maintenance', icon: '💻' },
    { number: '🛠️', label: 'On-Site Technical Assistance', icon: '🛠️' },
]

const services = [
    { icon: <FaDesktop />, title: 'Desktop Renting', description: 'Flexible desktop rental plans for offices, BPOs, and training centers. Bulk availability with quick deployment.', color: 'var(--accent-cyan)' },
    { icon: <FaLaptop />, title: 'Laptop Renting', description: 'Business-grade laptops for employees and projects. Available in bulk with pre-configured setups.', color: 'var(--accent-purple)' },
    { icon: <FaVideo />, title: 'CCTV Installation', description: 'Complete CCTV solutions — site inspection, wiring, camera installation, and DVR/NVR monitoring setup.', color: 'var(--accent-blue)' },
    { icon: <FaNetworkWired />, title: 'Networking Solutions', description: 'LAN/WAN setup, routing, switching, structured cabling, and firewall configuration for your business.', color: 'var(--accent-green)' },
]

const features = [
    { icon: <HiCube />, title: 'Business-Focused Support', description: 'IT solutions tailored specifically for BPOs, corporate offices, and growing businesses.' },
    { icon: <HiClock />, title: 'Quick Response Time', description: 'Fast installation and deployment. We get your IT infrastructure up and running in minimal time.' },
    { icon: <HiCurrencyDollar />, title: 'Affordable Rental Plans', description: 'Cost-effective rental options that save you from heavy upfront investments. Pay as you use.' },
    { icon: <HiShieldCheck />, title: 'Complete IT Solutions', description: 'Hardware + CCTV + Networking — everything under one roof. One provider for all your IT needs.' },
]

const testimonials = [
    { name: 'Rajesh Kumar', role: 'IT Manager at TechNova BPO', text: 'PS IT Solutions set up our entire office with 80 desktops and networking in just 3 days. Their rental plans are incredibly affordable and the support is top-notch.', rating: 5 },
    { name: 'Priya Sharma', role: 'Operations Head at CloudServe', text: 'We needed 150 laptops for a 6-month project. PS IT Solutions delivered pre-configured laptops with networking setup. Absolutely seamless experience.', rating: 5 },
    { name: 'Amit Verma', role: 'Director at SecureVision Corp', text: 'The CCTV installation and networking setup for our new office was handled professionally. On-site support whenever we need it. Highly recommended!', rating: 5 },
]

export default function Home() {
    const orgJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "PS IT Solutions",
        "description": "IT Hardware Rental & Networking Services for BPOs and Corporate Offices",
        "url": "https://psitsolutions.in",
        "telephone": "+91-7983911594",
        "email": "info@psitsolutions.in",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Noida",
            "addressRegion": "Delhi NCR",
            "addressCountry": "IN"
        }
    }

    return (
        <motion.div className="page-transition" {...pageTransition}>
            <SEO
                title="PS IT Solutions — IT Hardware Rental & Networking Services"
                description="PS IT Solutions provides Desktop & Laptop Renting, Laptop Sales/Purchase, CCTV Installation, IT Hardware Support, and Full Networking Services for BPOs, offices in Noida & Delhi NCR."
                keywords="laptop rental Noida, desktop rental Delhi NCR, CCTV installation, networking services, IT hardware support, BPO IT setup, PS IT Solutions"
                jsonLd={orgJsonLd}
            />

            {/* ===== HERO SECTION ===== */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-grid" />
                    <div className="glow-orb glow-orb-cyan hero-orb-1" />
                    <div className="glow-orb glow-orb-purple hero-orb-2" />
                    <div className="hero-particles">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="particle" style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }} />
                        ))}
                    </div>
                </div>
                <div className="container hero-content">
                    <ScrollReveal>
                        <div className="hero-badge">
                            <span className="badge-dot" />
                            Serving BPOs & Businesses Across Noida & Delhi NCR
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="hero-title">
                            Reliable IT <span className="gradient-text">Hardware Rental</span> & Networking Solutions
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="hero-subtitle">
                            PS IT Solutions provides Desktop & Laptop Renting, Laptop Sales/Purchase, CCTV Installation,
                            IT Hardware Support, and Full Networking Services for BPOs, offices, and companies.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                        <div className="hero-actions">
                            <Link to="/contact" className="btn btn-primary btn-lg">
                                <span>Get a Free Quote</span>
                                <HiArrowRight />
                            </Link>
                            <a href="https://wa.me/917983911594" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                                WhatsApp Us Now
                            </a>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4}>
                        <div className="hero-trust">
                            <span className="hero-trust-label">Trusted by businesses in</span>
                            <div className="hero-trust-logos">
                                {['BPO Centers', 'Corporate Offices', 'Startups', 'Training Institutes', 'SMBs'].map(name => (
                                    <span key={name} className="trust-logo">{name}</span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== HIGHLIGHTS BAR ===== */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, i) => (
                            <ScrollReveal key={stat.label} delay={i * 0.1}>
                                <div className="stat-card">
                                    <span className="stat-emoji">{stat.icon}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SERVICES PREVIEW ===== */}
            <section className="section services-preview">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Our Services</span>
                            <h2>Complete IT <span className="gradient-text">Solutions</span> for Your Business</h2>
                            <p>From desktop rentals to full networking infrastructure, we provide everything your business needs to operate efficiently.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid-4 services-grid">
                        {services.map((service, i) => (
                            <ScrollReveal key={service.title} delay={i * 0.1}>
                                <div className="card service-card">
                                    <div className="service-icon" style={{ color: service.color }}>
                                        {service.icon}
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <Link to="/services" className="service-link">
                                        Learn More <HiArrowRight />
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR CLIENTS ===== */}
            <section className="section clients-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Our Clients</span>
                            <h2>Who We <span className="gradient-text">Work With</span></h2>
                            <p>Trusted by businesses across industries for reliable IT solutions</p>
                        </div>
                    </ScrollReveal>
                    <div className="clients-grid">
                        {[
                            { icon: <FaBuilding />, label: 'BPO Companies' },
                            { icon: <FaBriefcase />, label: 'Corporate Offices' },
                            { icon: <FaRocket />, label: 'Startups' },
                            { icon: <FaStore />, label: 'Small & Medium Businesses' },
                            { icon: <FaGraduationCap />, label: 'Training Institutes' },
                            { icon: <FaProjectDiagram />, label: 'Temporary Project Teams' },
                        ].map((client, i) => (
                            <ScrollReveal key={client.label} delay={i * 0.1}>
                                <div className="client-card">
                                    <div className="client-icon">{client.icon}</div>
                                    <span className="client-label">{client.label}</span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="section features-section">
                <div className="features-bg-glow" />
                <div className="container">
                    <div className="features-layout">
                        <div className="features-text">
                            <ScrollReveal direction="left">
                                <span className="section-label">Why Choose Us</span>
                                <h2>Why <span className="gradient-text">PS IT Solutions</span>?</h2>
                                <p className="features-desc">
                                    We specialize in providing end-to-end IT hardware and networking support
                                    for BPOs and corporate offices. Reliable, affordable, and always on time.
                                </p>
                            </ScrollReveal>
                        </div>
                        <div className="features-grid">
                            {features.map((feature, i) => (
                                <ScrollReveal key={feature.title} delay={i * 0.1} direction="right">
                                    <div className="feature-card">
                                        <div className="feature-icon">{feature.icon}</div>
                                        <div>
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="section testimonials-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Testimonials</span>
                            <h2>What Our <span className="gradient-text">Clients Say</span></h2>
                            <p>Don't just take our word for it. Here's what businesses across Noida & Delhi NCR have to say about working with PS IT Solutions.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid-3 testimonials-grid">
                        {testimonials.map((t, i) => (
                            <ScrollReveal key={t.name} delay={i * 0.15}>
                                <div className="card testimonial-card">
                                    <FaQuoteLeft className="testimonial-quote-icon" />
                                    <p className="testimonial-text">{t.text}</p>
                                    <div className="testimonial-stars">
                                        {[...Array(t.rating)].map((_, j) => (
                                            <FaStar key={j} />
                                        ))}
                                    </div>
                                    <div className="testimonial-author">
                                        <div className="testimonial-avatar">
                                            {t.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <strong>{t.name}</strong>
                                            <span>{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="section cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-banner">
                            <div className="cta-glow" />
                            <h2>Ready to Set Up Your IT Infrastructure?</h2>
                            <p>Get a custom quote tailored to your business needs. No commitments, fast delivery, on-site support.</p>
                            <div className="cta-actions">
                                <Link to="/contact" className="btn btn-primary btn-lg">
                                    <span>Get Your Free Quote</span>
                                    <HiArrowRight />
                                </Link>
                                <a href="https://wa.me/917983911594" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    )
}
