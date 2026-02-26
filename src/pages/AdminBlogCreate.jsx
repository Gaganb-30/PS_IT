import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiPlus, HiCheck, HiX } from 'react-icons/hi'
import SEO from '../components/SEO'
import './AdminBlogCreate.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const coverColorOptions = [
    'linear-gradient(135deg, #06b6d4, #3b82f6)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
    'linear-gradient(135deg, #10b981, #06b6d4)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    'linear-gradient(135deg, #10b981, #84cc16)',
]

export default function AdminBlogCreate() {
    const { secretKey } = useParams()
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        category: '',
        author: '',
        authorRole: '',
        readTime: '5 min read',
        tags: '',
        coverColor: coverColorOptions[0],
        coverImage: '',
        content: '',
    })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'title' ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') } : {})
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: '', message: '' })

        try {
            const blogPayload = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                secretKey,
            }

            const res = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogPayload),
            })

            const data = await res.json()

            if (res.ok) {
                setStatus({ type: 'success', message: 'Blog post created successfully!' })
                setFormData({
                    title: '', slug: '', excerpt: '', category: '', author: '',
                    authorRole: '', readTime: '5 min read', tags: '',
                    coverColor: coverColorOptions[0], coverImage: '', content: '',
                })
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to create blog post.' })
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error. Is the server running?' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div className="page-transition admin-page" {...pageTransition}>
            <SEO title="Admin — Create Blog Post" description="Admin panel to create blog posts" />

            <section className="admin-hero">
                <div className="container">
                    <div className="admin-header">
                        <HiPlus className="admin-icon" />
                        <h1>Create <span className="gradient-text">Blog Post</span></h1>
                        <p>Admin Panel — Only accessible with a valid secret key</p>
                    </div>
                </div>
            </section>

            <section className="section admin-section">
                <div className="container">
                    {status.message && (
                        <div className={`admin-status ${status.type}`}>
                            {status.type === 'success' ? <HiCheck /> : <HiX />}
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-form card">
                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Title *</label>
                                <input
                                    type="text" name="title" value={formData.title}
                                    onChange={handleChange} placeholder="Blog post title" required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Slug (auto-generated)</label>
                                <input
                                    type="text" name="slug" value={formData.slug}
                                    onChange={handleChange} placeholder="url-friendly-slug" required
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label>Excerpt *</label>
                            <textarea
                                name="excerpt" value={formData.excerpt} rows="3"
                                onChange={handleChange} placeholder="Brief description of the post" required
                            />
                        </div>

                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Category *</label>
                                <input
                                    type="text" name="category" value={formData.category}
                                    onChange={handleChange} placeholder="e.g. Industry Trends" required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Author *</label>
                                <input
                                    type="text" name="author" value={formData.author}
                                    onChange={handleChange} placeholder="Author name" required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Author Role</label>
                                <input
                                    type="text" name="authorRole" value={formData.authorRole}
                                    onChange={handleChange} placeholder="e.g. Technical Director"
                                />
                            </div>
                        </div>

                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Read Time</label>
                                <input
                                    type="text" name="readTime" value={formData.readTime}
                                    onChange={handleChange} placeholder="5 min read"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Tags (comma-separated)</label>
                                <input
                                    type="text" name="tags" value={formData.tags}
                                    onChange={handleChange} placeholder="tech, rental, networking"
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label>Cover Image URL (optional)</label>
                            <input
                                type="url" name="coverImage" value={formData.coverImage}
                                onChange={handleChange} placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label>Cover Gradient</label>
                            <div className="color-options">
                                {coverColorOptions.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={`color-swatch ${formData.coverColor === color ? 'color-swatch-active' : ''}`}
                                        style={{ background: color }}
                                        onClick={() => setFormData(prev => ({ ...prev, coverColor: color }))}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label>Content (HTML) *</label>
                            <textarea
                                name="content" value={formData.content} rows="15"
                                onChange={handleChange}
                                placeholder="<h2>Section Title</h2><p>Your content here...</p>"
                                required
                            />
                        </div>

                        {/* Preview */}
                        {formData.content && (
                            <div className="admin-preview">
                                <h4>Content Preview</h4>
                                <div className="blog-content" dangerouslySetInnerHTML={{ __html: formData.content }} />
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-lg admin-submit" disabled={loading}>
                            <span>{loading ? 'Publishing...' : 'Publish Blog Post'}</span>
                            <HiPlus />
                        </button>
                    </form>
                </div>
            </section>
        </motion.div>
    )
}
