import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { checkAdminRole } from '@/lib/admin-auth.functions';
import { Plus, Trash2, Shield, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/admin/admins')({
  component: AdminManagement,
});

function AdminManagement() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adding, setAdding] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  const fetchAdmins = async () => {
    setLoading(true);
    const { data: roles } = await supabase.from('user_roles').select('*, profiles(full_name)').eq('role', 'admin');
    setAdmins(roles ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
    supabase.auth.getUser().then(({ data }) => setCurrentUserId(data.user?.id ?? ''));
  }, []);

  const addAdmin = async () => {
    if (!email || !password) { alert('Email and password required'); return; }
    setAdding(true);

    try {
      // Use bootstrap function to create user via admin API
      const { bootstrapAdmin: _ } = await import('@/lib/admin-auth.functions');

      // Sign up user first
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: 'Admin' } } });
      if (error) { alert(error.message); setAdding(false); return; }
      if (data.user) {
        await supabase.from('user_roles').insert({ user_id: data.user.id, role: 'admin' as any });
      }
      setEmail('');
      setPassword('');
      fetchAdmins();
    } catch (err: any) {
      alert(err.message || 'Failed to add admin');
    }
    setAdding(false);
  };

  const removeAdmin = async (userId: string) => {
    if (userId === currentUserId) { alert('Cannot remove yourself'); return; }
    if (!confirm('Remove this admin?')) return;
    await supabase.from('user_roles').delete().eq('user_id', userId).eq('role', 'admin' as any);
    fetchAdmins();
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Admin Management</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage admin access to the dashboard</p>

      {/* Add Admin */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <h2 className="font-heading font-semibold text-lg mb-4">Add New Admin</h2>
        <div className="flex gap-3 items-end flex-wrap">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="admin@example.com"
              className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 w-64" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••"
              className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 w-48" />
          </div>
          <button onClick={addAdmin} disabled={adding}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-button font-semibold hover:bg-crimson/90 disabled:opacity-50">
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Admin
          </button>
        </div>
      </div>

      {/* Admin List */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">User</th>
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Role</th>
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Since</th>
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => <tr key={i} className="border-b border-border/50"><td colSpan={4} className="p-4"><div className="h-5 bg-muted/50 rounded animate-pulse" /></td></tr>)
            ) : admins.map(admin => (
              <tr key={admin.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-crimson" />
                    <span className="text-sm font-medium">{admin.profiles?.full_name || admin.user_id.slice(0, 8)}</span>
                    {admin.user_id === currentUserId && <span className="text-xs bg-crimson/10 text-crimson px-2 py-0.5 rounded-full">You</span>}
                  </div>
                </td>
                <td className="p-4 text-sm capitalize">{admin.role}</td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(admin.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  {admin.user_id !== currentUserId && (
                    <button onClick={() => removeAdmin(admin.user_id)} className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
