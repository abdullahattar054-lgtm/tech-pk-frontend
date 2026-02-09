import { motion } from 'framer-motion';

const SpringyTouch = ({ children, className = "" }) => {
    return (
        <motion.div
            whileTap={{
                scale: 0.94,
                transition: { type: "spring", stiffness: 600, damping: 25 }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default SpringyTouch;
