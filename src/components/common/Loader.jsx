import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ show }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                >
                    <div className="relative">
                        {/* Central Logo and Branding */}
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="mb-8"
                            >
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-glow">
                                    <span className="text-2xl font-black text-white">T</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-center"
                            >
                                <h2 className="text-3xl font-black tracking-tighter text-foreground mb-1">
                                    TECH<span className="text-primary">.</span>PK
                                </h2>
                                <div className="h-0.5 w-12 bg-primary/30 mx-auto rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.5,
                                            ease: "linear"
                                        }}
                                        className="h-full w-full bg-primary"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Pulsing Circles */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                            <motion.div
                                animate={{
                                    scale: [1, 1.5],
                                    opacity: [0.3, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                                className="w-32 h-32 rounded-full border border-primary/20"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 2],
                                    opacity: [0.2, 0]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                    delay: 0.5
                                }}
                                className="w-32 h-32 rounded-full border border-primary/10 absolute top-0 left-0"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
