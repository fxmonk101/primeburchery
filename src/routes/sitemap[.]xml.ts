import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

const BASE_URL = 'https://primeburchery.lovable.app';

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: '/', changefreq: 'weekly', priority: '1.0' },
          { path: '/products', changefreq: 'daily', priority: '0.9' },
          { path: '/about', changefreq: 'monthly', priority: '0.6' },
          { path: '/our-farms', changefreq: 'monthly', priority: '0.6' },
          { path: '/blog', changefreq: 'weekly', priority: '0.7' },
          { path: '/articles', changefreq: 'weekly', priority: '0.6' },
          { path: '/contact', changefreq: 'yearly', priority: '0.5' },
          { path: '/faq', changefreq: 'monthly', priority: '0.5' },
          { path: '/careers', changefreq: 'monthly', priority: '0.4' },
          { path: '/guarantee', changefreq: 'yearly', priority: '0.4' },
          { path: '/shipping-returns', changefreq: 'yearly', priority: '0.4' },
          { path: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
          { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
          { path: '/terms', changefreq: 'yearly', priority: '0.3' },
          { path: '/track-order', changefreq: 'yearly', priority: '0.3' },
        ];

        try {
          const { data: products } = await supabaseAdmin
            .from('products')
            .select('slug, updated_at')
            .eq('is_active', true);
          for (const p of products ?? []) {
            entries.push({
              path: `/products/${p.slug}`,
              lastmod: p.updated_at ? new Date(p.updated_at).toISOString().slice(0, 10) : undefined,
              changefreq: 'weekly',
              priority: '0.8',
            });
          }

          const { data: posts } = await supabaseAdmin
            .from('blog_posts')
            .select('slug, updated_at')
            .eq('is_published', true);
          for (const post of posts ?? []) {
            entries.push({
              path: `/articles/${post.slug}`,
              lastmod: post.updated_at ? new Date(post.updated_at).toISOString().slice(0, 10) : undefined,
              changefreq: 'monthly',
              priority: '0.6',
            });
          }
        } catch {
          // If DB is unreachable at request time, still serve the static entries.
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join('\n'),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join('\n');

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      },
    },
  },
});
