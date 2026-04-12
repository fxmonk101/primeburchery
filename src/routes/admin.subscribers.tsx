import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/subscribers')({
  component: AdminSubscribers,
});

function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('subscribers').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setSubscribers(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Subscribers</h1>
      <p className="text-muted-foreground text-sm mb-6">{subscribers.length} newsletter subscribers</p>
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border text-left">
            <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Email</th>
            <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
            <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Date</th>
          </tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-4"><div className="h-5 bg-muted/50 rounded animate-pulse" /></td></tr>
            ) : subscribers.length === 0 ? (
              <tr><td colSpan={3} className="p-12 text-center text-muted-foreground text-sm">No subscribers yet</td></tr>
            ) : subscribers.map(s => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-4 text-sm">{s.email}</td>
                <td className="p-4"><span className={`text-xs px-2 py-0.5 rounded-full ${s.is_confirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{s.is_confirmed ? 'Confirmed' : 'Pending'}</span></td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
