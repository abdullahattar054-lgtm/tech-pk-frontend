import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const CheckoutProgress = ({ currentStep }) => {
    const steps = [
        { id: 1, name: 'Shipping', label: 'Where to?' },
        { id: 2, name: 'Payment', label: 'Payment Info' },
        { id: 3, name: 'Review', label: 'Confirm Order' }
    ];

    return (
        <div className="relative mb-16">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <div key={step.id} className="relative flex flex-col items-center flex-1">
                            {/* Connector Line */}
                            {index !== 0 && (
                                <div className="absolute top-6 right-1/2 w-full h-[2px] bg-white/10 -z-10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: isCompleted || isActive ? '100%' : '0%' }}
                                        className="h-full bg-primary"
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    />
                                </div>
                            )}

                            {/* Step Circle */}
                            <motion.div
                                initial={false}
                                animate={{
                                    backgroundColor: isActive || isCompleted ? 'var(--color-primary)' : 'transparent',
                                    borderColor: isActive || isCompleted ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                                    scale: isActive ? 1.2 : 1
                                }}
                                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center relative z-10 glass transition-colors duration-500`}
                            >
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <Check size={20} className="text-white" />
                                    </motion.div>
                                ) : (
                                    <span className={`text-lg font-bold ${isActive ? 'text-white' : 'text-ui-muted'}`}>
                                        {step.id}
                                    </span>
                                )}

                                {/* Active Glow */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </motion.div>

                            {/* Step Labels */}
                            <div className="mt-4 text-center">
                                <p className={`font-bold text-sm ${isActive ? 'text-primary' : isCompleted ? 'text-ui-text' : 'text-ui-muted'}`}>
                                    {step.name}
                                </p>
                                <p className="text-[10px] text-ui-muted uppercase tracking-widest mt-1">
                                    {step.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CheckoutProgress;
