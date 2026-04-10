import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FARM_STORIES } from '@/lib/mock-data';

export const Route = createFileRoute('/our-farms')({
  component: OurFarmsPage,
  head: () => ({
    meta: [
      { title: 'Our Farms — Verified Sourcing & Farm Transparency | PrimeButchery' },
      { name: 'description', content: 'Discover the verified farms behind every PrimeButchery cut. Full traceability from pasture to plate — New Zealand, Japan, Ireland, and more.' },
      { property: 'og:title', content: 'Our Farms — Verified Sourcing | PrimeButchery' },
      { property: 'og:description', content: 'Full farm transparency. Learn about the verified farms that supply PrimeButchery with premium grain-fed meats.' },
    ],
  }),
});

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const DETAILED_FARMS = [
  {
    name: 'Silver Fern Farms',
    country: 'New Zealand',
    flag: '🇳🇿',
    founded: '1948',
    specialty: 'Premium Angus Beef',
    grainProgram: '100-day grain-fed finishing program',
    description: 'One of New Zealand\'s most respected meat companies, Silver Fern Farms raises Angus cattle on pristine pastures before finishing on a carefully managed grain-feeding program. Their commitment to sustainability earned them Toitū Envirocare carbon certification.',
    certifications: ['Carbon Certified', 'Hormone-Free', 'Antibiotic-Free', 'USDA Approved'],
    animalWelfare: 'All cattle are pasture-raised with access to open grazing. The farm follows strict animal welfare protocols aligned with the Royal New Zealand SPCA standards.',
    link: 'https://www.silverfernfarms.com/',
  },
  {
    name: 'Irish Nature Beef',
    country: 'Ireland',
    flag: '🇮🇪',
    founded: '1985',
    specialty: 'Grass & Grain Finished Beef',
    grainProgram: '120-day grass & grain finishing',
    description: 'Sourced from the lush green pastures of Ireland, Irish Nature Beef produces some of Europe\'s finest cattle. Their unique grass-and-grain finishing program creates exceptional marbling while retaining the distinctive flavour of Irish beef.',
    certifications: ['Bord Bia Quality Assured', 'Hormone-Free', 'EU Origin Certified'],
    animalWelfare: 'Cattle are raised in Ireland\'s naturally temperate climate with year-round access to pasture. All farms comply with Bord Bia\'s Sustainable Beef & Lamb Assurance Scheme.',
    link: 'https://www.bordbia.ie/',
  },
  {
    name: 'Kagoshima Prefecture Farms',
    country: 'Japan',
    flag: '🇯🇵',
    founded: 'Traditional',
    specialty: 'A5 Japanese Wagyu',
    grainProgram: '900-day traditional grain feeding',
    description: 'Kagoshima Prefecture is Japan\'s largest producer of Wagyu beef, renowned for producing cattle with extraordinary marbling scores (BMS 10-12). Each animal is individually registered with the Japanese Meat Grading Association and raised following centuries-old traditions.',
    certifications: ['A5 Certified', 'BMS 10-12', 'Japanese Meat Grading Association', 'Import Verified'],
    animalWelfare: 'Wagyu cattle are raised with exceptional care, including specialized diets, stress-free environments, and individualized attention from dedicated farmers. Learn more from the Japan Meat Information Service Center.',
    link: 'https://www.jmi.or.jp/en/',
  },
  {
    name: 'Snake River Farms',
    country: 'USA',
    flag: '🇺🇸',
    founded: '1968',
    specialty: 'American Wagyu',
    grainProgram: '400+ day proprietary program',
    description: 'Based in Boise, Idaho, Snake River Farms is America\'s premier producer of American Wagyu beef. Their proprietary crossbreeding program combines Japanese Wagyu genetics with American Black Angus to create uniquely marbled, intensely flavourful beef.',
    certifications: ['BMS 8-9', 'Hormone-Free', 'USDA Inspected', 'Born & Raised in USA'],
    animalWelfare: 'All cattle are born and raised on the farm\'s Idaho ranches. Snake River Farms follows the Beef Quality Assurance (BQA) program and USDA guidelines for humane handling.',
    link: 'https://www.snakeriverfarms.com/',
  },
  {
    name: 'Dehesa Farms',
    country: 'Spain',
    flag: '🇪🇸',
    founded: 'Multi-generational',
    specialty: '100% Iberico Pork',
    grainProgram: 'Acorn-finished (Bellota grade)',
    description: 'Located in the oak-studded dehesas of southwestern Spain, these farms produce the legendary Ibérico pig — often called "the Wagyu of pork." Pigs roam freely under cork and holm oaks, feeding on acorns (bellotas) during the montanera season.',
    certifications: ['100% Iberico', 'PDO Certified', 'Bellota Grade', 'EU Protected Origin'],
    animalWelfare: 'Ibérico pigs are raised in open-air conditions with a minimum of 2 hectares per pig. The PDO certification enforces strict welfare and feeding standards.',
    link: 'https://www.spain.info/',
  },
];

function OurFarmsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-3">Full Traceability</p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              We Know Every <span className="text-gold">Farm</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Transparency is our foundation. Every cut we sell is fully traceable to its source farm. We visit our partner farms regularly and publish their practices openly — because you deserve to know exactly where your food comes from.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How we source */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Our Sourcing Standards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every farm in our network must meet rigorous standards before we partner with them. We follow guidelines established by the <a href="https://www.usda.gov/topics/organic" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">USDA Organic Program</a> and the <a href="https://globalanimalpartnership.org/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline font-semibold">Global Animal Partnership</a>.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Leaf className="w-7 h-7 text-deep-green" />, title: 'Sustainable Practices', desc: 'Farms must demonstrate commitment to regenerative agriculture, soil health, and responsible land management.' },
              { icon: <ShieldCheck className="w-7 h-7 text-crimson" />, title: 'Animal Welfare', desc: 'Strict no-hormone, no-antibiotic policies. Animals must have access to open grazing and stress-free environments.' },
              { icon: <Award className="w-7 h-7 text-gold" />, title: 'Quality Certification', desc: 'All farms carry recognized certifications — USDA, A5, PDO, or equivalent national grading standards.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-card rounded-2xl p-8 text-center border border-border">
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm profiles */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">Our Partner Farms</h2>
            <p className="text-muted-foreground">Meet the farms behind every cut we sell</p>
          </motion.div>
          <div className="space-y-8">
            {DETAILED_FARMS.map((farm, i) => (
              <motion.div key={farm.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{farm.flag}</span>
                    <div>
                      <h3 className="font-heading text-xl font-bold">{farm.name}</h3>
                      <p className="text-sm text-muted-foreground font-button">{farm.country} · Est. {farm.founded}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {farm.certifications.map((cert) => (
                      <span key={cert} className="text-[10px] font-button font-semibold bg-deep-green/10 text-deep-green px-2.5 py-1 rounded-full">{cert}</span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{farm.description}</p>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs font-button text-muted-foreground uppercase tracking-wider mb-1">Specialty</p>
                    <p className="font-button font-semibold text-sm">{farm.specialty}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs font-button text-muted-foreground uppercase tracking-wider mb-1">Grain Program</p>
                    <p className="font-button font-semibold text-sm">{farm.grainProgram}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-xs font-button text-muted-foreground uppercase tracking-wider mb-1">Animal Welfare</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{farm.animalWelfare}</p>
                  </div>
                </div>
                <a href={farm.link} target="_blank" rel="noopener noreferrer" className="text-sm font-button font-semibold text-crimson hover:underline inline-flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crimson text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Taste the Difference Transparency Makes</h2>
          <p className="text-white/80 mb-8">Every cut is traceable. Every farm is verified. Every bite is unforgettable.</p>
          <Link to="/products">
            <Button variant="gold" size="xl" className="gap-2">Shop Premium Cuts <ArrowRight className="w-5 h-5" /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
