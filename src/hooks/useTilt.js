import { useState, useCallback } from 'react';
import { useSpring } from 'framer-motion';

export const useTilt = (intensity = 15) => {
    const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

    const onMouseEnter = () => {
        // Optional: Reset on enter
    };

    const onMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width - 0.5) * 2;
        const yPct = (mouseY / height - 0.5) * 2;

        rotateX.set(-yPct * intensity);
        rotateY.set(xPct * intensity);
    }, [intensity, rotateX, rotateY]);

    const onMouseLeave = useCallback(() => {
        rotateX.set(0);
        rotateY.set(0);
    }, [rotateX, rotateY]);

    return { rotateX, rotateY, onMouseMove, onMouseLeave, onMouseEnter };
};
