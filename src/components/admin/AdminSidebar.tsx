import { Link, useLocation } from '@tanstack/react-router';
import {
  LayoutDashboard, Package, ShoppingCart, Star, FileText,
  Users, Tag, Tractor, Mail, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';

const navItems = [
  { to: '/admin' as string, icon: LayoutDashboard, label: 'Overview', exact: true },
  { to: '/admin/products' as string, icon: Package, label: 'Products', exact: false },
  { to: '/admin/orders' as string, icon: ShoppingCart, label: 'Orders', exact: false },
  { to: '/admin/reviews' as string, icon: Star, label: 'Reviews', exact: false },
  { to: '/admin/blog' as string, icon: FileText, label: 'Blog', exact: false },
  { to: '/admin/coupons' as string, icon: Tag, label: 'Coupons', exact: false },
  { to: '/admin/farms' as string, icon: Tractor, label: 'Farm Stories', exact: false },
  { to: '/admin/subscribers' as string, icon: Mail, label: 'Subscribers', exact: false },
  { to: '/admin/admins' as string, icon: Users, label: 'Admins', exact: false },
];

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
            <a
              key={item.to}
              href={item.to}
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
