import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Trash2 } from 'lucide-react';

export const Route = createFileRoute('/admin/coupons')({
  component: AdminCoupons,
});

function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    code: '',
    type: 'percent',
    value: '',
    min_order: '',
    max_uses: '',
    expires_at: '',
  });

  const fetchCoupons = async () => {
    setLoading(true);
    const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    setCoupons(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const createCoupon = async () => {
    if (!form.code || !form.value) {
      alert('Code and value are required.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('coupons').insert({
      code: form.code.trim().toUpperCase(),
      type: form.type,
      value: Number(form.value),
      min_order: form.min_order ? Number(form.min_order) : null,
      max_uses: form.max_uses ? Number(form.max_uses) : null,
      expires_at: form.expires_at || null,
      is_active: true,
      used_count: 0,
    });
    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setForm({
      code: '',
      type: 'percent',
      value: '',
      min_order: '',
      max_uses: '',
      expires_at: '',
    });
    fetchCoupons();
  };

  const toggleActive = async (id: string, is_active: boolean) => {
    await supabase.from('coupons').update({ is_active: !is_active }).eq('id', id);
    fetchCoupons();
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm('Delete this coupon?')) return;
    await supabase.from('coupons').delete().eq('id', id);
    fetchCoupons();
  };

  const formatValue = (coupon: any) => {
    if (coupon.type === 'percent') return `${coupon.value}% off`;
    return `$${coupon.value} off`;
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Coupons</h1>
      <p className="text-muted-foreground text-sm mb-6">Create and manage discount codes</p>

      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <h2 className="font-heading font-semibold text-lg mb-4">Create Coupon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Code (e.g. WELCOME10)"
            value={form.code}
            onChange={(e) => updateField('code', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30"
          />
          <select
            value={form.type}
            onChange={(e) => updateField('type', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30"
          >
            <option value="percent">Percent (%)</option>
            <option value="fixed">Fixed ($)</option>
          </select>
          <input
            type="number"
            placeholder="Value"
            value={form.value}
            onChange={(e) => updateField('value', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30"
          />
          <input
            type="number"
            placeholder="Minimum order (optional)"
            value={form.min_order}
            onChange={(e) => updateField('min_order', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30"
          />
          <input
            type="number"
            placeholder="Max uses (optional)"
            value={form.max_uses}
            onChange={(e) => updateField('max_uses', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30"
          />
          <input
            type="datetime-local"
            value={form.expires_at}
            onChange={(e) => updateField('expires_at', e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30"
          />
        </div>
        <button
          onClick={createCoupon}
          disabled={saving}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-button font-semibold hover:bg-crimson/90 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {saving ? 'Creating...' : 'Create Coupon'}
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Code</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Discount</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Rules</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Usage</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-12 text-center text-muted-foreground text-sm">Loading coupons...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={6} className="p-12 text-center text-muted-foreground text-sm">No coupons configured yet</td></tr>
              ) : coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-4 text-sm font-mono">{coupon.code}</td>
                  <td className="p-4 text-sm">{formatValue(coupon)}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    Min: {coupon.min_order ? `$${coupon.min_order}` : 'none'}
                    {' • '}
                    Expires: {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'never'}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {coupon.used_count ?? 0}/{coupon.max_uses ?? '∞'}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(coupon.id, coupon.is_active)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${coupon.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {coupon.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
