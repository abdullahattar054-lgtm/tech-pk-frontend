import { motion } from 'framer-motion';

const Hero3DSkeleton = () => {
    return (
        <div className="w-full h-full min-h-[300px] md:min-h-[500px] absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            {/* Main Silhouette matches the 3D model geometry */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Rotating Ring Skeleton */}
                <motion.div
                    animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-primary/10 rounded-full"
                    style={{
                        boxShadow: '0 0 40px rgba(0, 102, 255, 0.05)',
                        borderStyle: 'dashed'
                    }}
                />

                {/* Core Geometry Skeleton */}
                <motion.div
                    animate={{
                        scale: [0.9, 1.1, 0.9],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-1/4 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl transform rotate-45 blur-sm"
                />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    <motion.div
                        animate={{
                            x: ['-100%', '200%'],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />
                </div>

                {/* Floating Particle Skeletons */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${10 + (i % 3) * 20}%`
                        }}
                    />
                ))}
            </div>

            {/* Instant Background Glow to ground the element */}
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-110 pointer-events-none" />
        </div>
    );
};

export default Hero3DSkeleton;
