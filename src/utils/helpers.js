// Helper Functions

// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

// Format date
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
};

// Format date with time
export const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice === currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Calculate cart total
export const calculateCartTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Calculate order total
export const calculateOrderTotal = (subtotal, shippingCost = 0, tax = 0, discount = 0) => {
    return subtotal + shippingCost + tax - discount;
};

// Get initials from name
export const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Debounce function
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Generate random ID
export const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};

// Check if object is empty
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

// Deep clone object
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Get rating stars
export const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return {
        full: fullStars,
        half: hasHalfStar ? 1 : 0,
        empty: emptyStars,
    };
};

export default {
    formatCurrency,
    formatDate,
    formatDateTime,
    truncateText,
    calculateDiscount,
    calculateCartTotal,
    calculateOrderTotal,
    getInitials,
    debounce,
    generateId,
    isEmpty,
    deepClone,
    getRatingStars,
};
