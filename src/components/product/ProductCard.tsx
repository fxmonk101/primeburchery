import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Product } from '@/lib/mock-data';
import { PRODUCT_IMAGES } from '@/lib/product-images';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const image = PRODUCT_IMAGES[product.id];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-border">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-cream">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              width={400}
              height={400}
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="bg-gold text-charcoal text-[10px] font-button font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              {product.isNew && !product.badge && (
                <span className="bg-success text-success-foreground text-[10px] font-button font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">New</span>
              )}
              {product.comparePrice && (
                <span className="bg-sale text-white text-[10px] font-button font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Sale</span>
              )}
            </div>
            {/* Origin flag */}
            {product.originCountry && (
              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] font-button">
                {getFlag(product.originCountry)} {product.originCountry}
              </div>
            )}
            {/* Wishlist */}
            <button className="absolute bottom-14 right-3 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-card">
              <Heart className="w-4 h-4 text-foreground" />
            </button>
            {/* Quick add */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button onClick={handleAddToCart} variant="hero" size="default" className="w-full gap-2 text-xs">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-[10px] font-button text-muted-foreground uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="font-heading text-sm sm:text-base font-semibold mb-1 leading-tight">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>

            {/* Social proof */}
            <p className="text-[10px] text-muted-foreground mb-2 font-button">{product.soldThisWeek} sold this week</p>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-price text-lg font-bold text-crimson">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="font-price text-sm text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
              )}
            </div>

            {/* Weight options */}
            {product.weightOptions && (
              <p className="text-[10px] text-muted-foreground mt-1 font-button">{product.weightOptions.join(' / ')}</p>
            )}

            {/* Stock warning */}
            {product.stockQty <= 10 && (
              <p className="text-[10px] text-sale font-button font-semibold mt-1">Only {product.stockQty} left in stock!</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function getFlag(country: string): string {
  const flags: Record<string, string> = {
    'New Zealand': '🇳🇿',
    'Japan': '🇯🇵',
    'Ireland': '🇮🇪',
    'USA': '🇺🇸',
    'Australia': '🇦🇺',
    'Spain': '🇪🇸',
    'France': '🇫🇷',
    'UK': '🇬🇧',
    'Brazil': '🇧🇷',
  };
  return flags[country] || '🌍';
}
