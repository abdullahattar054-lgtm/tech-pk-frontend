import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logout } from '../../redux/slices/authSlice';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useFlyToCart } from '../../context/FlyToCartContext';
import SpringyTouch from '../animations/SpringyTouch';

const Navbar = () => {
    const dispatch = useDispatch();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY ? "down" : "up";
        if (direction === "down" && latest > 150 && !mobileMenuOpen) {
            setIsVisible(false);
        } else if (direction === "up") {
            setIsVisible(true);
        }
        setLastScrollY(latest);
    });

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const { mode } = useSelector((state) => state.theme);
    const { cartIconRef } = useFlyToCart();


    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50 glass transition-colors duration-300"
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group transition-all duration-300">
                        <img
                            src={mode === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
                            alt="TECH.PK"
                            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-10">
                        {['Home', 'Products', 'About', 'Contact', 'Blog'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-sm font-bold text-muted-foreground hover:text-primary transition-all relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-6">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => dispatch(toggleTheme())}
                            className="p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all relative group overflow-hidden"
                            aria-label="Toggle Theme"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: mode === 'dark' ? 0 : 180, opacity: mode === 'dark' ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                className={mode === 'dark' ? 'block' : 'hidden'}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </motion.div>
                            <motion.div
                                initial={false}
                                animate={{ rotate: mode === 'light' ? 0 : -180, opacity: mode === 'light' ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                className={mode === 'light' ? 'block' : 'hidden'}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </motion.div>
                        </button>

                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className="relative p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            ref={cartIconRef}
                            className="relative p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {items.length}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="hidden sm:flex items-center gap-4">
                                <Link to="/profile" className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 hover:border-primary transition-all">
                                    <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0066FF&color=fff`} className="w-full h-full rounded-full" alt="profile" />
                                </Link>
                                <button onClick={handleLogout} className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden sm:block px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:shadow-[0_0_20px_var(--color-primary-glow)] transition-all">
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <SpringyTouch>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground"
                                aria-label="Toggle mobile menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </SpringyTouch>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] glass-dark md:hidden"
                        >
                            <div className="flex flex-col h-full p-8 pt-24 space-y-8">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="absolute top-6 right-6 p-3 rounded-2xl bg-white/5 border border-white/10"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="space-y-6">
                                    {['Home', 'Products', 'About', 'Contact', 'Blog'].map((item, i) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Link
                                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block text-4xl font-black text-foreground hover:text-primary transition-colors tracking-tighter"
                                            >
                                                {item}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-auto pt-8 border-t border-white/10"
                                >
                                    {isAuthenticated ? (
                                        <div className="flex flex-col gap-6">
                                            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-full border-2 border-primary p-0.5">
                                                    <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0066FF&color=fff`} className="w-full h-full rounded-full" alt="profile" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-xl">{user?.name}</p>
                                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                                className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full py-5 bg-primary text-white text-center font-black rounded-2xl shadow-glow active:scale-95 transition-all text-lg"
                                        >
                                            Login / Get Started
                                        </Link>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
