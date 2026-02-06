import { useState, useEffect } from 'react';

export const useLoader = (duration = 2000) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    return { isLoading };
};
