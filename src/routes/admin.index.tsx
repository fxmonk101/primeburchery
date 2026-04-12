import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DollarSign, Package, Star, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

interface Stats {
  totalProducts: number;
  totalOrders: number;
  pendingReviews: number;
  lowStockItems: number;
  totalSubscribers: number;
  publishedPosts: number;
}

function KPICard({ icon: Icon, label, value, color }: {
  icon: typeof DollarSign; label: string; value: string | number; color: string;
}) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0, totalOrders: 0, pendingReviews: 0,
    lowStockItems: 0, totalSubscribers: 0, publishedPosts: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [products, orders, reviews, lowStock, subscribers, posts] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('is_approved', false),
        supabase.from('products').select('id', { count: 'exact', head: true }).lte('stock_qty', 5),
        supabase.from('subscribers').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('is_published', true),
      ]);

      setStats({
        totalProducts: products.count ?? 0,
        totalOrders: orders.count ?? 0,
        pendingReviews: reviews.count ?? 0,
        lowStockItems: lowStock.count ?? 0,
        totalSubscribers: subscribers.count ?? 0,
        publishedPosts: posts.count ?? 0,
      });

      const { data: recent } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentOrders(recent ?? []);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Admin</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <KPICard icon={Package} label="Total Products" value={stats.totalProducts} color="bg-blue-500" />
        <KPICard icon={ShoppingCart} label="Total Orders" value={stats.totalOrders} color="bg-green-500" />
        <KPICard icon={Star} label="Pending Reviews" value={stats.pendingReviews} color="bg-amber-500" />
        <KPICard icon={TrendingUp} label="Low Stock Items" value={stats.lowStockItems} color="bg-red-500" />
        <KPICard icon={Users} label="Subscribers" value={stats.totalSubscribers} color="bg-purple-500" />
        <KPICard icon={DollarSign} label="Published Posts" value={stats.publishedPosts} color="bg-indigo-500" />
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground text-sm">No orders yet</td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm font-mono">{order.id.slice(0, 8)}...</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-price">${order.total_amount ?? '0.00'}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
