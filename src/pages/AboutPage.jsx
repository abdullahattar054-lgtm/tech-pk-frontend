import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiAward,
    FiHeart,
    FiZap,
    FiShield,
    FiTruck,
    FiHeadphones,
    FiStar,
    FiUsers,
    FiCheckCircle
} from 'react-icons/fi';
import { ShieldCheck, Truck, Headset, Star, Users, Award, Zap, Heart } from 'lucide-react';

const StatCard = ({ number, label, suffix = "+", icon: Icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(number.replace(/,/g, ''));
        if (start === end) return;

        let totalMiliseconds = 2000;
        let incrementTime = (totalMiliseconds / end) * 50;

        let timer = setInterval(() => {
            start += Math.ceil(end / 40);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [number]);

    return (
        <div className="glass p-8 rounded-[2.5rem] border border-border hover:border-primary/30 transition-all group" data-aos="zoom-in">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Icon size={28} />
            </div>
            <h3 className="text-4xl font-black mb-2 text-foreground">
                {count.toLocaleString()}{suffix}
            </h3>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">{label}</p>
        </div>
    );
};

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
                <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                <div className="container-custom relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/10 text-primary text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] border border-primary/20 backdrop-blur-md mb-8 inline-block"
                    >
                        Our Journey
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-hero-custom mb-8"
                    >
                        Pioneering <span className="text-gradient">Premium Tech</span> <br /> in Pakistan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        More than just an e-commerce platform – we're a hub for tech enthusiasts who demand excellence in audio and wearables.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link to="/products" className="btn-primary">Explore Collection</Link>
                        <Link to="/contact" className="btn-secondary">Get in Touch</Link>
                    </motion.div>
                </div>

                {/* Animated Shapes */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow" />
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-background-alt border-y border-border">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatCard icon={Users} number="10,000" label="Happy Customers" />
                        <StatCard icon={Award} number="500" label="Premium Products" />
                        <StatCard icon={Zap} number="50" label="Global Brands" />
                        <StatCard icon={Heart} number="99" label="Satisfaction Rate" suffix="%" />
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-32 section-padding overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div data-aos="fade-right">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-3xl opacity-30" />
                                <div className="relative rounded-[3rem] overflow-hidden border border-border shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=1000"
                                        alt="Modern Workspace"
                                        className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-left" data-aos="fade-left">
                            <h2 className="text-display-custom mb-8">Our <span className="text-gradient">Story</span></h2>
                            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                                <p>
                                    Founded in 2024, <span className="text-primary font-bold">TECH.PK</span> emerged from a simple observation: Pakistan deserved better access to authentic, high-end wearable technology.
                                </p>
                                <p>
                                    What started as a small team of tech enthusiasts has grown into the nation's premier destination for premium audio gear and smart wearables. We don't just sell products; we curate experiences that elevate your daily life.
                                </p>
                                <p>
                                    Today, we're proud to partner with leading global brands to bring you the latest innovations with a focus on quality, reliability, and unparalleled customer support.
                                </p>
                            </div>
                            <div className="mt-12 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-primary p-0.5">
                                    <img src="https://ui-avatars.com/api/?name=ABDULLAH+ATTAR&background=0066FF&color=fff" className="w-full h-full rounded-full" alt="avatar" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">ABDULLAH ATTAR</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Founder & CEO</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-32 bg-background-alt border-y border-border">
                <div className="container-custom">
                    <div className="text-center mb-20" data-aos="fade-up">
                        <h2 className="text-display-custom mb-4">Values that <span className="text-gradient">Drive Us</span></h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Our commitment to excellence is built on several key pillars that ensure you get the best experience.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Award, title: "Quality First", desc: "We only source 100% genuine, premium-grade products from authorized distributors." },
                            { icon: Heart, title: "Customer Focus", desc: "Your satisfaction is our obsession. We're here 24/7 to help you with anything." },
                            { icon: Zap, title: "Innovation", desc: "Stay ahead of the curve with the latest tech trends and groundbreaking devices." },
                            { icon: ShieldCheck, title: "Trust & Security", desc: "Every transaction is encrypted and every product is verified for authenticity." },
                            { icon: Truck, title: "Fast Delivery", desc: "Get your gear delivered within 24-48 hours with our express shipping network." },
                            { icon: Headset, title: "Expert Support", desc: "Our specialists are ready to provide technical assistance whenever you need it." }
                        ].map((value, i) => (
                            <div
                                key={value.title}
                                className="glass p-10 rounded-[2.5rem] border border-border hover:border-primary/20 hover:bg-primary/5 transition-all group"
                                data-aos="flip-up"
                                data-aos-delay={i * 100}
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:rotate-[360deg] transition-transform duration-700">
                                    <value.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-foreground">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-32 section-padding relative overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {[
                            { title: "Authentic Products", icon: CheckCircle, desc: "Every item in our collection is 100% genuine and verified. We don't do fakes." },
                            { title: "Competitive Pricing", icon: Zap, desc: "Premium technology shouldn't mean inflated prices. We offer the best deals in Pakistan." },
                            { title: "Easy Returns", icon: Headset, desc: "Not happy with your purchase? Enjoy a 30-day hassle-free return policy." }
                        ].map((item, i) => (
                            <div key={i} className="text-center lg:text-left" data-aos="fade-up" data-aos-delay={i * 200}>
                                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 mx-auto lg:ml-0 text-primary">
                                    <item.icon size={32} />
                                </div>
                                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 mb-20 px-4">
                <div className="container-custom">
                    <div className="glass rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group" data-aos="zoom-in">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative z-10">
                            <h2 className="text-hero-custom mb-8">Ready to Experience <br /> <span className="text-gradient">Premium Tech?</span></h2>
                            <p className="text-muted-foreground text-xl mb-12 max-w-xl mx-auto">Join thousands of happy customers and elevate your technology game today.</p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link to="/products" className="btn-primary py-5 px-12 text-lg">Shop Now</Link>
                                <Link to="/contact" className="btn-secondary py-5 px-12 text-lg">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// CheckCircle placeholder as it was missing from imports
const CheckCircle = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

export default AboutPage;
