import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

export const Route = createFileRoute('/blog')({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: 'Blog — Recipes, Tips & Farm Stories | PrimeButchery' },
      { name: 'description', content: 'Explore PrimeButchery\'s blog for expert cooking guides, grain-fed meat education, farm stories, and seasonal recipes from professional chefs.' },
      { property: 'og:title', content: 'PrimeButchery Blog — Recipes & Meat Guides' },
      { property: 'og:description', content: 'Expert cooking tips, farm stories, and premium meat guides from the PrimeButchery team.' },
    ],
  }),
});

const BLOG_POSTS = [
  { slug: 'reverse-sear-guide', title: 'The Complete Guide to Reverse Searing a Steak', excerpt: 'Master the reverse sear method — the professional technique that gives you edge-to-edge perfection every time. As recommended by Serious Eats and top steakhouse chefs.', category: 'Cooking Guide', readTime: 8, date: 'April 5, 2026' },
  { slug: 'wagyu-grading-explained', title: 'A5 Wagyu Grading Explained: BMS, Yield, and What It All Means', excerpt: 'Understanding Japan\'s beef grading system — from the Japanese Meat Grading Association to your plate. What makes BMS 10-12 so extraordinary.', category: 'Education', readTime: 6, date: 'March 28, 2026' },
  { slug: 'farm-visit-kagoshima', title: 'Inside Kagoshima: Visiting Japan\'s Most Famous Wagyu Farms', excerpt: 'Our founder\'s journey to Kagoshima Prefecture — meeting the farmers who raise the world\'s most prized cattle using centuries-old traditions.', category: 'Farm Stories', readTime: 10, date: 'March 15, 2026' },
  { slug: 'bbq-brisket-masterclass', title: 'Texas-Style Brisket: A 12-Hour Smoke Masterclass', excerpt: 'Low and slow is the only way. Learn the techniques used by championship pitmasters, inspired by resources from AmazingRibs.com and Texas Monthly BBQ guides.', category: 'Recipes', readTime: 12, date: 'March 8, 2026' },
  { slug: 'grain-fed-vs-grass-fed', title: 'Grain-Fed vs. Grass-Fed: What\'s the Real Difference?', excerpt: 'Breaking down the science, flavor profiles, and nutritional differences. What the USDA says versus what chefs prefer — and why grain-fed wins for marbling.', category: 'Education', readTime: 7, date: 'February 25, 2026' },
  { slug: 'perfect-lamb-rack', title: 'How to Cook a Perfect Frenched Lamb Rack', excerpt: 'From searing to resting — the complete guide to nailing this show-stopping dinner party cut. Temperature guides aligned with USDA safe cooking temperatures.', category: 'Cooking Guide', readTime: 6, date: 'February 18, 2026' },
];

function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-24 bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-button text-gold uppercase tracking-[0.2em] mb-3">From Our Kitchen</p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">The PrimeButchery <span className="text-gold">Blog</span></h1>
            <p className="text-white/70 text-lg">Expert cooking guides, farm stories, and everything you need to make the most of premium meats.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-[16/9] bg-cream flex items-center justify-center">
                  <span className="text-6xl">{post.category === 'Cooking Guide' ? '🍳' : post.category === 'Education' ? '📖' : post.category === 'Farm Stories' ? '🌾' : '🥩'}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-button font-bold bg-crimson/10 text-crimson px-2.5 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {post.readTime} min read
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-crimson transition-colors leading-tight">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-sm font-button font-semibold text-crimson inline-flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
