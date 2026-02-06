import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchMyOrders } from '../redux/slices/orderSlice';
import { Package, Clock, CheckCircle, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-success/10 text-success border-success/20';
            case 'shipped': return 'bg-primary/10 text-primary border-primary/20';
            case 'processing': return 'bg-warning/10 text-warning border-warning/20';
            default: return 'bg-white/5 text-ui-muted border-white/10';
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-dark"><Loader show={true} /></div>;

    return (
        <div className="min-h-screen py-24 bg-mesh-gradient">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-display">Order <span className="text-gradient">History</span></h1>
                    <Link to="/products" className="btn-secondary flex items-center gap-2">
                        <ShoppingBag size={18} />
                        Continue Shopping
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="glass rounded-[3rem] p-20 text-center border border-white/5">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Package className="text-ui-muted opacity-30" size={48} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">You have no orders</h2>
                        <p className="text-ui-muted mb-10 max-w-md mx-auto">Items you purchase will appear here. Start exploring our premium collection today.</p>
                        <Link to="/products" className="btn-primary">Browse Collection</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all group"
                            >
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted">Order ID</p>
                                            <p className="text-sm font-bold text-white uppercase">{order._id}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted">Placed On</p>
                                            <p className="text-sm font-bold text-white">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted">Total Amount</p>
                                            <p className="text-lg font-black text-primary">${order.totalPrice.toLocaleString()}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusStyles(order.status)}`}>
                                            {order.status || 'Processing'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            {order.orderItems.map((item, i) => (
                                                <div key={i} className="flex items-center gap-6">
                                                    <div className="w-20 h-20 bg-black/20 rounded-2xl p-4 shrink-0 flex items-center justify-center">
                                                        <img src={item.image} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-white text-lg">{item.name}</h4>
                                                        <p className="text-ui-muted text-sm">Qty: {item.quantity} × ${item.price.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            <div className="glass p-6 rounded-2xl bg-white/5 border-white/5">
                                                <h5 className="text-[10px] font-black uppercase tracking-widest text-ui-muted mb-4">Shipping Address</h5>
                                                <p className="text-sm font-medium leading-relaxed">
                                                    {order.shippingAddress.address}<br />
                                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                                    {order.shippingAddress.country}
                                                </p>
                                            </div>
                                            <div className="mt-8 flex justify-end">
                                                <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn hover:text-white transition-colors">
                                                    Track Order
                                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
