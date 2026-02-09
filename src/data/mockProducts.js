export const mockProducts = [
    {
        _id: '1',
        name: 'AirPods Pro Max',
        description: 'High-fidelity audio, active noise cancellation, and transparency mode for a premium sound experience.',
        category: 'Headphones',
        price: 549,
        originalPrice: 599,
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop'],
        colors: [
            { name: 'Space Gray', value: '#3c3d3a', images: ['https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop'] },
            { name: 'Silver', value: '#e3e4e5', images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2000&auto=format&fit=crop'] }
        ],
        stock: 15,
        ratings: { average: 4.8, count: 124 },
        featured: true,
        status: 'active'
    },
    {
        _id: '2',
        name: 'Apple Watch Ultra 2',
        description: 'The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure.',
        category: 'Smartwatches',
        price: 799,
        originalPrice: 849,
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop'],
        colors: [
            { name: 'Titanium', value: '#d1d1d1', images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop'] }
        ],
        stock: 8,
        ratings: { average: 4.9, count: 85 },
        featured: true,
        status: 'active'
    },
    {
        _id: '3',
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise cancellation and exceptional sound quality in a sleek, comfortable design.',
        category: 'Headphones',
        price: 399,
        originalPrice: 429,
        brand: 'Sony',
        images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1888&auto=format&fit=crop'],
        colors: [
            { name: 'Black', value: '#1a1a1a', images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1888&auto=format&fit=crop'] },
            { name: 'Platinum Silver', value: '#d8d8d8', images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2000&auto=format&fit=crop'] }
        ],
        stock: 20,
        ratings: { average: 4.7, count: 210 },
        featured: true,
        status: 'active'
    },
    {
        _id: '4',
        name: 'Nothing Ear (2)',
        description: 'Ultra-light, powerful sound, and a unique transparent design for the tech-conscious listener.',
        category: 'Earbuds',
        price: 149,
        originalPrice: 179,
        brand: 'Nothing',
        images: ['https://images.unsplash.com/photo-1627989330618-ff353493e878?q=80&w=2000&auto=format&fit=crop'],
        colors: [
            { name: 'White', value: '#fcfcfc', images: ['https://images.unsplash.com/photo-1627989330618-ff353493e878?q=80&w=2000&auto=format&fit=crop'] },
            { name: 'Black', value: '#0a0a0a', images: ['https://images.unsplash.com/photo-1631430212621-e07085731309?q=80&w=2000&auto=format&fit=crop'] }
        ],
        stock: 30,
        ratings: { average: 4.5, count: 56 },
        featured: true,
        status: 'active'
    }
];
