import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/products/new')({
  component: AdminProductNew,
});

function AdminProductNew() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
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
    supabase.from('categories').select('*').order('sort_order').then(({ data }) => {
      setCategories(data ?? []);
    });
  }, []);

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'name' && !form.slug) {
      setForm(prev => ({
        ...prev, [field]: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }));
    }
  };

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

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.price) {
      alert('Name, slug, and price are required.');
      return;
    }

    setSaving(true);

    const toArray = (s: string) => s ? s.split(',').map(v => v.trim()).filter(Boolean) : [];

    const { error } = await supabase.from('products').insert({
      name: form.name,
      slug: form.slug,
      short_description: form.short_description,
      description: form.description,
      price: parseFloat(form.price),
      compare_price: form.compare_price ? parseFloat(form.compare_price) : null,
      category_id: form.category_id || null,
      stock_qty: parseInt(form.stock_qty) || 0,
      weight_options: toArray(form.weight_options),
      images,
      tags: toArray(form.tags),
      origin_farm: form.origin_farm || null,
      origin_country: form.origin_country || null,
      grain_fed_days: form.grain_fed_days ? parseInt(form.grain_fed_days) : null,
      marbling_score: form.marbling_score || null,
      certifications: toArray(form.certifications),
      cooking_methods: toArray(form.cooking_methods),
      badge: form.badge || null,
      is_featured: form.is_featured,
      is_bestseller: form.is_bestseller,
      is_active: form.is_active,
    });

    setSaving(false);

    if (error) {
      alert('Error saving product: ' + error.message);
      return;
    }

    navigate({ to: '/admin/products' });
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/products" className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Add Product</h1>
          <p className="text-muted-foreground text-sm mt-1">Create a new product listing</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Product Name *</label>
              <input value={form.name} onChange={e => updateField('name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="e.g. A5 Wagyu Ribeye" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">URL Slug *</label>
              <input value={form.slug} onChange={e => updateField('slug', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="a5-wagyu-ribeye" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Price *</label>
              <input type="number" step="0.01" value={form.price} onChange={e => updateField('price', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="64.99" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Compare Price</label>
              <input type="number" step="0.01" value={form.compare_price} onChange={e => updateField('compare_price', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="79.99" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Stock Quantity</label>
              <input type="number" value={form.stock_qty} onChange={e => updateField('stock_qty', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
              <select value={form.category_id} onChange={e => updateField('category_id', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30">
                <option value="">Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Badge</label>
              <input value={form.badge} onChange={e => updateField('badge', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="Bestseller, Chef's Pick, etc." />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => updateField('is_featured', e.target.checked)} className="rounded border-border" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_bestseller} onChange={e => updateField('is_bestseller', e.target.checked)} className="rounded border-border" />
              Bestseller
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => updateField('is_active', e.target.checked)} className="rounded border-border" />
              Active
            </label>
          </div>
        </section>

        {/* Descriptions */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Descriptions</h2>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Short Description</label>
            <RichTextEditor content={form.short_description} onChange={val => updateField('short_description', val)} placeholder="Brief product summary..." minHeight="100px" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Description</label>
            <RichTextEditor content={form.description} onChange={val => updateField('description', val)} placeholder="Detailed product description, cooking tips, flavour profile..." minHeight="250px" />
          </div>
        </section>

        {/* Images */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Product Gallery</h2>
          <p className="text-sm text-muted-foreground">Upload multiple images. First image will be the featured image.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-border">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-2 left-2 text-xs bg-crimson text-white px-2 py-0.5 rounded-full font-medium">Featured</span>
                )}
              </div>
            ))}

            <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-crimson/40 flex flex-col items-center justify-center cursor-pointer transition-colors">
              {uploading ? (
                <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">Upload</span>
                </>
              )}
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </section>

        {/* Source & Origin */}
        <section className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-heading font-semibold text-foreground text-lg">Origin & Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Origin Farm</label>
              <input value={form.origin_farm} onChange={e => updateField('origin_farm', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="Silver Fern Farms" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Country</label>
              <input value={form.origin_country} onChange={e => updateField('origin_country', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="New Zealand" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Grain-Fed Days</label>
              <input type="number" value={form.grain_fed_days} onChange={e => updateField('grain_fed_days', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="100" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Marbling Score</label>
              <input value={form.marbling_score} onChange={e => updateField('marbling_score', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="BMS 10-12" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Weight Options (comma-separated)</label>
            <input value={form.weight_options} onChange={e => updateField('weight_options', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="250g, 350g, 500g" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Certifications (comma-separated)</label>
              <input value={form.certifications} onChange={e => updateField('certifications', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="USDA Choice, Hormone-Free" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Cooking Methods (comma-separated)</label>
              <input value={form.cooking_methods} onChange={e => updateField('cooking_methods', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="Grill, Pan-sear, Broil" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Tags (comma-separated)</label>
            <input value={form.tags} onChange={e => updateField('tags', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" placeholder="beef, steak, wagyu, premium" />
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center gap-4 pb-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-crimson text-white font-button font-semibold text-sm hover:bg-crimson/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {saving ? 'Saving...' : 'Save Product'}
          </button>
          <Link to="/admin/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
