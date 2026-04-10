import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: 'Contact Us — PrimeButchery Customer Support' },
      { name: 'description', content: 'Get in touch with PrimeButchery. Phone, email, or contact form. US-based customer support team available Mon-Fri 8am-6pm EST.' },
      { property: 'og:title', content: 'Contact PrimeButchery' },
      { property: 'og:description', content: 'Reach our US-based customer support team. We\'re here to help with orders, products, and more.' },
    ],
  }),
});

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! Our team will respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-24 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Get in <span className="text-gold">Touch</span></h1>
            <p className="text-white/70 text-lg">Our US-based customer support team is ready to help with any questions about orders, products, or sourcing.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
              {[
                { icon: <Phone className="w-5 h-5 text-crimson" />, label: 'Phone', value: '(800) 555-MEAT', sub: 'Mon-Fri 8am-6pm EST' },
                { icon: <Mail className="w-5 h-5 text-crimson" />, label: 'Email', value: 'support@primebutchery.com', sub: 'We respond within 24 hours' },
                { icon: <MapPin className="w-5 h-5 text-crimson" />, label: 'Location', value: 'United States', sub: 'Serving all 50 states' },
                { icon: <Clock className="w-5 h-5 text-crimson" />, label: 'Business Hours', value: 'Mon-Fri: 8am-6pm EST', sub: 'Sat: 9am-2pm EST' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-cream rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-button font-semibold text-sm">{item.label}</p>
                    <p className="text-sm text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
              <div className="bg-cream rounded-2xl p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For food safety inquiries, you may also contact the <a href="https://www.fsis.usda.gov/contact-us" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">USDA FSIS</a> or the <a href="https://www.fda.gov/safety/report-problem" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">FDA Safety Reporting Portal</a>.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-button font-semibold mb-2 block">Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="text-sm font-button font-semibold mb-2 block">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-button font-semibold mb-2 block">Subject *</label>
                  <select required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson">
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="wholesale">Wholesale & Partnerships</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-button font-semibold mb-2 block">Message *</label>
                  <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson resize-none" placeholder="How can we help?" />
                </div>
                <Button type="submit" variant="hero" size="xl" className="gap-2">
                  <MessageCircle className="w-5 h-5" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
