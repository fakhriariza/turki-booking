export interface Branch {
  id: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  whatsapp: string;
  whatsappFormatted: string;
  mapUrl?: string;
}

export interface Service {
  id: string;
  branchId: string;
  category: ServiceCategory;
  name: string;
  durationMinutes: number;
  originalPrice: number;
  discountPrice: number;
}

export type ServiceCategory =
  | 'refleksi'
  | 'full-body-massage'
  | 'totok-wajah'
  | 'special-treatment'
  | 'best-seller'
  | 'lulur';

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  'refleksi': 'Refleksi',
  'full-body-massage': 'Full Body Massage',
  'totok-wajah': 'Totok Wajah',
  'special-treatment': 'Special Treatment',
  'best-seller': 'Best Seller Treatment',
  'lulur': 'Lulur',
};

export interface Booking {
  id?: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  branchId: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  durationMinutes: number;
  totalPrice: number;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface TimeSlot {
  time: string; // HH:mm
  available: boolean;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5;
