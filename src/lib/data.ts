import { Branch, Service } from '@/types';

// ==================== BRANCHES ====================
export const branches: Branch[] = [
  {
    id: 'pondok-kelapa',
    name: 'T.U.R.K.I Pondok Kelapa',
    shortName: 'Pd Kelapa, Jakarta Timur',
    address: 'Pondok Kelapa, Jakarta Timur',
    city: 'Jakarta Timur',
    whatsapp: '6287777345077',
    whatsappFormatted: '0877-7734-5077',
  },
  {
    id: 'depok',
    name: 'T.U.R.K.I Depok',
    shortName: 'Jl. Kartini, Depok',
    address: 'Jl. Kartini No.17 (sebelah FTL Gym), Depok, Jawa Barat',
    city: 'Depok',
    whatsapp: '6288287818888',
    whatsappFormatted: '0882-8781-8888',
  },
  {
    id: 'bekasi',
    name: 'T.U.R.K.I Harapan Indah',
    shortName: 'Harapan Indah, Bekasi',
    address: 'Jl. Ruko Taman Cemara Blok U 7 No.23, Harapan Indah, Bekasi, Jawa Barat',
    city: 'Bekasi',
    whatsapp: '6285819153323',
    whatsappFormatted: '0858-1915-3323',
  },
];

// ==================== SERVICES ====================
// Helper to generate service ID
const sid = (branch: string, cat: string, name: string) =>
  `${branch}-${cat}-${name}`.toLowerCase().replace(/[\s+]/g, '-');

// --- BEKASI PRICES ---
const bekasi = 'bekasi';
const bekServices: Service[] = [
  // REFLEKSI
  { id: sid(bekasi, 'refleksi', '60'), branchId: bekasi, category: 'refleksi', name: 'Refleksi 60 Menit', durationMinutes: 60, originalPrice: 140000, discountPrice: 98000 },
  { id: sid(bekasi, 'refleksi', '80'), branchId: bekasi, category: 'refleksi', name: 'Refleksi 80 Menit', durationMinutes: 80, originalPrice: 180000, discountPrice: 126000 },
  { id: sid(bekasi, 'refleksi', '90'), branchId: bekasi, category: 'refleksi', name: 'Refleksi 90 Menit', durationMinutes: 90, originalPrice: 190000, discountPrice: 133000 },
  // FULL BODY MASSAGE
  { id: sid(bekasi, 'fbm', '60'), branchId: bekasi, category: 'full-body-massage', name: 'Full Body Massage 60 Menit', durationMinutes: 60, originalPrice: 140000, discountPrice: 98000 },
  { id: sid(bekasi, 'fbm', '70'), branchId: bekasi, category: 'full-body-massage', name: 'Full Body Massage 70 Menit', durationMinutes: 70, originalPrice: 180000, discountPrice: 126000 },
  { id: sid(bekasi, 'fbm', '90'), branchId: bekasi, category: 'full-body-massage', name: 'Full Body Massage 90 Menit', durationMinutes: 90, originalPrice: 190000, discountPrice: 133000 },
  // TOTOK WAJAH
  { id: sid(bekasi, 'tw', '15'), branchId: bekasi, category: 'totok-wajah', name: 'Totok Wajah 15 Menit', durationMinutes: 15, originalPrice: 40000, discountPrice: 28000 },
  { id: sid(bekasi, 'tw', '20'), branchId: bekasi, category: 'totok-wajah', name: 'Totok Wajah 20 Menit', durationMinutes: 20, originalPrice: 60000, discountPrice: 42000 },
  { id: sid(bekasi, 'tw', '30'), branchId: bekasi, category: 'totok-wajah', name: 'Totok Wajah 30 Menit', durationMinutes: 30, originalPrice: 80000, discountPrice: 56000 },
  // SPECIAL TREATMENT
  { id: sid(bekasi, 'st', 'kop'), branchId: bekasi, category: 'special-treatment', name: 'Kop', durationMinutes: 30, originalPrice: 50000, discountPrice: 35000 },
  { id: sid(bekasi, 'st', 'kerik'), branchId: bekasi, category: 'special-treatment', name: 'Kerik', durationMinutes: 30, originalPrice: 60000, discountPrice: 42000 },
  { id: sid(bekasi, 'st', 'keselo'), branchId: bekasi, category: 'special-treatment', name: 'Keselo', durationMinutes: 30, originalPrice: 100000, discountPrice: 70000 },
  { id: sid(bekasi, 'st', 'ear-candle'), branchId: bekasi, category: 'special-treatment', name: 'Ear Candle', durationMinutes: 30, originalPrice: 50000, discountPrice: 35000 },
  { id: sid(bekasi, 'st', 'extra-time'), branchId: bekasi, category: 'special-treatment', name: 'Extra Time', durationMinutes: 30, originalPrice: 80000, discountPrice: 56000 },
  { id: sid(bekasi, 'st', 'totok-perut'), branchId: bekasi, category: 'special-treatment', name: 'Totok Perut', durationMinutes: 30, originalPrice: 90000, discountPrice: 63000 },
  { id: sid(bekasi, 'st', 'totok-payudara'), branchId: bekasi, category: 'special-treatment', name: 'Totok Payudara', durationMinutes: 30, originalPrice: 90000, discountPrice: 63000 },
  // BEST SELLER
  { id: sid(bekasi, 'bs', 'back-massage'), branchId: bekasi, category: 'best-seller', name: 'Back Massage', durationMinutes: 30, originalPrice: 100000, discountPrice: 70000 },
  { id: sid(bekasi, 'bs', 'bekam-sunnah'), branchId: bekasi, category: 'best-seller', name: 'Bekam Sunnah', durationMinutes: 30, originalPrice: 190000, discountPrice: 133000 },
  { id: sid(bekasi, 'bs', 'thai-massage'), branchId: bekasi, category: 'best-seller', name: 'Thai Massage', durationMinutes: 90, originalPrice: 290000, discountPrice: 203000 },
  { id: sid(bekasi, 'bs', 'turkish-massage'), branchId: bekasi, category: 'best-seller', name: 'Turkish Massage', durationMinutes: 90, originalPrice: 290000, discountPrice: 203000 },
  { id: sid(bekasi, 'bs', 'hot-stone'), branchId: bekasi, category: 'best-seller', name: 'Hot Stone Massage', durationMinutes: 90, originalPrice: 290000, discountPrice: 203000 },
  // LULUR
  { id: sid(bekasi, 'lulur', 'keraton'), branchId: bekasi, category: 'lulur', name: 'Keraton Traditional', durationMinutes: 80, originalPrice: 180000, discountPrice: 126000 },
  { id: sid(bekasi, 'lulur', 'balinese'), branchId: bekasi, category: 'lulur', name: 'Balinese Lulur Scrub', durationMinutes: 80, originalPrice: 190000, discountPrice: 133000 },
  { id: sid(bekasi, 'lulur', 'combo'), branchId: bekasi, category: 'lulur', name: 'Massage + Lulur + Masker Badan', durationMinutes: 90, originalPrice: 310000, discountPrice: 217000 },
];

// --- DEPOK PRICES ---
const depok = 'depok';
const depServices: Service[] = [
  // REFLEKSI
  { id: sid(depok, 'refleksi', '60'), branchId: depok, category: 'refleksi', name: 'Refleksi 60 Menit', durationMinutes: 60, originalPrice: 140000, discountPrice: 112000 },
  { id: sid(depok, 'refleksi', '80'), branchId: depok, category: 'refleksi', name: 'Refleksi 80 Menit', durationMinutes: 80, originalPrice: 180000, discountPrice: 144000 },
  { id: sid(depok, 'refleksi', '90'), branchId: depok, category: 'refleksi', name: 'Refleksi 90 Menit', durationMinutes: 90, originalPrice: 190000, discountPrice: 152000 },
  // FULL BODY MASSAGE
  { id: sid(depok, 'fbm', '60'), branchId: depok, category: 'full-body-massage', name: 'Full Body Massage 60 Menit', durationMinutes: 60, originalPrice: 140000, discountPrice: 112000 },
  { id: sid(depok, 'fbm', '70'), branchId: depok, category: 'full-body-massage', name: 'Full Body Massage 70 Menit', durationMinutes: 70, originalPrice: 180000, discountPrice: 144000 },
  { id: sid(depok, 'fbm', '90'), branchId: depok, category: 'full-body-massage', name: 'Full Body Massage 90 Menit', durationMinutes: 90, originalPrice: 190000, discountPrice: 152000 },
  // TOTOK WAJAH
  { id: sid(depok, 'tw', '15'), branchId: depok, category: 'totok-wajah', name: 'Totok Wajah 15 Menit', durationMinutes: 15, originalPrice: 40000, discountPrice: 32000 },
  { id: sid(depok, 'tw', '20'), branchId: depok, category: 'totok-wajah', name: 'Totok Wajah 20 Menit', durationMinutes: 20, originalPrice: 60000, discountPrice: 48000 },
  { id: sid(depok, 'tw', '30'), branchId: depok, category: 'totok-wajah', name: 'Totok Wajah 30 Menit', durationMinutes: 30, originalPrice: 80000, discountPrice: 64000 },
  // SPECIAL TREATMENT
  { id: sid(depok, 'st', 'kop'), branchId: depok, category: 'special-treatment', name: 'Kop', durationMinutes: 30, originalPrice: 50000, discountPrice: 40000 },
  { id: sid(depok, 'st', 'kerik'), branchId: depok, category: 'special-treatment', name: 'Kerik', durationMinutes: 30, originalPrice: 60000, discountPrice: 48000 },
  { id: sid(depok, 'st', 'keselo'), branchId: depok, category: 'special-treatment', name: 'Keselo', durationMinutes: 30, originalPrice: 100000, discountPrice: 80000 },
  { id: sid(depok, 'st', 'ear-candle'), branchId: depok, category: 'special-treatment', name: 'Ear Candle', durationMinutes: 30, originalPrice: 50000, discountPrice: 40000 },
  { id: sid(depok, 'st', 'extra-time'), branchId: depok, category: 'special-treatment', name: 'Extra Time', durationMinutes: 30, originalPrice: 80000, discountPrice: 64000 },
  { id: sid(depok, 'st', 'totok-perut'), branchId: depok, category: 'special-treatment', name: 'Totok Perut', durationMinutes: 30, originalPrice: 90000, discountPrice: 72000 },
  { id: sid(depok, 'st', 'totok-payudara'), branchId: depok, category: 'special-treatment', name: 'Totok Payudara', durationMinutes: 30, originalPrice: 90000, discountPrice: 72000 },
  // BEST SELLER
  { id: sid(depok, 'bs', 'back-massage'), branchId: depok, category: 'best-seller', name: 'Back Massage', durationMinutes: 30, originalPrice: 100000, discountPrice: 80000 },
  { id: sid(depok, 'bs', 'bekam-sunnah'), branchId: depok, category: 'best-seller', name: 'Bekam Sunnah', durationMinutes: 30, originalPrice: 190000, discountPrice: 152000 },
  { id: sid(depok, 'bs', 'thai-massage'), branchId: depok, category: 'best-seller', name: 'Thai Massage', durationMinutes: 90, originalPrice: 290000, discountPrice: 232000 },
  { id: sid(depok, 'bs', 'turkish-massage'), branchId: depok, category: 'best-seller', name: 'Turkish Massage', durationMinutes: 90, originalPrice: 290000, discountPrice: 232000 },
  { id: sid(depok, 'bs', 'hot-stone'), branchId: depok, category: 'best-seller', name: 'Hot Stone Massage', durationMinutes: 90, originalPrice: 290000, discountPrice: 232000 },
  // LULUR
  { id: sid(depok, 'lulur', 'keraton'), branchId: depok, category: 'lulur', name: 'Keraton Traditional', durationMinutes: 80, originalPrice: 180000, discountPrice: 144000 },
  { id: sid(depok, 'lulur', 'balinese'), branchId: depok, category: 'lulur', name: 'Balinese Lulur Scrub', durationMinutes: 80, originalPrice: 190000, discountPrice: 152000 },
  { id: sid(depok, 'lulur', 'combo'), branchId: depok, category: 'lulur', name: 'Massage + Lulur + Masker Badan', durationMinutes: 90, originalPrice: 310000, discountPrice: 248000 },
];

// --- PONDOK KELAPA (same prices as Depok) ---
const pdkelapa = 'pondok-kelapa';
const pkServices: Service[] = depServices.map((s) => ({
  ...s,
  id: s.id.replace('depok', pdkelapa),
  branchId: pdkelapa,
}));

export const allServices: Service[] = [...bekServices, ...depServices, ...pkServices];

export function getServicesByBranch(branchId: string): Service[] {
  return allServices.filter((s) => s.branchId === branchId);
}

export function getServiceById(serviceId: string): Service | undefined {
  return allServices.find((s) => s.id === serviceId);
}

export function getBranchById(branchId: string): Branch | undefined {
  return branches.find((b) => b.id === branchId);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
