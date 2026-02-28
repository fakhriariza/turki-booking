import { Booking, TimeSlot } from '@/types';
import { addMinutes, format, parse, isAfter, isBefore, isEqual } from 'date-fns';

const OPERATING_START = '09:00';
const OPERATING_END = '22:00';
const SLOT_INTERVAL_MINUTES = 30;

/**
 * Generate all possible time slots for a day
 */
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  let current = parse(OPERATING_START, 'HH:mm', new Date());
  const end = parse(OPERATING_END, 'HH:mm', new Date());

  while (isBefore(current, end) || isEqual(current, end)) {
    slots.push(format(current, 'HH:mm'));
    current = addMinutes(current, SLOT_INTERVAL_MINUTES);
  }

  return slots;
}

/**
 * Calculate end time based on start time and duration
 */
export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const start = parse(startTime, 'HH:mm', new Date());
  const end = addMinutes(start, durationMinutes);
  return format(end, 'HH:mm');
}

/**
 * Check if two time ranges overlap
 */
function isOverlapping(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const s1 = parse(start1, 'HH:mm', new Date());
  const e1 = parse(end1, 'HH:mm', new Date());
  const s2 = parse(start2, 'HH:mm', new Date());
  const e2 = parse(end2, 'HH:mm', new Date());

  return isBefore(s1, e2) && isAfter(e1, s2);
}

/**
 * Get available time slots considering existing bookings
 * This is the core "blocking" logic:
 * - For each potential time slot, we calculate what the end time would be
 *   if the user booked starting at that slot.
 * - Then we check if that [start, end] range overlaps with any existing booking.
 * - If it overlaps, the slot is marked as unavailable.
 */
export function getAvailableTimeSlots(
  existingBookings: Booking[],
  serviceDurationMinutes: number
): TimeSlot[] {
  const allSlots = generateTimeSlots();
  const operatingEnd = parse(OPERATING_END, 'HH:mm', new Date());

  return allSlots.map((slotTime) => {
    const slotStart = parse(slotTime, 'HH:mm', new Date());
    const slotEnd = addMinutes(slotStart, serviceDurationMinutes);
    const slotEndStr = format(slotEnd, 'HH:mm');

    // Check if service would extend beyond operating hours
    if (isAfter(slotEnd, operatingEnd)) {
      return { time: slotTime, available: false };
    }

    // Check if this slot overlaps with any existing booking
    const hasConflict = existingBookings.some((booking) =>
      isOverlapping(slotTime, slotEndStr, booking.startTime, booking.endTime)
    );

    return { time: slotTime, available: !hasConflict };
  });
}

/**
 * Generate WhatsApp message for booking confirmation
 */
export function generateWhatsAppMessage(booking: {
  customerName: string;
  branchName: string;
  serviceName: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  totalPrice: number;
}): string {
  const formattedPrice = new Intl.NumberFormat('id-ID').format(booking.totalPrice);

  return encodeURIComponent(
    `Halo, saya ingin konfirmasi booking:\n\n` +
      `🏠 *Cabang:* ${booking.branchName}\n` +
      `👤 *Nama:* ${booking.customerName}\n` +
      `💆 *Layanan:* ${booking.serviceName}\n` +
      `📅 *Tanggal:* ${booking.date}\n` +
      `⏰ *Jam:* ${booking.startTime} (${booking.durationMinutes} menit)\n` +
      `💰 *Total:* Rp ${formattedPrice}\n\n` +
      `Mohon konfirmasinya. Terima kasih! 🙏`
  );
}

/**
 * Generate WhatsApp URL
 */
export function generateWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${message}`;
}
