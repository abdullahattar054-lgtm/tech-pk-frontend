import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { useTilt } from '../../hooks/useTilt';
import { ShoppingCart, Eye } from 'lucide-react';
import Magnetic from '../animations/Magnetic';
import SpringyTouch from '../animations/SpringyTouch';
import { useFlyToCart } from '../../context/FlyToCartContext';
import { useRef } from 'react';

const ProductCard = memo(({ product }) => {
    const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(12);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
    const [hoveredColor, setHoveredColor] = useState(null);
    const { fly } = useFlyToCart();
    const imgRef = useRef(null);

    const activeColor = hoveredColor || selectedColor;
    const currentVariant = product.colors?.find(c => c.name === activeColor) || product.colors?.[0];
    const displayImage = currentVariant?.images?.[0] || product.images?.[0];

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Start Fly Animation
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            fly({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }, displayImage || fallbackImage);
        }

        dispatch(addItemToCart({
            productId: product._id,
            quantity: 1,
            color: selectedColor
        })).then((result) => {
            if (!result.error) {
                toast.success(`${product.name} (${selectedColor}) added to cart!`);
            } else {
                toast.error(result.payload || 'Failed to add to cart');
            }
        });
    };

    // Fallback image in case the main one fails
    const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="group relative will-change-transform"
        >
            <Link to={`/product/${product._id}`} className="block h-full">
                <div
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className="relative bg-background-alt border border-border rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-glow-strong h-full flex flex-col"
                    style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
                >
                    {/* Badge */}
                    {product.featured && (
                        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-primary/90 backdrop-blur-md rounded-xl text-white shadow-lg">
                            <span className="text-[10px] font-black uppercase tracking-widest">New</span>
                        </div>
                    )}

                    {/* Image Layer */}
                    <div className="relative aspect-[4/5] p-8 flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <img
                            ref={imgRef}
                            src={displayImage || fallbackImage}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-contain mb-4 transition-all duration-500 ease-out group-hover:scale-110 drop-shadow-2xl"
                            style={{ transform: 'translateZ(30px)' }}
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = fallbackImage;
                            }}
                        />

                        {/* Action Overlays */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-30 flex gap-2 items-center">
                            <Magnetic strength={0.3} className="flex-1">
                                <SpringyTouch className="w-full">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className="w-full h-12 bg-primary text-white rounded-xl flex items-center justify-center gap-2.5 hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                                    >
                                        <ShoppingCart size={16} className="transition-transform group-hover/btn:-rotate-12" />
                                        <span className="font-black text-[11px] uppercase tracking-wider">Add</span>
                                    </button>
                                </SpringyTouch>
                            </Magnetic>
                            <Magnetic strength={0.2} className="flex-shrink-0">
                                <SpringyTouch>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/product/${product._id}`);
                                        }}
                                        className="w-12 h-12 bg-background/80 backdrop-blur-md border border-border text-foreground rounded-xl flex items-center justify-center hover:bg-background transition-colors active:scale-95 hover:text-primary shadow-lg"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </SpringyTouch>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Info Area */}
                    <div className="p-5 pt-2 flex-grow flex flex-col justify-end bg-background-alt relative z-10">
                        <div className="mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{product.category}</span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>

                        {/* Color Swatches */}
                        {product.colors && product.colors.length > 1 && (
                            <div className="flex gap-2 mb-4" onClick={(e) => e.preventDefault()}>
                                {product.colors.map((color) => (
                                    <SpringyTouch key={color.name}>
                                        <button
                                            onMouseEnter={() => setHoveredColor(color.name)}
                                            onMouseLeave={() => setHoveredColor(null)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSelectedColor(color.name);
                                            }}
                                            className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${selectedColor === color.name ? 'border-primary scale-110 shadow-glow' : 'border-transparent hover:scale-110'}`}
                                            title={color.name}
                                        >
                                            <div
                                                className="w-full h-full rounded-full border border-white/10"
                                                style={{ backgroundColor: color.value }}
                                            />
                                        </button>
                                    </SpringyTouch>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-foreground">${product.price}</span>
                                {product.originalPrice > product.price && (
                                    <span className="text-xs text-muted-foreground line-through font-bold">${product.originalPrice}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 bg-background px-2 py-1 rounded-lg border border-border">
                                <span className="text-xs font-bold text-foreground">{product.ratings?.average || 5}</span>
                                <span className="text-primary text-[10px]">★</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
