import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi'
import SEO from '../components/SEO'
import './AdminLogin.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function AdminLogin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // If already logged in, redirect
    const token = localStorage.getItem('adminToken')
    if (token) {
        navigate('/admin/controls', { replace: true })
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()

            if (res.ok && data.token) {
                localStorage.setItem('adminToken', data.token)
                navigate('/admin/controls', { replace: true })
            } else {
                setError(data.error || 'Invalid credentials')
            }
        } catch (err) {
            setError('Network error. Is the server running?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div className="page-transition admin-login-page" {...pageTransition}>
            <SEO title="Admin Login — PS IT Solutions" description="Admin login panel" />

            <div className="admin-login-wrapper">
                <div className="admin-login-bg">
                    <div className="login-glow login-glow-1" />
                    <div className="login-glow login-glow-2" />
                    <div className="login-glow login-glow-3" />
                </div>

                <motion.div
                    className="admin-login-card"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="login-card-header">
                        <div className="login-icon-wrapper">
                            <HiLockClosed />
                        </div>
                        <h1>Admin <span className="gradient-text">Panel</span></h1>
                        <p>Sign in to manage your blog</p>
                    </div>

                    {error && (
                        <motion.div
                            className="login-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="login-field">
                            <label htmlFor="username">Username</label>
                            <div className="login-input-wrapper">
                                <HiUser className="login-input-icon" />
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <div className="login-input-wrapper">
                                <HiLockClosed className="login-input-icon" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <HiEyeOff /> : <HiEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg login-submit"
                            disabled={loading}
                        >
                            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                            <HiLockClosed />
                        </button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    )
}
