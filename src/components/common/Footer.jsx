import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
    const { mode } = useSelector((state) => state.theme);

    return (
        <footer className="bg-background-alt border-t border-border pt-24 pb-12 transition-colors duration-500">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link to="/" className="block group transition-all duration-300">
                            <img
                                src={mode === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
                                alt="TECH.PK"
                                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-muted-foreground leading-relaxed max-w-xs">
                            Discover the next generation of premium electronics. We bring future-proof technology directly to your doorstep.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors font-medium">Collections</Link></li>
                            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">Our Story</Link></li>
                            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact Us</Link></li>
                            <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors font-medium">Tech Blog</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-foreground font-bold uppercase tracking-widest text-xs mb-8">Stay Connected</h4>
                        <p className="text-muted-foreground mb-6 font-medium">Join our global community for exclusive early access and tech insights.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-6 py-4 rounded-2xl bg-background border border-border focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-foreground"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-primary px-6 rounded-xl text-white hover:bg-primary/90 transition-all shadow-glow hover:scale-[1.02] active:scale-95">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-muted-foreground text-sm font-medium">
                        © 2024 TECH.PK. Crafted for the future.
                    </p>
                    <div className="flex space-x-8">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Compliance</a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
