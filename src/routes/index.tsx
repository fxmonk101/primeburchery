import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Leaf, Award, ShieldCheck, Clock, Users, ChefHat, Flame, Snowflake, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, FARM_STORIES, REVIEW_TICKER } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { TrustBadges } from '@/components/trust/TrustBadges';
import { SocialProofNotification } from '@/components/trust/SocialProofNotification';
import { PRODUCT_IMAGES } from '@/lib/product-images';
import heroImage from '@/assets/hero-store.jpg';

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'PrimeButchery — Grain-Fed. Chef-Trusted. Unforgettable.' },
      { name: 'description', content: 'Shop 60+ premium grain-fed cuts from verified farms worldwide. Cold-chain delivery, 100% satisfaction guarantee. Free shipping over $75.' },
      { property: 'og:title', content: 'PrimeButchery — Premium Grain-Fed Meats Delivered' },
      { property: 'og:description', content: 'Farm-to-door premium meats. Chef-trusted quality. Cold-chain delivery guaranteed.' },
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

  return (
    <div className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium grain-fed steaks beautifully presented" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Flame className="w-4 h-4 text-gold" />
              <span className="font-button text-white text-xs uppercase tracking-[0.2em]">Farm-to-Door Premium Meats Since 2018</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
              Grain-Fed. Chef-Trusted. <br /><span className="text-gold">Unforgettable.</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              Premium cuts from verified farms, delivered fresh with cold-chain precision. No middlemen, no compromises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl" className="gap-2 text-base">
                  Shop Premium Cuts <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="hero" size="xl" className="gap-2 text-base">
                  Shop Premium Cuts <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/our-farms">
                <Button variant="heroOutline" size="xl" className="text-white border-white/30 hover:bg-white/10 hover:text-white text-base">
                  Our Farms
                </Button>
              </Link>
            </div>
            {/* Stats bar */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/20">
              {[
                { value: '12,847', label: 'Orders Delivered', icon: '🥩' },
                { value: '4.9★', label: 'Avg Rating', icon: '⭐' },
                { value: '6', label: 'Verified Farms', icon: '🌾' },
                { value: 'Next-Day', label: 'Delivery Available', icon: '🚚' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-price text-xl sm:text-2xl font-bold text-gold">{stat.value}</p>
                  <p className="text-xs text-white/50 font-button">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: TRUST BADGES */}
      <TrustBadges />

      {/* SECTION 3: BESTSELLERS CAROUSEL */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Customer Favorites</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold">
                Our <span className="text-crimson">Bestsellers</span>
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">The cuts our customers order again and again</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-button font-semibold text-crimson hover:underline">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <Link to="/products"><Button variant="heroOutline" size="lg" className="gap-2">View All Products <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOP BY CATEGORY GRID */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Browse Our Range</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">Shop Our Collections</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}>
                <Link to="/products" className="block group">
                  <div className="relative bg-charcoal rounded-2xl overflow-hidden aspect-[4/3] flex items-end p-5 hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />
                    <div className="absolute top-4 right-4 text-3xl">{cat.emoji}</div>
                    <div className="relative z-10">
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                      <p className="text-xs text-white/60 font-button mt-1">{cat.productCount} products →</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">The PrimeButchery Difference</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Premium Meat. Zero Compromise.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🛍️', step: '01', title: 'Browse & Select', desc: 'Choose from 60+ premium cuts sourced from verified farms worldwide.' },
              { icon: '🕐', step: '02', title: 'Order by 12pm', desc: 'Place your order before noon for same-day processing and dispatch.' },
              { icon: '❄️', step: '03', title: 'Cold-Chain Delivery', desc: 'Packed with dry ice in insulated boxes. Arrives fresh — guaranteed.' },
              { icon: '🍽️', step: '04', title: 'Cook & Enjoy', desc: 'Not happy? Full refund within 7 days. No questions asked.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} className="relative text-center">
                <div className="text-5xl font-heading font-bold text-crimson/10 mb-2">{item.step}</div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WAGYU FEATURE BANNER */}
      <section className="py-16 sm:py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-3">World's Finest Beef</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gold mb-4">
                Discover A5 Japanese Wagyu
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Our A5 Japanese Wagyu scores BMS 10–12 — the highest possible marbling grade. Sourced directly from Kagoshima Prefecture, Japan. Each cut is individually certified and traceable.
              </p>
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-gold text-gold" />)}
                <span className="text-sm text-white/70 ml-1">5.0 from 94 reviews</span>
              </div>
              <Link to="/products">
                <Button variant="gold" size="xl" className="gap-2">
                  Shop Wagyu Collection <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img src={PRODUCT_IMAGES['2']} alt="A5 Japanese Wagyu Ribeye" className="w-full h-full object-cover" width={600} height={600} />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gold text-charcoal px-5 py-3 rounded-2xl shadow-lg">
                <p className="text-xs font-button font-bold uppercase tracking-wider">BMS 10-12 Certified</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FARM TRANSPARENCY */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Full Traceability</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">We Know Every Farm.<br className="hidden sm:block" /> Do You Know Your Butcher?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Full traceability from field to your front door.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {FARM_STORIES.map((farm, i) => (
              <motion.div key={farm.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-card rounded-2xl p-7 border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{farm.flag}</span>
                  <div>
                    <h3 className="font-heading font-bold text-base">{farm.farmName}</h3>
                    <p className="text-xs text-muted-foreground font-button">{farm.country}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{farm.description}</p>
                <span className="inline-block text-xs font-button font-semibold text-deep-green bg-deep-green/10 px-3 py-1 rounded-full">{farm.specialty}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/our-farms"><Button variant="heroOutline" size="lg" className="gap-2">Meet All Our Farms <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: CHEF ENDORSEMENTS */}
      <section className="py-16 sm:py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Professional Endorsements</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">Trusted by Professional Chefs</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-gold text-gold" />)}
                </div>
                <p className="text-white/80 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-crimson/20 flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-crimson" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-white">{t.name}</p>
                    <p className="text-xs text-white/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: LIVE REVIEW TICKER */}
      <section className="py-6 bg-cream border-y border-border overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...REVIEW_TICKER, ...REVIEW_TICKER].map((r, i) => (
              <span key={i} className="flex items-center gap-2 text-sm">
                <span className="flex">{[...Array(r.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}</span>
                <span className="font-button font-semibold">{r.name}</span>
                <span className="text-muted-foreground">— {r.product} —</span>
                <span className="italic text-foreground">"{r.text}"</span>
                <span className="text-muted-foreground/40 mx-4">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 10: PRESS / AS FEATURED IN */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-button text-muted-foreground uppercase tracking-[0.2em] mb-6">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {['Food & Wine', 'Bon Appétit', 'GQ', 'The Telegraph', 'Eater'].map((pub) => (
              <span key={pub} className="text-lg sm:text-xl font-heading font-bold text-muted-foreground/40">{pub}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: GUARANTEE */}
      <section className="py-14 sm:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Secure Payment', desc: 'All cards accepted. Powered by Stripe with 256-bit SSL encryption.' },
              { icon: '💯', title: '100% Satisfaction Guarantee', desc: 'Not happy? Full refund within 7 days, no questions asked.' },
              { icon: '🚚', title: 'Free Delivery Over $75', desc: 'Cold-chain insulated shipping. Order by 12pm for next-day dispatch.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} className="flex items-start gap-4 bg-card rounded-2xl p-6 border border-border">
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

      {/* SECTION 12: NEWSLETTER CTA */}
      <section className="py-16 sm:py-24 bg-crimson">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Join 12,000+ Meat Lovers
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Get 10% off your first order, exclusive recipes, and early access to new cuts.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 text-sm focus:outline-none focus:bg-white/30"
              />
              <button className="px-6 py-3 bg-gold text-charcoal rounded-full text-sm font-button font-bold hover:bg-gold/90 transition-colors whitespace-nowrap">
                Get 10% Off →
              </button>
            </div>
            <p className="text-xs text-white/50 mt-3">🔒 No spam. Unsubscribe any time.</p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Notification */}
      <SocialProofNotification />
    </div>
  );
}
