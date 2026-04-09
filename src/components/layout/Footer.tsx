import { Link } from '@tanstack/react-router';
import { CATEGORIES, TRUST_BADGES } from '@/lib/mock-data';

export function Footer() {
  return (
    <footer className="bg-foreground text-card py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Trust badges strip */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 pb-12 border-b border-card/10">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm text-card/80">
              <span className="text-lg">{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-heading text-xl font-bold text-gold mb-4">PrimeBurchry</h3>
            <p className="text-sm text-card/60 leading-relaxed">
              Premium grain-fed meats, sourced transparently, delivered fresh to your door.
            </p>
          </div>
          <div>
            <h4 className="font-button font-semibold mb-4 text-card/90">Shop</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 4).map((c) => (
                <li key={c.slug}><Link to="/products" className="text-sm text-card/60 hover:text-gold transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-button font-semibold mb-4 text-card/90">Company</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-card/60">Our Farms</span></li>
              <li><span className="text-sm text-card/60">About Us</span></li>
              <li><span className="text-sm text-card/60">Blog</span></li>
              <li><span className="text-sm text-card/60">Contact</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-button font-semibold mb-4 text-card/90">Support</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-card/60">FAQ</span></li>
              <li><span className="text-sm text-card/60">Shipping & Returns</span></li>
              <li><span className="text-sm text-card/60">Track Order</span></li>
              <li><span className="text-sm text-card/60">Satisfaction Guarantee</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-card/40">© 2026 PrimeBurchry. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-card/40">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
