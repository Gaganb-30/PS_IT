const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorRole: { type: String, default: '' },
    readTime: { type: String, default: '5 min read' },
    tags: [String],
    coverColor: { type: String, default: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    coverImage: { type: String, default: '' },
    content: { type: String, required: true },
    published: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
