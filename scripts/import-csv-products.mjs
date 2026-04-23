import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

function parseEnvFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"' && inQuotes && next === '"') {
      field += '"';
      i += 1;
      continue;
    }
    if (c === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (c === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }
    if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && next === '\n') i += 1;
      row.push(field);
      if (row.some((v) => v.trim().length > 0)) rows.push(row);
      row = [];
      field = '';
      continue;
    }
    field += c;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((v) => v.trim().length > 0)) rows.push(row);
  }

  const [header, ...data] = rows;
  return data.map((r) => {
    const item = {};
    header.forEach((h, idx) => {
      item[h] = (r[idx] ?? '').trim();
    });
    return item;
  });
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractPrice(record) {
  const candidates = Object.entries(record)
    .filter(([key]) => key.toLowerCase().includes('price') || key === 'data')
    .map(([, value]) => value)
    .filter(Boolean);

  for (const value of candidates) {
    const m = value.match(/\$?(\d+(?:\.\d+)?)/);
    if (m) return Number(m[1]);
  }
  return null;
}

function extractName(record) {
  const known = ['data', 'data2', 'data3', 'data4', 'data5'];
  for (const key of known) {
    const value = record[key];
    if (!value) continue;
    if (
      value.includes('Quick View') ||
      value.includes('/case') ||
      value.includes('Out of Stock') ||
      value.includes('case minimum')
    ) {
      continue;
    }
    if (/[A-Za-z]/.test(value)) return value;
  }
  const fallback = Object.values(record).find((v) => /[A-Za-z]/.test(v) && !v.includes('http'));
  return fallback ?? null;
}

function inferCategorySlug(fileName, sourceUrl) {
  const lowerFile = fileName.toLowerCase();
  if (lowerFile.includes('beef')) return 'beef';
  if (lowerFile.includes('chicken')) return 'chicken';
  if (lowerFile.includes('duck')) return 'duck';
  if (lowerFile.includes('pork')) return 'pork';
  if (lowerFile.includes('smoked')) return 'smoked';
  if (lowerFile.includes('dried')) return 'dried';
  if (lowerFile.includes('rabit') || lowerFile.includes('rabbit')) return 'lamb';

  const lowerUrl = (sourceUrl ?? '').toLowerCase();
  if (lowerUrl.includes('/beef')) return 'beef';
  if (lowerUrl.includes('/chicken')) return 'chicken';
  if (lowerUrl.includes('/duck')) return 'duck';
  if (lowerUrl.includes('/pork')) return 'pork';
  if (lowerUrl.includes('dry-cured')) return 'dried';
  if (lowerUrl.includes('/smoked')) return 'smoked';
  if (lowerUrl.includes('/lamb')) return 'lamb';

  return 'beef';
}

function toTitleCase(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function main() {
  const root = process.cwd();
  const env = parseEnvFile(path.join(root, '.env'));
  const supabaseUrlRaw = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrlRaw || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  }

  const supabaseUrl = supabaseUrlRaw.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const supabase = createClient(supabaseUrl, supabaseKey);

  let { data: categories, error: categoryErr } = await supabase
    .from('categories')
    .select('id,slug,name')
    .order('sort_order');
  if (categoryErr) throw categoryErr;

  const csvFiles = fs
    .readdirSync(root)
    .filter((f) => /^marxfoods-com-.*\.csv$/i.test(f))
    .sort();

  const requiredCategorySlugs = new Set();
  for (const file of csvFiles) {
    requiredCategorySlugs.add(inferCategorySlug(file, ''));
  }

  const existingSlugs = new Set(categories.map((c) => c.slug.toLowerCase()));
  const missingCategories = [...requiredCategorySlugs]
    .filter((slug) => !existingSlugs.has(slug))
    .map((slug, index) => ({
      name: toTitleCase(slug),
      slug,
      sort_order: 100 + index,
    }));

  if (missingCategories.length) {
    const { error: insertCategoryErr } = await supabase.from('categories').upsert(missingCategories, {
      onConflict: 'slug',
    });
    if (insertCategoryErr) throw insertCategoryErr;

    const refreshed = await supabase
      .from('categories')
      .select('id,slug,name')
      .order('sort_order');
    if (refreshed.error) throw refreshed.error;
    categories = refreshed.data ?? [];
  }

  const categoryBySlug = new Map(categories.map((c) => [c.slug.toLowerCase(), c.id]));
  const categoryByName = new Map(categories.map((c) => [c.name.toLowerCase(), c.id]));

  const allProducts = [];

  for (const file of csvFiles) {
    const fileText = fs.readFileSync(path.join(root, file), 'utf8');
    const records = parseCsv(fileText);

    for (const record of records) {
      const name = extractName(record);
      const price = extractPrice(record);
      const image = record.image || record.image2 || null;
      if (!name || !price || !image) continue;

      const sourceUrl = record.web_scraper_start_url ?? '';
      const categorySlug = inferCategorySlug(file, sourceUrl);
      let categoryId = categoryBySlug.get(categorySlug);
      if (!categoryId) {
        categoryId =
          categoryByName.get(categorySlug) ||
          categoryByName.get(categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)) ||
          null;
      }
      if (!categoryId) continue;

      const slug = slugify(name);
      const weightText = [record.data2, record.data3, record.data4, record.data5]
        .filter(Boolean)
        .find((v) => v.includes('lbs') || v.includes('birds') || v.includes('pieces') || v.includes('links'));

      const isBestSeller = Boolean((record.image2 ?? '').toLowerCase().includes('best%20seller'));
      const isTopPick = !isBestSeller && allProducts.length % 4 === 0;

      allProducts.push({
        name,
        slug,
        price,
        compare_price: null,
        short_description: `${name} (${weightText ?? 'premium selection'})`,
        description: `${name} sourced from premium farms and prepared for wholesale quality standards.`,
        category_id: categoryId,
        stock_qty: 20,
        weight_options: weightText ? [weightText] : [],
        images: [image],
        tags: [categorySlug, 'premium'],
        origin_farm: 'Marx Foods',
        origin_country: null,
        grain_fed_days: null,
        marbling_score: null,
        certifications: [],
        cooking_methods: [],
        badge: isBestSeller ? 'Best Seller' : isTopPick ? 'Top Pick' : null,
        is_featured: isTopPick,
        is_bestseller: isBestSeller,
        is_active: true,
      });
    }
  }

  const uniqueBySlug = new Map(allProducts.map((p) => [p.slug, p]));
  const deduped = [...uniqueBySlug.values()];

  if (!deduped.length) {
    console.log(
      'Available categories:',
      categories.map((c) => `${c.slug} (${c.name})`).join(', ')
    );
    console.log('No valid products found in CSV files.');
    return;
  }

  const { error: upsertErr } = await supabase
    .from('products')
    .upsert(deduped, { onConflict: 'slug' });

  if (upsertErr) throw upsertErr;
  console.log(`Imported ${deduped.length} products.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
