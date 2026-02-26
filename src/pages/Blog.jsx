import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiClock, HiUser, HiArrowRight } from 'react-icons/hi'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import blogPostsStatic from '../data/blogPosts'
import './Blog.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function Blog() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [visibleCount, setVisibleCount] = useState(6)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs`)
            if (res.ok) {
                const data = await res.json()
                if (data.length > 0) {
                    setBlogs(data)
                } else {
                    // Fallback to static data if DB is empty
                    setBlogs(blogPostsStatic)
                }
            } else {
                setBlogs(blogPostsStatic)
            }
        } catch (err) {
            console.warn('Blog API not available, using static data:', err.message)
            setBlogs(blogPostsStatic)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['All', ...new Set(blogs.map(p => p.category))]

    const filteredBlogs = activeCategory === 'All'
        ? blogs
        : blogs.filter(p => p.category === activeCategory)

    const visibleBlogs = filteredBlogs.slice(0, visibleCount)
    const hasMore = visibleCount < filteredBlogs.length

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6)
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        })
    }

    return (
        <motion.div className="page-transition" {...pageTransition}>
            <SEO
                title="Blog — IT Insights & Tips | PS IT Solutions"
                description="Expert insights on IT hardware rental, networking, CCTV, and business technology. Stay informed with PS IT Solutions blog."
                keywords="IT blog, hardware rental insights, networking tips, CCTV guide, technology blog"
            />

            <section className="page-hero">
                <div className="page-hero-bg">
                    <div className="glow-orb glow-orb-cyan" style={{ width: 350, height: 350, top: -80, right: '20%' }} />
                    <div className="glow-orb glow-orb-purple" style={{ width: 280, height: 280, bottom: -50, left: '10%' }} />
                </div>
                <div className="container page-hero-content">
                    <ScrollReveal>
                        <span className="section-label">Our Blog</span>
                        <h1>Insights & <span className="gradient-text">Resources</span></h1>
                        <p className="page-hero-desc">
                            Expert articles on IT hardware, networking, CCTV, and technology trends.
                            Stay ahead with actionable insights from our team.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section blog-section">
                <div className="container">
                    {/* Category Tags */}
                    <ScrollReveal>
                        <div className="blog-categories">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`category-tag ${activeCategory === cat ? 'category-tag-active' : ''}`}
                                    onClick={() => { setActiveCategory(cat); setVisibleCount(6) }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Loading State */}
                    {loading && (
                        <div className="blog-loading">
                            <div className="loading-spinner" />
                            <p>Loading articles...</p>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {!loading && (
                        <>
                            <div className="blog-grid">
                                {visibleBlogs.map((post, i) => (
                                    <ScrollReveal key={post._id || post.id || post.slug} delay={i * 0.08}>
                                        <Link to={`/blog/${post.slug}`} className="blog-card card">
                                            <div className="blog-card-cover" style={{ background: post.coverColor }}>
                                                {post.coverImage && (
                                                    <img src={post.coverImage} alt={post.title} className="blog-card-cover-img" />
                                                )}
                                                <span className="blog-card-category">{post.category}</span>
                                            </div>
                                            <div className="blog-card-body">
                                                <h3>{post.title}</h3>
                                                <p className="blog-card-excerpt">{post.excerpt}</p>
                                                <div className="blog-card-meta">
                                                    <span className="blog-meta-item">
                                                        <HiUser /> {post.author}
                                                    </span>
                                                    <span className="blog-meta-item">
                                                        <HiClock /> {post.readTime}
                                                    </span>
                                                </div>
                                                <span className="blog-read-more">
                                                    Read Article <HiArrowRight />
                                                </span>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {hasMore && (
                                <ScrollReveal>
                                    <div className="blog-load-more">
                                        <button onClick={handleLoadMore} className="btn btn-secondary btn-lg">
                                            <span>View More Articles</span>
                                            <HiArrowRight />
                                        </button>
                                    </div>
                                </ScrollReveal>
                            )}

                            {/* No Results */}
                            {filteredBlogs.length === 0 && (
                                <div className="blog-empty">
                                    <p>No articles found in this category.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </motion.div>
    )
}
