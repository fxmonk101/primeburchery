import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { PRODUCT_IMAGES } from '@/lib/product-images';
import { Link } from '@tanstack/react-router';

const FREE_SHIPPING_THRESHOLD = 75;

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCartStore();
  const sub = subtotal();
  const remaining = FREE_SHIPPING_THRESHOLD - sub;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-foreground/40"
          onClick={closeCart}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-xl font-bold">Your Cart</h2>
              <button onClick={closeCart} className="p-2 hover:bg-accent rounded-full"><X className="w-5 h-5" /></button>
            </div>

            {/* Free shipping bar */}
            {items.length > 0 && (
              <div className="px-6 py-3 bg-cream">
                {remaining > 0 ? (
                  <>
                    <p className="text-sm font-button mb-1">Add <strong className="text-crimson">${remaining.toFixed(2)}</strong> more for <strong>FREE shipping!</strong></p>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
                    </div>
                  </>
                ) : (
                  <p className="text-sm font-button text-success font-semibold">🎉 You've unlocked FREE shipping!</p>
                )}
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="font-heading text-lg mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mb-6">Discover our premium selection</p>
                  <Link to="/products" onClick={closeCart}>
                    <Button variant="hero" size="lg">Shop Now</Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-cream rounded-2xl p-3">
                    <img
                      src={PRODUCT_IMAGES[item.product.id]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover"
                      loading="lazy"
                      width={80}
                      height={80}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-button font-semibold text-sm truncate">{item.product.name}</h3>
                      <p className="font-price text-sm text-crimson font-bold">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-button font-semibold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeItem(item.product.id)} className="ml-auto text-xs text-muted-foreground hover:text-destructive transition-colors font-button">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-button font-semibold">Subtotal</span>
                  <span className="font-price text-xl font-bold text-crimson">${sub.toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={closeCart}>
                  <Button variant="hero" size="xl" className="w-full">
                    Checkout — ${sub.toFixed(2)}
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>🔒</span>
                  <span>Secure checkout · Bank Transfer · CashApp · Zelle</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
