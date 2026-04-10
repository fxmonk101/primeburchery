import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Menu, X, Search, User, Phone, Mail, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CATEGORIES } from '@/lib/mock-data';
import logo from '@/assets/logo.png';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-dark text-white/80 text-xs py-2 hidden sm:block">
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
            <Link to="/track-order" className="cursor-pointer hover:text-white transition-colors">Track Order</Link>
            <span className="text-white/30">|</span>
            <Link to="/faq" className="cursor-pointer hover:text-white transition-colors">FAQ</Link>
            <span className="text-white/30">|</span>
            <Link to="/our-farms" className="cursor-pointer hover:text-white transition-colors">Our Farms</Link>
          </div>
        </div>
      </div>

      {/* Urgency Bar */}
      <div className="bg-crimson text-crimson-foreground text-center py-2.5 text-xs sm:text-sm font-button tracking-wide">
        🚚 Free delivery on orders over $75 &nbsp;|&nbsp; 🎉 First order: <strong>10% off</strong> — code <strong>GRAIN10</strong> &nbsp;|&nbsp; ⏱️ Order by 12pm for next-day dispatch
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18 sm:h-20">
            <button onClick={() => setMobileOpen(true)} className="p-2 hover:bg-accent rounded-full transition-colors lg:hidden">
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={logo} alt="PrimeButchery — Premium Grain-Fed Meats" className="h-12 sm:h-16 w-auto" />
            </Link>

            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search premium cuts..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson transition-all" />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-accent rounded-full transition-colors lg:hidden">
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
            <div className="flex items-center justify-center gap-0.5">
              <Link to="/" className="px-4 py-3 text-sm font-button font-semibold text-foreground hover:text-crimson transition-colors uppercase tracking-wide" activeProps={{ className: 'text-crimson' }}>
                Home
              </Link>

              {/* Shop dropdown */}
              <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
                <Link to="/products" className="flex items-center gap-1 px-4 py-3 text-sm font-button font-semibold text-foreground hover:text-crimson transition-colors uppercase tracking-wide" activeProps={{ className: 'text-crimson' }}>
                  Shop <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] bg-card border border-border rounded-2xl shadow-2xl p-6 z-50"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-button text-muted-foreground uppercase tracking-widest mb-3">By Category</p>
                          <div className="flex flex-col gap-0.5">
                            {CATEGORIES.map((cat) => (
                              <Link key={cat.slug} to="/products" onClick={() => setShopOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-button">
                                <span className="text-lg">{cat.emoji}</span>
                                <span>{cat.name}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{cat.productCount}</span>
                              </Link>
                            ))}
                          </div>
                          <Link to="/products" onClick={() => setShopOpen(false)} className="flex items-center gap-1 mt-3 px-3 text-sm font-button font-semibold text-crimson hover:underline">
                            View All Products →
                          </Link>
                        </div>
                        <div>
                          <p className="text-xs font-button text-muted-foreground uppercase tracking-widest mb-3">Curated Picks</p>
                          <div className="flex flex-col gap-0.5">
                            <Link to="/products" onClick={() => setShopOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-button">
                              <span className="text-lg">⭐</span> Bestsellers
                            </Link>
                            <Link to="/products" onClick={() => setShopOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-button">
                              <span className="text-lg">🆕</span> New Arrivals
                            </Link>
                            <Link to="/products" onClick={() => setShopOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-button">
                              <span className="text-lg">🍽️</span> {"Chef's Picks"}
                            </Link>
                          </div>

                          <p className="text-xs font-button text-muted-foreground uppercase tracking-widest mb-3 mt-6">Shop by Origin</p>
                          <div className="flex flex-col gap-0.5">
                            {[
                              { flag: '🇯🇵', name: 'Japanese Wagyu' },
                              { flag: '🇳🇿', name: 'New Zealand Angus' },
                              { flag: '🇮🇪', name: 'Irish Nature Beef' },
                              { flag: '🇪🇸', name: 'Spanish Iberico' },
                            ].map((o) => (
                              <Link key={o.name} to="/products" onClick={() => setShopOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-button">
                                <span>{o.flag}</span> {o.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/our-farms" className="px-4 py-3 text-sm font-button font-medium text-foreground hover:text-crimson transition-colors uppercase tracking-wide" activeProps={{ className: 'text-crimson' }}>Our Farms</Link>
              <Link to="/blog" className="px-4 py-3 text-sm font-button font-medium text-foreground hover:text-crimson transition-colors uppercase tracking-wide" activeProps={{ className: 'text-crimson' }}>Blog</Link>
              <Link to="/about" className="px-4 py-3 text-sm font-button font-medium text-foreground hover:text-crimson transition-colors uppercase tracking-wide" activeProps={{ className: 'text-crimson' }}>About</Link>
              <Link to="/contact" className="px-4 py-3 text-sm font-button font-medium text-foreground hover:text-crimson transition-colors uppercase tracking-wide" activeProps={{ className: 'text-crimson' }}>Contact</Link>
            </div>
          </div>
        </nav>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden border-t border-border">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Search premium cuts..." autoFocus className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:border-crimson" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-foreground/40 lg:hidden" onClick={() => setMobileOpen(false)}>
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

              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-1">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="text-base font-button font-semibold py-3 px-3 rounded-lg hover:bg-accent transition-colors">Home</Link>
                  <Link to="/products" onClick={() => setMobileOpen(false)} className="text-base font-button font-semibold py-3 px-3 rounded-lg hover:bg-accent transition-colors">Shop All</Link>
                  <div className="my-2 border-t border-border" />
                  <p className="text-xs font-button text-muted-foreground uppercase tracking-widest px-3 mb-1">Categories</p>
                  {CATEGORIES.map((cat) => (
                    <Link key={cat.slug} to="/products" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-button py-2.5 px-3 rounded-lg hover:bg-accent transition-colors">
                      <span>{cat.emoji}</span> {cat.name}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-border" />
                  <Link to="/our-farms" onClick={() => setMobileOpen(false)} className="text-base font-button py-3 px-3 rounded-lg hover:bg-accent transition-colors">Our Farms</Link>
                  <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-base font-button py-3 px-3 rounded-lg hover:bg-accent transition-colors">Blog</Link>
                  <Link to="/about" onClick={() => setMobileOpen(false)} className="text-base font-button py-3 px-3 rounded-lg hover:bg-accent transition-colors">About</Link>
                  <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-base font-button py-3 px-3 rounded-lg hover:bg-accent transition-colors">Contact</Link>
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
