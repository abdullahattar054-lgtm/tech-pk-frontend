import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, setFilters, clearFilters } from '../redux/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import Loader from '../components/common/Loader';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { products, loading, filters, pagination } = useSelector((state) => state.products);
    const [priceRange, setPriceRange] = useState(1000);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    const handleCategoryChange = (cat) => {
        const newCategory = filters.category === cat ? '' : cat;
        dispatch(setFilters({ category: newCategory }));
    };

    const handlePriceChange = (e) => {
        setPriceRange(e.target.value);
    };

    const applyPriceFilter = () => {
        dispatch(setFilters({ maxPrice: priceRange }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-24 bg-background transition-colors duration-500"
        >
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
                    <h1 className="text-display text-foreground">Our <span className="text-gradient">Collection</span></h1>
                    <p className="text-muted-foreground font-medium">Showing {products.length} premium items</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-background-alt border border-border p-8 rounded-[2.5rem] sticky top-32">
                            <h2 className="text-foreground font-bold text-xl mb-8 flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                Filter By
                            </h2>

                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-5">Category</h3>
                                    <div className="space-y-4">
                                        {['Headphones', 'Earbuds', 'Smartwatches'].map((cat) => (
                                            <label key={cat} className="flex items-center group cursor-pointer">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.category === cat}
                                                        onChange={() => handleCategoryChange(cat)}
                                                        className="peer appearance-none w-5 h-5 rounded-md border border-border bg-background checked:bg-primary checked:border-primary transition-all cursor-pointer"
                                                    />
                                                    <svg className="absolute w-3 h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className={`ml-3 text-sm transition-colors ${filters.category === cat ? 'text-foreground font-bold' : 'text-muted-foreground group-hover:text-foreground'}`}>{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-5">Price Range (Up to ${priceRange})</h3>
                                    <div className="relative pt-1 px-1">
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            step="100"
                                            value={priceRange}
                                            onChange={handlePriceChange}
                                            style={{
                                                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(priceRange / 5000) * 100}%, var(--color-border) ${(priceRange / 5000) * 100}%, var(--color-border) 100%)`
                                            }}
                                            className="w-full h-1.5 appearance-none cursor-pointer rounded-full accent-primary shadow-sm"
                                        />
                                    </div>
                                    <div className="flex justify-between mt-3 text-[10px] text-muted-foreground font-bold tracking-tighter">
                                        <span>$0</span>
                                        <span>$5000+</span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <button
                                        onClick={applyPriceFilter}
                                        className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:shadow-glow hover:scale-[1.02] transition-all active:scale-95"
                                    >
                                        Apply Changes
                                    </button>

                                    <button
                                        onClick={() => {
                                            dispatch(clearFilters());
                                            setPriceRange(5000);
                                        }}
                                        className="w-full py-2 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-wider transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-80 bg-white/5 rounded-[2rem] animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products && products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center">
                                        <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                                        <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductsPage;
