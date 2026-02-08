import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProductById } from '../redux/slices/productSlice';
import { addItemToCart } from '../redux/slices/cartSlice';
import { toggleWishlist, toggleWishlistAsync } from '../redux/slices/wishlistSlice';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import ProductDetailSkeleton from '../components/products/ProductDetailSkeleton';

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentProduct: product, loading, error } = useSelector((state) => state.products);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [mainImage, setMainImage] = useState('');

    const isWishlisted = wishlistItems.some(item => item._id === product?._id);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors?.[0]?.name || '');
            setMainImage(product.colors?.[0]?.images?.[0] || product.images?.[0] || '');
        }
    }, [product]);

    // Simplified logic for image updating
    useEffect(() => {
        if (!product) return;

        // Find the variant for the selected color
        const variant = product.colors?.find(c => c.name === selectedColor);

        // Determine the image to show: Variant image -> Product image -> Fallback
        const newImage = variant?.images?.[0] || product.images?.[0] || '';

        if (newImage) {
            setMainImage(newImage);
        }
    }, [selectedColor, product]);

    const currentVariant = product?.colors?.find(c => c.name === selectedColor);
    const colorImages = currentVariant?.images || product?.images || [];

    const handleAddToCart = () => {
        dispatch(addItemToCart({
            productId: product._id,
            quantity,
            color: selectedColor
        })).then((result) => {
            if (!result.error) {
                toast.success(`${product.name} added to cart!`);
            } else {
                toast.error(result.payload || 'Failed to add item to cart');
            }
        });
    };

    const handleToggleWishlist = () => {
        if (isAuthenticated) {
            // Use API for authenticated users
            dispatch(toggleWishlistAsync(product._id)).then((result) => {
                if (!result.error) {
                    if (result.payload.action === 'added') {
                        toast.success('Added to wishlist!');
                    } else {
                        toast.info('Removed from wishlist');
                    }
                } else {
                    toast.error(result.payload || 'Failed to update wishlist');
                }
            });
        } else {
            // Use local storage for guests
            dispatch(toggleWishlist(product));
            if (!isWishlisted) {
                toast.success('Added to wishlist!');
            } else {
                toast.info('Removed from wishlist');
            }
        }
    };


    if (loading) return <ProductDetailSkeleton />;
    if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="btn-primary">Back to Collection</Link>
    </div>;
    if (!product) return <ProductDetailSkeleton />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen py-20 bg-background"
        >
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Product Images */}
                    <div className="space-y-6" data-aos="fade-right">
                        <motion.div
                            className="aspect-square bg-background-alt border border-border rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 group relative"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={mainImage}
                                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    src={mainImage}
                                    alt={product.name}
                                    loading="eager"
                                    className="w-full h-full object-contain z-10 p-4"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {colorImages.map((img, i) => (
                                <button
                                    key={`${selectedColor}-${i}`}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square bg-background-alt border rounded-2xl overflow-hidden p-2 transition-all duration-300 ${mainImage === img ? 'border-primary ring-4 ring-primary/20 scale-95 shadow-glow' : 'border-border hover:border-primary/50'}`}
                                >
                                    <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-contain" loading="lazy" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-left" data-aos="fade-left">
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
                                {product.category}
                            </span>
                            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.ratings?.average || 5) ? 'fill-primary' : 'fill-muted'}`} viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-muted-foreground font-medium">({product.ratings?.count || 0} customer reviews)</span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-black text-foreground">${product.price}</span>
                                {product.originalPrice > product.price && (
                                    <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                                )}
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                                {product.description}
                            </p>

                            <div className="space-y-8 mb-10">
                                <div>
                                    <label className="block text-muted-foreground font-bold uppercase tracking-wider text-[10px] mb-6">Select <span className="text-primary">Finish</span> — {selectedColor}</label>
                                    <div className="flex flex-wrap gap-5">
                                        {product.colors?.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => setSelectedColor(color.name)}
                                                className={`relative group p-1 rounded-full border-2 transition-all duration-300 ${selectedColor === color.name ? 'border-primary scale-110 shadow-glow' : 'border-transparent hover:scale-110 hover:border-primary/30'}`}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-full border-2 border-white/10 shadow-inner flex items-center justify-center overflow-hidden"
                                                    style={{ backgroundColor: color.value }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-background-alt border border-border rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none whitespace-nowrap z-30">
                                                    {color.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-muted-foreground font-bold uppercase tracking-wider text-xs mb-4">Quantity</label>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center bg-background-alt rounded-xl border border-border p-1">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center text-xl font-bold text-foreground">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className={`text-sm font-bold ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                                            {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="btn-primary flex-1 py-5 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    Add to Cart
                                    <span className="inline-block transform group-hover:translate-x-1 transition-transform ml-2">→</span>
                                </button>
                                <button
                                    onClick={handleToggleWishlist}
                                    className={`p-5 border rounded-2xl transition-all ${isWishlisted ? 'bg-primary/10 border-primary text-primary shadow-glow' : 'bg-background-alt border-border text-foreground hover:bg-secondary'}`}
                                >
                                    <svg className={`w-6 h-6 ${isWishlisted ? 'fill-primary' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>

                        </motion.div>
                    </div>
                </div>

                {/* Specs Section */}
                <div className="mt-32 border-t border-border pt-20">
                    <h2 className="text-3xl font-bold text-foreground mb-12">Technical <span className="text-gradient">Specifications</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(product.specifications || {}).map(([key, value]) => (
                            <div key={key} className="bg-background-alt border border-border p-8 rounded-3xl">
                                <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="text-foreground font-bold text-xl">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetailPage;
