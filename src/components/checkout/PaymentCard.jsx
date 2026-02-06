import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { Cpu, CreditCard } from 'lucide-react';

const PaymentCard = ({ cardInfo = {} }) => {
    const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(10);

    // Formatting helpers
    const formatNumber = (num = '') => {
        const clearNum = num.replace(/\D/g, '');
        const groups = clearNum.match(/.{1,4}/g) || [];
        return groups.join(' ') || '•••• •••• •••• ••••';
    };

    const formatExpiry = (exp = '') => exp || 'MM/YY';
    const formatName = (name = '') => name || 'CARDHOLDER NAME';

    return (
        <div
            className="perspective-1000 w-full max-w-md mx-auto h-64 mb-12"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-full h-full rounded-[2rem] p-8 text-white preserve-3d transition-shadow duration-500 overflow-hidden shadow-2xl group"
            >
                {/* Card Background Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#1a1a1a] -z-20" />

                {/* Animated Mesh Overlay */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none -z-10">
                    <div className="absolute inset-x-[-50%] inset-y-[-50%] bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_50%)] animate-pulse" />
                </div>

                {/* Glare Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.2) 0%, transparent 80%)`
                    }}
                />

                {/* Card Content */}
                <div className="relative h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                                <Cpu size={24} className="text-black/50" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mt-2">Premium Member</span>
                        </div>
                        <CreditCard size={32} className="text-white/20" />
                    </div>

                    <div className="space-y-6">
                        <div className="text-2xl font-mono tracking-[0.15em] text-white drop-shadow-md">
                            {formatNumber(cardInfo.number)}
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[8px] uppercase tracking-widest text-white/40">Card Holder</p>
                                <p className="text-sm font-bold tracking-wider uppercase">{formatName(cardInfo.name)}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[8px] uppercase tracking-widest text-white/40">Expires</p>
                                <p className="text-sm font-mono font-bold">{formatExpiry(cardInfo.expiry)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glass Border */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />
            </motion.div>
        </div>
    );
};

export default PaymentCard;
