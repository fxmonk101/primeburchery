import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Search, CheckCircle, XCircle, Star } from 'lucide-react';

export const Route = createFileRoute('/admin/reviews')({
  component: AdminReviews,
});

function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const fetchReviews = async () => {
    setLoading(true);
    let query = supabase.from('reviews').select('*, products(name)').order('created_at', { ascending: false });
    if (filter === 'pending') query = query.eq('is_approved', false);
    if (filter === 'approved') query = query.eq('is_approved', true);
    const { data } = await query;
    setReviews(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, [filter]);

  const updateReview = async (id: string, updates: Record<string, any>) => {
    await supabase.from('reviews').update(updates as any).eq('id', id);
    fetchReviews();
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Reviews</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage customer reviews</p>

      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-crimson text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-card rounded-2xl border border-border p-6 h-32 animate-pulse" />)
        ) : reviews.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center text-muted-foreground">No reviews found</div>
        ) : reviews.map(review => (
          <div key={review.id} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted-foreground'}`} />)}</div>
                  {review.is_verified_purchase && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${review.is_approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {review.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="font-medium text-foreground">{review.title || 'No title'}</p>
                <p className="text-sm text-muted-foreground mt-1">{review.body}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {review.reviewer_name || 'Anonymous'} • {review.products?.name} • {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                {!review.is_approved && (
                  <button onClick={() => updateReview(review.id, { is_approved: true })} className="p-2 rounded-lg hover:bg-green-50 text-green-600" title="Approve">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                {review.is_approved && (
                  <button onClick={() => updateReview(review.id, { is_approved: false })} className="p-2 rounded-lg hover:bg-amber-50 text-amber-600" title="Unapprove">
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => updateReview(review.id, { is_verified_purchase: !review.is_verified_purchase })}
                  className={`p-2 rounded-lg text-sm ${review.is_verified_purchase ? 'text-green-600 hover:bg-green-50' : 'text-muted-foreground hover:bg-muted'}`} title="Toggle Verified">
                  ✓VP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
