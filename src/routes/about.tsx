import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Leaf, ShieldCheck, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'About PrimeButchery — Our Story & Mission' },
      { name: 'description', content: 'Learn about PrimeButchery, a US-based premium meat company committed to grain-fed quality, farm transparency, and cold-chain delivery since 2018.' },
      { property: 'og:title', content: 'About PrimeButchery — Our Story & Mission' },
      { property: 'og:description', content: 'Discover the story behind PrimeButchery — grain-fed quality meats, transparent sourcing, and chef-trusted standards.' },
    ],
  }),
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-3">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              Premium Meats, <span className="text-gold">Honest Sourcing</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Founded in 2018 in the heart of the United States, PrimeButchery was born from a simple belief: everyone deserves access to the world's finest meats with complete transparency about where their food comes from.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-button text-crimson uppercase tracking-[0.2em] mb-3">Our Mission</p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">Bringing Farm Transparency to Your Table</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At PrimeButchery, we partner directly with verified farms across the globe — from the pristine pastures of New Zealand to the legendary Wagyu farms of Japan's Kagoshima Prefecture. Every cut we sell is fully traceable, grain-fed certified, and delivered fresh using insulated cold-chain packaging.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe the meat industry needs more transparency. That's why we publish detailed information about every farm we source from, including their feeding programs, animal welfare standards, and certifications. Organizations like the <a href="https://www.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">USDA</a> and the <a href="https://www.fsis.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">Food Safety and Inspection Service (FSIS)</a> set the standards we not only meet but exceed.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of expert butchers hand-selects every cut, ensuring only the highest quality meats reach your door. We're proud members of the <a href="https://www.meatinstitute.org/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">North American Meat Institute</a>, and we adhere to strict food safety protocols guided by <a href="https://www.fda.gov/food" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">FDA food safety guidelines</a>.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              {[
                { value: '12,847+', label: 'Orders Delivered' },
                { value: '60+', label: 'Premium Cuts' },
                { value: '6', label: 'Verified Farms' },
                { value: '4.9★', label: 'Avg Customer Rating' },
              ].map((stat) => (
                <div key={stat.label} className="bg-cream rounded-2xl p-6 text-center">
                  <p className="font-price text-2xl font-bold text-crimson">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-button mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Our Core Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8 text-gold" />, title: 'Uncompromising Quality', desc: 'Every cut is hand-selected by expert butchers. We never settle for less than the finest.' },
              { icon: <Leaf className="w-8 h-8 text-deep-green" />, title: 'Sustainable Sourcing', desc: 'We partner with farms committed to regenerative agriculture and ethical animal husbandry.' },
              { icon: <ShieldCheck className="w-8 h-8 text-crimson" />, title: 'Full Transparency', desc: 'From farm to your front door, every step is documented and verifiable.' },
              { icon: <Heart className="w-8 h-8 text-sale" />, title: 'Customer Obsession', desc: '100% satisfaction guarantee. If you\'re not happy, we make it right — no questions asked.' },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center mx-auto mb-4 shadow-sm">{v.icon}</div>
                <h3 className="font-heading text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">Based in the United States</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
              <MapPin className="w-5 h-5 text-crimson" />
              <span className="font-button">Proudly serving all 50 states with next-day cold-chain delivery</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our fulfillment center operates out of the United States, where our expert team processes, inspects, and packs every order with meticulous care. We use USDA-inspected facilities and follow the highest food safety standards outlined by the <a href="https://www.cdc.gov/food-safety/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">CDC</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're a home cook in Austin, a chef in New York, or hosting a backyard BBQ in Denver — PrimeButchery delivers premium, grain-fed meats right to your doorstep.
            </p>
            <Link to="/products">
              <Button variant="hero" size="xl" className="gap-2">
                Shop Our Collection <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
