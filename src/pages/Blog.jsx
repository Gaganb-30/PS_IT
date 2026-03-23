import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight, HiCalendar } from "react-icons/hi";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";
import blogPostsStatic from "../data/blogPosts";
import "./Blog.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Strip HTML tags and get plain text preview
const getContentPreview = (html, maxLen = 140) => {
  if (!html) return "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trim() + "..." : text;
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(blogPostsStatic);
        }
      } else {
        setBlogs(blogPostsStatic);
      }
    } catch (err) {
      console.warn("Blog API not available, using static data:", err.message);
      setBlogs(blogPostsStatic);
    } finally {
      setLoading(false);
    }
  };

  const visibleBlogs = blogs.slice(0, visibleCount);
  const hasMore = visibleCount < blogs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div className="page-transition" {...pageTransition}>
      <SEO
        title="Blog — IT Insights & Tips | PS IT Solutions"
        description="Expert insights on IT hardware rental, networking, CCTV, and business technology. Stay informed with PS IT Solutions blog."
        keywords="IT blog, hardware rental insights, networking tips, CCTV guide, technology blog"
      />

      <section className="page-hero">
        <div className="page-hero-bg">
          <div
            className="glow-orb glow-orb-cyan"
            style={{ width: 350, height: 350, top: -80, right: "20%" }}
          />
          <div
            className="glow-orb glow-orb-purple"
            style={{ width: 280, height: 280, bottom: -50, left: "10%" }}
          />
        </div>
        <div className="container page-hero-content">
          <ScrollReveal>
            <span className="section-label">Our Blog</span>
            <h1>
              Insights & <span className="gradient-text">Resources</span>
            </h1>
            <p className="page-hero-desc">
              Expert articles on IT hardware, networking, CCTV, and technology
              trends. Stay ahead with actionable insights from our team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
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
                  <ScrollReveal
                    key={post._id || post.id || post.slug}
                    delay={i * 0.08}
                  >
                    <div className="blog-card">
                      {/* Cover Image */}
                      <div
                        className="blog-card-cover"
                        style={{ background: post.coverColor }}
                      >
                        {post.coverImage && (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="blog-card-cover-img"
                          />
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="blog-card-body">
                        <div className="blog-card-meta-row">
                          {(post.createdAt || post.date) && (
                            <span className="blog-card-date">
                              {formatDate(post.createdAt || post.date)}
                            </span>
                          )}
                          {post.category && (
                            <span className="blog-card-category-badge">
                              {post.category}
                            </span>
                          )}
                        </div>

                        <h3 className="blog-card-title">{post.title}</h3>

                        <p className="blog-card-preview">
                          {getContentPreview(post.excerpt || post.content)}
                        </p>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="blog-read-btn"
                        >
                          READ MORE
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <ScrollReveal>
                  <div className="blog-load-more">
                    <button
                      onClick={handleLoadMore}
                      className="btn btn-secondary btn-lg"
                    >
                      <span>View More Articles</span>
                      <HiArrowRight />
                    </button>
                  </div>
                </ScrollReveal>
              )}

              {/* No Results */}
              {blogs.length === 0 && (
                <div className="blog-empty">
                  <p>No articles found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
}
