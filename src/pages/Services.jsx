import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi'
import { FaLaptop, FaServer, FaNetworkWired, FaDesktop, FaVideo, FaTools, FaShoppingCart, FaHeadset } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './Services.css'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const equipmentCategories = [
    {
        icon: <FaDesktop />,
        title: 'Desktop & Laptop Rentals',
        description: 'Flexible desktop and laptop rental plans for offices, BPOs, training centers, and temporary projects.',
        features: ['HP, Dell & Lenovo Desktops', 'Dell Latitude, HP ProBook & ThinkPad Laptops', 'MacBook Pro & Air', 'Bulk Availability & Quick Deployment', 'Pre-configured Systems', 'Monthly & Long-term Plans'],
        color: '#06b6d4',
        bgImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&auto=format&fit=crop&q=60'
    },
    {
        icon: <FaShoppingCart />,
        title: 'Laptop Sales & Purchase',
        description: 'Buying and selling of new and refurbished laptops for business use.',
        features: ['New Laptop Sales', 'Certified Refurbished', 'Bulk Purchase Deals', 'Trade-in Programs', 'Warranty Support', 'All Major Brands'],
        color: '#3b82f6',
        bgImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=60'
    },
    {
        icon: <FaVideo />,
        title: 'CCTV Installation',
        description: 'Complete CCTV solutions — site inspection, wiring, installation, and monitoring.',
        features: ['Site Inspection & Planning', 'HD & IP Cameras', 'Structured Wiring', 'DVR/NVR Setup', 'Remote Monitoring', 'AMC Services'],
        color: '#10b981',
        bgImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=60'
    },
    {
        icon: <FaTools />,
        title: 'IT Hardware Support',
        description: 'Troubleshooting, maintenance, and on-site technical assistance for all hardware.',
        features: ['Hardware Diagnostics', 'System Repair', 'Preventive Maintenance', 'On-site Support', 'Remote Assistance', 'AMC Contracts'],
        color: '#f59e0b',
        bgImage: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&auto=format&fit=crop&q=60'
    },
    {
        icon: <FaNetworkWired />,
        title: 'Full Networking Solutions',
        description: 'LAN/WAN setup, routing, switching, structured cabling, and firewall configuration.',
        features: ['LAN/WAN Setup', 'Routing & Switching', 'Structured Cabling', 'Firewall Configuration', 'WiFi Infrastructure', 'Network Monitoring'],
        color: '#ec4899',
        bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=60'
    },
    {
        icon: <FaHeadset />,
        title: 'Complete BPO Solutions',
        description: 'End-to-end IT infrastructure setup for BPO operations — desktops, networking, CCTV, and ongoing support.',
        features: ['Full Office IT Setup', 'Bulk Hardware Deployment', 'Network & Internet Setup', 'CCTV & Security', 'Ongoing Technical Support', 'Scalable Infrastructure'],
        color: '#8b5cf6',
        bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=60'
    }
]

const processSteps = [
    { step: '01', title: 'Share Requirement', desc: 'Tell us what you need — desktop/laptop rental, CCTV installation, networking, or hardware support.' },
    { step: '02', title: 'Get Custom Quote', desc: 'Receive a tailored quote based on your business requirements and budget within hours.' },
    { step: '03', title: 'Installation & Delivery', desc: 'Fast deployment and professional on-site setup. We handle all the logistics and configuration.' },
    { step: '04', title: 'Ongoing Support', desc: 'Continuous technical assistance to ensure your operations run smoothly. Available when you need us.' },
]

export default function Services() {
    return (
        <motion.div className="page-transition" {...pageTransition}>
            <SEO
                title="Services — IT Hardware Rental & Networking | PS IT Solutions"
                description="Desktop & Laptop Renting, Laptop Sales/Purchase, CCTV Installation, IT Hardware Support, and Full Networking Solutions. Serving BPOs and businesses in Noida & Delhi NCR."
                keywords="desktop rental Noida, laptop rental Delhi NCR, CCTV installation, networking services, IT hardware support, PS IT Solutions services"
            />

            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, top: -100, right: -100 }} />
                    <div className="glow-orb glow-orb-purple" style={{ width: 300, height: 300, bottom: -50, left: '20%' }} />
                </div>
                <div className="container page-hero-content">
                    <ScrollReveal>
                        <span className="section-label">Our Services</span>
                        <h1>Complete IT <span className="gradient-text">Solutions</span> for Business</h1>
                        <p className="page-hero-desc">
                            From desktop rentals to full networking infrastructure, CCTV installation to hardware support —
                            we provide everything your business needs under one roof.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Equipment Categories */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">What We Offer</span>
                            <h2>Our <span className="gradient-text">Services</span></h2>
                            <p>Comprehensive IT solutions tailored for BPOs, corporate offices, startups, and businesses of all sizes.</p>
                        </div>
                    </ScrollReveal>
                    <div className="equipment-grid">
                        {equipmentCategories.map((cat, i) => (
                            <ScrollReveal key={cat.title} delay={i * 0.1}>
                                <div className="equipment-card card" style={{ '--card-bg-image': `url(${cat.bgImage})` }}>
                                    <div className="equipment-card-bg-overlay" />
                                    <div className="equipment-icon" style={{ color: cat.color }}>
                                        {cat.icon}
                                    </div>
                                    <h3>{cat.title}</h3>
                                    <p className="equipment-desc">{cat.description}</p>
                                    <ul className="equipment-features">
                                        {cat.features.map(f => (
                                            <li key={f}>
                                                <HiCheckCircle style={{ color: cat.color }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section process-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">How It Works</span>
                            <h2>Our <span className="gradient-text">Process</span></h2>
                            <p>Getting started is simple. We make IT setup hassle-free for your business.</p>
                        </div>
                    </ScrollReveal>
                    <div className="process-grid">
                        {processSteps.map((step, i) => (
                            <ScrollReveal key={step.step} delay={i * 0.15}>
                                <div className="process-card">
                                    <div className="process-number">{step.step}</div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                    {i < processSteps.length - 1 && <div className="process-arrow">→</div>}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal>
                        <div className="process-cta">
                            <Link to="/contact" className="btn btn-primary btn-lg">
                                <span>Get Started Today</span>
                                <HiArrowRight />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </motion.div>
    )
}
