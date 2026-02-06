import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateCartQuantity, removeItemFromCart } from '../../redux/slices/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, index }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateCartQuantity({ itemId: item._id, quantity: newQuantity }));
    };

    const handleRemove = () => {
        dispatch(removeItemFromCart(item._id));
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
            }}
            className="glass group relative overflow-hidden rounded-[2rem] p-4 sm:p-6 mb-4 flex flex-col sm:flex-row items-center gap-6 border border-white/5 hover:border-primary/20 transition-colors duration-500"
        >
            {/* Product Image */}
            <div className="relative w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-black/20 flex flex-shrink-0 items-center justify-center p-4">
                <img
                    src={item.product?.images?.[0] || 'https://via.placeholder.com/150'}
                    alt={item.product?.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* Product Info */}
            <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.product?.name}
                </h3>
                <p className="text-sm text-ui-muted mb-4">
                    Color: <span className="text-ui-text font-medium">{item.color || 'Default'}</span>
                </p>

                {/* Quantity Controls */}
                <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                    <button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        className="p-1 hover:text-primary transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        className="p-1 hover:text-primary transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col items-center sm:items-end justify-between self-stretch">
                <p className="text-2xl font-black text-primary">
                    ${(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                    onClick={handleRemove}
                    className="mt-4 p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 group/remove"
                    aria-label="Remove item"
                >
                    <Trash2 size={20} className="group-hover/remove:rotate-12 transition-transform" />
                </button>
            </div>

            {/* Subtle Glow Effect on Hover */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

export default CartItem;
