import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
    const variants = {
        circle: 'rounded-full',
        rect: 'rounded-lg',
        text: 'rounded-md h-4 w-full mb-2',
    };

    return (
        <div
            className={`skeleton ${variants[variant]} ${className}`}
            aria-hidden="true"
        />
    );
};

export default Skeleton;
