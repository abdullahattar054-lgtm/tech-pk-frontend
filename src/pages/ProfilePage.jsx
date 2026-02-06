import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateUser } from '../redux/slices/authSlice';
import { User, Package, MapPin, Settings, LogOut, Camera } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Profile');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would call an update profile API
        dispatch(updateUser({ ...user, ...formData }));
    };

    const tabs = [
        { name: 'Profile', icon: User },
        { name: 'Orders', icon: Package },
        { name: 'Addresses', icon: MapPin },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen py-24 bg-mesh-gradient">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-80 shrink-0">
                        <div className="glass rounded-[2.5rem] p-8 border border-white/5 sticky top-32">
                            <div className="flex flex-col items-center mb-10 text-center">
                                <div className="relative mb-4 group">
                                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 overflow-hidden">
                                        <User size={48} className="text-primary" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-bold">{user?.name}</h2>
                                <p className="text-ui-muted text-sm">{user?.email}</p>
                            </div>

                            <nav className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.name ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-ui-muted hover:bg-white/5 hover:text-white'}`}
                                    >
                                        <tab.icon size={20} />
                                        {tab.name}
                                    </button>
                                ))}
                                <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-error hover:bg-error/10 transition-all mt-8">
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-[3rem] p-8 sm:p-12 border border-white/5"
                        >
                            <h2 className="text-4xl font-black mb-10">{activeTab} <span className="text-gradient">Settings</span></h2>

                            {activeTab === 'Profile' && (
                                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-ui-muted ml-4">Full Name</label>
                                            <input
                                                type="text" name="name" value={formData.name} onChange={handleInputChange}
                                                className="input-field" placeholder="Your Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-ui-muted ml-4">Email Address</label>
                                            <input
                                                type="email" name="email" value={formData.email} onChange={handleInputChange}
                                                className="input-field" placeholder="Your Email" disabled
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-ui-muted ml-4">Phone Number</label>
                                            <input
                                                type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                                className="input-field" placeholder="+92 300 1234567"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5">
                                        <button type="submit" className="btn-primary py-4 px-10">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'Orders' && (
                                <div className="text-center py-20">
                                    <Package size={64} className="text-ui-muted mx-auto mb-6 opacity-20" />
                                    <h3 className="text-2xl font-bold mb-2">No orders yet</h3>
                                    <p className="text-ui-muted mb-8">Items you purchase will appear here.</p>
                                    <button onClick={() => navigate('/products')} className="btn-secondary">Start Shopping</button>
                                </div>
                            )}

                            {activeTab === 'Addresses' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="glass p-8 rounded-3xl border border-primary/20 bg-primary/5">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Default</span>
                                            <button className="text-primary font-bold text-sm">Edit</button>
                                        </div>
                                        <h4 className="font-bold mb-2">Home</h4>
                                        <p className="text-ui-muted text-sm leading-relaxed">123 Tech Street, Digital City, PK</p>
                                    </div>
                                    <button className="glass p-8 rounded-3xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-4 text-ui-muted hover:text-white transition-all">
                                        <MapPin size={32} />
                                        <span className="font-bold text-sm">Add New Address</span>
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
