import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

export const Route = createFileRoute('/admin/products/')({
  component: AdminProductsList,
});

function AdminProductsList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false });
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    const { data } = await query;
    setProducts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [search]);

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} total products</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson text-white text-sm font-button font-semibold hover:bg-crimson/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td colSpan={6} className="p-4"><div className="h-5 bg-muted/50 rounded animate-pulse" /></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground text-sm">
                    No products found. <Link to="/admin/products/new" className="text-crimson hover:underline">Add your first product</Link>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">No img</div>
                        )}
                        <div>
                          <p className="font-medium text-sm text-foreground">{product.name}</p>
                          {product.badge && (
                            <span className="text-xs text-crimson font-medium">{product.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{product.categories?.name ?? '—'}</td>
                    <td className="p-4 text-sm font-price">${product.price}</td>
                    <td className="p-4">
                      <span className={`text-sm font-medium ${
                        product.stock_qty <= 5 ? 'text-red-500' :
                        product.stock_qty <= 15 ? 'text-amber-500' : 'text-green-500'
                      }`}>
                        {product.stock_qty}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Link
                          to="/admin/products/$productId"
                          params={{ productId: product.id }}
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
