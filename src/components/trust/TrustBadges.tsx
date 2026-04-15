import { motion } from 'framer-motion';
import { Wheat, ShieldCheck, BadgeCheck, Truck, Award, ChefHat } from 'lucide-react';

const TRUST_BADGES = [
  { icon: Wheat, label: '100% Grain-Fed Certified' },
  { icon: ShieldCheck, label: 'SSL Secured Checkout' },
  { icon: BadgeCheck, label: 'Verified Supplier Network' },
  { icon: Truck, label: 'Cold-Chain Delivery' },
  { icon: Award, label: '100% Satisfaction Guarantee' },
  { icon: ChefHat, label: 'Chef-Approved Quality' },
];

export function TrustBadges() {
  return (
    <section className="py-6 border-y border-border bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-2.5"
            >
              <badge.icon className="w-5 h-5 text-deep-green" strokeWidth={1.8} />
              <span className="text-xs sm:text-sm font-button font-medium text-foreground/80">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
