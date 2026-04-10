import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Truck, Snowflake, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/shipping-returns')({
  component: ShippingReturnsPage,
  head: () => ({
    meta: [
      { title: 'Shipping & Returns — Cold-Chain Delivery | PrimeButchery' },
      { name: 'description', content: 'Free shipping over $75. Next-day cold-chain delivery. 7-day satisfaction guarantee. Learn about PrimeButchery\'s shipping policies and easy returns.' },
      { property: 'og:title', content: 'Shipping & Returns — PrimeButchery' },
      { property: 'og:description', content: 'Cold-chain insulated shipping, free over $75. Easy returns with our 7-day guarantee.' },
    ],
  }),
});

function ShippingReturnsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-24 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Shipping & <span className="text-gold">Returns</span></h1>
            <p className="text-white/70 text-lg">Cold-chain delivery guaranteed. Free shipping over $75. Hassle-free returns.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Shipping */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-8 h-8 text-crimson" />
              <h2 className="text-2xl font-heading font-bold">Shipping Policy</h2>
            </div>
            <div className="prose-sm text-muted-foreground space-y-4 leading-relaxed">
              <p>PrimeButchery ships to <strong>all 50 states</strong> within the United States. We use insulated, leak-proof packaging with dry ice to maintain safe temperatures throughout transit, following <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/mail-order-food-safety" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">USDA mail-order food safety guidelines</a>.</p>

              <h3 className="text-foreground font-heading font-bold text-lg !mt-8">Shipping Options</h3>
              <div className="bg-cream rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div>
                    <p className="font-button font-semibold text-foreground text-sm">Next-Day Delivery</p>
                    <p className="text-xs">Order before 12pm EST</p>
                  </div>
                  <p className="font-price font-bold text-foreground">$14.99</p>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div>
                    <p className="font-button font-semibold text-foreground text-sm">Standard (2-3 business days)</p>
                    <p className="text-xs">Continental US</p>
                  </div>
                  <p className="font-price font-bold text-foreground">$9.99</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-button font-semibold text-foreground text-sm">FREE Shipping</p>
                    <p className="text-xs">Orders over $75</p>
                  </div>
                  <p className="font-price font-bold text-success">FREE</p>
                </div>
              </div>

              <p>Hawaii and Alaska orders may require an additional 1-2 business days and a $5 surcharge. We do not currently ship internationally.</p>
            </div>
          </div>

          {/* Cold chain */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Snowflake className="w-8 h-8 text-crimson" />
              <h2 className="text-2xl font-heading font-bold">Cold-Chain Guarantee</h2>
            </div>
            <div className="prose-sm text-muted-foreground space-y-4 leading-relaxed">
              <p>Every order is packed in insulated EPS foam containers with sufficient dry ice to maintain temperatures below 40°F (4°C) for up to 48 hours. This follows the safe food transport standards outlined by the <a href="https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-sanitary-transportation-human-and-animal-food" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">FDA FSMA Sanitary Transportation Rule</a>.</p>
              <p>If your order arrives above safe temperatures, contact us immediately for a full replacement at no charge.</p>
            </div>
          </div>

          {/* Returns */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="w-8 h-8 text-crimson" />
              <h2 className="text-2xl font-heading font-bold">Returns & Exchanges</h2>
            </div>
            <div className="prose-sm text-muted-foreground space-y-4 leading-relaxed">
              <p>Due to the perishable nature of our products, we cannot accept physical returns. However, our <strong>7-day satisfaction guarantee</strong> means if you're not completely happy with your order, we'll issue a full refund — no questions asked.</p>
              <h3 className="text-foreground font-heading font-bold text-lg !mt-6">To Request a Refund:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Contact us within 7 days of delivery at <a href="mailto:support@primebutchery.com" className="text-crimson hover:underline">support@primebutchery.com</a></li>
                <li>Include your order number and reason for the return</li>
                <li>Attach photos if the product arrived damaged</li>
                <li>Refund processed within 5-7 business days to original payment method</li>
              </ol>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link to="/contact">
              <Button variant="hero" size="lg" className="gap-2">Questions? Contact Us <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
