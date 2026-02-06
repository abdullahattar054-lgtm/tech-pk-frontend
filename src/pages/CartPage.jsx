import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from '../components/cart/CartItem';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { fetchCart } from '../redux/slices/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const { items, totalPrice, loading } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const shipping = totalPrice > 1000 ? 0 : 50;
    const tax = Math.round(totalPrice * 0.15); // 15% GST for premium feel
    const grandTotal = totalPrice + shipping + tax;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 bg-mesh-gradient selection:bg-primary/30">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div>
                        <h1 className="text-display mb-2">Shopping Bag</h1>
                        <p className="text-ui-muted text-lg">
                            {items.length === 0
                                ? "Your bag is empty. Let's find some premium gear."
                                : `You have ${items.length} premium ${items.length === 1 ? 'item' : 'items'} in your bag.`}
                        </p>
                    </div>
                </motion.div>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-[3rem] p-16 text-center"
                    >
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag className="text-primary" size={40} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Your Bag is Empty</h2>
                        <p className="text-ui-muted mb-10 max-w-md mx-auto">
                            Explore our curated collection of high-performance electronics and elevate your tech game today.
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="btn-primary"
                        >
                            Explore Collection
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="popLayout">
                                {items.map((item, index) => (
                                    <CartItem key={item._id} item={item} index={index} />
                                ))}
                            </AnimatePresence>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                                {[
                                    { icon: ShieldCheck, title: 'Secure Payment', desc: 'Encrypted transactions' },
                                    { icon: Truck, title: 'Express Delivery', desc: 'Free over $1,000' },
                                    { icon: RotateCcw, title: 'Easy Returns', desc: '30-day guarantee' }
                                ].map((badge, i) => (
                                    <div key={i} className="glass rounded-3xl p-6 flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                            <badge.icon className="text-primary" size={24} />
                                        </div>
                                        <h4 className="font-bold mb-1">{badge.title}</h4>
                                        <p className="text-xs text-ui-muted">{badge.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass rounded-[2.5rem] p-8 lg:sticky lg:top-32 border border-primary/10"
                            >
                                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-ui-muted">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-ui-text">${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-ui-muted">
                                        <span>Shipping</span>
                                        <span className="font-medium text-ui-text">
                                            {shipping === 0 ? (
                                                <span className="text-accent font-bold">FREE</span>
                                            ) : (
                                                `$${shipping.toLocaleString()}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-ui-muted">
                                        <span>Estimated Tax (GST)</span>
                                        <span className="font-medium text-ui-text">${tax.toLocaleString()}</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-6" />
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm text-ui-muted">Total Amount</p>
                                            <p className="text-3xl font-black text-primary">${grandTotal.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="btn-primary w-full group flex items-center justify-center gap-3"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </button>

                                <p className="text-center text-xs text-ui-muted mt-6">
                                    Shipping calculated at checkout. Express delivery available.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;

