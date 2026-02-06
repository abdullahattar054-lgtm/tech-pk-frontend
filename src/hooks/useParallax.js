import { useScroll, useTransform } from 'framer-motion';

export const useParallax = (distance = 100) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, -distance]);
    return { y };
};
