import { Link } from '@tanstack/react-router';
import { CATEGORIES, TRUST_BADGES } from '@/lib/mock-data';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

export function Footer() {
  return (
    <footer className="bg-foreground text-card mt-20">
      {/* Trust badges strip */}
      <div className="border-b border-card/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5 justify-center text-center">
                <span className="text-2xl">{b.icon}</span>
                <span className="text-xs font-button font-medium text-card/80">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={logo} alt="PrimeButchery" className="h-14 w-auto brightness-0 invert mb-4" />
            <p className="text-sm text-card/60 leading-relaxed mb-6 max-w-sm">
              Premium grain-fed meats, sourced transparently from verified farms, delivered fresh to your door with cold-chain precision.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-card/60">
                <Phone className="w-4 h-4 text-gold" />
                <span>(800) 555-MEAT</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-card/60">
                <Mail className="w-4 h-4 text-gold" />
                <span>orders@primebutchery.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-card/60">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Mon-Fri 8am-6pm EST</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-button font-semibold mb-5 text-card/90 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-sm text-card/60 hover:text-gold transition-colors">All Products</Link></li>
              {CATEGORIES.slice(0, 4).map((c) => (
                <li key={c.slug}><Link to="/products" className="text-sm text-card/60 hover:text-gold transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-button font-semibold mb-5 text-card/90 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">Our Farms</span></li>
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">About Us</span></li>
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">Blog</span></li>
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">Contact</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-button font-semibold mb-5 text-card/90 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">FAQ</span></li>
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">Shipping & Returns</span></li>
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">Track Order</span></li>
              <li><span className="text-sm text-card/60 cursor-pointer hover:text-gold transition-colors">Satisfaction Guarantee</span></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-card/10 mt-12 pt-10">
          <div className="max-w-md mx-auto text-center mb-8">
            <h4 className="font-heading text-lg font-bold text-card mb-2">Get 10% Off Your First Order</h4>
            <p className="text-sm text-card/60 mb-4">Join our newsletter for exclusive deals, recipes, and farm stories.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-full bg-card/10 border border-card/20 text-sm text-card placeholder:text-card/40 focus:outline-none focus:border-gold"
              />
              <button className="px-6 py-2.5 bg-crimson text-crimson-foreground rounded-full text-sm font-button font-semibold hover:bg-crimson/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-card/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-card/40">© 2026 PrimeButchery. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-xs text-card/40">
            <span className="hover:text-card/60 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-card/60 cursor-pointer">Terms of Service</span>
            <span className="hover:text-card/60 cursor-pointer">Refund Policy</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-card/40">
            <span>💳</span> Visa · Mastercard · Amex · Apple Pay
          </div>
        </div>
      </div>
    </footer>
  );
}
