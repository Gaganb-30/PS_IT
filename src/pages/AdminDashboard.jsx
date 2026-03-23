import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiPlus, HiTrash, HiPencil, HiLogout, HiEye, HiEyeOff, HiExclamation } from 'react-icons/hi'
import SEO from '../components/SEO'
import './AdminDashboard.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteModal, setDeleteModal] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [statusMsg, setStatusMsg] = useState({ type: '', message: '' })

    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        if (!token) {
            navigate('/admin/controls/login', { replace: true })
            return
        }
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/admin/blogs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.status === 401) {
                localStorage.removeItem('adminToken')
                navigate('/admin/controls/login', { replace: true })
                return
            }
            if (res.ok) {
                const data = await res.json()
                setBlogs(data)
            }
        } catch (err) {
            console.error('Failed to fetch blogs:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        setDeleting(true)
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                setBlogs(prev => prev.filter(b => b._id !== id))
                setStatusMsg({ type: 'success', message: 'Blog post deleted successfully!' })
                setTimeout(() => setStatusMsg({ type: '', message: '' }), 3000)
            } else {
                const data = await res.json()
                setStatusMsg({ type: 'error', message: data.error || 'Failed to delete' })
            }
        } catch (err) {
            setStatusMsg({ type: 'error', message: 'Network error while deleting' })
        } finally {
            setDeleting(false)
            setDeleteModal(null)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        navigate('/admin/controls/login', { replace: true })
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '—'
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        })
    }

    if (!token) return null

    return (
        <motion.div className="page-transition admin-page admin-dashboard-page" {...pageTransition}>
            <SEO title="Admin Dashboard — PS IT Solutions" description="Manage blog posts" />

            <section className="admin-hero">
                <div className="container">
                    <div className="admin-dashboard-header">
                        <div>
                            <h1>Blog <span className="gradient-text">Dashboard</span></h1>
                            <p>Manage your blog posts — create, view, or delete</p>
                        </div>
                        <div className="admin-dashboard-actions">
                            <Link to="/admin/controls/create" className="btn btn-primary">
                                <HiPlus /> <span>Create New Blog</span>
                            </Link>
                            <button onClick={handleLogout} className="btn btn-ghost admin-logout-btn">
                                <HiLogout /> <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section admin-section">
                <div className="container">
                    {statusMsg.message && (
                        <motion.div
                            className={`admin-status ${statusMsg.type}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {statusMsg.message}
                        </motion.div>
                    )}

                    {loading ? (
                        <div className="blog-loading">
                            <div className="loading-spinner" />
                            <p>Loading blogs...</p>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="admin-empty">
                            <HiPencil className="admin-empty-icon" />
                            <h3>No blog posts yet</h3>
                            <p>Create your first blog post to get started!</p>
                            <Link to="/admin/controls/create" className="btn btn-primary">
                                <HiPlus /> <span>Create Blog Post</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="admin-blog-table-wrapper">
                            <table className="admin-blog-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Author</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map((blog) => (
                                        <tr key={blog._id}>
                                            <td className="admin-blog-title-cell">
                                                <div
                                                    className="admin-blog-color-dot"
                                                    style={{ background: blog.coverColor }}
                                                />
                                                <span>{blog.title}</span>
                                            </td>
                                            <td>
                                                <span className="admin-category-badge">{blog.category}</span>
                                            </td>
                                            <td>{blog.author}</td>
                                            <td>{formatDate(blog.createdAt)}</td>
                                            <td>
                                                <span className={`admin-status-badge ${blog.published ? 'published' : 'draft'}`}>
                                                    {blog.published ? (
                                                        <><HiEye /> Published</>
                                                    ) : (
                                                        <><HiEyeOff /> Draft</>
                                                    )}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="admin-actions">
                                                    <Link
                                                        to={`/blog/${blog.slug}`}
                                                        className="admin-action-btn view"
                                                        title="View post"
                                                        target="_blank"
                                                    >
                                                        <HiEye />
                                                    </Link>
                                                    <button
                                                        className="admin-action-btn delete"
                                                        title="Delete post"
                                                        onClick={() => setDeleteModal(blog)}
                                                    >
                                                        <HiTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="admin-blog-count">
                        Total: <strong>{blogs.length}</strong> blog post{blogs.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </section>

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <motion.div
                    className="admin-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => !deleting && setDeleteModal(null)}
                >
                    <motion.div
                        className="admin-modal"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="admin-modal-icon">
                            <HiExclamation />
                        </div>
                        <h3>Delete Blog Post?</h3>
                        <p>Are you sure you want to delete "<strong>{deleteModal.title}</strong>"? This action cannot be undone.</p>
                        <div className="admin-modal-actions">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setDeleteModal(null)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn admin-delete-confirm-btn"
                                onClick={() => handleDelete(deleteModal._id)}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    )
}
