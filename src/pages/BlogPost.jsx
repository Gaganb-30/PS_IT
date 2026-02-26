import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiClock, HiUser, HiCalendar, HiArrowLeft, HiTag } from 'react-icons/hi'
import blogPostsStatic from '../data/blogPosts'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './BlogPost.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function BlogPost() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        fetchPost()
    }, [slug])

    const fetchPost = async () => {
        setLoading(true)
        try {
            // Try API first
            const res = await fetch(`${API_URL}/api/blogs/${slug}`)
            if (res.ok) {
                const data = await res.json()
                setPost(data)
                // Fetch related
                const relRes = await fetch(`${API_URL}/api/blogs`)
                if (relRes.ok) {
                    const allBlogs = await relRes.json()
                    setRelatedPosts(allBlogs.filter(p => p.slug !== slug).slice(0, 3))
                }
            } else {
                // Fallback to static
                const staticPost = blogPostsStatic.find(p => p.slug === slug)
                if (staticPost) {
                    setPost(staticPost)
                    setRelatedPosts(blogPostsStatic.filter(p => p.slug !== slug).slice(0, 3))
                } else {
                    setNotFound(true)
                }
            }
        } catch (err) {
            // Fallback to static
            const staticPost = blogPostsStatic.find(p => p.slug === slug)
            if (staticPost) {
                setPost(staticPost)
                setRelatedPosts(blogPostsStatic.filter(p => p.slug !== slug).slice(0, 3))
            } else {
                setNotFound(true)
            }
        } finally {
            setLoading(false)
        }
    }

    if (notFound) return <Navigate to="/blog" replace />

    if (loading) {
        return (
            <motion.div className="page-transition" {...pageTransition}>
                <div className="blog-loading" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="loading-spinner" />
                    <p>Loading article...</p>
                </div>
            </motion.div>
        )
    }

    if (!post) return <Navigate to="/blog" replace />

    const formattedDate = new Date(post.date || post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    })

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "author": { "@type": "Person", "name": post.author },
        "datePublished": post.date || post.createdAt,
        "publisher": {
            "@type": "Organization",
            "name": "PS IT Solutions",
        },
    }

    return (
        <motion.div className="page-transition" {...pageTransition}>
            <SEO
                title={post.title}
                description={post.excerpt}
                keywords={(post.tags || []).join(', ')}
                ogType="article"
                jsonLd={articleJsonLd}
            />

            {/* Article Header */}
            <section className="article-hero" style={{ background: post.coverColor }}>
                <div className="article-hero-overlay" />
                <div className="container article-hero-content">
                    <ScrollReveal>
                        <Link to="/blog" className="article-back">
                            <HiArrowLeft /> Back to Blog
                        </Link>
                        <span className="article-category">{post.category}</span>
                        <h1>{post.title}</h1>
                        <div className="article-meta">
                            <span><HiUser /> {post.author}{post.authorRole ? ` — ${post.authorRole}` : ''}</span>
                            <span><HiCalendar /> {formattedDate}</span>
                            <span><HiClock /> {post.readTime}</span>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Article Content */}
            <section className="section article-section">
                <div className="container">
                    <div className="article-layout">
                        <ScrollReveal>
                            <article className="article-content">
                                <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="article-tags">
                                        <HiTag className="tags-icon" />
                                        {post.tags.map(tag => (
                                            <span key={tag} className="article-tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        </ScrollReveal>

                        {/* Sidebar */}
                        <aside className="article-sidebar">
                            <ScrollReveal direction="right" delay={0.2}>
                                <div className="sidebar-card card">
                                    <h4>About the Author</h4>
                                    <div className="author-info">
                                        <div className="author-avatar">
                                            {post.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <strong>{post.author}</strong>
                                            {post.authorRole && <span>{post.authorRole}</span>}
                                        </div>
                                    </div>
                                </div>

                                {relatedPosts.length > 0 && (
                                    <div className="sidebar-card card">
                                        <h4>Related Articles</h4>
                                        <div className="related-posts">
                                            {relatedPosts.map(rp => (
                                                <Link key={rp._id || rp.id || rp.slug} to={`/blog/${rp.slug}`} className="related-post-link">
                                                    <div className="related-post-dot" style={{ background: rp.coverColor }} />
                                                    <div>
                                                        <strong>{rp.title}</strong>
                                                        <span>{rp.readTime}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="sidebar-card card sidebar-cta">
                                    <h4>Need IT Equipment?</h4>
                                    <p>Get a free quote for hardware rental, CCTV, or networking services.</p>
                                    <Link to="/contact" className="btn btn-primary btn-sm">
                                        <span>Get a Quote</span>
                                    </Link>
                                </div>
                            </ScrollReveal>
                        </aside>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}
