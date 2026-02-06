import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, CreditCard, Truck, Receipt, Loader2 } from 'lucide-react';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import PaymentCard from '../components/checkout/PaymentCard';
import { placeOrder, resetOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    });

    const { items, totalPrice } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const shipping = totalPrice > 1000 ? 0 : 50;
    const tax = Math.round(totalPrice * 0.15);
    const grandTotal = totalPrice + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const { loading: orderLoading, success: orderSuccess, error: orderError } = useSelector((state) => state.orders);

    const handleSubmitOrder = async () => {
        const orderData = {
            orderItems: items.map(item => ({
                name: item.product.name,
                quantity: item.quantity,
                image: item.product.images[0],
                price: item.price,
                product: item.product._id
            })),
            shippingAddress: {
                address: formData.address,
                city: formData.city,
                postalCode: formData.zipCode,
                country: 'Pakistan' // Default for TECH.PK
            },
            paymentMethod: 'Credit Card',
            itemsPrice: totalPrice,
            taxPrice: tax,
            shippingPrice: shipping,
            totalPrice: grandTotal
        };

        const result = await dispatch(placeOrder(orderData));
        if (!result.error) {
            toast.success('Order placed successfully!');
            dispatch(clearCart());
            // Navigate to success or orders page will be handled by useEffect or here
        } else {
            toast.error(result.payload || 'Failed to place order');
        }
    };

    useEffect(() => {
        if (orderSuccess) {
            navigate('/orders');
            dispatch(resetOrder());
        }
    }, [orderSuccess, navigate, dispatch]);

    const steps = [
        { id: 1, title: 'Shipping Information', icon: Truck },
        { id: 2, title: 'Secure Payment', icon: CreditCard },
        { id: 3, title: 'Order Review', icon: Receipt }
    ];

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <div className="min-h-screen py-24 bg-mesh-gradient">
            <div className="container-custom max-w-6xl">
                <div className="flex items-center gap-4 mb-12">
                    <button
                        onClick={() => step === 1 ? navigate('/cart') : prevStep()}
                        className="p-3 rounded-full glass hover:bg-primary/20 hover:text-primary transition-all duration-300"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-display">Checkout</h1>
                </div>

                <CheckoutProgress currentStep={step} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Main Flow */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait" custom={step}>
                            <motion.div
                                key={step}
                                custom={step}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="glass rounded-[3rem] p-8 sm:p-12 border border-white/10"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                        {React.createElement(steps[step - 1].icon, { className: 'text-primary' })}
                                    </div>
                                    <h2 className="text-3xl font-bold">{steps[step - 1].title}</h2>
                                </div>

                                {step === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input
                                            name="fullName" value={formData.fullName} onChange={handleInputChange}
                                            placeholder="Full Name" className="input-field"
                                        />
                                        <input
                                            name="email" value={formData.email} onChange={handleInputChange}
                                            placeholder="Email Address" className="input-field"
                                        />
                                        <input
                                            name="phone" value={formData.phone} onChange={handleInputChange}
                                            placeholder="Phone Number" className="input-field"
                                        />
                                        <input
                                            name="address" value={formData.address} onChange={handleInputChange}
                                            placeholder="Street Address" className="input-field"
                                        />
                                        <input
                                            name="city" value={formData.city} onChange={handleInputChange}
                                            placeholder="City" className="input-field"
                                        />
                                        <input
                                            name="zipCode" value={formData.zipCode} onChange={handleInputChange}
                                            placeholder="ZIP Code" className="input-field"
                                        />
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8">
                                        <PaymentCard cardInfo={{
                                            number: formData.cardNumber,
                                            name: formData.cardName,
                                            expiry: formData.cardExpiry
                                        }} />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <input
                                                    name="cardName" value={formData.cardName} onChange={handleInputChange}
                                                    placeholder="Cardholder Name" className="input-field"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <input
                                                    name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
                                                    placeholder="Card Number" className="input-field"
                                                />
                                            </div>
                                            <input
                                                name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange}
                                                placeholder="MM/YY" className="input-field"
                                            />
                                            <input
                                                name="cardCvc" value={formData.cardCvc} onChange={handleInputChange}
                                                placeholder="CVC" className="input-field"
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-8">
                                        {/* Order items summary */}
                                        <div className="space-y-4">
                                            {items.map(item => (
                                                <div key={item._id} className="flex items-center gap-4 p-4 glass rounded-2xl">
                                                    <div className="w-16 h-16 rounded-xl bg-white/5 overflow-hidden">
                                                        <img src={item.product?.images?.[0]} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <p className="font-bold">{item.product?.name}</p>
                                                        <p className="text-xs text-ui-muted">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summarized info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                            <div>
                                                <p className="text-xs text-ui-muted uppercase tracking-widest mb-2 font-bold">Shipping To</p>
                                                <p className="font-medium">{formData.fullName}</p>
                                                <p className="text-sm text-ui-muted">{formData.address}, {formData.city}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-ui-muted uppercase tracking-widest mb-2 font-bold">Payment Method</p>
                                                <p className="font-medium">Credit Card (ending in {formData.cardNumber.slice(-4) || '••••'})</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-12 flex justify-end">
                                    <button
                                        onClick={step === 3 ? handleSubmitOrder : nextStep}
                                        disabled={orderLoading}
                                        className="btn-primary flex items-center gap-3 group disabled:opacity-50"
                                    >
                                        {orderLoading ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            step === 3 ? 'Confirm Order' : 'Continue'
                                        )}
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-[2.5rem] p-8 sticky top-32 border border-white/5">
                            <h3 className="text-xl font-bold mb-6">Payment Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-ui-muted">
                                    <span>Subtotal</span>
                                    <span className="text-ui-text">${totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-ui-muted">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                                </div>
                                <div className="flex justify-between text-ui-muted">
                                    <span>Estimated Tax</span>
                                    <span className="text-ui-text">${tax.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-white/10 my-4" />
                                <div className="flex justify-between items-end">
                                    <span className="font-bold">Total</span>
                                    <span className="text-3xl font-black text-primary">${grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-ui-muted">
                                <Lock size={12} className="text-accent" />
                                Encrypted and secure checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

