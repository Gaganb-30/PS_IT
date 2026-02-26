import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiCheck } from 'react-icons/hi'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './Pricing.css'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const plans = [
    {
        name: 'Small Business',
        desc: 'For startups and small offices getting started with IT infrastructure.',
        price: 'Custom',
        period: 'based on requirements',
        features: [
            'Desktop & Laptop Rentals (1-20 units)',
            'Basic Networking Setup (LAN/WiFi)',
            'CCTV (up to 8 cameras)',
            'Email & Phone Support',
            'Delivery within 3 days',
            'Monthly Billing',
        ],
        popular: false,
        cta: 'Get a Quote'
    },
    {
        name: 'BPO / Corporate',
        desc: 'Ideal for BPOs, mid-size offices, and growing companies.',
        price: 'Custom',
        period: 'tailored for your scale',
        features: [
            'Bulk Rentals (20-200+ units)',
            'Full Networking Infrastructure',
            'CCTV with DVR/NVR Monitoring',
            'On-Site Technical Support',
            'Delivery within 48 hours',
            'Flexible Payment Terms',
            'Dedicated Account Manager',
            'Hardware Maintenance & AMC',
        ],
        popular: true,
        cta: 'Get a Custom Quote'
    },
    {
        name: 'Enterprise',
        desc: 'For large organizations with complex and enterprise-grade needs.',
        price: 'Custom',
        period: 'enterprise pricing',
        features: [
            'Unlimited Device Capacity',
            'Complete IT Infrastructure Setup',
            'Advanced Security & Firewall',
            'Same-day Emergency Support',
            'Dedicated On-Site Technicians',
            'Asset Tracking & Management',
            'SLA with Uptime Guarantees',
            'Hardware Sales & Buy-back',
            'Multi-Location Support',
            'Priority 24/7 Support',
        ],
        popular: false,
        cta: 'Contact Us'
    }
]

const faqs = [
    { q: 'What is the minimum rental period?', a: 'Our minimum rental period is typically one month. For shorter requirements like events or projects, contact us for a custom daily or weekly rate.' },
    { q: 'Do you offer bulk discounts?', a: 'Yes! We offer significant discounts for bulk orders. The more devices you rent, the better the rate. Contact us with your requirements for a custom quote.' },
    { q: 'What areas do you service?', a: 'We primarily serve Noida and the entire Delhi NCR region. We also service locations across North India for bulk orders.' },
    { q: 'How fast is delivery and setup?', a: 'Standard delivery is within 2-3 days. For BPO and corporate plans, we offer 48-hour delivery. Emergency same-day delivery is available for enterprise clients.' },
    { q: 'Do you provide on-site support?', a: 'Yes! Our BPO/Corporate and Enterprise plans include on-site technical support. We also offer AMC (Annual Maintenance Contract) for ongoing hardware support.' },
    { q: 'Can I buy or sell used hardware through you?', a: 'Absolutely! We offer laptop and desktop sales (new & refurbished) as well as buy-back programs for businesses looking to upgrade or liquidate their hardware.' },
]

export default function Pricing() {
    return (
        <motion.div className="page-transition" {...pageTransition}>
            <SEO
                title="Pricing — Flexible IT Rental Plans | PS IT Solutions"
                description="Affordable, flexible pricing for IT hardware rental, CCTV installation, and networking services. Custom quotes for BPOs and businesses. No hidden fees."
                keywords="IT rental pricing Noida, desktop rental cost, laptop rental plans, CCTV installation price, networking setup cost"
            />

            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="glow-orb glow-orb-cyan" style={{ width: 400, height: 400, top: -100, left: '20%' }} />
                    <div className="glow-orb glow-orb-purple" style={{ width: 350, height: 350, bottom: -80, right: '10%' }} />
                </div>
                <div className="container page-hero-content">
                    <ScrollReveal>
                        <span className="section-label">Pricing</span>
                        <h1>Affordable & <span className="gradient-text">Flexible Plans</span></h1>
                        <p className="page-hero-desc">
                            Every business is different. That's why all our plans are custom-quoted based on your
                            specific requirements. No hidden fees, no surprises.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="section pricing-cards-section">
                <div className="container">
                    <div className="pricing-grid">
                        {plans.map((plan, i) => (
                            <ScrollReveal key={plan.name} delay={i * 0.15}>
                                <div className={`pricing-card card ${plan.popular ? 'pricing-popular' : ''}`}>
                                    {plan.popular && <div className="popular-badge">Most Popular</div>}
                                    <div className="pricing-header">
                                        <h3>{plan.name}</h3>
                                        <p className="pricing-desc">{plan.desc}</p>
                                        <div className="pricing-price">
                                            <span className="price-amount">{plan.price}</span>
                                        </div>
                                        <span className="price-period">{plan.period}</span>
                                    </div>
                                    <ul className="pricing-features">
                                        {plan.features.map(f => (
                                            <li key={f}>
                                                <HiCheck className="pricing-check" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to="/contact"
                                        className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} pricing-btn`}
                                    >
                                        <span>{plan.cta}</span>
                                        <HiArrowRight />
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section faq-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <span className="section-label">FAQ</span>
                            <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
                        </div>
                    </ScrollReveal>
                    <div className="faq-grid">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={i} delay={i * 0.08}>
                                <div className="faq-card card">
                                    <h4>{faq.q}</h4>
                                    <p>{faq.a}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
