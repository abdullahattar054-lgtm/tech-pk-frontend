import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'The Future of Wireless Audio: What to Expect in 2025',
        excerpt: 'Explore the cutting-edge technologies shaping the next generation of wireless earbuds and headphones.',
        category: 'Technology',
        date: 'Feb 3, 2025',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'
    },
    {
        id: 2,
        title: 'How to Choose the Perfect Smartwatch for Your Lifestyle',
        excerpt: 'A comprehensive guide to finding the smartwatch that fits your health, fitness, and productivity needs.',
        category: 'Guides',
        date: 'Jan 28, 2025',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80'
    },
    {
        id: 3,
        title: 'Gaming Headphones vs Studio Headphones: Which One Do You Need?',
        excerpt: 'Understanding the key differences between gaming and studio headphones to make the right choice.',
        category: 'Comparison',
        date: 'Jan 20, 2025',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
    },
    {
        id: 4,
        title: 'The Rise of Active Noise Cancellation Technology',
        excerpt: 'How ANC evolved from a luxury feature to a must-have in modern audio devices.',
        category: 'Technology',
        date: 'Jan 15, 2025',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    }
];

const BlogPage = () => {
    return (
        <div className="min-h-screen py-24 bg-background">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
                        Our Blog
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Tech <span className="text-gradient">Insights</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Stay updated with the latest trends, tips, and news from the world of premium electronics.
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group bg-background-alt border border-border rounded-2xl md:rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="aspect-[16/10] md:aspect-video overflow-hidden bg-black/20">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 md:p-8">
                                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4">
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                                        <Calendar size={14} />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                                        <Clock size={14} />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <button className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all text-sm md:text-base">
                                    Read More
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 bg-background-alt border border-border rounded-3xl p-12 text-center"
                >
                    <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Subscribe to our newsletter and never miss an update on the latest tech trends and exclusive deals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        />
                        <button className="btn-primary whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPage;
