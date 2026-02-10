import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from './redux/slices/themeSlice';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ProductDetailSkeleton from './components/products/ProductDetailSkeleton';
import ProductCardSkeleton from './components/products/ProductCardSkeleton';

// Lazy load non-critical third-party
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));
// Defer AOS import — not critical for first paint
let AOS = null;

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

    useEffect(() => {
        // Initialize theme from localStorage pronto
        const savedTheme = localStorage.getItem('theme') || 'dark';
        dispatch(setTheme(savedTheme));

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dispatch]);

    useEffect(() => {
        // Defer AOS initialization until browser is idle (non-critical for LCP)
        const initAOS = () => {
            import('aos').then((module) => {
                import('aos/dist/aos.css');
                AOS = module.default;
                AOS.init({
                    duration: 600,
                    easing: 'ease-out-cubic',
                    once: true,
                    mirror: false,
                    offset: 30
                });
            });
        };
        if ('requestIdleCallback' in window) {
            requestIdleCallback(initAOS);
        } else {
            setTimeout(initAOS, 200);
        }
    }, []);

    // Scroll to top and refresh AOS on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            if (AOS) AOS.refresh();
        }, 100);
    }, [location.pathname]);

    return (
        <FlyToCartProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
                <div className="ui-noise" />
                <Navbar />
                <main className="flex-grow pt-20 overflow-hidden">
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
                </main>
                <Suspense fallback={null}><SpeedInsights /></Suspense>
                <Footer />
                <ScrollToTop />
            </div>
        </FlyToCartProvider>
    );
}

export default App;
