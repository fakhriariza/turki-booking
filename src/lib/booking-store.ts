import { Booking } from '@/types';

const STORAGE_KEY = 'turki_bookings';

/**
 * Get all bookings from localStorage
 */
export function getAllBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Get bookings filtered by branch and date
 */
export function getBookingsByBranchAndDate(branchId: string, date: string): Booking[] {
  return getAllBookings().filter(
    (b) => b.branchId === branchId && b.date === date && b.status !== 'cancelled'
  );
}

/**
 * Save a new booking to localStorage
 */
export function saveBooking(booking: Omit<Booking, 'id'>): Booking {
  const bookings = getAllBookings();
  const newBooking: Booking = {
    ...booking,
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}
