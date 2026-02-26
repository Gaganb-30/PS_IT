require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Blog = require('./models/Blog');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));

// NodeMailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ═══════════════════════════════════════
//  CONTACT FORM ENDPOINT
// ═══════════════════════════════════════
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, phone, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        // Email to admin
        const adminMailOptions = {
            from: `"PS IT Solutions Website" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Inquiry from ${name} — ${service || 'General'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #06b6d4;">New Contact Form Submission</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Service:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${service || 'N/A'}</td></tr>
                    </table>
                    <h3 style="margin-top: 20px;">Message:</h3>
                    <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${message}</p>
                </div>
            `,
        };

        // Acknowledgment email to user
        const userMailOptions = {
            from: `"PS IT Solutions" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Thank You for Contacting PS IT Solutions!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0;">PS IT Solutions</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">IT Hardware Rental & Networking Services</p>
                    </div>
                    <div style="padding: 30px; background: #ffffff; border-radius: 0 0 12px 12px; border: 1px solid #eee;">
                        <h2 style="color: #333;">Thank you, ${name}!</h2>
                        <p style="color: #666; line-height: 1.6;">We have received your inquiry and our team will get back to you within 24 hours. If your matter is urgent, please call us directly.</p>
                        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 4px 0;"><strong>📞 Phone/WhatsApp:</strong> 7983911594</p>
                            <p style="margin: 4px 0;"><strong>📧 Email:</strong> info@psitsolutions.in</p>
                            <p style="margin: 4px 0;"><strong>📍 Location:</strong> Noida & Delhi NCR</p>
                        </div>
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">This is an automated response. Please do not reply to this email.</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        res.json({ success: true, message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

// ═══════════════════════════════════════
//  BLOG ENDPOINTS
// ═══════════════════════════════════════

// GET all blogs (public)
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true })
            .sort({ createdAt: -1 })
            .select('-content');
        res.json(blogs);
    } catch (error) {
        console.error('Fetch blogs error:', error);
        res.status(500).json({ error: 'Failed to fetch blogs.' });
    }
});

// GET single blog by slug (public)
app.get('/api/blogs/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, published: true });
        if (!blog) return res.status(404).json({ error: 'Blog post not found.' });
        res.json(blog);
    } catch (error) {
        console.error('Fetch blog error:', error);
        res.status(500).json({ error: 'Failed to fetch blog post.' });
    }
});

// POST create blog (admin only — requires secret key)
app.post('/api/blogs', async (req, res) => {
    try {
        const { secretKey, ...blogData } = req.body;

        if (secretKey !== process.env.BLOG_SECRET_KEY) {
            return res.status(403).json({ error: 'Invalid secret key. Access denied.' });
        }

        if (!blogData.title || !blogData.slug || !blogData.content || !blogData.excerpt || !blogData.category || !blogData.author) {
            return res.status(400).json({ error: 'Title, slug, excerpt, category, author, and content are required.' });
        }

        const existing = await Blog.findOne({ slug: blogData.slug });
        if (existing) {
            return res.status(409).json({ error: 'A blog post with this slug already exists.' });
        }

        const blog = new Blog(blogData);
        await blog.save();

        res.status(201).json({ success: true, blog });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ error: 'Failed to create blog post.' });
    }
});

// Seed blogs endpoint (one-time use to migrate existing data)
app.post('/api/blogs/seed', async (req, res) => {
    try {
        const { secretKey, blogs } = req.body;
        if (secretKey !== process.env.BLOG_SECRET_KEY) {
            return res.status(403).json({ error: 'Invalid secret key.' });
        }

        const count = await Blog.countDocuments();
        if (count > 0) {
            return res.status(400).json({ error: 'Database already has blog posts. Seed skipped.' });
        }

        const inserted = await Blog.insertMany(blogs);
        res.status(201).json({ success: true, count: inserted.length });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ error: 'Failed to seed blogs.' });
    }
});

// ═══════════════════════════════════════
//  START SERVER
// ═══════════════════════════════════════
app.listen(PORT, () => {
    console.log(`🚀 PS IT Solutions server running on port ${PORT}`);
});
