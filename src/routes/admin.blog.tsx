import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/admin/blog')({
  component: AdminBlog,
});

function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const emptyPost = {
    title: '', slug: '', excerpt: '', body: '', cover_image: '',
    category: '', read_time_mins: 5, meta_title: '', meta_description: '',
    is_published: false,
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSave = async () => {
    if (!editing.title || !editing.slug) { alert('Title and slug required'); return; }
    setSaving(true);

    if (editing.id) {
      const { id, created_at, updated_at, ...rest } = editing;
      await supabase.from('blog_posts').update(rest).eq('id', id);
    } else {
      await supabase.from('blog_posts').insert(editing);
    }

    setSaving(false);
    setEditing(null);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchPosts();
  };

  if (editing) {
    return (
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-3xl font-heading font-bold">{editing.id ? 'Edit Post' : 'New Post'}</h1>
        </div>

        <div className="space-y-6">
          <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-heading font-semibold text-lg">Post Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title *</label>
                <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Slug *</label>
                <input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <input value={editing.category || ''} onChange={e => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Cover Image URL</label>
                <input value={editing.cover_image || ''} onChange={e => setEditing({ ...editing, cover_image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Excerpt</label>
              <textarea value={editing.excerpt || ''} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} className="rounded" />
              Published
            </label>
          </section>

          <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-heading font-semibold text-lg">Content</h2>
            <RichTextEditor content={editing.body || ''} onChange={val => setEditing({ ...editing, body: val })} placeholder="Write your blog post..." minHeight="400px" />
          </section>

          <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-heading font-semibold text-lg">SEO</h2>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Meta Title</label>
              <input value={editing.meta_title || ''} onChange={e => setEditing({ ...editing, meta_title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Meta Description</label>
              <textarea value={editing.meta_description || ''} onChange={e => setEditing({ ...editing, meta_description: e.target.value })} rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
          </section>

          <div className="flex gap-4 pb-8">
            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-crimson text-white font-button font-semibold text-sm hover:bg-crimson/90 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} {saving ? 'Saving...' : 'Save Post'}
            </button>
            <button onClick={() => setEditing(null)} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Blog</h1>
          <p className="text-muted-foreground text-sm mt-1">{posts.length} posts</p>
        </div>
        <button onClick={() => setEditing({ ...emptyPost })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-button font-semibold hover:bg-crimson/90">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Title</th>
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Category</th>
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Date</th>
              <th className="p-4 text-xs font-medium text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <tr key={i} className="border-b border-border/50"><td colSpan={5} className="p-4"><div className="h-5 bg-muted/50 rounded animate-pulse" /></td></tr>)
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="p-12 text-center text-muted-foreground text-sm">No blog posts yet</td></tr>
            ) : posts.map(post => (
              <tr key={post.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-4 text-sm font-medium">{post.title}</td>
                <td className="p-4 text-sm text-muted-foreground">{post.category || '—'}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {post.is_published ? <><Eye className="w-3 h-3" /> Published</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</td>
                <td className="p-4 flex gap-1">
                  <button onClick={() => setEditing(post)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
