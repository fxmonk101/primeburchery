import { motion } from 'framer-motion';
import { TRUST_BADGES } from '@/lib/mock-data';

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
              className="flex items-center gap-2"
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-xs sm:text-sm font-button font-medium text-foreground/80">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
