import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logout } from '../../redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const dispatch = useDispatch();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const { mode } = useSelector((state) => state.theme);


    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border transition-colors duration-300"
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-xs text-white">T</span>
                        </div>
                        <span className="text-gradient">TECH.PK</span>
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
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
                        >
                            <div className="px-4 py-6 space-y-4">
                                {['Home', 'Products', 'About', 'Contact', 'Blog'].map((item) => (
                                    <Link
                                        key={item}
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-3 text-lg font-bold text-foreground hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-border">
                                    {isAuthenticated ? (
                                        <div className="flex items-center justify-between">
                                            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                                                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0066FF&color=fff`} className="w-10 h-10 rounded-full" alt="profile" />
                                                <span className="font-bold text-foreground">{user?.name}</span>
                                            </Link>
                                            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-sm font-bold text-primary">
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3 bg-primary text-white text-center font-bold rounded-xl">
                                            Login
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
