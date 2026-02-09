import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlyToCartContext = createContext();

export const useFlyToCart = () => useContext(FlyToCartContext);

export const FlyToCartProvider = ({ children }) => {
    const [animations, setAnimations] = useState([]);
    const cartIconRef = useRef(null);

    const fly = useCallback((startPos, img) => {
        if (!cartIconRef.current) return;

        const cartRect = cartIconRef.current.getBoundingClientRect();
        const id = Date.now();

        const animation = {
            id,
            startPos,
            endPos: {
                x: cartRect.left + cartRect.width / 2,
                y: cartRect.top + cartRect.height / 2
            },
            img
        };

        setAnimations(prev => [...prev, animation]);

        // Clean up after animation
        setTimeout(() => {
            setAnimations(prev => prev.filter(a => a.id !== id));
        }, 1000);
    }, []);

    return (
        <FlyToCartContext.Provider value={{ fly, cartIconRef }}>
            {children}
            <div className="fixed inset-0 pointer-events-none z-[9999]">
                <AnimatePresence>
                    {animations.map(anim => (
                        <motion.img
                            key={anim.id}
                            src={anim.img}
                            initial={{
                                x: anim.startPos.x,
                                y: anim.startPos.y,
                                scale: 1,
                                opacity: 1
                            }}
                            animate={{
                                x: anim.endPos.x,
                                y: anim.endPos.y,
                                scale: 0.2,
                                opacity: 0.8
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="fixed w-20 h-20 object-contain rounded-full bg-white shadow-2xl p-2"
                            style={{
                                left: -40, // Center based on half of width
                                top: -40
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </FlyToCartContext.Provider>
    );
};
