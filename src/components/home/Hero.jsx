import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { useWindowSize } from '../../hooks/useWindowSize';
import Hero3DSkeleton from '../animations/Hero3DSkeleton';

// Lazy load heavy canvas components to unblock main thread during LCP
const Hero3D = lazy(() => import('../animations/Hero3D'));
const Particles = lazy(() => import('../animations/Particles'));

const Hero = () => {
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 800], [0, -50]);
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    // Debug log to verify deployment
    if (isMobile) console.log('Mobile Particles Hero v3.0 (Glowing) Loaded');

    const [showScene, setShowScene] = useState(false);
    const [is3DReady, setIs3DReady] = useState(false);
    const { rotateX, rotateY, onMouseMove, onMouseLeave, onMouseEnter } = useTilt(10);

    // Defer the 3D scene start to allow the main UI to hydrate and become interactive first
    useEffect(() => {
        if (!isMobile) {
            const timer = setTimeout(() => setShowScene(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [isMobile]);

    const headlineVariants = {
        hidden: { x: -60, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 14, delay: 0.5 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
    };

    return (
        <section
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            className="relative h-screen flex items-center justify-center overflow-hidden bg-background"
        >
            {/* Layer 1: Background Mesh/Gradient */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 bg-mesh-gradient opacity-40 dark:opacity-60"
            />

            {/* Layer 2: 3D Scene Background with Instant Skeleton & Smooth Handoff */}
            {!isMobile && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Instant Skeleton (0ms) */}
                    <div className={`transition-opacity duration-1000 ${is3DReady ? 'opacity-0' : 'opacity-100'}`}>
                        <Hero3DSkeleton />
                    </div>

                    {/* 3D Scene (Lazy Loaded + Fade In) */}
                    <Suspense fallback={null}>
                        {showScene && (
                            <div className={`transition-opacity duration-1000 ${is3DReady ? 'opacity-100' : 'opacity-0'}`}>
                                <Hero3D
                                    isMobile={isMobile}
                                    onReady={() => setIs3DReady(true)}
                                />
                            </div>
                        )}
                    </Suspense>
                </div>
            )}

            {/* Layer 3: Particles - Lazy loaded to not block first paint */}
            <Suspense fallback={null}>
                <Particles
                    color="#0066FF"
                    density={isMobile ? 60 : 60}
                    speed={isMobile ? 1.5 : 0.8}
                    opacity={0.8}
                    isMobile={isMobile}
                    connectDistance={isMobile ? 0 : 150}
                />
            </Suspense>

            {/* Layer 4: Foreground Content with Tilt Effect */}
            <motion.div
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    perspective: 1000
                }}
                className={`container-custom relative z-10 pointer-events-none ${isMobile ? 'px-5 pt-20' : ''}`}
            >
                <div className={`grid ${isMobile ? 'grid-cols-1 text-center' : 'grid-cols-1 lg:grid-cols-2 gap-12'} items-center`}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className={`${isMobile ? 'text-center' : 'text-left'} pointer-events-auto`}
                    >
                        <motion.div variants={headlineVariants} className="overflow-hidden">
                            <h1 className={`leading-none mb-6 text-foreground tracking-tighter ${isMobile ? 'text-5xl' : 'text-hero'}`}>
                                Future of <br />
                                <span className="text-gradient">Pure Sound.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className={`text-muted-foreground mb-8 leading-relaxed font-medium ${isMobile ? 'text-base px-2 max-w-sm mx-auto' : 'text-xl max-w-lg'}`}
                        >
                            Experience the next generation of audio precision with the all-new AirPods Pro. Enhanced bass, active noise cancellation, and all-day comfort.
                        </motion.p>

                        {/* Buttons - Stack vertically on mobile with touch-friendly sizing */}
                        <motion.div
                            variants={itemVariants}
                            className={`flex ${isMobile ? 'flex-col items-center gap-4 w-full px-4' : 'flex-row gap-4'}`}
                        >
                            <button className={`btn-primary group ${isMobile ? 'w-full max-w-xs min-h-[52px] py-4 px-8 text-base' : ''}`}>
                                Pre-order Now
                                <span className="inline-block transform group-hover:translate-x-1 transition-transform ml-2">→</span>
                            </button>
                            <button className={`bg-background-alt/50 backdrop-blur-md rounded-full text-foreground border border-border hover:bg-background-alt transition-all font-bold ${isMobile ? 'w-full max-w-xs min-h-[52px] py-4 px-8 text-base' : 'py-4 px-10'}`}>
                                View Specs
                            </button>
                        </motion.div>

                        {/* Trust indicators - Adjust for mobile */}
                        <motion.div
                            variants={itemVariants}
                            className={`mt-10 flex items-center gap-4 ${isMobile ? 'justify-center' : ''}`}
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] text-foreground overflow-hidden shadow-sm ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" loading="lazy" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className={`text-muted-foreground font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                Trusted by <span className="text-foreground font-bold italic tracking-tight">10k+</span> enthusiasts
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right side area - Space for 3D model on desktop */}
                    {!isMobile && (
                        <div className="relative flex justify-center items-center h-[500px]">
                            {/* Desktop: 3D model renders in background layer */}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Scroll Indicator - Hidden on mobile for cleaner look */}
            {!isMobile && (
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                >
                    <div className="w-[1.5px] h-14 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black">Explore</span>
                </motion.div>
            )}
        </section>
    );
};

export default Hero;

