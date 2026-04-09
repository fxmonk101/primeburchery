import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Menu, X, Search, User, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CATEGORIES } from '@/lib/mock-data';
import logo from '@/assets/logo.png';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-foreground text-card text-xs py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" /> (800) 555-MEAT
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> orders@primebutchery.com
            </span>
          </div>
          <div className="flex items-center gap-4 font-button">
            <span>Track Order</span>
            <span className="text-card/40">|</span>
            <span>FAQ</span>
            <span className="text-card/40">|</span>
            <span>Our Farms</span>
          </div>
        </div>
      </div>

      {/* Urgency Bar */}
      <div className="bg-crimson text-crimson-foreground text-center py-2.5 text-xs sm:text-sm font-button tracking-wide">
        🚚 Free delivery on orders over $75 &nbsp;|&nbsp; Today only: <strong>10% off</strong> first order with code <strong>PRIME10</strong>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18 sm:h-22">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(true)} className="p-2 hover:bg-accent rounded-full transition-colors lg:hidden">
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={logo} alt="PrimeButchery — Quality Meats Delivered" className="h-12 sm:h-16 w-auto" />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search premium cuts..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson transition-all"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-accent rounded-full transition-colors lg:hidden"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:flex">
                <User className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-full transition-colors hidden sm:flex relative">
                <Heart className="w-5 h-5 text-foreground" />
              </button>
              <button onClick={openCart} className="relative p-2 hover:bg-accent rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-crimson text-crimson-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center gap-1">
              <Link
                to="/"
                className="px-4 py-3 text-sm font-button font-semibold text-foreground hover:text-crimson transition-colors uppercase tracking-wide"
                activeProps={{ className: 'text-crimson' }}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="px-4 py-3 text-sm font-button font-semibold text-foreground hover:text-crimson transition-colors uppercase tracking-wide"
                activeProps={{ className: 'text-crimson' }}
              >
                Shop All
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/products"
                  className="px-4 py-3 text-sm font-button font-medium text-foreground hover:text-crimson transition-colors uppercase tracking-wide"
                >
                  {cat.name}
                </Link>
              ))}
              <span className="px-4 py-3 text-sm font-button font-semibold text-sale uppercase tracking-wide cursor-pointer hover:opacity-80 transition-opacity">
                Sale
              </span>
            </div>
          </div>
        </nav>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search premium cuts..."
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-80 bg-card shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-border">
                <img src={logo} alt="PrimeButchery" className="h-10 w-auto" />
                <button onClick={() => setMobileOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-1">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="text-base font-button font-semibold py-3 px-3 rounded-lg hover:bg-accent transition-colors">Home</Link>
                  <Link to="/products" onClick={() => setMobileOpen(false)} className="text-base font-button font-semibold py-3 px-3 rounded-lg hover:bg-accent transition-colors">Shop All</Link>
                  <div className="my-2 border-t border-border" />
                  {CATEGORIES.map((cat) => (
                    <Link key={cat.slug} to="/products" onClick={() => setMobileOpen(false)} className="text-base font-button py-3 px-3 rounded-lg hover:bg-accent transition-colors">{cat.name}</Link>
                  ))}
                  <div className="my-2 border-t border-border" />
                  <span className="text-base font-button font-semibold py-3 px-3 rounded-lg text-sale">Sale</span>
                </div>
              </nav>
              <div className="p-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>(800) 555-MEAT</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
