import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { DbProduct } from '@/lib/supabase-types';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: DbProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const image = product.images?.[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, images: product.images, short_description: product.short_description });
    openCart();
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-border">
          <div className="relative aspect-square overflow-hidden bg-cream">
            {image ? (
              <img src={image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={400} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="bg-gold text-charcoal text-[10px] font-button font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{product.badge}</span>
              )}
              {product.compare_price && (
                <span className="bg-sale text-white text-[10px] font-button font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Sale</span>
              )}
            </div>
            <button className="absolute bottom-14 right-3 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-card">
              <Heart className="w-4 h-4 text-foreground" />
            </button>
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button onClick={handleAddToCart} variant="hero" size="default" className="w-full gap-2 text-xs">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-heading text-sm sm:text-base font-semibold mb-1 leading-tight">{product.name}</h3>
            {product.short_description && (
              <p className="text-[10px] text-muted-foreground mb-2 font-button line-clamp-1">{product.short_description}</p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="font-price text-lg font-bold text-crimson">${Number(product.price).toFixed(2)}</span>
              {product.compare_price && (
                <span className="font-price text-sm text-muted-foreground line-through">${Number(product.compare_price).toFixed(2)}</span>
              )}
            </div>
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {product.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[9px] font-button uppercase tracking-wider bg-cream text-deep-green px-1.5 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            )}
            {(product.stock_qty ?? 0) <= 10 && (product.stock_qty ?? 0) > 0 && (
              <p className="text-[10px] text-sale font-button font-semibold mt-1">Only {product.stock_qty} left in stock!</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
