export const mockProducts = [
    {
        _id: '1',
        name: "Premium Wireless Earbuds Pro",
        category: "Earbuds",
        price: 199,
        originalPrice: 249,
        brand: "TechSound Pro",
        description: "Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. IPX7 water-resistant with touch controls.",
        colors: [
            {
                name: "Black",
                value: "#000000",
                colorCode: "#1A1A1A",
                images: ["/images/products/black-earbuds-pro.jpg"]
            },
            {
                name: "Light Blue",
                value: "#87CEEB",
                colorCode: "#4FA3D1",
                images: ["/images/products/light-blue-earbuds.jpeg"]
            },
            {
                name: "White",
                value: "#FFFFFF",
                colorCode: "#F5F5F5",
                images: ["/images/products/white-earbuds-pro.jpg"]
            }
        ],
        images: ["/images/products/black-earbuds-pro.jpg"],
        specifications: {
            batteryLife: "30 hours with case",
            bluetooth: "Bluetooth 5.3",
            waterResistance: "IPX7",
            noiseCancellation: "Active ANC",
            weight: "4.5g per earbud"
        },
        stock: 50,
        featured: true,
        ratings: {
            average: 4.5,
            count: 128
        },
        status: 'active'
    },
    {
        _id: '2',
        name: "Gaming Headphones Pro",
        category: "Headphones",
        price: 299,
        originalPrice: 349,
        brand: "GameSound Elite",
        description: "Professional gaming headphones with 7.1 surround sound, RGB lighting, and ultra-comfortable memory foam ear cushions. Perfect for extended gaming sessions.",
        colors: [
            {
                name: "Black/Green",
                value: "#00FF00",
                colorCode: "#2ECC40",
                images: ["/images/products/black-green-headphones.png"]
            }
        ],
        images: ["/images/products/black-green-headphones.png"],
        specifications: {
            driver: "50mm Neodymium",
            frequency: "20Hz - 20kHz",
            impedance: "32 Ohm",
            cable: "2m detachable",
            microphone: "Noise-cancelling boom mic"
        },
        stock: 35,
        featured: true,
        ratings: {
            average: 4.7,
            count: 89
        },
        status: 'active'
    },
    {
        _id: '3',
        name: "Studio Monitor Headphones",
        category: "Headphones",
        price: 349,
        originalPrice: 399,
        brand: "StudioPro Elite",
        description: "Professional studio monitor headphones with flat frequency response for accurate audio reproduction. Ideal for music production and mixing.",
        colors: [
            {
                name: "White/Red",
                value: "#FF0000",
                colorCode: "#E74C3C",
                images: ["/images/products/white-red-headphones.png"]
            }
        ],
        images: ["/images/products/white-red-headphones.png"],
        specifications: {
            driver: "45mm",
            frequency: "15Hz - 28kHz",
            impedance: "35 Ohm",
            cable: "3m coiled cable",
            design: "Over-ear closed-back"
        },
        stock: 25,
        featured: true,
        ratings: {
            average: 4.8,
            count: 56
        },
        status: 'active'
    },
    {
        _id: '4',
        name: "SmartWatch Pro Series",
        category: "Smartwatches",
        price: 299,
        originalPrice: 349,
        brand: "TechWatch",
        description: "Advanced smartwatch with comprehensive health tracking, GPS, heart rate monitoring, and 7-day battery life. Compatible with iOS and Android.",
        colors: [
            {
                name: "Graphite",
                value: "#2C2C2C",
                colorCode: "#1A1A1A",
                images: ["/images/products/black-smart-watch.jpg"]
            },
            {
                name: "White",
                value: "#FFFFFF",
                colorCode: "#F5F5F5",
                images: ["/images/products/white-smart-watch.png"]
            }
        ],
        images: ["/images/products/black-smart-watch.jpg"],
        specifications: {
            display: "1.9\" AMOLED",
            battery: "7 days typical use",
            waterResistance: "5ATM",
            sensors: "Heart rate, SpO2, GPS",
            connectivity: "Bluetooth 5.2, WiFi"
        },
        stock: 40,
        featured: true,
        ratings: {
            average: 4.6,
            count: 203
        },
        status: 'active'
    },
    {
        _id: '5',
        name: "Essential Wireless Earbuds",
        category: "Earbuds",
        price: 99,
        originalPrice: 129,
        brand: "TechSound",
        description: "Reliable wireless earbuds with great sound quality and 20-hour battery life. Perfect for everyday use.",
        colors: [
            {
                name: "White",
                value: "#FFFFFF",
                colorCode: "#F5F5F5",
                images: ["/images/products/white-earbuds.png"]
            }
        ],
        images: ["/images/products/white-earbuds.png"],
        specifications: {
            batteryLife: "20 hours with case",
            bluetooth: "Bluetooth 5.1",
            waterResistance: "IPX4",
            noiseCancellation: "Passive",
            weight: "4g per earbud"
        },
        stock: 100,
        featured: false,
        ratings: {
            average: 4.2,
            count: 75
        },
        status: 'active'
    },
    {
        _id: '6',
        name: "Premium Over-Ear Headphones",
        category: "Headphones",
        price: 399,
        originalPrice: 499,
        brand: "AudioElite",
        description: "Luxury over-ear headphones with superior sound quality, active noise cancellation, and premium leather cushions. Experience audio perfection.",
        colors: [
            {
                name: "Black",
                value: "#000000",
                colorCode: "#1A1A1A",
                images: ["/images/products/BLACK HEADPHONES.png"]
            },
            {
                name: "White",
                value: "#FFFFFF",
                colorCode: "#F5F5F5",
                images: ["/images/products/Premium Over-Ear Headphones WHITE.png"]
            }
        ],
        images: ["/images/products/BLACK HEADPHONES.png"],
        specifications: {
            driver: "55mm High-Res",
            frequency: "10Hz - 40kHz",
            impedance: "32 Ohm",
            cable: "Premium braided cable",
            noiseCancellation: "Adaptive ANC",
            batteryLife: "40 hours wireless"
        },
        stock: 30,
        featured: true,
        ratings: {
            average: 4.9,
            count: 145
        },
        status: 'active'
    },
    {
        _id: '7',
        name: "Advanced Fitness Smartwatch",
        category: "Smartwatches",
        price: 349,
        originalPrice: 429,
        brand: "FitTech Pro",
        description: "Premium fitness smartwatch with advanced health monitoring, GPS tracking, and sleek design. Track your fitness goals with precision and style.",
        colors: [
            {
                name: "Space Grey",
                value: "#808080",
                colorCode: "#6B7280",
                images: ["/images/products/GREY SMARTWATCH.JPG.png"]
            },
            {
                name: "Sunset Orange",
                value: "#FFA500",
                colorCode: "#F97316",
                images: ["/images/products/ORANGE SMART WATCH.JPG.png"]
            }
        ],
        images: ["/images/products/GREY SMARTWATCH.JPG.png"],
        specifications: {
            display: "1.8\" AMOLED Retina",
            battery: "10 days battery life",
            waterResistance: "10ATM",
            sensors: "Heart rate, ECG, SpO2, Stress, GPS",
            connectivity: "Bluetooth 5.3, WiFi, LTE"
        },
        stock: 45,
        featured: true,
        ratings: {
            average: 4.7,
            count: 198
        },
        status: 'active'
    }
];
