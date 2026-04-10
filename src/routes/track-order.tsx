import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Route = createFileRoute('/track-order')({
  component: TrackOrderPage,
  head: () => ({
    meta: [
      { title: 'Track Your Order — PrimeButchery' },
      { name: 'description', content: 'Track your PrimeButchery order status. Enter your order number and email to get real-time shipping updates. No login required.' },
      { property: 'og:title', content: 'Track Your Order — PrimeButchery' },
      { property: 'og:description', content: 'Real-time order tracking. Enter your order number to check delivery status.' },
    ],
  }),
});

function TrackOrderPage() {
  const [orderNum, setOrderNum] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order tracking is coming soon. Please contact support@primebutchery.com for order updates.');
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-24 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Package className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Track Your <span className="text-gold">Order</span></h1>
            <p className="text-white/70 text-lg">Enter your order number and email to get real-time updates. No login required.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-lg mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-button font-semibold mb-2 block">Order Number *</label>
              <input type="text" required value={orderNum} onChange={(e) => setOrderNum(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson" placeholder="e.g., PB-2847" />
            </div>
            <div>
              <label className="text-sm font-button font-semibold mb-2 block">Email Address *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson" placeholder="The email used for your order" />
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full gap-2">
              <Search className="w-5 h-5" /> Track Order
            </Button>
          </form>

          <div className="mt-12 bg-cream rounded-2xl p-6 space-y-4">
            <h3 className="font-heading text-lg font-bold">How Tracking Works</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📦 <strong>Order Confirmed</strong> — We've received and are processing your order</p>
              <p>🔪 <strong>Being Prepared</strong> — Our butchers are hand-cutting your selections</p>
              <p>❄️ <strong>Packed & Shipped</strong> — Your order is packed with dry ice and dispatched</p>
              <p>🚚 <strong>In Transit</strong> — Your package is on its way via cold-chain carrier</p>
              <p>✅ <strong>Delivered</strong> — Enjoy your premium meats!</p>
            </div>
            <p className="text-xs text-muted-foreground">Need help? Email <a href="mailto:support@primebutchery.com" className="text-crimson hover:underline">support@primebutchery.com</a> or call <strong>(800) 555-MEAT</strong>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
