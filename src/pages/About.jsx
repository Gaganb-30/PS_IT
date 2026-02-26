import { motion } from 'framer-motion'
import { HiLightningBolt, HiGlobe, HiUserGroup, HiHeart, HiAcademicCap, HiChartBar } from 'react-icons/hi'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './About.css'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const values = [
    { icon: <HiLightningBolt />, title: 'Quick Response', desc: 'Fast installation and deployment — we understand that downtime costs your business money.' },
    { icon: <HiGlobe />, title: 'Reliability', desc: 'Dependable IT infrastructure that keeps your operations running smoothly without interruption.' },
    { icon: <HiUserGroup />, title: 'Partnership', desc: 'We treat every client relationship as a long-term partnership, growing alongside your business.' },
    { icon: <HiHeart />, title: 'Customer First', desc: 'Every decision starts with one question — how does this benefit our customers and their teams?' },
    { icon: <HiAcademicCap />, title: 'Expertise', desc: 'Our team brings deep experience in enterprise IT infrastructure, networking, and hardware management.' },
    { icon: <HiChartBar />, title: 'Transparency', desc: 'No hidden fees, no surprises. Clear communication and honest, upfront pricing on all services.' },
]

const milestones = [
    { year: '2018', title: 'Founded', desc: 'PS IT Solutions was founded in Noida with a mission to simplify IT hardware rental for businesses.' },
    { year: '2019', title: 'CCTV & Networking', desc: 'Expanded services to include CCTV installation and complete networking solutions for offices.' },
    { year: '2020', title: 'BPO Focus', desc: 'Became the preferred IT partner for multiple BPOs in Noida and Delhi NCR during rapid growth.' },
    { year: '2022', title: 'Bulk Rentals', desc: 'Scaled to support 200+ device bulk rental orders with same-week deployment capabilities.' },
    { year: '2023', title: 'Sales & Purchase', desc: 'Launched laptop and desktop sales/purchase division for businesses upgrading or liquidating hardware.' },
    { year: '2025', title: 'Regional Growth', desc: 'Expanded service coverage across the entire Delhi NCR region with dedicated on-site support teams.' },
]

const team = [
    { name: 'Founder & CEO', role: 'Vision & Strategy', initials: 'PS' },
    { name: 'Technical Lead', role: 'Networking & Infrastructure', initials: 'TL' },
    { name: 'Operations Head', role: 'Delivery & Logistics', initials: 'OH' },
    { name: 'Client Relations', role: 'Support & Account Management', initials: 'CR' },
]

export default function About() {
    return (
        <motion.div className="page-transition" {...pageTransition}>
            <SEO
                title="About Us — PS IT Solutions"
                description="Learn about PS IT Solutions — IT hardware rental, CCTV installation, and networking services provider serving BPOs and businesses in Noida & Delhi NCR since 2018."
                keywords="about PS IT Solutions, IT rental company Noida, hardware rental provider Delhi NCR"
            />

            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, top: -100, right: -100 }} />
                    <div className="glow-orb glow-orb-purple" style={{ width: 300, height: 300, bottom: -50, left: '30%' }} />
                </div>
                <div className="container page-hero-content">
                    <ScrollReveal>
                        <span className="section-label">About Us</span>
                        <h1>Your Trusted IT <span className="gradient-text">Solutions Partner</span></h1>
                        <p className="page-hero-desc">
                            PS IT Solutions is a business-focused IT service provider specializing in complete hardware
                            and network support for BPOs, corporate offices, and growing businesses across Noida & Delhi NCR.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Story Section */}
            <section className="section">
                <div className="container">
                    <div className="story-layout">
                        <ScrollReveal direction="left">
                            <div className="story-text">
                                <span className="section-label" style={{ textAlign: 'left', padding: 0 }}>Our Story</span>
                                <h2>Built for <span className="gradient-text">Business Reliability</span></h2>
                                <p>
                                    PS IT Solutions was founded with a simple observation: businesses, especially BPOs and
                                    corporate offices, needed reliable IT hardware without the burden of massive upfront
                                    investments. We saw an opportunity to bridge this gap with flexible rental solutions
                                    backed by on-site support.
                                </p>
                                <p>
                                    What started with desktop and laptop rentals quickly expanded to include CCTV installation,
                                    complete networking infrastructure, and hardware sales. Today, we serve dozens of businesses
                                    across Noida and Delhi NCR — from small startups to large BPO operations.
                                </p>
                                <p>
                                    Our core values remain unchanged: reliability, quick support, minimal downtime, and
                                    cost-effective scalable solutions that grow with your business.
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                            <div className="story-stats">
                                <div className="story-stat-card">
                                    <span className="story-stat-number">7+</span>
                                    <span className="story-stat-label">Years in Business</span>
                                </div>
                                <div className="story-stat-card">
                                    <span className="story-stat-number">100+</span>
                                    <span className="story-stat-label">Business Clients</span>
                                </div>
                                <div className="story-stat-card">
                                    <span className="story-stat-number">1000+</span>
                                    <span className="story-stat-label">Devices Deployed</span>
                                </div>
                                <div className="story-stat-card">
                                    <span className="story-stat-number">95%</span>
                                    <span className="story-stat-label">Client Retention</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section values-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Our Values</span>
                            <h2>What <span className="gradient-text">Drives Us</span></h2>
                            <p>Our core values guide every decision and interaction at PS IT Solutions.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid-3">
                        {values.map((v, i) => (
                            <ScrollReveal key={v.title} delay={i * 0.1}>
                                <div className="card value-card">
                                    <div className="value-icon">{v.icon}</div>
                                    <h4>{v.title}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section timeline-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Our Journey</span>
                            <h2>Key <span className="gradient-text">Milestones</span></h2>
                        </div>
                    </ScrollReveal>
                    <div className="timeline">
                        {milestones.map((m, i) => (
                            <ScrollReveal key={m.year} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                                <div className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                                    <div className="timeline-dot" />
                                    <div className="timeline-card">
                                        <span className="timeline-year">{m.year}</span>
                                        <h4>{m.title}</h4>
                                        <p>{m.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section team-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">Our Team</span>
                            <h2>The <span className="gradient-text">Team</span></h2>
                            <p>Experienced professionals dedicated to delivering the best IT solutions for your business.</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid-4 team-grid">
                        {team.map((t, i) => (
                            <ScrollReveal key={t.name} delay={i * 0.1}>
                                <div className="card team-card">
                                    <div className="team-avatar">{t.initials}</div>
                                    <h4>{t.name}</h4>
                                    <p className="team-role">{t.role}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
