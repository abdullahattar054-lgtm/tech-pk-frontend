import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Package, Users, DollarSign, ShoppingCart, TrendingUp, MoreVertical } from 'lucide-react';

const AdminPanel = () => {
    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.orders);

    const stats = [
        { title: 'Total Revenue', value: `$${orders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString()}`, icon: DollarSign, color: 'text-success' },
        { title: 'Total Orders', value: orders.length.toString(), icon: ShoppingCart, color: 'text-primary' },
        { title: 'Total Products', value: products.length.toString(), icon: Package, color: 'text-accent' },
        { title: 'New Users', value: '42', icon: Users, color: 'text-secondary' }, // Placeholder for now
    ];

    return (
        <div className="min-h-screen py-24 bg-mesh-gradient">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                    <h1 className="text-display">Admin <span className="text-gradient">Dashboard</span></h1>
                    <div className="flex items-center gap-2 text-ui-muted text-sm font-bold">
                        <TrendingUp size={16} className="text-success" />
                        +12% increase from last month
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-ui-muted text-xs font-bold uppercase tracking-widest mb-2">{stat.title}</p>
                            <p className="text-3xl font-black">{stat.value}</p>
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-ui-muted hover:text-white"><MoreVertical size={20} /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="glass rounded-[3rem] p-10 border border-white/5 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Recent Orders</h2>
                                <button className="text-primary font-bold text-sm">View All</button>
                            </div>
                            <div className="space-y-4">
                                {orders.slice(0, 5).map((order) => (
                                    <div key={order._id} className="flex items-center justify-between p-6 glass rounded-2xl border-white/5 hover:border-white/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary font-bold text-xs uppercase">
                                                ID
                                            </div>
                                            <div>
                                                <p className="font-bold">{order.user?.name || 'Guest'}</p>
                                                <p className="text-xs text-ui-muted uppercase tracking-wider">{order._id.slice(-8)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-primary">${order.totalPrice.toLocaleString()}</p>
                                            <p className="text-[10px] font-bold uppercase text-success">Paid</p>
                                        </div>
                                    </div>
                                ))}
                                {orders.length === 0 && (
                                    <div className="text-center py-10 text-ui-muted">No recent orders</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Inventory */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-[3rem] p-10 border border-white/5 h-full">
                            <h2 className="text-2xl font-bold mb-8">Inventory</h2>
                            <div className="space-y-6">
                                {products.slice(0, 4).map((product) => (
                                    <div key={product._id} className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-black/20 rounded-xl p-2 shrink-0 flex items-center justify-center">
                                            <img src={product.images[0]} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm line-clamp-1">{product.name}</p>
                                            <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full transition-all duration-1000"
                                                    style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-ui-muted mt-1 font-bold">{product.stock} units left</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 btn-secondary">Manage Inventory</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
