import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AdminBlogCreate from './pages/AdminBlogCreate'
import ScrollToTop from './components/ScrollToTop'

function App() {
    const location = useLocation()

    return (
        <>
            <ScrollToTop />
            <Layout>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/admin/create-blog/:secretKey" element={<AdminBlogCreate />} />
                    </Routes>
                </AnimatePresence>
            </Layout>
        </>
    )
}

export default App
