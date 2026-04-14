import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, CreditCard, Building2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

import { useState } from 'react';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: 'Secure Checkout — PrimeButchery' },
      { name: 'description', content: 'Complete your PrimeButchery order. Secure payment via bank transfer, wire transfer, CashApp, or Zelle. Cold-chain delivery guaranteed.' },
    ],
  }),
});

const FREE_SHIPPING_THRESHOLD = 75;

function CheckoutPage() {
  const { items, subtotal } = useCartStore();
  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const tax = sub * 0.08;
  const total = sub + shipping + tax;
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some premium cuts to get started.</p>
          <Link to="/products"><Button variant="hero" size="lg">Shop Now</Button></Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }
    alert('Order placed successfully! You will receive payment instructions via email. Order #PB-' + Math.floor(1000 + Math.random() * 9000));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-charcoal text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-xs font-button text-white/70">Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center gap-2 text-sm font-button">
            {['Details', 'Payment', 'Confirm'].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 <= step ? 'bg-crimson text-white' : 'bg-muted text-muted-foreground'}`}>{i + 1}</span>
                <span className={i + 1 <= step ? 'text-foreground font-semibold' : 'text-muted-foreground'}>{s}</span>
                {i < 2 && <span className="text-border mx-2">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold">Contact & Delivery</h2>
                  <div className="bg-cream rounded-xl p-4 text-sm text-muted-foreground">
                    <p>🔒 Guest checkout — no account required. Your information is only used to process this order.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-button font-semibold mb-2 block">Full Name *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="text-sm font-button font-semibold mb-2 block">Email *</label>
                      <input type="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-button font-semibold mb-2 block">Phone *</label>
                    <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="text-sm font-button font-semibold mb-2 block">Address Line 1 *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="123 Main Street" />
                  </div>
                  <div>
                    <label className="text-sm font-button font-semibold mb-2 block">Address Line 2</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="Apt, Suite, Unit (optional)" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-button font-semibold mb-2 block">City *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
                    </div>
                    <div>
                      <label className="text-sm font-button font-semibold mb-2 block">State *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
                    </div>
                    <div>
                      <label className="text-sm font-button font-semibold mb-2 block">ZIP *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
                    </div>
                  </div>
                  <Button type="submit" variant="hero" size="xl" className="w-full">Continue to Payment →</Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold">Payment Method</h2>
                  <p className="text-sm text-muted-foreground">Select your preferred payment method. Payment details will be provided after order confirmation.</p>

                  <div className="space-y-3">
                    {[
                      { id: 'bank-transfer', icon: <Building2 className="w-5 h-5" />, label: 'Bank Transfer (ACH)', desc: 'Direct bank transfer. Account details provided after order placement. Cleared within 1-2 business days.' },
                      { id: 'wire-transfer', icon: <CreditCard className="w-5 h-5" />, label: 'Wire Transfer', desc: 'Domestic or international wire transfer. Banking details emailed upon order confirmation.' },
                      { id: 'cashapp', icon: <Smartphone className="w-5 h-5" />, label: 'CashApp', desc: 'Send payment via CashApp. Our CashApp tag will be provided in your order confirmation email.' },
                      { id: 'zelle', icon: <Smartphone className="w-5 h-5" />, label: 'Zelle', desc: 'Pay instantly via Zelle. Our Zelle email will be included in your order confirmation.' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${paymentMethod === method.id ? 'border-crimson bg-crimson/5' : 'border-border bg-card hover:border-crimson/30'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'bg-crimson text-white' : 'bg-cream text-foreground'}`}>
                          {method.icon}
                        </div>
                        <div>
                          <p className="font-button font-semibold text-sm">{method.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{method.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-cream rounded-xl p-4 text-sm text-muted-foreground">
                    <p>🔒 Your order will be confirmed immediately. Payment instructions for your selected method will be sent to your email. Orders are shipped once payment is verified.</p>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>← Back</Button>
                    <Button type="submit" variant="hero" size="xl" className="flex-1">Review Order →</Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold">Confirm Your Order</h2>
                  <div className="bg-cream rounded-2xl p-6 space-y-4">
                    <h3 className="font-button font-semibold text-sm uppercase tracking-wider text-muted-foreground">Payment Method</h3>
                    <p className="font-button font-semibold capitalize">{paymentMethod.replace('-', ' ')}</p>
                    <p className="text-sm text-muted-foreground">After placing your order, you'll receive an email with payment instructions. Your order ships once payment is confirmed.</p>
                  </div>

                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 bg-card rounded-xl p-3 border border-border">
                        <img src={item.product.images?.[0] || '/placeholder.svg'} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" width={64} height={64} />
                        <div className="flex-1">
                          <p className="font-button font-semibold text-sm">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-price font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)}>← Back</Button>
                    <Button type="submit" variant="hero" size="xl" className="flex-1 gap-2">
                      <ShieldCheck className="w-5 h-5" /> Place Order — ${total.toFixed(2)}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                    <span>🔒 256-bit SSL</span>
                    <span>💯 7-Day Guarantee</span>
                    <span>❄️ Cold-Chain Delivery</span>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h3 className="font-heading text-lg font-bold">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-sm">
                    <span className="truncate pr-2">{item.product.name} × {item.quantity}</span>
                    <span className="font-price font-semibold shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-price">${sub.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="font-price">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span>Est. Tax</span><span className="font-price">${tax.toFixed(2)}</span></div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-button font-bold">Total</span>
                <span className="font-price text-xl font-bold text-crimson">${total.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  { icon: '🔒', label: 'Secure' },
                  { icon: '❄️', label: 'Cold-Chain' },
                  { icon: '💯', label: 'Guaranteed' },
                  { icon: '🌾', label: 'Farm Verified' },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>{t.icon}</span> {t.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
