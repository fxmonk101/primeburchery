import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/coupons')({
  component: AdminCoupons,
});

function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('coupons').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setCoupons(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Coupons</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage discount codes</p>
      <div className="bg-card rounded-2xl border border-border p-12 text-center text-muted-foreground">
        {loading ? 'Loading...' : `${coupons.length} coupons configured`}
      </div>
    </div>
  );
}
