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
  weightOptions?: string[];
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  badge?: string;
  originFarm: string;
  originCountry?: string;
  grainFedDays: number;
  certifications?: string[];
  cookingMethods?: string[];
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
  emoji: string;
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

export interface FarmStory {
  id: string;
  farmName: string;
  country: string;
  flag: string;
  description: string;
  specialty: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Premium Steaks', slug: 'premium-steaks', description: 'Hand-selected grain-fed beef, aged to perfection', productCount: 12, emoji: '🥩' },
  { id: '2', name: 'Wagyu Collection', slug: 'wagyu-collection', description: 'A5 and American Wagyu — the pinnacle of marbling', productCount: 8, emoji: '🌟' },
  { id: '3', name: 'Lamb & Veal', slug: 'lamb-veal', description: 'Tender, sustainably raised lamb and milk-fed veal', productCount: 9, emoji: '🐑' },
  { id: '4', name: 'Specialty & Game', slug: 'specialty-game', description: 'Rare cuts for the adventurous palate', productCount: 8, emoji: '🦌' },
  { id: '5', name: 'Poultry', slug: 'poultry', description: 'Free-range, antibiotic-free birds', productCount: 7, emoji: '🍗' },
  { id: '6', name: 'BBQ & Slow Cook', slug: 'bbq-slow-cook', description: 'Cuts built for low heat and big flavour', productCount: 6, emoji: '🔥' },
  { id: '7', name: 'Charcuterie', slug: 'charcuterie', description: 'Artisan cured meats, pâtés and confits', productCount: 6, emoji: '🥓' },
  { id: '8', name: 'Gift Sets', slug: 'gift-sets', description: 'Curated boxes for every occasion', productCount: 4, emoji: '🎁' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Prime Ribeye Steak', slug: 'prime-ribeye-steak',
    description: 'Heavily marbled, grain-fed Angus ribeye — the king of steaks. Dry-aged 28 days for maximum tenderness and deep, beefy flavour.',
    shortDescription: 'Heavily marbled, grain-fed Angus ribeye — the king of steaks.',
    price: 64.99, comparePrice: 79.99, category: 'Premium Steaks', categorySlug: 'premium-steaks',
    stockQty: 48, weightKg: 0.35, weightOptions: ['250g', '350g', '500g'],
    images: [], tags: ['beef', 'steak', 'ribeye', 'grain-fed'],
    isFeatured: true, isBestseller: true, isNew: false, badge: 'Bestseller',
    originFarm: 'Silver Fern Farms', originCountry: 'New Zealand', grainFedDays: 100,
    certifications: ['USDA Choice', 'Hormone-Free', 'Cold-Chain Certified'],
    cookingMethods: ['Grill', 'Pan-sear', 'Broil'],
    rating: 4.9, reviewCount: 247, soldThisWeek: 89,
  },
  {
    id: '2', name: 'A5 Japanese Wagyu Ribeye', slug: 'a5-wagyu-ribeye',
    description: 'The rarest beef on earth. BMS 10–12. Melts at body temperature. Sourced directly from Kagoshima Prefecture, Japan.',
    shortDescription: 'The rarest beef on earth. BMS 10–12. Melts at body temperature.',
    price: 189.99, comparePrice: 219.99, category: 'Wagyu Collection', categorySlug: 'wagyu-collection',
    stockQty: 10, weightKg: 0.2, weightOptions: ['150g', '200g'],
    images: [], tags: ['wagyu', 'a5', 'japanese', 'premium'],
    isFeatured: true, isBestseller: false, isNew: true, badge: 'Ultra Premium',
    originFarm: 'Kagoshima Prefecture Farms', originCountry: 'Japan', grainFedDays: 900,
    certifications: ['A5 Certified', 'BMS 10-12', 'Import Verified'],
    cookingMethods: ['Pan-sear', 'Teppanyaki'],
    rating: 5.0, reviewCount: 94, soldThisWeek: 18,
  },
  {
    id: '3', name: 'Tomahawk Steak', slug: 'tomahawk-steak',
    description: 'Long-bone showstopper. Grain-fed Irish Angus, incredible marbling. The centrepiece of any celebration.',
    shortDescription: 'Long-bone showstopper. Grain-fed Irish Angus, incredible marbling.',
    price: 89.99, comparePrice: 109.99, category: 'Premium Steaks', categorySlug: 'premium-steaks',
    stockQty: 22, weightKg: 1.0, weightOptions: ['900g', '1.2kg'],
    images: [], tags: ['beef', 'steak', 'tomahawk', 'celebration'],
    isFeatured: true, isBestseller: true, isNew: false, badge: 'Showstopper',
    originFarm: 'Irish Nature Beef', originCountry: 'Ireland', grainFedDays: 120,
    certifications: ['Hormone-Free', 'Grass & Grain Finished'],
    cookingMethods: ['Grill', 'Reverse Sear'],
    rating: 4.8, reviewCount: 182, soldThisWeek: 45,
  },
  {
    id: '4', name: 'Frenched Lamb Rack', slug: 'frenched-lamb-rack',
    description: '8-bone rack, cleaned and Frenched. The finest dinner party centrepiece. Pasture-raised in New Zealand.',
    shortDescription: '8-bone rack, cleaned and Frenched. The finest dinner party centrepiece.',
    price: 79.99, comparePrice: 95.99, category: 'Lamb & Veal', categorySlug: 'lamb-veal',
    stockQty: 25, weightKg: 0.7, weightOptions: ['600g (8-bone)', '800g (8-bone)'],
    images: [], tags: ['lamb', 'rack', 'roast', 'celebration'],
    isFeatured: true, isBestseller: true, isNew: false, badge: "Chef's Favourite",
    originFarm: 'Silver Fern Farms', originCountry: 'New Zealand', grainFedDays: 0,
    certifications: ['Pasture-Raised', 'Hormone-Free'],
    cookingMethods: ['Roast', 'Grill', 'Pan-sear'],
    rating: 4.8, reviewCount: 94, soldThisWeek: 31,
  },
  {
    id: '5', name: 'American Wagyu Brisket', slug: 'american-wagyu-brisket',
    description: 'Snake River Farms BMS 8–9. The ultimate BBQ brisket. Extraordinary marbling ensures a moist, flavorful result.',
    shortDescription: 'Snake River Farms BMS 8–9. The ultimate BBQ brisket.',
    price: 119.99, comparePrice: 139.99, category: 'Wagyu Collection', categorySlug: 'wagyu-collection',
    stockQty: 15, weightKg: 2.0, weightOptions: ['1.5kg', '2kg', '2.5kg'],
    images: [], tags: ['wagyu', 'american', 'brisket', 'bbq'],
    isFeatured: true, isBestseller: true, isNew: false, badge: 'Bestseller',
    originFarm: 'Snake River Farms', originCountry: 'USA', grainFedDays: 400,
    certifications: ['BMS 8-9', 'Hormone-Free'],
    cookingMethods: ['Smoke', 'Braise', 'Slow Cook'],
    rating: 4.9, reviewCount: 156, soldThisWeek: 34,
  },
  {
    id: '6', name: 'Duck Breast Magret', slug: 'duck-breast-magret',
    description: 'Moulard duck magret. Restaurant-grade, fat cap scored. Rich, gamey flavour with a crispy skin.',
    shortDescription: 'Moulard duck magret. Restaurant-grade, fat cap scored.',
    price: 34.99, category: 'Poultry', categorySlug: 'poultry',
    stockQty: 35, weightKg: 0.5, weightOptions: ['2-pack (500g)', '4-pack (1kg)'],
    images: [], tags: ['poultry', 'duck', 'breast', 'magret'],
    isFeatured: false, isBestseller: false, isNew: true, badge: 'Restaurant Quality',
    originFarm: 'Moulard Duck Program', originCountry: 'USA', grainFedDays: 0,
    certifications: ['Free-Range', 'No Hormones'],
    cookingMethods: ['Pan-sear', 'Grill', 'Confit'],
    rating: 4.6, reviewCount: 41, soldThisWeek: 29,
  },
  {
    id: '7', name: 'Filet Mignon Trio', slug: 'filet-mignon-trio',
    description: 'Three centre-cut USDA Prime tenderloin fillets. Silky, lean perfection. The most tender cut available.',
    shortDescription: 'Three centre-cut USDA Prime tenderloin fillets.',
    price: 99.99, comparePrice: 119.99, category: 'Premium Steaks', categorySlug: 'premium-steaks',
    stockQty: 35, weightKg: 0.54, weightOptions: ['3 x 180g', '3 x 220g'],
    images: [], tags: ['beef', 'steak', 'filet', 'tenderloin'],
    isFeatured: true, isBestseller: true, isNew: false, badge: "Chef's Pick",
    originFarm: 'USDA Prime Program', originCountry: 'USA', grainFedDays: 90,
    certifications: ['USDA Prime', 'Antibiotic-Free'],
    cookingMethods: ['Pan-sear', 'Grill', 'Oven-finish'],
    rating: 4.8, reviewCount: 198, soldThisWeek: 67,
  },
  {
    id: '8', name: 'Beef Short Ribs 3-Bone', slug: 'beef-short-ribs',
    description: 'Thick-cut short ribs with 3 full bones. The BBQ world\'s greatest cut. Deep, beefy, melt-in-your-mouth.',
    shortDescription: 'Thick-cut short ribs with 3 full bones.',
    price: 54.99, comparePrice: 64.99, category: 'BBQ & Slow Cook', categorySlug: 'bbq-slow-cook',
    stockQty: 32, weightKg: 1.2, weightOptions: ['1.2kg', '1.5kg', '2kg'],
    images: [], tags: ['beef', 'ribs', 'bbq', 'slow-cook'],
    isFeatured: true, isBestseller: true, isNew: false, badge: 'BBQ Champion',
    originFarm: 'USDA Choice Program', originCountry: 'USA', grainFedDays: 90,
    certifications: ['USDA Choice', 'Grain-Fed'],
    cookingMethods: ['Smoke', 'Braise', 'BBQ', 'Slow Cook'],
    rating: 4.9, reviewCount: 203, soldThisWeek: 73,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Chef Marcus Bennett',
    role: 'Executive Chef, The Gilded Fork',
    quote: 'PrimeButchery is the only supplier I trust for my restaurant. The consistency and quality of their grain-fed cuts is truly unmatched.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Chef Aisha Okonkwo',
    role: 'Head Chef, Ember & Oak',
    quote: 'The Wagyu ribeye changed everything for our tasting menu. My guests ask about it every single service.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Chef Roberto Vidal',
    role: 'Private Chef, Dubai',
    quote: 'From farm transparency to cold-chain delivery — they get every detail right. The tomahawk is our event signature.',
    rating: 5,
  },
];

export const FARM_STORIES: FarmStory[] = [
  {
    id: '1',
    farmName: 'Silver Fern Farms',
    country: 'New Zealand',
    flag: '🇳🇿',
    description: 'Pasture-raised Angus, finished on grain for 100 days. Carbon-certified and committed to regenerative farming.',
    specialty: 'Premium Angus Beef',
  },
  {
    id: '2',
    farmName: 'Irish Nature Beef',
    country: 'Ireland',
    flag: '🇮🇪',
    description: 'Grass & grain finished. 120-day program. Free from hormones & antibiotics. Rich, verdant pastures.',
    specialty: 'Grass-Fed Beef',
  },
  {
    id: '3',
    farmName: 'Kagoshima Prefecture',
    country: 'Japan',
    flag: '🇯🇵',
    description: 'A5 Wagyu. 900-day traditional grain feeding. BMS 10–12 certified. The pinnacle of beef luxury.',
    specialty: 'A5 Wagyu',
  },
];

export const REVIEWS: Review[] = [
  { id: '1', productId: '1', userName: 'Michael T.', rating: 5, title: 'Best steak I\'ve ever had at home', body: 'The marbling on this ribeye was incredible. Cooked it reverse-sear and it was restaurant quality.', isVerifiedPurchase: true, helpfulCount: 47, createdAt: '2026-03-15' },
  { id: '2', productId: '1', userName: 'Amanda R.', rating: 5, title: 'Worth every penny', body: 'Ordered for our anniversary dinner. My husband said it was the best steak he\'s ever had.', isVerifiedPurchase: true, helpfulCount: 32, createdAt: '2026-03-10' },
  { id: '3', productId: '1', userName: 'David K.', rating: 4, title: 'Excellent quality, fast shipping', body: 'Great steak, perfectly aged. Will definitely order again.', isVerifiedPurchase: true, helpfulCount: 18, createdAt: '2026-03-05' },
];

export const TRUST_BADGES = [
  { icon: '🌾', label: '100% Grain-Fed Certified' },
  { icon: '🔒', label: 'SSL Secured Checkout' },
  { icon: '✅', label: 'Verified Supplier Network' },
  { icon: '🚚', label: 'Cold-Chain Delivery' },
  { icon: '💯', label: '100% Satisfaction Guarantee' },
  { icon: '🏆', label: 'Chef-Approved Quality' },
];

export const SOCIAL_PROOF_NOTIFICATIONS = [
  '🛒 James from Lagos just ordered A5 Wagyu Ribeye',
  '🛒 Amina from Abuja ordered the Steak Lover\'s Box',
  '🛒 David from Douala ordered Tomahawk Steak',
  '⭐ Sarah just left a 5-star review on Filet Mignon',
  '🔥 18 people viewing A5 Wagyu Ribeye right now',
  '🎁 Michael just ordered the BBQ Master Gift Box',
  '✅ Fatima from Accra just received her order',
];

export const REVIEW_TICKER = [
  { stars: 5, name: 'James O.', product: 'Wagyu Ribeye', text: 'Best steak I have ever eaten at home.' },
  { stars: 5, name: 'Amina K.', product: 'Tomahawk Steak', text: 'Arrived perfectly chilled, cooked beautifully.' },
  { stars: 5, name: 'David M.', product: "Steak Lover's Box", text: 'Best gift I have ever given.' },
  { stars: 5, name: 'Sarah L.', product: 'Filet Mignon Trio', text: 'Silky, tender, absolutely divine.' },
  { stars: 5, name: 'Roberto V.', product: 'Beef Short Ribs', text: 'Fall-off-the-bone perfection every time.' },
];
