import React from 'react';
import Skeleton from '../common/Skeleton';

const ProductCardSkeleton = () => {
    return (
        <div className="bg-background-alt border border-border rounded-[2rem] overflow-hidden">
            {/* Image Layer Skeleton */}
            <div className="relative aspect-[4/5] p-8 flex items-center justify-center">
                <Skeleton className="w-full h-full" />
            </div>

            {/* Info Area Skeleton */}
            <div className="p-5 pt-2 space-y-4">
                <div className="w-16">
                    <Skeleton className="h-3" />
                </div>
                <div className="w-full">
                    <Skeleton className="h-6" />
                </div>

                {/* Color Swatches Skeleton */}
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} variant="circle" className="w-6 h-6" />
                    ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="w-20">
                        <Skeleton className="h-8" />
                    </div>
                    <div className="w-12">
                        <Skeleton className="h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
