import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { removeFromWishlist, removeFromWishlistAsync, fetchWishlist } from '../redux/slices/wishlistSlice';
import { addItemToCart } from '../redux/slices/cartSlice';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.wishlist);

    // Fetch wishlist from server when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, isAuthenticated]);

    const handleRemoveFromWishlist = (productId) => {
        if (isAuthenticated) {
            dispatch(removeFromWishlistAsync(productId)).then((result) => {
                if (!result.error) {
                    toast.info('Item removed from wishlist');
                } else {
                    toast.error(result.payload || 'Failed to remove item');
                }
            });
        } else {
            dispatch(removeFromWishlist(productId));
            toast.info('Item removed from wishlist');
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addItemToCart({
            productId: product._id,
            quantity: 1,
            color: product.colors?.[0]?.name || ''
        })).then((result) => {
            if (!result.error) {
                toast.success(`${product.name} added to cart!`);
            } else {
                toast.error(result.payload || 'Failed to add item to cart');
            }
        });
    };

    return (
        <div className="min-h-screen py-24 bg-mesh-gradient selection:bg-primary/30">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div>
                        <h1 className="text-display mb-2">My Wishlist</h1>
                        <p className="text-ui-muted text-lg">
                            {wishlistItems.length === 0
                                ? "Your wishlist is empty. Let's add some items!"
                                : `You have ${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist.`}
                        </p>
                    </div>
                </motion.div>

                {wishlistItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-[3rem] p-16 text-center"
                    >
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Heart className="text-primary" size={40} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
                        <p className="text-ui-muted mb-10 max-w-md mx-auto">
                            Start adding your favorite products to your wishlist and we'll help you keep track of them.
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="btn-primary"
                        >
                            Explore Collection
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {wishlistItems.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300 group flex flex-col"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-48 bg-black/20 overflow-hidden flex items-center justify-center p-4">
                                        <img
                                            src={item.images?.[0] || 'https://via.placeholder.com/250'}
                                            alt={item.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <button
                                            onClick={() => handleRemoveFromWishlist(item._id)}
                                            className="absolute top-4 right-4 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 transition-all"
                                            aria-label="Remove from wishlist"
                                        >
                                            <Heart size={20} fill="currentColor" />
                                        </button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 p-6 flex flex-col">
                                        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-ui-muted mb-4 line-clamp-2">
                                            {item.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-6 mt-auto">
                                            <p className="text-2xl font-black text-primary">
                                                ${item.price?.toLocaleString()}
                                            </p>
                                            {item.originalPrice && item.originalPrice > item.price && (
                                                <p className="text-sm text-ui-muted line-through">
                                                    ${item.originalPrice?.toLocaleString()}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => navigate(`/product/${item._id}`)}
                                                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-sm transition-all"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="flex-1 px-4 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:shadow-[0_0_20px_var(--color-primary-glow)] transition-all flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag size={18} />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Continue Shopping Button */}
                {wishlistItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center mt-16"
                    >
                        <button
                            onClick={() => navigate('/products')}
                            className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:shadow-[0_0_30px_var(--color-primary-glow)] transition-all flex items-center gap-3"
                        >
                            Continue Shopping
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
