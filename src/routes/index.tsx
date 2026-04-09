import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Leaf, Award, ShieldCheck, Clock, Users, ChefHat, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { TrustBadges } from '@/components/trust/TrustBadges';
import { PRODUCT_IMAGES } from '@/lib/product-images';
import heroImage from '@/assets/hero-steaks.jpg';

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'PrimeButchery — Premium Grain-Fed Meats Delivered' },
      { name: 'description', content: 'Shop chef-trusted, grain-fed gourmet meats. Farm-transparent sourcing, cold-chain delivery, and 100% satisfaction guarantee.' },
      { property: 'og:title', content: 'PrimeButchery — Premium Grain-Fed Meats' },
      { property: 'og:description', content: 'Chef-trusted, grain-fed gourmet meats delivered to your door.' },
    ],
  }),
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function HomePage() {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);
  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium grain-fed steaks" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-card/20 rounded-full px-4 py-2 mb-6">
              <Flame className="w-4 h-4 text-gold" />
              <span className="font-button text-card text-xs uppercase tracking-[0.2em]">Farm-to-Door Premium Meats</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-card leading-[1.1] mb-6">
              Premium, Grain-Fed <br />Meats — Direct <br />to <span className="text-gold">Your Table</span>
            </h1>
            <p className="text-card/80 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              Experience the best of pasture-raised, grain-fed beef, direct from our verified farms to your plate. No middlemen, no compromises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl" className="gap-2 text-base">
                  Shop Premium Cuts <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="heroOutline" size="xl" className="text-card border-card/30 hover:bg-card/10 hover:text-card text-base">
                Our Story
              </Button>
            </div>
            {/* Stats bar */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-card/20">
              <div>
                <p className="font-price text-2xl font-bold text-gold">5,000+</p>
                <p className="text-xs text-card/60 font-button">Happy Customers</p>
              </div>
              <div>
                <p className="font-price text-2xl font-bold text-gold">4.9★</p>
                <p className="text-xs text-card/60 font-button">Average Rating</p>
              </div>
              <div>
                <p className="font-price text-2xl font-bold text-gold">100%</p>
                <p className="text-xs text-card/60 font-button">Satisfaction Guarantee</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Shop By Category - Horizontal Scroller (Marx Foods style) */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Browse By Category</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold">Shop By Category</h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-button font-semibold text-crimson hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="snap-start shrink-0 w-[200px] sm:w-[220px]"
              >
                <Link to="/products" className="block group">
                  <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:border-crimson/30">
                    <div className="aspect-[4/3] bg-cream flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-crimson/5 to-gold/10 flex items-center justify-center">
                        <span className="text-4xl">{getCategoryEmoji(cat.slug)}</span>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-heading text-sm sm:text-base font-bold group-hover:text-crimson transition-colors">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{cat.productCount} products</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-14 sm:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Customer Favorites</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold">
                Our <span className="text-crimson">Bestsellers</span>
              </h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-button font-semibold text-crimson hover:underline">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <Link to="/products">
              <Button variant="heroOutline" size="lg" className="gap-2">
                View All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why PrimeButchery — 4-step farm-to-door process (Kingfishers Bend inspired) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">The PrimeButchery Difference</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Farm to Your Door in 4 Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We're a family-owned operation offering premium quality and unmatched value — cutting out the middleman in the process.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, step: '01', title: 'Sourced From Verified Farms', desc: 'Every cut traceable to its origin farm. Full transparency on grain-feeding, welfare standards, and certifications.' },
              { icon: Award, step: '02', title: 'Hand-Selected & Aged', desc: 'Our master butchers select only the finest cuts and dry-age them for optimal tenderness and flavor.' },
              { icon: Truck, step: '03', title: 'Cold-Chain Delivered', desc: 'Insulated packaging with dry ice ensures your meat arrives as fresh as the day it was cut.' },
              { icon: ChefHat, step: '04', title: 'Chef-Approved Quality', desc: 'Trusted by top restaurants and home chefs alike. Each cut is backed by our 100% satisfaction guarantee.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative text-center"
              >
                <div className="text-5xl font-heading font-bold text-crimson/10 mb-2">{item.step}</div>
                <div className="w-16 h-16 bg-crimson/8 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-8 h-8 text-crimson" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Spotlight */}
      <section className="py-16 sm:py-20 bg-foreground text-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-3">Featured Cut</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-card mb-4">
                A5 Wagyu Striploin
              </h2>
              <p className="text-card/70 leading-relaxed mb-6">
                Authentic Japanese A5 Wagyu from Miyazaki Prefecture. BMS 10+ marbling score. Each cut is individually certified and traceable to the source farm. The pinnacle of beef luxury.
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-price text-3xl font-bold text-gold">$189.99</span>
                <span className="text-xs text-card/50 font-button">per striploin</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="text-sm">5.0 (63 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" />
                  <span className="text-sm">12 sold this week</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sale" />
                  <span className="text-sm text-sale font-semibold">Only 4 left</span>
                </div>
              </div>
              <Link to="/products/$slug" params={{ slug: 'a5-wagyu-striploin' }}>
                <Button variant="hero" size="xl" className="gap-2">
                  View Details <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img src={PRODUCT_IMAGES['2']} alt="A5 Wagyu Striploin" className="w-full h-full object-cover" width={600} height={600} />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gold text-gold-foreground px-5 py-3 rounded-2xl shadow-lg">
                <p className="text-xs font-button font-bold uppercase tracking-wider">Limited Stock</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Trusted By Chefs & Home Cooks</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">What Our Customers Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border"
              >
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center">
                    <span className="text-sm font-heading font-bold text-crimson">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section (Wholesale Meats inspired) */}
      <section className="py-14 sm:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Secure Payment', desc: 'All cards accepted. Powered by Stripe with 256-bit SSL encryption.' },
              { icon: '💯', title: '100% Satisfaction Guarantee', desc: 'Not happy? Full refund within 7 days, no questions asked.' },
              { icon: '🚚', title: 'Free Delivery', desc: 'Free on all orders over $75. Cold-chain insulated shipping.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-start gap-4 bg-card rounded-2xl p-6 border border-border"
              >
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-button font-bold text-sm mb-1 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Ready to Taste the <span className="text-crimson">Difference?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust PrimeButchery for their premium meat needs. First order? Get 10% off with code <strong>PRIME10</strong>.
            </p>
            <Link to="/products">
              <Button variant="hero" size="xl" className="gap-2 text-base">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function getCategoryEmoji(slug: string): string {
  const map: Record<string, string> = {
    'premium-steaks': '🥩',
    'wagyu': '🏆',
    'lamb-veal': '🐑',
    'poultry': '🍗',
    'specialty': '🔪',
    'charcuterie': '🥓',
  };
  return map[slug] || '🥩';
}
