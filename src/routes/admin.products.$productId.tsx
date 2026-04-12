import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/admin/products/$productId')({
  component: AdminProductEdit,
});

function AdminProductEdit() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: '', slug: '', short_description: '', description: '',
    price: '', compare_price: '', category_id: '', stock_qty: '0',
    weight_options: '', origin_farm: '', origin_country: '',
    grain_fed_days: '', marbling_score: '', badge: '',
    certifications: '', cooking_methods: '', tags: '',
    is_featured: false, is_bestseller: false, is_active: true,
  });

  useEffect(() => {
    const load = async () => {
      const [{ data: product }, { data: cats }] = await Promise.all([
        supabase.from('products').select('*').eq('id', productId).single(),
        supabase.from('categories').select('*').order('sort_order'),
      ]);

      setCategories(cats ?? []);

      if (product) {
        setForm({
          name: product.name, slug: product.slug,
          short_description: product.short_description ?? '',
          description: product.description ?? '',
          price: String(product.price), compare_price: product.compare_price ? String(product.compare_price) : '',
          category_id: product.category_id ?? '', stock_qty: String(product.stock_qty ?? 0),
          weight_options: (product.weight_options ?? []).join(', '),
          origin_farm: product.origin_farm ?? '', origin_country: product.origin_country ?? '',
          grain_fed_days: product.grain_fed_days ? String(product.grain_fed_days) : '',
          marbling_score: product.marbling_score ?? '', badge: product.badge ?? '',
          certifications: (product.certifications ?? []).join(', '),
          cooking_methods: (product.cooking_methods ?? []).join(', '),
          tags: (product.tags ?? []).join(', '),
          is_featured: product.is_featured ?? false,
          is_bestseller: product.is_bestseller ?? false,
          is_active: product.is_active ?? true,
        });
        setImages(product.images ?? []);
      }
      setLoading(false);
    };
    load();
  }, [productId]);

  const updateField = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const newImages: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from('product-images').upload(path, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);
        newImages.push(urlData.publicUrl);
      }
    }
    setImages(prev => [...prev, ...newImages]);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.price) { alert('Name, slug, and price required.'); return; }
    setSaving(true);
    const toArray = (s: string) => s ? s.split(',').map(v => v.trim()).filter(Boolean) : [];
    const { error } = await supabase.from('products').update({
      name: form.name, slug: form.slug,
      short_description: form.short_description, description: form.description,
      price: parseFloat(form.price),
      compare_price: form.compare_price ? parseFloat(form.compare_price) : null,
      category_id: form.category_id || null, stock_qty: parseInt(form.stock_qty) || 0,
      weight_options: toArray(form.weight_options), images, tags: toArray(form.tags),
      origin_farm: form.origin_farm || null, origin_country: form.origin_country || null,
      grain_fed_days: form.grain_fed_days ? parseInt(form.grain_fed_days) : null,
      marbling_score: form.marbling_score || null,
      certifications: toArray(form.certifications), cooking_methods: toArray(form.cooking_methods),
      badge: form.badge || null, is_featured: form.is_featured,
      is_bestseller: form.is_bestseller, is_active: form.is_active,
    }).eq('id', productId);
    setSaving(false);
    if (error) { alert('Error: ' + error.message); return; }
    navigate({ to: '/admin/products' });
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-crimson" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/products" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Edit Product</h1>
          <p className="text-muted-foreground text-sm mt-1">{form.name}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Product Name *</label>
              <input value={form.name} onChange={e => updateField('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">URL Slug *</label>
              <input value={form.slug} onChange={e => updateField('slug', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Price *</label>
              <input type="number" step="0.01" value={form.price} onChange={e => updateField('price', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Compare Price</label>
              <input type="number" step="0.01" value={form.compare_price} onChange={e => updateField('compare_price', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Stock</label>
              <input type="number" value={form.stock_qty} onChange={e => updateField('stock_qty', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
              <select value={form.category_id} onChange={e => updateField('category_id', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30">
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Badge</label>
              <input value={form.badge} onChange={e => updateField('badge', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => updateField('is_featured', e.target.checked)} className="rounded" /> Featured
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_bestseller} onChange={e => updateField('is_bestseller', e.target.checked)} className="rounded" /> Bestseller
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => updateField('is_active', e.target.checked)} className="rounded" /> Active
            </label>
          </div>
        </section>

        {/* Descriptions */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Descriptions</h2>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Short Description</label>
            <RichTextEditor content={form.short_description} onChange={val => updateField('short_description', val)} placeholder="Brief summary..." minHeight="100px" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Description</label>
            <RichTextEditor content={form.description} onChange={val => updateField('description', val)} placeholder="Full description..." minHeight="250px" />
          </div>
        </section>

        {/* Images */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Product Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-border">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3.5 h-3.5" />
                </button>
                {i === 0 && <span className="absolute bottom-2 left-2 text-xs bg-crimson text-white px-2 py-0.5 rounded-full font-medium">Featured</span>}
              </div>
            ))}
            <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-crimson/40 flex flex-col items-center justify-center cursor-pointer transition-colors">
              {uploading ? <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" /> : <><Upload className="w-6 h-6 text-muted-foreground mb-2" /><span className="text-xs text-muted-foreground">Upload</span></>}
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </section>

        {/* Origin */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Origin & Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1.5 block">Origin Farm</label><input value={form.origin_farm} onChange={e => updateField('origin_farm', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1.5 block">Country</label><input value={form.origin_country} onChange={e => updateField('origin_country', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1.5 block">Grain-Fed Days</label><input type="number" value={form.grain_fed_days} onChange={e => updateField('grain_fed_days', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1.5 block">Marbling Score</label><input value={form.marbling_score} onChange={e => updateField('marbling_score', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
          </div>
          <div><label className="text-sm font-medium text-foreground mb-1.5 block">Weight Options (comma-separated)</label><input value={form.weight_options} onChange={e => updateField('weight_options', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-foreground mb-1.5 block">Certifications</label><input value={form.certifications} onChange={e => updateField('certifications', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
            <div><label className="text-sm font-medium text-foreground mb-1.5 block">Cooking Methods</label><input value={form.cooking_methods} onChange={e => updateField('cooking_methods', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
          </div>
          <div><label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label><input value={form.tags} onChange={e => updateField('tags', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" /></div>
        </section>

        <div className="flex items-center gap-4 pb-8">
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-crimson text-white font-button font-semibold text-sm hover:bg-crimson/90 transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} {saving ? 'Saving...' : 'Update Product'}
          </button>
          <Link to="/admin/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
