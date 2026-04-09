export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  category: string;
  categorySlug: string;
  stockQty: number;
  weightKg: number;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  originFarm: string;
  grainFedDays: number;
  rating: number;
  reviewCount: number;
  soldThisWeek: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Premium Steaks', slug: 'premium-steaks', description: 'Hand-selected, grain-fed beef cuts aged to perfection', productCount: 12 },
  { id: '2', name: 'Wagyu Collection', slug: 'wagyu', description: 'A5 and American Wagyu — the pinnacle of marbling', productCount: 8 },
  { id: '3', name: 'Lamb & Veal', slug: 'lamb-veal', description: 'Tender, sustainably raised lamb and veal', productCount: 9 },
  { id: '4', name: 'Poultry', slug: 'poultry', description: 'Free-range, antibiotic-free chicken and duck', productCount: 7 },
  { id: '5', name: 'Specialty Cuts', slug: 'specialty', description: 'Rare cuts for the adventurous palate', productCount: 6 },
  { id: '6', name: 'Charcuterie', slug: 'charcuterie', description: 'Artisan cured meats and pâtés', productCount: 10 },
];

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Prime Ribeye Steak', slug: 'prime-ribeye-steak',
    description: 'Our signature 45-day grain-fed ribeye, dry-aged for 28 days. Rich marbling delivers unparalleled flavor and tenderness. Sourced from heritage Angus cattle raised on our partner farms in the heartland.',
    shortDescription: '45-day grain-fed, 28-day dry-aged ribeye',
    price: 64.99, comparePrice: 79.99, category: 'Premium Steaks', categorySlug: 'premium-steaks',
    stockQty: 18, weightKg: 0.45, images: [], tags: ['bestseller', 'grain-fed'],
    isFeatured: true, isBestseller: true, isNew: false, originFarm: 'Heritage Angus Ranch',
    grainFedDays: 45, rating: 4.9, reviewCount: 247, soldThisWeek: 89,
  },
  {
    id: '2', name: 'A5 Wagyu Striploin', slug: 'a5-wagyu-striploin',
    description: 'Authentic Japanese A5 Wagyu from Miyazaki Prefecture. BMS 10+ marbling score. Each cut is individually certified and traceable to the source farm.',
    shortDescription: 'Authentic Japanese A5, BMS 10+ marbling',
    price: 189.99, category: 'Wagyu Collection', categorySlug: 'wagyu',
    stockQty: 4, weightKg: 0.3, images: [], tags: ['premium', 'wagyu', 'limited'],
    isFeatured: true, isBestseller: false, isNew: true, originFarm: 'Miyazaki Prefecture Farm',
    grainFedDays: 600, rating: 5.0, reviewCount: 63, soldThisWeek: 12,
  },
  {
    id: '3', name: 'Tomahawk Steak', slug: 'tomahawk-steak',
    description: 'A showstopper 36oz bone-in ribeye with the full frenched rib bone. Perfect for grilling and guaranteed to impress at any gathering.',
    shortDescription: '36oz bone-in ribeye, frenched rib',
    price: 89.99, comparePrice: 109.99, category: 'Premium Steaks', categorySlug: 'premium-steaks',
    stockQty: 7, weightKg: 1.0, images: [], tags: ['showstopper', 'grain-fed'],
    isFeatured: true, isBestseller: true, isNew: false, originFarm: 'Blackwood Cattle Co.',
    grainFedDays: 60, rating: 4.8, reviewCount: 182, soldThisWeek: 45,
  },
  {
    id: '4', name: 'Rack of Lamb', slug: 'rack-of-lamb',
    description: 'Frenched 8-bone rack from grass-finished, grain-supplemented lamb. Delicate flavor with a tender, juicy texture.',
    shortDescription: 'Frenched 8-bone, grass-finished',
    price: 54.99, category: 'Lamb & Veal', categorySlug: 'lamb-veal',
    stockQty: 15, weightKg: 0.7, images: [], tags: ['grain-fed'],
    isFeatured: false, isBestseller: false, isNew: false, originFarm: 'Green Valley Farm',
    grainFedDays: 30, rating: 4.7, reviewCount: 94, soldThisWeek: 28,
  },
  {
    id: '5', name: 'American Wagyu Brisket', slug: 'american-wagyu-brisket',
    description: 'Full-packer American Wagyu brisket, perfect for low-and-slow smoking. Exceptional marbling ensures a moist, flavorful result every time.',
    shortDescription: 'Full-packer, perfect for smoking',
    price: 119.99, comparePrice: 139.99, category: 'Wagyu Collection', categorySlug: 'wagyu',
    stockQty: 9, weightKg: 5.5, images: [], tags: ['wagyu', 'bbq'],
    isFeatured: true, isBestseller: true, isNew: false, originFarm: 'Snake River Farms',
    grainFedDays: 400, rating: 4.9, reviewCount: 156, soldThisWeek: 34,
  },
  {
    id: '6', name: 'Duck Breast Duo', slug: 'duck-breast-duo',
    description: 'Two Moulard duck breasts, scored and ready to sear. Rich, gamey flavor with a crispy skin that renders beautifully.',
    shortDescription: 'Moulard duck, scored & ready to sear',
    price: 34.99, category: 'Poultry', categorySlug: 'poultry',
    stockQty: 22, weightKg: 0.5, images: [], tags: ['poultry'],
    isFeatured: false, isBestseller: false, isNew: true, originFarm: 'Hudson Valley Farms',
    grainFedDays: 0, rating: 4.6, reviewCount: 41, soldThisWeek: 15,
  },
  {
    id: '7', name: 'Filet Mignon Trio', slug: 'filet-mignon-trio',
    description: 'Three 8oz center-cut filets from grain-fed tenderloin. The most tender cut, with a buttery texture and mild, refined flavor.',
    shortDescription: 'Three 8oz center-cut filets',
    price: 99.99, comparePrice: 119.99, category: 'Premium Steaks', categorySlug: 'premium-steaks',
    stockQty: 11, weightKg: 0.68, images: [], tags: ['grain-fed', 'premium'],
    isFeatured: true, isBestseller: true, isNew: false, originFarm: 'Heritage Angus Ranch',
    grainFedDays: 45, rating: 4.8, reviewCount: 198, soldThisWeek: 67,
  },
  {
    id: '8', name: 'Artisan Bresaola', slug: 'artisan-bresaola',
    description: 'Air-dried, cured beef eye of round aged for 90 days. Sliced paper-thin for antipasto, salads, or simply with olive oil and arugula.',
    shortDescription: '90-day cured, sliced paper-thin',
    price: 28.99, category: 'Charcuterie', categorySlug: 'charcuterie',
    stockQty: 30, weightKg: 0.2, images: [], tags: ['cured', 'artisan'],
    isFeatured: false, isBestseller: false, isNew: true, originFarm: 'Salumeria Rosi',
    grainFedDays: 0, rating: 4.5, reviewCount: 37, soldThisWeek: 19,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Chef Marcus Bennett', role: 'Executive Chef, The Gilded Fork', quote: 'PrimeBurchry is the only supplier I trust for my restaurant. The consistency and quality of their grain-fed cuts is unmatched.', rating: 5 },
  { id: '2', name: 'Sarah Chen', role: 'Home Cook & Food Blogger', quote: 'The A5 Wagyu literally melted on my tongue. My dinner guests thought I hired a private chef. Ordering again this weekend!', rating: 5 },
  { id: '3', name: 'Chef Roberto Vidal', role: 'Head Chef, Ember & Oak', quote: 'From farm transparency to cold-chain delivery — PrimeBurchry gets every detail right. Their ribeye is now our signature dish.', rating: 5 },
];

export const REVIEWS: Review[] = [
  { id: '1', productId: '1', userName: 'Michael T.', rating: 5, title: 'Best steak I\'ve ever had at home', body: 'The marbling on this ribeye was incredible. Cooked it reverse-sear and it was restaurant quality. The grain-fed flavor is noticeably richer.', isVerifiedPurchase: true, helpfulCount: 47, createdAt: '2024-03-15' },
  { id: '2', productId: '1', userName: 'Amanda R.', rating: 5, title: 'Worth every penny', body: 'Ordered for our anniversary dinner. My husband said it was the best steak he\'s ever had. Perfect marbling, arrived fresh and cold.', isVerifiedPurchase: true, helpfulCount: 32, createdAt: '2024-03-10' },
  { id: '3', productId: '1', userName: 'David K.', rating: 4, title: 'Excellent quality, fast shipping', body: 'Great steak, perfectly aged. Only 4 stars because I wish there were more weight options. Will definitely order again.', isVerifiedPurchase: true, helpfulCount: 18, createdAt: '2024-03-05' },
];

export const TRUST_BADGES = [
  { icon: '🌾', label: '100% Grain-Fed Certified' },
  { icon: '🔒', label: 'SSL Secured Checkout' },
  { icon: '✅', label: 'Verified Suppliers' },
  { icon: '🚚', label: 'Cold-Chain Delivery' },
  { icon: '💯', label: 'Satisfaction Guarantee' },
  { icon: '🏆', label: 'Chef-Approved Quality' },
];
