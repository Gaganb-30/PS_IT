import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './Contact.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const contactInfo = [
    { icon: <HiLocationMarker />, title: 'Visit Us', lines: ['Noida & Delhi NCR', 'Uttar Pradesh, India'] },
    { icon: <HiPhone />, title: 'Call / WhatsApp', lines: ['7983911594'] },
    { icon: <HiMail />, title: 'Email Us', lines: ['info@psitsolutions.in'] },
    { icon: <HiClock />, title: 'Business Hours', lines: ['Mon-Sat: 9:00 AM - 7:00 PM', 'Sunday: Closed'] },
]

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', phone: '', service: '', message: ''
    })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: '', message: '' })

        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const data = await res.json()

            if (res.ok) {
                setStatus({ type: 'success', message: data.message || 'Your message has been sent successfully!' })
                setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' })
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
        } finally {
            setLoading(false)
            setTimeout(() => setStatus({ type: '', message: '' }), 8000)
        }
    }

    return (
        <motion.div className="page-transition" {...pageTransition}>
            <SEO
                title="Contact Us — PS IT Solutions"
                description="Contact PS IT Solutions for IT hardware rental, CCTV installation, and networking services in Noida & Delhi NCR. Call 7983911594 or email info@psitsolutions.in."
                keywords="contact PS IT Solutions, IT rental inquiry Noida, hardware rental Delhi NCR, CCTV quote"
            />

            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="glow-orb glow-orb-cyan" style={{ width: 350, height: 350, top: -80, left: '10%' }} />
                    <div className="glow-orb glow-orb-purple" style={{ width: 300, height: 300, bottom: -60, right: '15%' }} />
                </div>
                <div className="container page-hero-content">
                    <ScrollReveal>
                        <span className="section-label">Contact Us</span>
                        <h1>Let's <span className="gradient-text">Talk</span></h1>
                        <p className="page-hero-desc">
                            Have a question or ready to get started? Reach out to us and our team will respond within 24 hours.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section contact-section">
                <div className="container">
                    <div className="contact-layout">
                        {/* Contact Form */}
                        <ScrollReveal direction="left">
                            <div className="contact-form-wrapper card">
                                <h3>Send Us a Message</h3>
                                <p className="form-subtitle">Fill out the form and we'll get back to you shortly.</p>

                                {status.message && (
                                    <div className={`form-status ${status.type === 'success' ? 'form-success' : 'form-error'}`}>
                                        {status.type === 'success' ? '✅' : '❌'} {status.message}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name *</label>
                                            <input
                                                type="text" id="name" name="name"
                                                value={formData.name} onChange={handleChange}
                                                placeholder="Your Name" required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email" id="email" name="email"
                                                value={formData.email} onChange={handleChange}
                                                placeholder="your@email.com" required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="company">Company Name</label>
                                            <input
                                                type="text" id="company" name="company"
                                                value={formData.company} onChange={handleChange}
                                                placeholder="Your Company"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Mobile Number *</label>
                                            <input
                                                type="tel" id="phone" name="phone"
                                                value={formData.phone} onChange={handleChange}
                                                placeholder="+91 XXXXX XXXXX" required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service">Service Required *</label>
                                        <select
                                            id="service" name="service"
                                            value={formData.service} onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a service...</option>
                                            <option value="desktop-rental">Desktop Renting</option>
                                            <option value="laptop-rental">Laptop Renting</option>
                                            <option value="laptop-sales">Laptop Sales / Purchase</option>
                                            <option value="cctv">CCTV Installation</option>
                                            <option value="it-support">IT Hardware Support</option>
                                            <option value="networking">Networking Solutions</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Requirement Details *</label>
                                        <textarea
                                            id="message" name="message" rows="5"
                                            value={formData.message} onChange={handleChange}
                                            placeholder="Tell us about your requirements — quantity, duration, location, etc."
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg contact-submit" disabled={loading}>
                                        <span>{loading ? 'Sending...' : 'Send Message'}</span>
                                    </button>
                                </form>
                            </div>
                        </ScrollReveal>

                        {/* Contact Info */}
                        <div className="contact-info-col">
                            {contactInfo.map((info, i) => (
                                <ScrollReveal key={info.title} delay={i * 0.1} direction="right">
                                    <div className="contact-info-card card">
                                        <div className="contact-info-icon">{info.icon}</div>
                                        <div>
                                            <h4>{info.title}</h4>
                                            {info.lines.map((line, j) => (
                                                <p key={j}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                            {/* WhatsApp Button */}
                            <ScrollReveal delay={0.5} direction="right">
                                <a
                                    href="https://wa.me/917983911594"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whatsapp-btn btn btn-lg"
                                >
                                    <FaWhatsapp size={22} />
                                    <span>Chat on WhatsApp</span>
                                </a>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
