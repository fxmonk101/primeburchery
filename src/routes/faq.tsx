import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/faq')({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: 'FAQ — Frequently Asked Questions | PrimeButchery' },
      { name: 'description', content: 'Find answers to common questions about PrimeButchery orders, shipping, returns, payment methods, and product quality.' },
      { property: 'og:title', content: 'PrimeButchery FAQ — Your Questions Answered' },
      { property: 'og:description', content: 'Shipping, returns, payments, and more. Everything you need to know about ordering from PrimeButchery.' },
    ],
  }),
});

const FAQ_SECTIONS = [
  {
    title: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'We offer next-day delivery on orders placed before 12pm EST. Standard shipping typically takes 2-3 business days within the continental United States. All orders are shipped via cold-chain insulated packaging with dry ice to ensure freshness. For more information on food shipping standards, visit the USDA\'s guidelines on safe food handling at usda.gov.' },
      { q: 'Do you ship to all 50 states?', a: 'Yes! We ship to all 50 states within the US. Hawaii and Alaska orders may take an additional 1-2 business days. We currently do not ship internationally.' },
      { q: 'What is cold-chain delivery?', a: 'Cold-chain delivery means your meat is packed with dry ice in insulated, leak-proof boxes to maintain safe temperatures (below 40°F) throughout transit. This follows FDA food safety transportation guidelines.' },
      { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can also visit our Track Order page to check your order status using your order number and email.' },
      { q: 'Is there free shipping?', a: 'Yes! Orders over $75 qualify for free standard shipping within the continental US.' },
    ],
  },
  {
    title: 'Products & Quality',
    items: [
      { q: 'What does "grain-fed" mean?', a: 'Grain-fed cattle are finished on a diet of grains (typically corn and barley) for a specific period. This process enhances marbling — the intramuscular fat that creates tender, flavorful meat. Our grain-fed programs range from 80 to 900+ days depending on the cut. Learn more about beef grading at the USDA Beef Grading page.' },
      { q: 'Are your meats hormone-free?', a: 'Yes. All our beef, lamb, and poultry products are raised without added hormones or growth promotants. Our farms follow strict protocols that exceed USDA requirements.' },
      { q: 'What is A5 Wagyu?', a: 'A5 is the highest grade of Japanese Wagyu beef, as classified by the Japanese Meat Grading Association. BMS (Beef Marbling Score) 10-12 represents the absolute pinnacle — extraordinary marbling that melts at body temperature. We source our A5 Wagyu directly from Kagoshima Prefecture, Japan.' },
      { q: 'How should I store my meat after delivery?', a: 'Refrigerate immediately upon arrival if cooking within 2-3 days. For longer storage, freeze immediately. Vacuum-sealed cuts can be frozen for up to 12 months. Always follow safe thawing practices as recommended by the USDA.' },
    ],
  },
  {
    title: 'Payment & Pricing',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept bank transfers, wire transfers, CashApp, and Zelle. Details for each payment method are provided at checkout.' },
      { q: 'Are there any hidden fees?', a: 'No. The price you see is the price you pay, plus applicable shipping (free over $75). Sales tax is calculated based on your delivery address per state requirements.' },
      { q: 'Do you offer wholesale pricing?', a: 'Yes! We offer competitive wholesale pricing for restaurants, caterers, and retailers. Contact us at wholesale@primebutchery.com for a custom quote.' },
    ],
  },
  {
    title: 'Returns & Guarantee',
    items: [
      { q: 'What is your satisfaction guarantee?', a: 'We offer a 100% satisfaction guarantee. If you\'re not happy with your order for any reason, contact us within 7 days of delivery for a full refund — no questions asked.' },
      { q: 'What if my order arrives damaged?', a: 'Contact us immediately with photos of the damaged package and products. We will arrange a full replacement or refund at no cost to you.' },
      { q: 'Can I cancel or modify my order?', a: 'Orders can be cancelled or modified within 2 hours of placement. After that, our team has already begun processing your order for same-day dispatch.' },
    ],
  },
];

function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-24 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Frequently Asked <span className="text-gold">Questions</span></h1>
            <p className="text-white/70 text-lg">Everything you need to know about ordering from PrimeButchery</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title} className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const key = `${section.title}-${item.q}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={key} className="bg-card rounded-2xl border border-border overflow-hidden">
                      <button onClick={() => toggle(key)} className="w-full flex items-center justify-between p-5 text-left">
                        <span className="font-button font-semibold text-sm pr-4">{item.q}</span>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 -mt-1">
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="bg-cream rounded-2xl p-8 text-center mt-8">
            <h3 className="font-heading text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our US-based support team is happy to help.</p>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="gap-2">Contact Us <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
