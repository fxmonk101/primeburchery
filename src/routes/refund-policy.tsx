import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/refund-policy')({
  component: RefundPolicyPage,
  head: () => ({
    meta: [
      { title: 'Refund Policy — PrimeButchery' },
      { name: 'description', content: 'PrimeButchery refund policy. Full refund within 7 days if you\'re not satisfied. Learn about our hassle-free refund process.' },
      { property: 'og:title', content: 'Refund Policy — PrimeButchery' },
      { property: 'og:description', content: '7-day full refund guarantee. No questions asked. Learn about our refund process.' },
    ],
  }),
});

function RefundPolicyPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-heading font-bold">Refund Policy</h1>
            <p className="text-white/60 text-sm mt-3">Last updated: April 1, 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose-sm text-muted-foreground leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">7-Day Satisfaction Guarantee</h2>
            <p>We stand behind every product we sell. If you are not 100% satisfied with your PrimeButchery order, you may request a full refund within <strong>7 days of delivery</strong>.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">Eligible Refund Reasons</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Product quality does not meet expectations</li>
              <li>Incorrect items received</li>
              <li>Products arrived damaged or with compromised packaging</li>
              <li>Products arrived above safe temperature (above 40°F / 4°C)</li>
              <li>Any other dissatisfaction — we trust our customers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">How to Request a Refund</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Email <a href="mailto:support@primebutchery.com" className="text-crimson hover:underline">support@primebutchery.com</a> within 7 days of delivery</li>
              <li>Include your order number (e.g., PB-XXXX)</li>
              <li>Briefly describe the reason for your request</li>
              <li>Attach photos if the product arrived damaged (optional but helpful)</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">Refund Processing</h2>
            <p>Once approved, refunds are processed within <strong>5-7 business days</strong> to your original payment method. You will receive an email confirmation when the refund has been issued.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">Non-Refundable Items</h2>
            <p>Due to the perishable nature of our products, we cannot accept physical returns. In rare cases, we may request photos for quality assurance purposes before processing a refund.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">Cancellations</h2>
            <p>Orders may be cancelled within <strong>2 hours of placement</strong>. After that, our team begins processing for same-day dispatch. To cancel, email <a href="mailto:support@primebutchery.com" className="text-crimson hover:underline">support@primebutchery.com</a> immediately.</p>
          </div>

          <div className="bg-cream rounded-2xl p-6">
            <p className="text-sm">For consumer protection information, visit the <a href="https://www.ftc.gov/tips-advice/business-center/guidance/businesspersons-guide-federal-warranty-law" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">FTC's Guide to Warranty & Return Laws</a>. Questions? <Link to="/contact" className="text-crimson hover:underline font-semibold">Contact our team</Link>.</p>
          </div>

          <div className="text-center pt-4">
            <Link to="/products">
              <Button variant="hero" size="lg" className="gap-2">Shop with Confidence <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
