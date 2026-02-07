import { motion, useScroll, useTransform } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { useWindowSize } from '../../hooks/useWindowSize';
import Particles from '../animations/Particles';
import Hero3D from '../animations/Hero3D';
import heroAirpods from '../../assets/images/hero-airpods.png';

const Hero = () => {
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 800], [0, -50]);
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(10);

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
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Layer 1: Background Mesh/Gradient */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 bg-mesh-gradient opacity-40 dark:opacity-60"
            />

            {/* Layer 2: 3D Scene Background/Overlay */}
            <Hero3D isMobile={isMobile} />

            {/* Layer 3: Particles - Reduced density on mobile */}
            <Particles color="#0066FF" density={isMobile ? 15 : 40} />

            {/* Layer 4: Foreground Content */}
            <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-left pointer-events-auto"
                >
                    <motion.div variants={headlineVariants} className="overflow-hidden">
                        <h1 className="text-hero leading-none mb-6 text-foreground tracking-tighter">
                            Future of <br />
                            <span className="text-gradient">Pure Sound.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed font-medium"
                    >
                        Experience the next generation of audio precision with the all-new AirPods Pro. Enhanced bass, active noise cancellation, and all-day comfort.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex gap-4">
                        <button className="btn-primary group">
                            Pre-order Now
                            <span className="inline-block transform group-hover:translate-x-1 transition-transform ml-2">→</span>
                        </button>
                        <button className="bg-background-alt/50 backdrop-blur-md py-4 px-10 rounded-full text-foreground border border-border hover:bg-background-alt transition-all font-bold">
                            View Specs
                        </button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex items-center gap-6"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] text-foreground overflow-hidden shadow-sm">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            Trusted by <span className="text-foreground font-bold italic tracking-tight">10k+</span> enthusiasts
                        </p>
                    </motion.div>
                </motion.div>

                {/* Right side area */}
                <div className="relative flex justify-center items-center h-[300px] md:h-[500px]">
                </div>
            </div>


            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <div className="w-[1.5px] h-14 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black">Explore</span>
            </motion.div>
        </section>
    );
};

export default Hero;
