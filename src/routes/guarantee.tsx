import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/guarantee')({
  component: GuaranteePage,
  head: () => ({
    meta: [
      { title: '100% Satisfaction Guarantee — PrimeButchery' },
      { name: 'description', content: 'PrimeButchery\'s 100% satisfaction guarantee. Not happy? Full refund within 7 days, no questions asked. We stand behind every cut we sell.' },
      { property: 'og:title', content: '100% Satisfaction Guarantee — PrimeButchery' },
      { property: 'og:description', content: 'Full refund within 7 days if you\'re not completely satisfied. No questions asked.' },
    ],
  }),
});

function GuaranteePage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-24 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShieldCheck className="w-16 h-16 text-gold mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">100% Satisfaction <span className="text-gold">Guarantee</span></h1>
            <p className="text-white/70 text-lg">We stand behind every cut we sell. If you're not completely satisfied, we'll make it right.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Promise to You</h2>
              <p>At PrimeButchery, we believe you should never have to gamble on quality. That's why every single product we sell comes with our iron-clad satisfaction guarantee. If you're not completely happy with your purchase for <em>any</em> reason, we'll issue a full refund — no hassle, no fine print, no runaround.</p>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">What's Covered</h2>
              <div className="space-y-3">
                {[
                  '✅ Product quality not meeting your expectations',
                  '✅ Incorrect items received',
                  '✅ Damaged or compromised packaging during transit',
                  '✅ Products arriving above safe temperature',
                  '✅ Any other reason — we trust our customers',
                ].map((item) => (
                  <p key={item} className="text-sm bg-cream rounded-xl p-4">{item}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">How It Works</h2>
              <ol className="list-decimal list-inside space-y-3">
                <li><strong>Contact us within 7 days</strong> of receiving your order at <a href="mailto:support@primebutchery.com" className="text-crimson hover:underline">support@primebutchery.com</a> or call (800) 555-MEAT.</li>
                <li><strong>Describe the issue</strong> — photos are helpful but not required.</li>
                <li><strong>Choose your resolution</strong> — full refund to your original payment method, or a replacement shipment at no charge.</li>
                <li><strong>Refund processed within 5-7 business days</strong>.</li>
              </ol>
            </div>

            <div className="bg-cream rounded-2xl p-8">
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">Why We Offer This Guarantee</h3>
              <p>We source premium, grain-fed meats from the world's best farms because we're confident in our quality. Our satisfaction guarantee isn't a risk — it's a reflection of the standards we hold ourselves to. According to the <a href="https://www.bbb.org/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">Better Business Bureau</a>, a strong return policy builds customer trust and repeat business — and that's exactly what we aim for.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="hero" size="xl" className="gap-2">Shop with Confidence <ArrowRight className="w-5 h-5" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
