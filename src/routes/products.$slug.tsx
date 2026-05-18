import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Minus, Plus, Eye, MessageSquare, ShieldCheck, Truck, Award, Wheat, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import type { DbProduct } from '@/lib/supabase-types';
import { useRealtimeTable } from '@/hooks/useRealtimeTable';

interface Review {
  id: string;
  reviewer_name: string | null;
  rating: number;
  title: string | null;
  body: string | null;
  is_verified_purchase: boolean | null;
  helpful_count: number | null;
  created_at: string | null;
}

type ProductWithSeo = DbProduct & {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  focus_keyword?: string | null;
};

export const Route = createFileRoute('/products/$slug')({
  component: ProductDetailPage,
  loader: async ({ params }) => {
    const { data } = await supabase
      .from('products')
      .select('name, short_description, description, meta_title, meta_description, meta_keywords, images, slug')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .maybeSingle();
    return { product: data };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.product as any;
    const title = p?.meta_title || (p?.name ? `${p.name} — The Prime Butchery` : 'Product — The Prime Butchery');
    const desc =
      p?.meta_description ||
      p?.short_description ||
      (p?.description ? String(p.description).replace(/<[^>]+>/g, '').slice(0, 160) : 'Premium grain-fed meats delivered fresh.');
    const url = `https://primeburchery.lovable.app/products/${params.slug}`;
    const image = p?.images?.[0];
    const meta: Array<Record<string, string>> = [
      { title },
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:type', content: 'product' },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
    ];
    if (p?.meta_keywords) meta.push({ name: 'keywords', content: p.meta_keywords });
    if (image) {
      meta.push({ property: 'og:image', content: image });
      meta.push({ name: 'twitter:image', content: image });
    }
    return { meta, links: [{ rel: 'canonical', href: url }] };
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
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<ProductWithSeo | null>(null);
  const [related, setRelated] = useState<DbProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', title: '', body: '', rating: 5 });
  const [submittingReview, setSubmittingReview] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('products').select('*').eq('slug', slug).eq('is_active', true).maybeSingle();
    setProduct(data as ProductWithSeo | null);
    if (data) {
      const [{ data: rel }, { data: revs }] = await Promise.all([
        data.category_id
          ? supabase.from('products').select('*').eq('category_id', data.category_id).neq('id', data.id).eq('is_active', true).limit(4)
          : Promise.resolve({ data: [] }),
        supabase.from('reviews').select('*').eq('product_id', data.id).eq('is_approved', true).order('created_at', { ascending: false }).limit(20),
      ]);
      setRelated(rel ?? []);
      setReviews((revs as Review[]) ?? []);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    setSelectedWeight(0);
    load();
  }, [load]);

  // Realtime: refetch when admin edits the product
  useRealtimeTable('products', load);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;

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

  const images = product.images?.filter(Boolean) ?? [];
  const currentImage = images[activeImage] || images[0];
  const weightOptions = product.weight_options?.filter(Boolean) ?? [];
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, images: product.images, short_description: product.short_description });
    openCart();
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);
    await supabase.from('reviews').insert({
      product_id: product.id,
      reviewer_name: reviewForm.name,
      title: reviewForm.title,
      body: reviewForm.body,
      rating: reviewForm.rating,
    });
    setSubmittingReview(false);
    setShowReviewForm(false);
    setReviewForm({ name: '', title: '', body: '', rating: 5 });
    alert('Thank you for your review! It will appear after moderation.');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-button text-muted-foreground mb-6">
          <Link to="/" className="hover:text-crimson">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-crimson">Products</Link>
          <span>›</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-cream mb-4">
              {currentImage ? (
                <img src={currentImage} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image available</div>
              )}
              {product.badge && (
                <span className="absolute top-4 left-4 bg-gold text-charcoal text-xs font-button font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{product.badge}</span>
              )}
            </div>
            {/* Thumbnail gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImage === i ? 'border-crimson ring-2 ring-crimson/20' : 'border-border hover:border-crimson/30'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">{product.name}</h1>

            {/* Rating summary */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'fill-gold text-gold' : 'text-border'}`} />
                  ))}
                </div>
                <span className="text-sm font-button text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-price text-3xl font-bold text-crimson">${Number(product.price).toFixed(2)}</span>
              {product.compare_price && (
                <>
                  <span className="font-price text-lg text-muted-foreground line-through">${Number(product.compare_price).toFixed(2)}</span>
                  <span className="bg-success text-success-foreground text-xs font-button font-bold px-2 py-0.5 rounded-full">
                    Save ${(Number(product.compare_price) - Number(product.price)).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {product.short_description && (
              <p className="text-muted-foreground leading-relaxed mb-5">{product.short_description}</p>
            )}

            {/* Weight variation selector */}
            {weightOptions.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-button text-muted-foreground uppercase tracking-widest mb-2">Select Weight</p>
                <div className="flex flex-wrap gap-2">
                  {weightOptions.map((w, i) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(i)}
                      className={`px-5 py-2.5 rounded-full text-sm font-button border-2 transition-all ${selectedWeight === i ? 'bg-crimson text-white border-crimson shadow-md' : 'border-border hover:border-crimson/40 bg-card'}`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            {(product.stock_qty ?? 0) > 0 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span className={`w-2 h-2 rounded-full ${(product.stock_qty ?? 0) <= 5 ? 'bg-sale animate-pulse' : (product.stock_qty ?? 0) <= 15 ? 'bg-gold' : 'bg-success'}`} />
                <span className={`font-button font-semibold ${(product.stock_qty ?? 0) <= 5 ? 'text-sale' : (product.stock_qty ?? 0) <= 15 ? 'text-gold' : 'text-success'}`}>
                  {(product.stock_qty ?? 0) <= 5 ? `Only ${product.stock_qty} left — order soon!` : (product.stock_qty ?? 0) <= 15 ? `Low stock — ${product.stock_qty} remaining` : 'In stock — ready to ship'}
                </span>
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
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-l-full transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-button font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-r-full transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <Button onClick={handleAddToCart} variant="hero" size="xl" className="flex-1 gap-2">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust signals with proper icons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { Icon: ShieldCheck, title: 'Secure Checkout', sub: 'SSL Encrypted' },
                { Icon: Truck, title: 'Cold-Chain Delivery', sub: 'Arrives fresh' },
                { Icon: Award, title: '7-Day Guarantee', sub: 'Full refund' },
                { Icon: Wheat, title: 'Farm Verified', sub: 'Full traceability' },
              ].map((t) => (
                <div key={t.title} className="flex items-center gap-2.5 bg-cream rounded-xl p-3">
                  <t.Icon className="w-5 h-5 text-deep-green shrink-0" strokeWidth={1.8} />
                  <div>
                    <p className="text-xs font-button font-semibold">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-2 mb-2">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                {product.tags.map((t) => (
                  <Link
                    key={t}
                    to="/products"
                    className="text-[11px] font-button uppercase tracking-wider bg-cream hover:bg-gold/20 text-deep-green px-2.5 py-1 rounded-full transition-colors border border-border"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-12 mb-8 max-w-3xl">
            <h2 className="text-2xl font-heading font-bold mb-4">About This Cut</h2>
            <div className="text-muted-foreground leading-relaxed prose prose-sm" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}

        {/* Reviews Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-heading font-bold">Customer Reviews</h2>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'fill-gold text-gold' : 'text-border'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-button text-muted-foreground">{avgRating.toFixed(1)} ({reviews.length})</span>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowReviewForm(!showReviewForm)}>
              <MessageSquare className="w-4 h-4" /> {showReviewForm ? 'Cancel' : 'Write a Review'}
            </Button>
          </div>

          {showReviewForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-cream rounded-2xl p-6 mb-8 max-w-lg">
              <h3 className="font-heading text-lg font-bold mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div>
                  <label className="text-xs font-button font-semibold mb-1 block">Your Name</label>
                  <input type="text" required value={reviewForm.name} onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="John S." />
                </div>
                <div>
                  <label className="text-xs font-button font-semibold mb-1 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" onClick={() => setReviewForm(prev => ({ ...prev, rating: s }))} className="hover:scale-110 transition-transform">
                        <Star className={`w-6 h-6 ${s <= reviewForm.rating ? 'fill-gold text-gold' : 'text-border'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-button font-semibold mb-1 block">Review Title</label>
                  <input type="text" required value={reviewForm.title} onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="Amazing quality!" />
                </div>
                <div>
                  <label className="text-xs font-button font-semibold mb-1 block">Your Review</label>
                  <textarea required rows={3} value={reviewForm.body} onChange={(e) => setReviewForm(prev => ({ ...prev, body: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 resize-none" placeholder="Share your experience..." />
                </div>
                <button type="submit" disabled={submittingReview} className="w-full px-4 py-2.5 bg-crimson text-white rounded-full text-sm font-button font-semibold hover:bg-crimson/90 transition-colors disabled:opacity-50">
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Reviews list */}
          {reviews.length > 0 ? (
            <div className="space-y-4 max-w-2xl">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-crimson/10 flex items-center justify-center text-sm font-button font-bold text-crimson">
                        {(review.reviewer_name ?? 'A').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-button font-semibold text-sm">{review.reviewer_name ?? 'Anonymous'}</p>
                        {review.is_verified_purchase && (
                          <span className="text-[10px] font-button text-success font-semibold">✓ Verified Purchase</span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {review.created_at ? new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-gold text-gold' : 'text-border'}`} />
                    ))}
                  </div>
                  {review.title && <p className="font-button font-semibold text-sm mb-1">{review.title}</p>}
                  {review.body && <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>}
                  {(review.helpful_count ?? 0) > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">{review.helpful_count} people found this helpful</p>
                  )}
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
