import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — PrimeButchery' },
      { name: 'description', content: 'PrimeButchery privacy policy. Learn how we collect, use, and protect your personal information. Your privacy matters to us.' },
      { property: 'og:title', content: 'Privacy Policy — PrimeButchery' },
      { property: 'og:description', content: 'How PrimeButchery collects, uses, and protects your personal data.' },
    ],
  }),
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-heading font-bold">Privacy Policy</h1>
            <p className="text-white/60 text-sm mt-3">Last updated: April 1, 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose-sm text-muted-foreground leading-relaxed space-y-8">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">1. Information We Collect</h2>
            <p>When you visit PrimeButchery.com or place an order, we may collect the following information:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping and billing address</li>
              <li><strong>Order Information:</strong> Products purchased, order history, payment method details</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on site, browser type, IP address</li>
              <li><strong>Communication Data:</strong> Emails, support tickets, survey responses</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations, shipping updates, and delivery notifications</li>
              <li>Respond to customer service inquiries</li>
              <li>Send promotional emails (with your consent — you may opt out at any time)</li>
              <li>Improve our website, products, and services</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">3. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with trusted third-party service providers who assist us in operating our business, including:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Payment processors for secure transaction handling</li>
              <li>Shipping carriers for order delivery</li>
              <li>Email service providers for transactional and promotional emails</li>
              <li>Analytics providers to improve site performance</li>
            </ul>
            <p className="mt-2">All third parties are contractually bound to protect your information in accordance with applicable laws.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">4. Data Security</h2>
            <p>We implement industry-standard security measures including SSL/TLS encryption, secure data storage, and regular security audits. Payment information is never stored on our servers. For more about online security best practices, visit the <a href="https://www.ftc.gov/tips-advice/business-center/privacy-and-security" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">FTC Privacy & Security Guidelines</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">5. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
            <p className="mt-2">California residents may have additional rights under the <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">California Consumer Privacy Act (CCPA)</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">6. Cookies</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings. Learn more at <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">AllAboutCookies.org</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">7. Contact Us</h2>
            <p>For privacy-related inquiries, contact us at <a href="mailto:privacy@primebutchery.com" className="text-crimson hover:underline">privacy@primebutchery.com</a> or by mail at PrimeButchery, United States.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
