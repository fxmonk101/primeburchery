import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { DbProduct, DbCategory } from '@/lib/supabase-types';

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data: prods }, { data: cats }] = await Promise.all([
        supabase.from('products').select('*').eq('is_active', true),
        supabase.from('categories').select('*').order('sort_order'),
      ]);
      setProducts(prods ?? []);
      setCategories(cats ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = products.filter((p) => !activeCategory || p.category_id === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'newest': return (b.created_at ?? '').localeCompare(a.created_at ?? '');
      default: return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen">
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
            Hand-selected, premium meats sourced from verified farms. Every cut tells a story of quality.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button variant={!activeCategory ? 'hero' : 'outline'} size="sm" onClick={() => setActiveCategory(null)}>All</Button>
            {categories.map((cat) => (
              <Button key={cat.id} variant={activeCategory === cat.id ? 'hero' : 'outline'} size="sm" onClick={() => setActiveCategory(cat.id)}>
                {cat.name}
              </Button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-button">
            <option value="name">Name A-Z</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {loading ? (
          <div className="text-center py-20"><p className="text-muted-foreground">Loading products...</p></div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sorted.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.35 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            {sorted.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl font-heading text-muted-foreground">No products found in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
