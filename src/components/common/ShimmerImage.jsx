import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShimmerImage = forwardRef(({
    src,
    alt,
    className = '',
    containerClassName = '',
    aspectRatio = 'aspect-[4/5]',
    objectFit = 'object-contain',
    width,
    height,
    priority = false,
    ...props
}, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';

    return (
        <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}>
            {/* Shimmer Placeholder */}
            <AnimatePresence>
                {!isLoaded && !hasError && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 skeleton"
                    />
                )}
            </AnimatePresence>

            {/* Actual Image */}
            <img
                ref={ref}
                src={hasError ? fallbackImage : src}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                fetchPriority={priority ? 'high' : 'auto'}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                className={`w-full h-full ${objectFit} transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                    } ${className}`}
                {...props}
            />

            {/* Glossy Overlay for premium feel */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30" />
        </div>
    );
});

ShimmerImage.displayName = 'ShimmerImage';

export default ShimmerImage;
