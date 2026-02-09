import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from './redux/slices/themeSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Loader from './components/common/Loader';
import ProductDetailSkeleton from './components/products/ProductDetailSkeleton';
import ProductCardSkeleton from './components/products/ProductCardSkeleton';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Providers
import { FlyToCartProvider } from './context/FlyToCartContext';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

// Loading Fallbacks
const PageSkeleton = () => (
    <div className="container-custom py-20 min-h-screen">
        <div className="animate-pulse space-y-8">
            <div className="h-12 bg-background-alt rounded-2xl w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-background-alt rounded-[2.5rem]" />
                ))}
            </div>
        </div>
    </div>
);

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        // Initial Loading Screen Timing
        // Mobile optimization: shorter timeout for lower LCP impact
        const isMobile = window.innerWidth < 768;
        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, isMobile ? 1200 : 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        dispatch(setTheme(savedTheme));

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Initialize AOS
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 30
        });
    }, [dispatch]);

    // Scroll to top and refresh AOS on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }, [location.pathname]);

    return (
        <FlyToCartProvider>
            {/* Global Loader - Restored by user request for "Cool factor" */}
            <Loader show={isAppLoading} />

            <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
                <div className="ui-noise" />
                <Navbar />
                <main className="flex-grow pt-20 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <Suspense fallback={<PageSkeleton />}>
                                <Routes location={location} key={location.pathname}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/products" element={<ProductsPage />} />
                                    <Route path="/product/:id" element={<ProductDetailPage />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/wishlist" element={<WishlistPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/signup" element={<SignupPage />} />
                                    <Route path="/orders" element={<OrdersPage />} />
                                    <Route path="/profile/*" element={<ProfilePage />} />
                                    <Route path="/admin/*" element={<AdminPanel />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/contact" element={<ContactPage />} />
                                    <Route path="/blog" element={<BlogPage />} />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </Suspense>
                        </motion.div>
                    </AnimatePresence>
                </main>
                <SpeedInsights />
                <Footer />
                <ScrollToTop />
            </div>
        </FlyToCartProvider>
    );
}

export default App;
