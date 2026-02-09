import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Magnetic = ({ children, strength = 0.5, mobileDisabled = true, className = '' }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (mobileDisabled && window.innerWidth < 768) return;

        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        setPosition({
            x: distanceX * strength,
            y: distanceY * strength
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`block ${className || ''}`}
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
