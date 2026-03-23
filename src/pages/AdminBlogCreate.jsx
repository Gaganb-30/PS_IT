import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiPlus, HiCheck, HiX, HiArrowLeft } from 'react-icons/hi'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import SEO from '../components/SEO'
import './AdminBlogCreate.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false
    }
}

const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'blockquote', 'code-block',
    'list', 'indent', 'direction', 'align',
    'link', 'image', 'video'
]

export default function AdminBlogCreate() {
    const navigate = useNavigate()
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        if (!token) {
            navigate('/admin/controls/login', { replace: true })
        }
    }, [])

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        author: '',
        tags: '',
        coverImage: '',
        published: true,
    })
    const [content, setContent] = useState('')
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
        if (!content || content === '<p><br></p>') {
            setStatus({ type: 'error', message: 'Content is required!' })
            return
        }
        setLoading(true)
        setStatus({ type: '', message: '' })

        try {
            const blogPayload = {
                ...formData,
                content,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            }

            const res = await fetch(`${API_URL}/api/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(blogPayload),
            })

            const data = await res.json()

            if (res.ok) {
                setStatus({ type: 'success', message: 'Blog post created successfully!' })
                setFormData({
                    title: '', slug: '', category: '', author: '',
                    tags: '', coverImage: '', published: true,
                })
                setContent('')
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                if (res.status === 401) {
                    localStorage.removeItem('adminToken')
                    navigate('/admin/controls/login', { replace: true })
                    return
                }
                setStatus({ type: 'error', message: data.error || 'Failed to create blog post.' })
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error. Is the server running?' })
        } finally {
            setLoading(false)
        }
    }

    if (!token) return null

    return (
        <motion.div className="page-transition admin-page" {...pageTransition}>
            <SEO title="Create Blog Post — Admin" description="Admin panel to create blog posts" />

            <section className="admin-hero">
                <div className="container">
                    <div className="admin-create-header">
                        <button
                            onClick={() => navigate('/admin/controls')}
                            className="btn btn-ghost admin-back-btn"
                        >
                            <HiArrowLeft /> <span>Back to Dashboard</span>
                        </button>
                        <div className="admin-header">
                            <HiPlus className="admin-icon" />
                            <h1>Create <span className="gradient-text">Blog Post</span></h1>
                            <p>Use the rich text editor to write your blog content</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section admin-section">
                <div className="container">
                    {status.message && (
                        <motion.div
                            className={`admin-status ${status.type}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {status.type === 'success' ? <HiCheck /> : <HiX />}
                            {status.message}
                        </motion.div>
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
                        </div>

                        <div className="admin-form-row">
                            <div className="admin-form-group">
                                <label>Tags (comma-separated)</label>
                                <input
                                    type="text" name="tags" value={formData.tags}
                                    onChange={handleChange} placeholder="tech, rental, networking"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Cover Image URL</label>
                                <input
                                    type="url" name="coverImage" value={formData.coverImage}
                                    onChange={handleChange} placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-publish-toggle">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                                />
                                <span className="toggle-slider" />
                                <span>{formData.published ? 'Published' : 'Draft'}</span>
                            </label>
                        </div>

                        {/* Rich Text Editor */}
                        <div className="admin-form-group admin-editor-group">
                            <label>Content *</label>
                            <div className="admin-quill-wrapper">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={quillModules}
                                    formats={quillFormats}
                                    placeholder="Start writing your blog post..."
                                />
                            </div>
                        </div>

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
