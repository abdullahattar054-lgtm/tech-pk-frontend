import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import Hero from '../components/home/Hero';
import ProductCard from '../components/products/ProductCard';
import Loader from '../components/common/Loader';
import { useLoader } from '../hooks/useLoader';

// Import local product images for fallback/categories
import productAirpods from '../assets/images/product-airpods.png';
import productWatch from '../assets/images/product-watch.png';
import productHeadsetBlack from '../assets/images/product-headset-black.png';
import productNothingEar from '../assets/images/product-nothing-ear.png';


const Home = () => {
    const { isLoading: isGlobalLoading } = useLoader(500);
    const dispatch = useDispatch();
    const { products, loading: productsLoading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ limit: 4, featured: true }));
    }, [dispatch]);

    const isLoading = isGlobalLoading || productsLoading;

    return (
        <div className="min-h-screen bg-background">
            <Loader show={isLoading} />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="overflow-hidden"
            >
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Hero />
                </motion.div>

                {/* Featured Products Section */}
                <motion.section
                    className="section-padding bg-background relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="container-custom">
                        <motion.div
                            className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="text-left">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Handpicked for you</span>
                                <h2 className="text-display text-foreground mb-4">
                                    Trending <span className="text-gradient">Products</span>
                                </h2>
                                <p className="text-muted-foreground max-w-md">
                                    Explore our most popular electronics, handpicked for quality and performance.
                                </p>
                            </div>
                            <Link to="/products" className="text-primary font-bold hover:text-foreground transition-colors flex items-center gap-2 group">
                                View Selection
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {products && products.length > 0 ? (
                                products.map((product, index) => (
                                    <motion.div
                                        key={product._id}
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))
                            ) : (
                                !productsLoading && <p className="text-muted-foreground text-center col-span-full py-20 bg-background-alt rounded-[2rem]">No featured products found.</p>
                            )}
                        </motion.div>
                    </div>
                </motion.section>

                {/* Categories Section */}
                <motion.section
                    className="section-padding bg-background-alt border-y border-border"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="container-custom">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Browse collections</span>
                            <h2 className="text-display text-foreground">Shop by <span className="text-gradient">Category</span></h2>
                        </motion.div>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                }
                            }}
                        >
                            {[
                                { name: 'Headphones', count: '12 Products', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', link: '/products?category=Headphones' },
                                { name: 'Earbuds', count: '8 Products', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', link: '/products?category=Earbuds' },
                                { name: 'Smartwatches', count: '6 Products', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', link: '/products?category=Smartwatches' }
                            ].map((category, index) => (
                                <motion.div
                                    key={category.name}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.9, y: 30 },
                                        visible: { opacity: 1, scale: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link
                                        to={category.link}
                                        className="relative h-96 rounded-[2.5rem] overflow-hidden group cursor-pointer border border-border bg-background block"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 dark:opacity-80"
                                        />
                                        <div className="relative z-20 h-full flex flex-col justify-end p-10 text-left">
                                            <div className="mb-2">
                                                <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20 backdrop-blur-md inline-block mb-3">
                                                    {category.count}
                                                </span>
                                                <h3 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-4 overflow-hidden">
                                                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider translate-y-1 group-hover:translate-y-0 transition-transform duration-500">Explore Collection</span>
                                                <div className="w-12 h-12 bg-background/80 dark:bg-background/20 backdrop-blur-md rounded-full flex items-center justify-center text-foreground border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section
                    className="section-padding bg-background pb-40"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="container-custom">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {[
                                { title: 'Global Delivery', desc: 'Secure worldwide shipping' },
                                { title: 'Premium Support', desc: '24/7 Priority assistance' },
                                { title: 'Official Warranty', desc: '2 Year full coverage' },
                                { title: 'Verified Quality', desc: '100% Genuine products' },
                            ].map((feature, i) => (
                                <motion.div
                                    key={feature.title}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-left bg-background-alt p-8 rounded-[2.5rem] border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                                >
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl mb-6 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                                    </div>
                                    <h3 className="text-foreground font-bold text-xl mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    );
};

export default Home;
