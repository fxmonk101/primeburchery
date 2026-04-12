import { Link, useLocation } from '@tanstack/react-router';
import {
  LayoutDashboard, Package, ShoppingCart, Star, FileText,
  Users, Tag, Tractor, Mail, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', exact: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/reviews', icon: Star, label: 'Reviews' },
  { to: '/admin/blog', icon: FileText, label: 'Blog' },
  { to: '/admin/coupons', icon: Tag, label: 'Coupons' },
  { to: '/admin/farms', icon: Tractor, label: 'Farm Stories' },
  { to: '/admin/subscribers', icon: Mail, label: 'Subscribers' },
  { to: '/admin/admins', icon: Users, label: 'Admins' },
] as const;

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <aside className={`${collapsed ? 'w-[72px]' : 'w-64'} bg-dark min-h-screen flex flex-col transition-all duration-200 shrink-0`}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <Link to="/admin">
            <img src={logo} alt="PrimeButchery" className="h-10 w-auto" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-crimson text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors w-full"
        >
          <span className="w-5 h-5 shrink-0 text-center">🌐</span>
          {!collapsed && <span>View Store</span>}
        </Link>
      </div>
    </aside>
  );
}
