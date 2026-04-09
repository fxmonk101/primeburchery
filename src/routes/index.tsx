import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Leaf, Award, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { TrustBadges } from '@/components/trust/TrustBadges';
import heroImage from '@/assets/hero-steaks.jpg';

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'PrimeBurchry — Premium Grain-Fed Meats Delivered' },
      { name: 'description', content: 'Shop chef-trusted, grain-fed gourmet meats. Farm-transparent sourcing, cold-chain delivery, and 100% satisfaction guarantee.' },
      { property: 'og:title', content: 'PrimeBurchry — Premium Grain-Fed Meats' },
      { property: 'og:description', content: 'Chef-trusted, grain-fed gourmet meats delivered to your door.' },
    ],
  }),
});

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function HomePage() {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium grain-fed steaks" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <p className="font-button text-gold text-sm uppercase tracking-[0.2em] mb-4">Farm-to-Door Premium Meats</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-card leading-tight mb-6">
              Grain-Fed. <br />Chef-Trusted. <br /><span className="text-gold">Unforgettable.</span>
            </h1>
            <p className="text-card/80 text-lg mb-8 leading-relaxed">
              Premium cuts from verified farms, delivered fresh with cold-chain precision. Every steak tells a story.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl" className="gap-2">
                  Shop Premium Cuts <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="heroOutline" size="xl" className="text-card border-card/40 hover:bg-card/10 hover:text-card">
                Our Farms
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Bestsellers */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Customer Favorites</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              Our <span className="text-crimson">Bestsellers</span>
            </h2>
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
          <div className="text-center mt-10">
            <Link to="/products">
              <Button variant="heroOutline" size="lg" className="gap-2">
                View All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Browse By Category</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">Shop Our Collections</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link to="/products" className="block group">
                  <div className="bg-card rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 border border-border group-hover:border-crimson/30">
                    <h3 className="font-heading text-lg sm:text-xl font-bold mb-1 group-hover:text-crimson transition-colors">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                    <span className="text-xs font-button text-crimson font-semibold">{cat.productCount} products →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PrimeBurchry */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">The PrimeBurchry Difference</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">Why Choose Us?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Farm Sourced', desc: 'Every cut traceable to its origin farm. Full transparency, always.' },
              { icon: Award, title: 'Grain-Fed Premium', desc: 'Minimum 30-day grain feeding program for exceptional marbling and flavor.' },
              { icon: Truck, title: 'Cold-Chain Delivery', desc: 'Insulated packaging with dry ice. Your meat arrives fresh, guaranteed.' },
              { icon: ShieldCheck, title: '100% Guaranteed', desc: 'Not satisfied? Full refund within 7 days, no questions asked.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center bg-cream rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-crimson/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-crimson" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-2">Trusted By Chefs & Home Cooks</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">What People Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-card rounded-2xl p-8 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-heading font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
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
              Join thousands of satisfied customers who trust PrimeBurchry for their premium meat needs. First order? Get 10% off with code PRIME10.
            </p>
            <Link to="/products">
              <Button variant="hero" size="xl" className="gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
