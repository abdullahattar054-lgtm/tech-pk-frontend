// Application Constants

export const API_URL = import.meta.env.VITE_API_URL || 'https://new-project-1-beta-one.vercel.app/api/v1';
export const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'TECH.PK';

// Product Categories
export const CATEGORIES = {
    HEADPHONES: 'Headphones',
    EARBUDS: 'Earbuds',
    SMARTWATCHES: 'Smartwatches',
};

// Order Status
export const ORDER_STATUS = {
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
    CARD: 'card',
    PAYPAL: 'paypal',
    COD: 'cod',
};

// Payment Status
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
};

// Sort Options
export const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
];

// Brands
export const BRANDS = [
    'Apple',
    'Samsung',
    'Sony',
    'Bose',
    'Sennheiser',
    'Beats',
    'Jabra',
    'Nothing',
    'Garmin',
    'Fitbit',
    'Amazfit',
];

// Colors
export const COLORS = [
    { name: 'Black', value: 'Black', hex: '#000000' },
    { name: 'White', value: 'White', hex: '#FFFFFF' },
    { name: 'Silver', value: 'Silver', hex: '#C0C0C0' },
    { name: 'Gold', value: 'Gold', hex: '#FFD700' },
    { name: 'Space Gray', value: 'Space Gray', hex: '#4A4A4A' },
    { name: 'Midnight', value: 'Midnight', hex: '#191970' },
    { name: 'Starlight', value: 'Starlight', hex: '#F5F5DC' },
    { name: 'Pink', value: 'Pink', hex: '#FFC0CB' },
    { name: 'Blue', value: 'Blue', hex: '#0066FF' },
    { name: 'Navy', value: 'Navy', hex: '#000080' },
];

// Shipping Cost Threshold
export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_COST = 10;

// Tax Rate
export const TAX_RATE = 0.1; // 10%

export default {
    API_URL,
    SITE_NAME,
    CATEGORIES,
    ORDER_STATUS,
    PAYMENT_METHODS,
    PAYMENT_STATUS,
    SORT_OPTIONS,
    BRANDS,
    COLORS,
    FREE_SHIPPING_THRESHOLD,
    SHIPPING_COST,
    TAX_RATE,
};
