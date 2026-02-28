'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Check,
  Clock,
  Phone,
  User,
  FileText,
  Calendar,
  Sparkles,
  ChevronLeft,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { format, addDays, startOfDay } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

import { branches, getServicesByBranch, getBranchById, formatPrice } from '@/lib/data';
import {
  getAvailableTimeSlots,
  calculateEndTime,
  generateWhatsAppMessage,
  generateWhatsAppUrl,
} from '@/lib/booking-logic';
import { Branch, Service, ServiceCategory, CATEGORY_LABELS, TimeSlot, Booking } from '@/types';

// ==================== ANIMATIONS ====================
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ==================== STEP INDICATORS ====================
const steps = [
  { num: 1, label: 'Cabang', icon: MapPin },
  { num: 2, label: 'Layanan', icon: Sparkles },
  { num: 3, label: 'Jadwal', icon: Calendar },
  { num: 4, label: 'Data Diri', icon: User },
  { num: 5, label: 'Konfirmasi', icon: Check },
];

function BookingWizardContent() {
  const searchParams = useSearchParams();
  const preselectedBranch = searchParams.get('branch');

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form state
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('refleksi');

  // Time slot state
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);

  // Preselect branch from URL query
  useEffect(() => {
    if (preselectedBranch) {
      const branch = getBranchById(preselectedBranch);
      if (branch) {
        setSelectedBranch(branch);
        setCurrentStep(2);
      }
    }
  }, [preselectedBranch]);

  // Calculate time slots when date/service changes
  useEffect(() => {
    if (selectedDate && selectedService && selectedBranch) {
      // dynamically import to avoid SSR issues with localStorage
      import('@/lib/booking-store').then(({ getBookingsByBranchAndDate }) => {
        const existingBookings = getBookingsByBranchAndDate(selectedBranch.id, selectedDate);
        const slots = getAvailableTimeSlots(
          existingBookings,
          selectedService.durationMinutes
        );
        setTimeSlots(slots);
      });
    }
  }, [selectedDate, selectedService, selectedBranch]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmitBooking = useCallback(async () => {
    if (!selectedBranch || !selectedService || !selectedDate || !selectedTime) return;

    const endTime = calculateEndTime(selectedTime, selectedService.durationMinutes);

    // Save to localStorage
    const bookingData = {
      customerName,
      customerPhone,
      notes: customerNotes,
      branchId: selectedBranch.id,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      startTime: selectedTime,
      endTime,
      durationMinutes: selectedService.durationMinutes,
      totalPrice: selectedService.discountPrice,
      createdAt: new Date().toISOString(),
      status: 'pending' as const,
    };

    const { saveBooking } = await import('@/lib/booking-store');
    const savedBooking = saveBooking(bookingData);
    console.log('Booking submitted and saved locally:', savedBooking);

    setIsBookingSubmitted(true);
  }, [
    selectedBranch,
    selectedService,
    selectedDate,
    selectedTime,
    customerName,
    customerPhone,
    customerNotes,
  ]);

  const handleWhatsAppRedirect = useCallback(() => {
    if (!selectedBranch || !selectedService) return;

    const message = generateWhatsAppMessage({
      customerName,
      branchName: selectedBranch.name,
      serviceName: selectedService.name,
      date: selectedDate,
      startTime: selectedTime,
      durationMinutes: selectedService.durationMinutes,
      totalPrice: selectedService.discountPrice,
    });

    const url = generateWhatsAppUrl(selectedBranch.whatsapp, message);
    window.open(url, '_blank');
  }, [selectedBranch, selectedService, customerName, selectedDate, selectedTime]);

  // ==================== GENERATE DATES ====================
  const generateDates = () => {
    const dates = [];
    const today = startOfDay(new Date());
    for (let i = 0; i < 14; i++) {
      const d = addDays(today, i);
      dates.push({
        value: format(d, 'yyyy-MM-dd'),
        dayName: format(d, 'EEE', { locale: localeId }),
        dayNum: format(d, 'd'),
        month: format(d, 'MMM', { locale: localeId }),
        isToday: i === 0,
      });
    }
    return dates;
  };

  // ==================== GROUP SERVICES BY CATEGORY ====================
  const getGroupedServices = () => {
    if (!selectedBranch) return {};
    const services = getServicesByBranch(selectedBranch.id);
    const grouped: Record<string, Service[]> = {};
    services.forEach((s) => {
      if (!grouped[s.category]) grouped[s.category] = [];
      grouped[s.category].push(s);
    });
    return grouped;
  };

  // ==================== VALIDATION ====================
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedBranch;
      case 2:
        return !!selectedService;
      case 3:
        return !!selectedDate && !!selectedTime;
      case 4:
        return customerName.trim().length >= 2 && customerPhone.trim().length >= 8;
      default:
        return true;
    }
  };

  // ==================== GROUPED SERVICES (for step 2) ====================
  const grouped = getGroupedServices();
  const categories = Object.keys(grouped) as ServiceCategory[];

  // ==================== GENERATE DATES (for step 3) ====================
  const dates = generateDates();

  // ==================== RENDER STEPS (inline to prevent focus loss) ====================
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brown-900">
                Pilih Cabang
              </h2>
              <p className="text-brown-500 mt-2">
                Pilih cabang T.U.R.K.I terdekat dari lokasi Anda
              </p>
            </div>

            <div className="grid gap-4">
              {branches.map((branch) => (
                <motion.button
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                    selectedBranch?.id === branch.id
                      ? 'border-gold-500 bg-gold-50 shadow-gold'
                      : 'border-brown-200 bg-white hover:border-gold-300 shadow-elegant'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        selectedBranch?.id === branch.id
                          ? 'bg-gradient-gold text-white'
                          : 'bg-brown-100 text-brown-500'
                      }`}
                    >
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-semibold text-brown-900">
                        {branch.city}
                      </h3>
                      <p className="text-brown-500 text-sm mt-1">{branch.address}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-brown-400">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        <span>{branch.whatsappFormatted}</span>
                      </div>
                    </div>
                    {selectedBranch?.id === branch.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-white shrink-0"
                      >
                        <Check className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brown-900">
                Pilih Layanan
              </h2>
              <p className="text-brown-500 mt-2">
                {selectedBranch?.name} — {selectedBranch?.city}
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                    activeCategory === cat
                      ? 'bg-gradient-gold text-white shadow-gold'
                      : 'bg-white text-brown-600 border border-brown-200 hover:border-gold-300'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* Service list */}
            <div className="grid gap-3">
              <AnimatePresence mode="wait">
                {grouped[activeCategory]?.map((service) => (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedService?.id === service.id
                        ? 'border-gold-500 bg-gold-50 shadow-gold'
                        : 'border-brown-100 bg-white hover:border-gold-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-brown-800">{service.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3.5 h-3.5 text-gold-500" />
                          <span className="text-xs text-brown-400">
                            {service.durationMinutes} menit
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-brown-400 line-through">
                          {formatPrice(service.originalPrice)}
                        </p>
                        <p className="text-lg font-bold text-gold-600">
                          {formatPrice(service.discountPrice)}
                        </p>
                      </div>
                      {selectedService?.id === service.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-white shrink-0"
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brown-900">
                Pilih Jadwal
              </h2>
              <p className="text-brown-500 mt-2">
                {selectedService?.name} — {selectedService?.durationMinutes} menit
              </p>
            </div>

            {/* Date picker */}
            <div>
              <label className="block text-sm font-semibold text-brown-700 mb-3">
                <Calendar className="w-4 h-4 inline mr-2 text-gold-500" />
                Pilih Tanggal
              </label>
              <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2">
                {dates.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => {
                      setSelectedDate(d.value);
                      setSelectedTime('');
                    }}
                    className={`flex flex-col items-center min-w-[72px] py-3 px-3 rounded-xl border-2 transition-all duration-300 shrink-0 ${
                      selectedDate === d.value
                        ? 'border-gold-500 bg-gradient-gold text-white shadow-gold'
                        : 'border-brown-100 bg-white text-brown-600 hover:border-gold-300'
                    }`}
                  >
                    <span className="text-xs font-medium uppercase">{d.dayName}</span>
                    <span className="text-2xl font-bold mt-1">{d.dayNum}</span>
                    <span className="text-xs mt-0.5">{d.month}</span>
                    {d.isToday && (
                      <span
                        className={`text-[10px] mt-1 px-2 py-0.5 rounded-full ${
                          selectedDate === d.value
                            ? 'bg-white/20 text-white'
                            : 'bg-gold-100 text-gold-600'
                        }`}
                      >
                        Hari ini
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <label className="block text-sm font-semibold text-brown-700 mb-3">
                  <Clock className="w-4 h-4 inline mr-2 text-gold-500" />
                  Pilih Jam
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        !slot.available
                          ? 'bg-brown-100 text-brown-300 cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'bg-gradient-gold text-white shadow-gold scale-105'
                          : 'bg-white border border-brown-200 text-brown-700 hover:border-gold-400 hover:text-gold-600'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {selectedTime && selectedService && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gold-600 mt-3 font-medium text-center"
                  >
                    ⏰ Sesi Anda: {selectedTime} —{' '}
                    {calculateEndTime(selectedTime, selectedService.durationMinutes)} (
                    {selectedService.durationMinutes} menit)
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brown-900">
                Data Diri
              </h2>
              <p className="text-brown-500 mt-2">
                Lengkapi informasi Anda untuk konfirmasi booking
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brown-700 mb-2">
                  <User className="w-4 h-4 inline mr-2 text-gold-500" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-4 py-3 rounded-xl border-2 border-brown-200 bg-white text-brown-800 placeholder-brown-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2 text-gold-500" />
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Contoh: 08123456789"
                  className="w-full px-4 py-3 rounded-xl border-2 border-brown-200 bg-white text-brown-800 placeholder-brown-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2 text-gold-500" />
                  Catatan / Keluhan{' '}
                  <span className="text-brown-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Misal: Sakit di pinggang, minta terapis wanita, dll."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-brown-200 bg-white text-brown-800 placeholder-brown-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        if (isBookingSubmitted) {
          return (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center space-y-6 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto shadow-gold"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-brown-900">
                  Booking Berhasil! 🎉
                </h2>
                <p className="text-brown-500 mt-2 max-w-sm mx-auto">
                  Silakan konfirmasi booking Anda melalui WhatsApp ke admin cabang{' '}
                  {selectedBranch?.city}
                </p>
              </div>
              <button
                onClick={handleWhatsAppRedirect}
                className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3 shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Konfirmasi via WhatsApp
              </button>
              <div>
                <Link
                  href="/"
                  className="text-brown-400 text-sm hover:text-gold-600 transition-colors"
                >
                  ← Kembali ke Beranda
                </Link>
              </div>
            </motion.div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brown-900">
                Ringkasan Booking
              </h2>
              <p className="text-brown-500 mt-2">Periksa kembali detail booking Anda</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-elegant border border-brown-100 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-brown-100">
                <span className="text-brown-500 text-sm">Cabang</span>
                <span className="font-semibold text-brown-800 text-right">
                  {selectedBranch?.city}
                  <br />
                  <span className="text-xs font-normal text-brown-400 block">
                    {selectedBranch?.address}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-brown-100">
                <span className="text-brown-500 text-sm">Layanan</span>
                <span className="font-semibold text-brown-800">{selectedService?.name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-brown-100">
                <span className="text-brown-500 text-sm">Tanggal</span>
                <span className="font-semibold text-brown-800">
                  {selectedDate &&
                    format(new Date(selectedDate), 'EEEE, d MMMM yyyy', { locale: localeId })}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-brown-100">
                <span className="text-brown-500 text-sm">Waktu</span>
                <span className="font-semibold text-brown-800">
                  {selectedTime} —{' '}
                  {selectedService &&
                    calculateEndTime(selectedTime, selectedService.durationMinutes)}{' '}
                  ({selectedService?.durationMinutes} menit)
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-brown-100">
                <span className="text-brown-500 text-sm">Nama</span>
                <span className="font-semibold text-brown-800">{customerName}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-brown-100">
                <span className="text-brown-500 text-sm">WhatsApp</span>
                <span className="font-semibold text-brown-800">{customerPhone}</span>
              </div>
              {customerNotes && (
                <div className="flex items-center justify-between py-3 border-b border-brown-100">
                  <span className="text-brown-500 text-sm">Catatan</span>
                  <span className="font-medium text-brown-600 text-right max-w-[200px]">
                    {customerNotes}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-4 bg-gold-50 -mx-6 px-6 rounded-b-2xl">
                <span className="text-brown-700 font-semibold">Total Bayar di Tempat</span>
                <div className="text-right">
                  <p className="text-xs text-brown-400 line-through">
                    {selectedService && formatPrice(selectedService.originalPrice)}
                  </p>
                  <p className="text-2xl font-bold text-gold-600">
                    {selectedService && formatPrice(selectedService.discountPrice)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmitBooking}
              className="w-full bg-gradient-gold text-white py-4 rounded-2xl text-lg font-bold hover:shadow-gold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <Check className="w-6 h-6" />
              Konfirmasi Booking
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-brown-200/30">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-brown-600 hover:text-gold-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Beranda</span>
            </Link>
            <div className="text-center">
              <h1 className="font-heading text-lg font-bold text-brown-900">
                Booking
              </h1>
            </div>
            <div className="w-16" />
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-gradient-gold text-white shadow-gold'
                        : isActive
                        ? 'bg-gold-100 text-gold-600 border-2 border-gold-400'
                        : 'bg-brown-100 text-brown-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </motion.div>
                  <span
                    className={`text-[10px] mt-1 font-medium ${
                      isActive
                        ? 'text-gold-600'
                        : isCompleted
                        ? 'text-gold-500'
                        : 'text-brown-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 md:w-16 h-0.5 mx-1 transition-all duration-500 ${
                      currentStep > step.num ? 'bg-gold-400' : 'bg-brown-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        {!(currentStep === 5 && isBookingSubmitted) && (
          <div className="flex items-center justify-between mt-8 pb-8">
            <button
              onClick={goBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                currentStep === 1
                  ? 'text-brown-300 cursor-not-allowed'
                  : 'text-brown-600 hover:text-gold-600 hover:bg-gold-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>

            {currentStep < 5 && (
              <button
                onClick={goNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  canProceed()
                    ? 'bg-gradient-gold text-white hover:shadow-gold hover:scale-105'
                    : 'bg-brown-200 text-brown-400 cursor-not-allowed'
                }`}
              >
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-300 border-t-gold-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown-500">Memuat halaman booking...</p>
        </div>
      </div>
    }>
      <BookingWizardContent />
    </Suspense>
  );
}
