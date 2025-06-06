// src/lib/placeholder-data.ts
// This file contains placeholder data for the application, primarily for deals and filter categories.
// ❗ TODO: In a production application, this data would be fetched from a backend API or database.
// This data is used for UI development and testing before backend integration.

// --- Type Imports ---
// 🔍 `Deal`, `DealCategory`, and `FilterCategory` types define the structure of the data.
import type { Deal, DealCategory, FilterCategory } from './types';

// --- Filter Categories ---
/**
 * @const filterCategories
 * @description An array of available categories for filtering deals.
 * Includes 'All' and specific deal categories.
 * // TODO: These categories might be dynamically fetched or configurable in a real application.
 */
export const filterCategories: FilterCategory[] = ['All', 'Firearms', 'Accessories', 'Ammunition', 'Optics', 'Gear'];

// --- Placeholder Deals Data ---
/**
 * @const placeholderDeals
 * @description An array of `Deal` objects used as placeholder data for the deal listings.
 * Each object represents a deal with various properties like name, description, price, image, etc.
 * // 🔍 This data structure should align with the actual data structure from the backend API.
 * // 🔧 AI agents might populate or augment this data for testing or content generation.
 */
export const placeholderDeals: Deal[] = [
  {
    id: '1',
    productName: 'Glock 19 Gen 5 Pistol',
    productDescription: 'The Glock 19 Gen 5 9mm pistol is ideal for a more versatile role due to its reduced dimensions. The new frame design without finger grooves still allows to instantly customize its grip to accommodate any hand size by mounting the different back straps. The reversible magazine catch and ambidextrous slide stop lever make it ideal for left and right-handed shooters.',
    category: 'Firearms',
    // TODO: Replace placeholder.co URLs with actual image storage or CDN URLs.
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'pistol handgun', // 🔍 Hint for AI image generation or search.
    retailer: 'Ammo Bros',
    retailerUrl: 'https://www.ammobros.com/shop/glock/glock-19-gen-5-9mm-pistol-4-02-barrel-15-rounds-122560', // ❗ Ensure this is a live, relevant URL if possible for testing.
    originalPrice: 599.99,
    dealPrice: 539.99,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Simulates "1 day ago".
    tags: ['glock', 'pistol', '9mm', 'gen5', 'handgun'],
    popularityScore: 95, // TODO: Popularity score would come from backend analytics.
    discountPercentage: Math.round(((599.99 - 539.99) / 599.99) * 100), // Calculated discount.
  },
  {
    id: '2',
    productName: 'Magpul PMAG 30 AR/M4 GEN M3 Magazine',
    productDescription: 'The PMAG 30 AR/M4 GEN M3 is a 30-round polymer magazine for AR15/M4 compatible weapons chambered in 5.56x45 NATO/.223 Remington. It features an impact resistant polymer construction, easy to disassemble design with a flared floorplate for positive magazine extraction, resilient stainless steel spring for corrosion resistance, and an anti-tilt, self-lubricating follower for increased reliability.',
    category: 'Accessories',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'rifle magazine',
    retailer: 'Primary Arms',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 14.95,
    dealPrice: 10.75,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // "2 days ago"
    tags: ['magpul', 'pmag', 'ar15', 'magazine', '556'],
    popularityScore: 88,
    discountPercentage: Math.round(((14.95 - 10.75) / 14.95) * 100),
  },
  {
    id: '3',
    productName: 'Federal American Eagle 5.56mm 55gr FMJBT Ammunition - 1000 Rounds',
    productDescription: 'Practice and train with reliable Federal American Eagle 5.56x45mm NATO ammunition. This 55 grain full metal jacket boat tail (FMJBT) ammo is perfect for target shooting, training, and plinking. Loaded to NATO specs.',
    category: 'Ammunition',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'ammo bullets',
    retailer: 'Palmetto State Armory',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 499.99,
    dealPrice: 429.99,
    postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // "8 hours ago"
    tags: ['federal', 'ammunition', '556', 'fmj', 'bulk'],
    popularityScore: 92,
    discountPercentage: Math.round(((499.99 - 429.99) / 499.99) * 100),
  },
  {
    id: '4',
    productName: 'Vortex Optics Strike Eagle 1-6x24 Riflescope',
    productDescription: 'The Strike Eagle 1-6x24 is defined by speed and versatility. A true 1x on the low end adapts to a wide range of scenarios, letting shooters rapidly engage targets from point-blank to extended ranges. The illuminated, glass-etched BDC3 reticle aids in rapid visual target acquisition.',
    category: 'Optics',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'rifle scope',
    retailer: 'OpticsPlanet',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 399.99,
    dealPrice: 299.99,
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // "5 days ago"
    tags: ['vortex', 'scope', 'lpvo', 'optics', 'ar15'],
    popularityScore: 85,
    discountPercentage: Math.round(((399.99 - 299.99) / 399.99) * 100),
  },
   {
    id: '5',
    productName: 'Streamlight TLR-1 HL Weapon Light',
    productDescription: 'The Streamlight TLR-1 HL provides an 1000 lumen blast of light for maximum illumination while clearing a room or searching an alley. Its wide beam pattern lights up large areas so you can identify who or what is nearby.',
    category: 'Accessories',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'weapon light',
    retailer: 'Brownells',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 175.00,
    dealPrice: 139.99,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // "3 days ago"
    tags: ['streamlight', 'weapon light', 'tlr1', 'tactical'],
    popularityScore: 90,
    discountPercentage: Math.round(((175.00 - 139.99) / 175.00) * 100),
  },
  {
    id: '6',
    productName: 'Howard Leight Impact Sport Earmuff',
    productDescription: 'Howard Leight Impact Sport Earmuffs provide protection from hazardous noise while allowing you to hear conversations and range commands. Amplifies low-level sounds up to 4x. NRR 22dB.',
    category: 'Gear',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'hearing protection',
    retailer: 'Amazon',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 59.99,
    dealPrice: 45.00,
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // "10 days ago"
    tags: ['hearing protection', 'earmuffs', 'range gear'],
    popularityScore: 78,
    discountPercentage: Math.round(((59.99 - 45.00) / 59.99) * 100),
  },
  {
    id: '7',
    productName: 'CZ Scorpion EVO 3 S1 Pistol',
    productDescription: 'A highly customizable and reliable pistol caliber carbine, perfect for home defense or range fun. Features a 7.7" barrel and M-LOK handguard.',
    category: 'Firearms',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'pistol carbine',
    retailer: 'Guns.com',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 1099.00,
    dealPrice: 949.00,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // "4 days ago"
    tags: ['cz', 'scorpion', 'pistol', '9mm', 'pcc'],
    popularityScore: 89,
    discountPercentage: Math.round(((1099.00 - 949.00) / 1099.00) * 100),
  },
  {
    id: '8',
    productName: 'Trijicon RMR Type 2 Adjustable LED Red Dot Sight',
    productDescription: 'The Trijicon RMR Type 2 is designed to be as durable as the legendary ACOG. Housed in rugged forged aluminum, the RMR Type 2 is extremely tough yet lightweight. Easy-to-use buttons on the sides of the optic allow the user to adjust the illumination brightness, toggle between manual and automatic modes, and power down the RMR for storage.',
    category: 'Optics',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'red dot sight',
    retailer: 'EuroOptic',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 549.00,
    dealPrice: 479.00,
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // "6 days ago"
    tags: ['trijicon', 'rmr', 'red dot', 'optic', 'pistol sight'],
    popularityScore: 93,
    discountPercentage: Math.round(((549.00 - 479.00) / 549.00) * 100),
  },
  {
    id: '9',
    productName: 'Federal Premium HST 9mm 124gr JHP Ammo - 50 Rounds',
    productDescription: 'Federal Premium Personal Defense HST ammunition is a top choice for self-defense. Its specially designed hollow point won’t plug while passing through a variety of barriers, and the bullet jacket and core hold together to provide nearly 100% weight retention through even the toughest materials.',
    category: 'Ammunition',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'defense ammo',
    retailer: 'SGAmmo',
    retailerUrl: '#', // ❗ Placeholder URL.
    originalPrice: 34.99,
    dealPrice: 28.99,
    postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // "12 hours ago"
    tags: ['federal', 'hst', '9mm', 'jhp', 'self defense'],
    popularityScore: 87,
    discountPercentage: Math.round(((34.99 - 28.99) / 34.99) * 100),
  },
  {
    id: '10',
    productName: 'Aero Precision AR15 Complete Lower Receiver',
    productDescription: 'The Aero Precision AR15 Complete Lower Receiver is the perfect base for your custom AR15 build. This lower is complete and ready for your upper receiver. Features a standard M4 carbine stock and A2 pistol grip.',
    category: 'Firearms',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'ar15 lower receiver',
    retailer: 'Aero Precision',
    retailerUrl: '#',
    originalPrice: 249.99,
    dealPrice: 199.99,
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // "7 days ago"
    tags: ['ar15', 'lower receiver', 'aero precision', 'build'],
    popularityScore: 82,
    discountPercentage: Math.round(((249.99 - 199.99) / 249.99) * 100),
  },
  {
    id: '11',
    productName: 'SureFire X300 Ultra Weapon Light',
    productDescription: 'The SureFire X300 Ultra delivers a stunning 1,000 lumens of LED-generated output focused by a Total Internal Reflection (TIR) lens to produce a tight beam with extended reach and significant surround light for peripheral vision.',
    category: 'Accessories',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'tactical flashlight',
    retailer: 'Rainier Arms',
    retailerUrl: '#',
    originalPrice: 329.00,
    dealPrice: 279.00,
    postedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // "1 hour ago"
    tags: ['surefire', 'x300', 'weapon light', 'tactical', 'pistol light'],
    popularityScore: 96,
    discountPercentage: Math.round(((329.00 - 279.00) / 329.00) * 100),
  },
  {
    id: '12',
    productName: 'Pelican 1750 Protector Long Case',
    productDescription: 'The Pelican 1750 Protector Case is designed to protect long guns. It is watertight, crushproof, and dustproof. Features strong polyurethane wheels with stainless steel bearings and an automatic pressure equalization valve.',
    category: 'Gear',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'gun case',
    retailer: 'B&H Photo',
    retailerUrl: '#',
    originalPrice: 299.95,
    dealPrice: 259.95,
    postedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // "14 days ago"
    tags: ['pelican case', 'gun storage', 'rifle case', 'protective gear'],
    popularityScore: 75,
    discountPercentage: Math.round(((299.95 - 259.95) / 299.95) * 100),
  }
];
