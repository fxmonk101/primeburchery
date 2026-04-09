import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Truck, Shield, ChevronLeft, Minus, Plus } from 'lucide-react';
import { PRODUCTS, REVIEWS, TRUST_BADGES } from '@/lib/mock-data';
import { PRODUCT_IMAGES } from '@/lib/product-images';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';

export const Route = createFileRoute('/products/$slug')({
  component: ProductDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-crimson hover:underline">← Back to all products</Link>
      </div>
    </div>
  ),
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-crimson hover:underline">← Back to all products</Link>
        </div>
      </div>
    );
  }

  const image = PRODUCT_IMAGES[product.id];
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug).slice(0, 4);
  const productReviews = REVIEWS.filter((r) => r.productId === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    openCart();
  };

  const tabs = ['description', 'nutritional info', 'farm source', 'shipping'];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-1 text-sm font-button text-muted-foreground hover:text-crimson mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream">
              <img src={image} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
              {product.isBestseller && (
                <span className="absolute top-4 left-4 bg-gold text-gold-foreground text-xs font-button font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Bestseller</span>
              )}
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-success text-success-foreground text-xs font-button font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">New</span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="text-xs font-button text-muted-foreground uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-sm font-button text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-sm text-success font-button font-semibold">{product.soldThisWeek} sold this week</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-price text-3xl font-bold text-crimson">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <>
                  <span className="font-price text-lg text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
                  <span className="bg-sale text-crimson-foreground text-xs font-button font-bold px-2 py-0.5 rounded-full">
                    SAVE ${(product.comparePrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.shortDescription}</p>

            {/* Stock */}
            {product.stockQty <= 10 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className={`w-2 h-2 rounded-full ${product.stockQty <= 5 ? 'bg-sale' : 'bg-gold'}`} />
                <span className={`font-button font-semibold ${product.stockQty <= 5 ? 'text-sale' : 'text-gold'}`}>
                  {product.stockQty <= 5 ? `Only ${product.stockQty} left in stock!` : `${product.stockQty} left — selling fast`}
                </span>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-l-full transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-button font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-r-full transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button onClick={handleAddToCart} variant="hero" size="xl" className="flex-1 gap-2">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 bg-cream rounded-xl p-3">
                <Truck className="w-5 h-5 text-success" />
                <div>
                  <p className="text-xs font-button font-semibold">Free Shipping</p>
                  <p className="text-[10px] text-muted-foreground">Orders over $75</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-cream rounded-xl p-3">
                <Shield className="w-5 h-5 text-success" />
                <div>
                  <p className="text-xs font-button font-semibold">100% Guarantee</p>
                  <p className="text-[10px] text-muted-foreground">7-day money back</p>
                </div>
              </div>
            </div>

            {/* Farm info */}
            <div className="bg-cream rounded-2xl p-4 mb-6">
              <p className="text-xs font-button text-muted-foreground uppercase tracking-widest mb-1">Sourced From</p>
              <p className="font-heading font-semibold">{product.originFarm}</p>
              {product.grainFedDays > 0 && (
                <p className="text-sm text-muted-foreground mt-1">🌾 {product.grainFedDays}-day grain feeding program</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12 mb-16">
          <div className="flex border-b border-border gap-1 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-button font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-crimson text-crimson' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            )}
            {activeTab === 'nutritional info' && (
              <p className="text-muted-foreground">Nutritional information available on packaging. Rich in protein, iron, and B vitamins.</p>
            )}
            {activeTab === 'farm source' && (
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">{product.originFarm}</h3>
                <p className="text-muted-foreground">Our partner farm follows strict grain-feeding protocols and animal welfare standards. All cattle are raised without antibiotics or growth hormones.</p>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-3 text-muted-foreground">
                <p>🚚 Cold-chain delivery in insulated packaging with dry ice</p>
                <p>📦 Free shipping on orders over $75</p>
                <p>⏰ Standard delivery: 2-4 business days</p>
                <p>↩️ 100% satisfaction guarantee — full refund within 7 days</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {productReviews.map((review) => (
                <div key={review.id} className="bg-cream rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-border'}`} />
                      ))}
                    </div>
                    <span className="font-button font-semibold text-sm">{review.userName}</span>
                    {review.isVerifiedPurchase && (
                      <span className="bg-success/10 text-success text-[10px] font-button font-bold px-2 py-0.5 rounded-full">✅ Verified Buyer</span>
                    )}
                  </div>
                  <h4 className="font-heading font-semibold mb-1">{review.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
                  <p className="text-xs text-muted-foreground mt-3">👍 {review.helpfulCount} found this helpful</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">You Might Also Love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
