import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Terms of Service — PrimeButchery' },
      { name: 'description', content: 'PrimeButchery terms of service. Read our terms and conditions governing the use of primebutchery.com and all purchases.' },
      { property: 'og:title', content: 'Terms of Service — PrimeButchery' },
      { property: 'og:description', content: 'Terms and conditions for using PrimeButchery.com.' },
    ],
  }),
});

function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-heading font-bold">Terms of Service</h1>
            <p className="text-white/60 text-sm mt-3">Last updated: April 1, 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose-sm text-muted-foreground leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">1. Agreement to Terms</h2>
            <p>By accessing and using PrimeButchery.com ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site. These terms are governed by the laws of the United States.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">2. Products & Pricing</h2>
            <p>All product descriptions, images, and prices are as accurate as possible. We reserve the right to modify prices, discontinue products, or correct errors at any time without prior notice. Prices are listed in US dollars and do not include applicable sales tax or shipping unless stated.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">3. Orders & Payment</h2>
            <p>By placing an order, you confirm that you are at least 18 years old and that the payment information you provide is accurate. We accept bank transfers, wire transfers, CashApp, and Zelle. All orders are subject to acceptance and availability.</p>
            <p className="mt-2">We reserve the right to refuse or cancel any order at our discretion, including orders where pricing errors have occurred or where fraud is suspected.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">4. Shipping & Delivery</h2>
            <p>We ship to all 50 US states using cold-chain insulated packaging. Delivery timeframes are estimates and not guaranteed. PrimeButchery is not liable for delays caused by carriers, weather, or other circumstances beyond our control. For shipping carrier terms, refer to resources at <a href="https://www.fedex.com/en-us/shipping.html" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">FedEx</a> or <a href="https://www.ups.com/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">UPS</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">5. Returns & Refunds</h2>
            <p>Due to the perishable nature of our products, we do not accept physical returns. Our 7-day satisfaction guarantee applies to all orders. See our <a href="/refund-policy" className="text-crimson hover:underline font-semibold">Refund Policy</a> for details.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">6. Intellectual Property</h2>
            <p>All content on the Site — including text, images, logos, graphics, and software — is the property of PrimeButchery and protected by US copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>PrimeButchery shall not be liable for any indirect, incidental, or consequential damages arising from the use of our Site or products. Our total liability shall not exceed the purchase price of the relevant order.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">8. Governing Law</h2>
            <p>These terms are governed by the laws of the United States. Any disputes shall be resolved through binding arbitration in accordance with the rules of the <a href="https://www.adr.org/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">American Arbitration Association</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">9. Contact</h2>
            <p>For questions about these terms, contact <a href="mailto:legal@primebutchery.com" className="text-crimson hover:underline">legal@primebutchery.com</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
