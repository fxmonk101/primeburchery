import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORIES } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
});

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('bestselling');

  const filtered = PRODUCTS.filter((p) => !activeCategory || p.categorySlug === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return a.isNew ? -1 : 1;
      default: return b.soldThisWeek - a.soldThisWeek;
    }
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 sm:py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-4"
          >
            Our <span className="text-crimson">Premium</span> Collection
          </motion.h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Hand-selected, grain-fed meats sourced from verified farms. Every cut tells a story of quality.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!activeCategory ? 'hero' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? 'hero' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-button"
          >
            <option value="bestselling">Bestselling</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sorted.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        {sorted.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-heading text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
