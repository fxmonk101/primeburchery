import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/farms')({
  component: AdminFarms,
});

function AdminFarms() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('farm_stories').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setFarms(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Farm Stories</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage farm transparency content</p>
      <div className="bg-card rounded-2xl border border-border p-12 text-center text-muted-foreground">
        {loading ? 'Loading...' : `${farms.length} farm stories`}
      </div>
    </div>
  );
}
