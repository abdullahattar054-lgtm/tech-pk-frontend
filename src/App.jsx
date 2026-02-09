import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from './redux/slices/themeSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Pages
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import AdminPanel from './pages/AdminPanel';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogPage from './pages/BlogPage';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Providers
import { FlyToCartProvider } from './context/FlyToCartContext';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

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
