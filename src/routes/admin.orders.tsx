import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/orders')({
  component: AdminOrders,
});

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'] as const;

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-amber-100 text-amber-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
};

function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders();
  };

  const updateNotes = async (id: string, notes: string) => {
    await supabase.from('orders').update({ notes }).eq('id', id);
  };

  const validateOrder = async (id: string) => {
    await supabase.from('orders').update({ status: 'confirmed' }).eq('id', id);
    fetchOrders();
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Orders</h1>
      <p className="text-muted-foreground text-sm mb-6">{orders.length} total orders</p>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Order</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Email</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Total</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Tracking</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Notes</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Validation</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50"><td colSpan={8} className="p-4"><div className="h-5 bg-muted/50 rounded animate-pulse" /></td></tr>
                ))
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} className="p-12 text-center text-muted-foreground text-sm">No orders yet</td></tr>
              ) : orders.map(order => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-4 text-sm font-mono">{order.id.slice(0, 8)}</td>
                  <td className="p-4 text-sm">{order.guest_email || '—'}</td>
                  <td className="p-4 text-sm font-price">${order.total_amount ?? '0.00'}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[order.status] || ''}`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{order.tracking_number || '—'}</td>
                  <td className="p-4 text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <input
                      defaultValue={order.notes || ''}
                      onBlur={e => updateNotes(order.id, e.target.value)}
                      placeholder="Add note..."
                      className="text-xs px-2 py-1 border border-border rounded-lg bg-background w-28 focus:outline-none focus:ring-1 focus:ring-crimson/30"
                    />
                  </td>
                  <td className="p-4">
                    {order.status === 'confirmed' || order.status === 'delivered' ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">Validated</span>
                    ) : (
                      <button
                        onClick={() => validateOrder(order.id)}
                        className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium hover:bg-blue-200"
                      >
                        Validate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
