import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Subscribe to realtime changes on a table and invoke a callback on any change.
 * Use to refetch data when admin edits propagate from the database.
 */
export function useRealtimeTable(tableName: string, onChange: () => void) {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime-${tableName}-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        onChange();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, onChange]);
}
