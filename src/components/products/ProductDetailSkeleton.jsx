import React from 'react';
import Skeleton from '../common/Skeleton';

const ProductDetailSkeleton = () => {
    return (
        <div className="min-h-screen py-20 bg-background animate-pulse">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Product Images Skeleton */}
                    <div className="space-y-6">
                        <Skeleton className="aspect-square rounded-[2.5rem]" />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <Skeleton key={i} className="aspect-square rounded-2xl" />
                            ))}
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div className="space-y-6">
                        <div className="w-24">
                            <Skeleton className="h-4" />
                        </div>
                        <div className="w-3/4">
                            <Skeleton className="h-12" />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-32">
                                <Skeleton className="h-5" />
                            </div>
                        </div>
                        <div className="w-32">
                            <Skeleton className="h-10" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="w-32">
                                <Skeleton className="h-4" />
                            </div>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <Skeleton key={i} variant="circle" className="w-12 h-12" />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-10">
                            <Skeleton className="flex-1 h-16 rounded-2xl" />
                            <Skeleton className="w-16 h-16 rounded-2xl" />
                        </div>
                    </div>
                </div>

                {/* Specs Skeleton */}
                <div className="mt-32 border-t border-border pt-20">
                    <div className="w-48 mb-12">
                        <Skeleton className="h-10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <Skeleton key={i} className="h-32 rounded-3xl" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
