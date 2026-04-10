import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Heart, Leaf, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/careers')({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: 'Careers at PrimeButchery — Join Our Team' },
      { name: 'description', content: 'Join the PrimeButchery team. We\'re hiring passionate people who love premium food, great service, and building something extraordinary. US-based positions.' },
      { property: 'og:title', content: 'Careers at PrimeButchery' },
      { property: 'og:description', content: 'Join our team of food enthusiasts. Open positions in butchery, operations, marketing, and customer support.' },
    ],
  }),
});

const OPEN_POSITIONS = [
  { title: 'Senior Butcher / Meat Cutter', department: 'Operations', type: 'Full-time', location: 'On-site, US', description: 'Expert butcher with 5+ years experience in primal and sub-primal cutting. USDA-facility experience preferred.' },
  { title: 'E-Commerce Marketing Manager', department: 'Marketing', type: 'Full-time', location: 'Remote, US', description: 'Drive growth across paid, organic, and email channels. DTC food brand experience a plus.' },
  { title: 'Customer Experience Specialist', department: 'Support', type: 'Full-time', location: 'Remote, US', description: 'Help our customers with orders, products, and recommendations. Foodie passion required.' },
  { title: 'Cold-Chain Logistics Coordinator', department: 'Operations', type: 'Full-time', location: 'On-site, US', description: 'Manage daily shipping operations, carrier relationships, and cold-chain compliance.' },
  { title: 'Content Writer — Food & Culinary', department: 'Marketing', type: 'Contract', location: 'Remote, US', description: 'Create recipes, cooking guides, and farm stories for our blog and email campaigns.' },
];

function CareersPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-24 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Briefcase className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">Join the <span className="text-gold">PrimeButchery</span> Team</h1>
            <p className="text-white/70 text-lg">We're building the future of premium meat delivery. Come work with people who are passionate about quality, transparency, and great food.</p>
          </motion.div>
        </div>
      </section>

      {/* Why work here */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Why PrimeButchery?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="w-7 h-7 text-crimson" />, title: 'Mission-Driven', desc: 'We\'re changing how people buy meat — more transparency, better quality, direct from farm to door.' },
              { icon: <Users className="w-7 h-7 text-crimson" />, title: 'Small Team, Big Impact', desc: 'Every team member makes a real difference. No bureaucracy, no red tape.' },
              { icon: <Leaf className="w-7 h-7 text-deep-green" />, title: 'Sustainability Focus', desc: 'We work with farms committed to regenerative agriculture and ethical practices.' },
              { icon: <Award className="w-7 h-7 text-gold" />, title: 'Growth & Learning', desc: 'Professional development budget, conferences, and mentorship from industry veterans.' },
            ].map((perk, i) => (
              <motion.div key={perk.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-4">{perk.icon}</div>
                <h3 className="font-heading font-bold mb-2">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Open Positions</h2>
          <div className="space-y-4">
            {OPEN_POSITIONS.map((pos, i) => (
              <motion.div key={pos.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold">{pos.title}</h3>
                    <p className="text-xs text-muted-foreground font-button">{pos.department} · {pos.type} · {pos.location}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{pos.description}</p>
                <a href={`mailto:careers@primebutchery.com?subject=Application: ${pos.title}`} className="text-sm font-button font-semibold text-crimson hover:underline inline-flex items-center gap-1">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="bg-cream rounded-2xl p-8 text-center mt-12">
            <h3 className="font-heading text-xl font-bold mb-2">Don't See Your Role?</h3>
            <p className="text-sm text-muted-foreground mb-4">We're always looking for talented people. Send your resume to <a href="mailto:careers@primebutchery.com" className="text-crimson hover:underline font-semibold">careers@primebutchery.com</a> and tell us how you'd contribute. Check job search resources at <a href="https://www.indeed.com/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">Indeed</a> and <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">LinkedIn</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
