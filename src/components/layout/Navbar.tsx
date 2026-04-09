import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Menu, X, Search, User } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CATEGORIES } from '@/lib/mock-data';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <>
      {/* Urgency Bar */}
      <div className="bg-crimson text-crimson-foreground text-center py-2 text-sm font-button tracking-wide">
        🚚 Free delivery on orders over $75 &nbsp;|&nbsp; Today only: <strong>10% off</strong> first order with code <strong>PRIME10</strong>
      </div>

      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-heading font-bold text-crimson tracking-tight">
                Prime<span className="text-gold">Burchry</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-sm font-button font-medium text-foreground hover:text-crimson transition-colors" activeProps={{ className: 'text-crimson' }}>
                Home
              </Link>
              <Link to="/products" className="text-sm font-button font-medium text-foreground hover:text-crimson transition-colors" activeProps={{ className: 'text-crimson' }}>
                Shop All
              </Link>
              {CATEGORIES.slice(0, 3).map((cat) => (
                <Link key={cat.slug} to="/products" className="text-sm font-button font-medium text-foreground hover:text-crimson transition-colors">
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:flex">
                <Search className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:flex">
                <Heart className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:flex">
                <User className="w-5 h-5 text-foreground" />
              </button>
              <button onClick={openCart} className="relative p-2 hover:bg-accent rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-crimson text-crimson-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(true)} className="p-2 hover:bg-accent rounded-full transition-colors lg:hidden">
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-foreground/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-card shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-heading font-bold text-crimson">Menu</span>
                <button onClick={() => setMobileOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <nav className="flex flex-col gap-4">
                <Link to="/" onClick={() => setMobileOpen(false)} className="text-lg font-button py-2 border-b border-border">Home</Link>
                <Link to="/products" onClick={() => setMobileOpen(false)} className="text-lg font-button py-2 border-b border-border">Shop All</Link>
                {CATEGORIES.map((cat) => (
                  <Link key={cat.slug} to="/products" onClick={() => setMobileOpen(false)} className="text-lg font-button py-2 border-b border-border">{cat.name}</Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
