import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Truck, Shield, ChevronLeft, Minus, Plus, Eye, Snowflake, Wheat } from 'lucide-react';
import { PRODUCTS, REVIEWS } from '@/lib/mock-data';
import { PRODUCT_IMAGES } from '@/lib/product-images';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';

export const Route = createFileRoute('/products/$slug')({
  component: ProductDetailPage,
  head: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    return {
      meta: [
        { title: product ? `${product.name} — PrimeButchery` : 'Product — PrimeButchery' },
        { name: 'description', content: product?.shortDescription || 'Premium grain-fed meats delivered fresh.' },
        { property: 'og:title', content: product ? `${product.name} — PrimeButchery` : 'PrimeButchery' },
        { property: 'og:description', content: product?.shortDescription || '' },
      ],
    };
  },
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

  const tabs = ['description', 'nutrition', 'farm source', 'cooking guide', 'shipping'];

  const getFlag = (country?: string) => {
    const flags: Record<string, string> = { 'New Zealand': '🇳🇿', 'Japan': '🇯🇵', 'Ireland': '🇮🇪', 'USA': '🇺🇸', 'Australia': '🇦🇺', 'Spain': '🇪🇸' };
    return country ? flags[country] || '🌍' : '🌍';
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-button text-muted-foreground mb-6">
          <Link to="/" className="hover:text-crimson">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-crimson">{product.category}</Link>
          <span>›</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream">
              <img src={image} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-gold text-charcoal text-xs font-button font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{product.badge}</span>
              )}
              {product.grainFedDays > 0 && (
                <span className="absolute bottom-4 left-4 bg-deep-green text-deep-green-foreground text-xs font-button font-bold px-3 py-1.5 rounded-full">🌾 Grain-Fed Certified</span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Link to="/products" className="text-xs font-button text-crimson uppercase tracking-widest mb-2 inline-block hover:underline">{product.category}</Link>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-sm font-button text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Origin & grain-fed info */}
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
              {product.originCountry && <span>{getFlag(product.originCountry)} Sourced from {product.originCountry}</span>}
              {product.grainFedDays > 0 && <span>🌾 {product.grainFedDays}-day grain-fed program</span>}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-price text-3xl font-bold text-crimson">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <>
                  <span className="font-price text-lg text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
                  <span className="bg-success text-success-foreground text-xs font-button font-bold px-2 py-0.5 rounded-full">
                    You save ${(product.comparePrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-5">{product.shortDescription}</p>

            {/* Weight options */}
            {product.weightOptions && product.weightOptions.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-button text-muted-foreground uppercase tracking-widest mb-2">Weight</p>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((w, i) => (
                    <button key={w} className={`px-4 py-2 rounded-full text-sm font-button border transition-colors ${i === 0 ? 'bg-crimson text-white border-crimson' : 'border-border hover:border-crimson/30'}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            {product.stockQty <= 15 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className={`w-2 h-2 rounded-full ${product.stockQty <= 5 ? 'bg-sale animate-pulse' : product.stockQty <= 15 ? 'bg-gold' : 'bg-success'}`} />
                <span className={`font-button font-semibold ${product.stockQty <= 5 ? 'text-sale' : 'text-gold'}`}>
                  {product.stockQty <= 5 ? `Only ${product.stockQty} left — order soon!` : `Low stock — ${product.stockQty} remaining`}
                </span>
              </div>
            )}
            {product.stockQty > 15 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="font-button font-semibold text-success">In stock — ready to ship</span>
              </div>
            )}

            {/* Live viewers */}
            <div className="flex items-center gap-2 mb-5 text-xs text-muted-foreground font-button">
              <Eye className="w-3.5 h-3.5" />
              <span>{8 + Math.floor(Math.random() * 15)} people viewing this right now</span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-5">
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

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {product.certifications.map((cert) => (
                  <span key={cert} className="text-[10px] font-button font-semibold bg-deep-green/10 text-deep-green px-2.5 py-1 rounded-full">{cert}</span>
                ))}
              </div>
            )}

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: '🔒', title: 'Secure Checkout', sub: 'SSL Encrypted' },
                { icon: '🚚', title: 'Cold-Chain Delivery', sub: 'Arrives fresh' },
                { icon: '💯', title: '7-Day Guarantee', sub: 'Full refund' },
                { icon: '🌾', title: 'Farm Verified', sub: 'Full traceability' },
              ].map((t) => (
                <div key={t.title} className="flex items-center gap-2 bg-cream rounded-xl p-3">
                  <span className="text-lg">{t.icon}</span>
                  <div>
                    <p className="text-xs font-button font-semibold">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground">{t.sub}</p>
                  </div>
                </div>
              ))}
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
            {activeTab === 'description' && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}
            {activeTab === 'nutrition' && (
              <div className="text-muted-foreground space-y-2">
                <p>Per 100g (approximate values, vary by cut and cooking method):</p>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                  <span>Calories: 250 kcal</span><span>Protein: 26g</span>
                  <span>Total Fat: 16g</span><span>Saturated Fat: 7g</span>
                  <span>Iron: 2.6mg</span><span>Zinc: 4.8mg</span>
                </div>
              </div>
            )}
            {activeTab === 'farm source' && (
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">{getFlag(product.originCountry)} {product.originFarm}</h3>
                <p className="text-muted-foreground mb-3">
                  {product.originCountry && `Located in ${product.originCountry}. `}
                  Our partner farm follows strict grain-feeding protocols and animal welfare standards. All livestock are raised without antibiotics or growth hormones.
                </p>
                {product.grainFedDays > 0 && (
                  <p className="text-sm text-deep-green font-button font-semibold">🌾 {product.grainFedDays}-day grain feeding program</p>
                )}
              </div>
            )}
            {activeTab === 'cooking guide' && (
              <div>
                {product.cookingMethods && product.cookingMethods.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {product.cookingMethods.map((method) => (
                      <div key={method} className="bg-cream rounded-xl p-4 text-center">
                        <p className="text-2xl mb-2">{method === 'Grill' ? '🔥' : method === 'Pan-sear' ? '🍳' : method === 'Roast' ? '🫕' : method === 'Smoke' ? '💨' : '🍽️'}</p>
                        <p className="font-button font-semibold text-sm">{method}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Cooking guide coming soon.</p>
                )}
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-3 text-muted-foreground">
                <p>✅ Order by 12pm → next day delivery</p>
                <p>❄️ Packed with dry ice in insulated box</p>
                <p>📦 Tracking number emailed on dispatch</p>
                <p>💯 Not satisfied? Full refund within 7 days</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <section className="mb-16">
          <h2 className="text-2xl font-heading font-bold mb-6">What Our Customers Say</h2>
          {productReviews.length > 0 ? (
            <div className="space-y-4">
              {productReviews.map((review) => (
                <div key={review.id} className="bg-cream rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
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
          ) : (
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          )}
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">You Might Also Love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
