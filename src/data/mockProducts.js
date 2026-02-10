/**
 * Mock product data used as a fallback when the API is unreachable.
 * IDs use 24-char hex strings to match MongoDB ObjectId format,
 * preventing CastError crashes when the frontend tries to navigate
 * to a product detail page using a mock ID.
 */
export const mockProducts = [
    {
        _id: '65a1b2c3d4e5f6a7b8c9d001',
        name: "TechSound Pro Wireless",
        category: "Headphones",
        price: 249,
        originalPrice: 299,
        brand: "TechSound",
        description: "Professional grade wireless headphones featuring advanced active noise cancellation, 40-hour battery life, and premium comfort for long sessions.",
        images: ["/images/products/headphones-pro-black.png"],
        colors: [
            {
                name: "Black",
                value: "#000000",
                images: ["/images/products/headphones-pro-black.png"]
            },
            {
                name: "Pearl White",
                value: "#F5F5F5",
                images: ["/images/products/headphones-pro-white.png"]
            }
        ],
        stock: 45,
        rating: 4.8,
        numReviews: 156,
        ratings: { average: 4.8, count: 156 },
        featured: true,
        status: 'active'
    },
    {
        _id: '65a1b2c3d4e5f6a7b8c9d002',
        name: "TechWatch Ultra Series",
        category: "Smartwatches",
        price: 199,
        originalPrice: 249,
        brand: "TechWatch",
        description: "Advanced wearable technology with comprehensive health metrics, GPS tracking, and a stunning 1.9-inch AMOLED display.",
        images: ["/images/products/smartwatch-ultra-black.png"],
        colors: [
            {
                name: "Obsidian Black",
                value: "#1C1C1E",
                images: ["/images/products/smartwatch-ultra-black.png"]
            },
            {
                name: "Porcelain White",
                value: "#FFFFFF",
                images: ["/images/products/smartwatch-ultra-white.png"]
            }
        ],
        stock: 50,
        rating: 4.5,
        numReviews: 120,
        ratings: { average: 4.5, count: 120 },
        featured: true,
        status: 'active'
    },
    {
        _id: '65a1b2c3d4e5f6a7b8c9d003',
        name: "TechSound Elite Studio",
        category: "Headphones",
        price: 349,
        originalPrice: 399,
        brand: "TechSound",
        description: "Studio-quality audio reproduction with wide frequency response. Experience pure, uncoloured sound with zero distortion.",
        images: ["/images/products/headphones-studio-black.png"],
        colors: [
            {
                name: "Midnight Black",
                value: "#1A1A1A",
                images: ["/images/products/headphones-studio-black.png"]
            },
            {
                name: "Crimson Red",
                value: "#E74C3C",
                images: ["/images/products/headphones-studio-red.png"]
            }
        ],
        stock: 30,
        rating: 4.9,
        numReviews: 89,
        ratings: { average: 4.9, count: 89 },
        featured: true,
        status: 'active'
    },
    {
        _id: '65a1b2c3d4e5f6a7b8c9d004',
        name: "SoundBuds Pro Max",
        category: "Earbuds",
        price: 129,
        originalPrice: 159,
        brand: "SoundBuds",
        description: "High-fidelity true wireless earbuds with immersive spatial audio, transparency mode, and ergonomic design for all-day wear.",
        images: ["/images/products/earbuds-pro-black.png"],
        colors: [
            {
                name: "Phantom Black",
                value: "#000000",
                images: ["/images/products/earbuds-pro-black.png"]
            },
            {
                name: "Ceramic White",
                value: "#FFFFFF",
                images: ["/images/products/earbuds-pro-white.png"]
            }
        ],
        stock: 100,
        rating: 4.8,
        numReviews: 320,
        ratings: { average: 4.8, count: 320 },
        featured: true,
        status: 'active'
    },
    {
        _id: '65a1b2c3d4e5f6a7b8c9d005',
        name: "SoundBuds Essence",
        category: "Earbuds",
        price: 119,
        originalPrice: 149,
        brand: "SoundBuds",
        description: "Lightweight and powerful everyday buds. Crystal clear calls and punchy bass in a minimalist package.",
        images: ["/images/products/earbuds-essence-white.png"],
        colors: [
            {
                name: "Arctic White",
                value: "#F8F9FA",
                images: ["/images/products/earbuds-essence-white.png"]
            },
            {
                name: "Sky Blue",
                value: "#87CEEB",
                images: ["/images/products/earbuds-essence-blue.png"]
            }
        ],
        stock: 90,
        rating: 4.7,
        numReviews: 195,
        ratings: { average: 4.7, count: 195 },
        featured: true,
        status: 'active'
    },
    {
        _id: '65a1b2c3d4e5f6a7b8c9d006',
        name: "TechWatch Sport Active",
        category: "Smartwatches",
        price: 179,
        originalPrice: 219,
        brand: "TechWatch",
        description: "Rugged and vibrant. Designed for the active lifestyle with extended battery life and high-precision heart rate monitoring.",
        images: ["/images/products/smartwatch-ultra-grey.png"],
        colors: [
            {
                name: "Titanium Grey",
                value: "#8E8E93",
                images: ["/images/products/smartwatch-ultra-grey.png"]
            },
            {
                name: "Dynamic Orange",
                value: "#FF9500",
                images: ["/images/products/smartwatch-sport-orange.png"]
            }
        ],
        stock: 40,
        rating: 4.6,
        numReviews: 85,
        ratings: { average: 4.6, count: 85 },
        featured: true,
        status: 'active'
    }
];
