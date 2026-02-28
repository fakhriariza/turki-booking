'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  MapPin,
  Clock,
  User,
  Phone,
  ChevronLeft,
  Filter,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { branches, formatPrice } from '@/lib/data';
import { Booking } from '@/types';

// Mock bookings for demo purposes
const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'Ahmad Fauzi',
    customerPhone: '081234567890',
    notes: 'Sakit di pinggang bagian bawah',
    branchId: 'bekasi',
    serviceId: 'bekasi-bs-thai-massage',
    serviceName: 'Thai Massage',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '10:00',
    endTime: '11:30',
    durationMinutes: 90,
    totalPrice: 203000,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  },
  {
    id: '2',
    customerName: 'Siti Nurhaliza',
    customerPhone: '082345678901',
    notes: '',
    branchId: 'depok',
    serviceId: 'depok-refleksi-60',
    serviceName: 'Refleksi 60 Menit',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '14:00',
    endTime: '15:00',
    durationMinutes: 60,
    totalPrice: 112000,
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '3',
    customerName: 'Budi Hartono',
    customerPhone: '083456789012',
    notes: 'Minta terapis pria',
    branchId: 'pondok-kelapa',
    serviceId: 'pondok-kelapa-lulur-keraton',
    serviceName: 'Keraton Traditional',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '16:00',
    endTime: '17:20',
    durationMinutes: 80,
    totalPrice: 144000,
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
];

export default function AdminPage() {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const filteredBookings =
    selectedBranch === 'all'
      ? bookings
      : bookings.filter((b) => b.branchId === selectedBranch);

  const getBranchName = (id: string) =>
    branches.find((b) => b.id === id)?.city || id;

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-gold-100 text-gold-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-brown-100 text-brown-600';
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-brown-200/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-brown-600 hover:text-gold-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Beranda</span>
            </Link>
            <h1 className="font-heading text-lg font-bold text-brown-900">
              Admin Dashboard
            </h1>
            <button className="p-2 text-brown-500 hover:text-gold-600 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Booking', value: bookings.length, icon: CalendarDays },
            {
              label: 'Pending',
              value: bookings.filter((b) => b.status === 'pending').length,
              icon: Clock,
            },
            {
              label: 'Confirmed',
              value: bookings.filter((b) => b.status === 'confirmed').length,
              icon: User,
            },
            {
              label: 'Revenue',
              value: formatPrice(
                bookings.reduce((sum, b) => sum + b.totalPrice, 0)
              ),
              icon: MapPin,
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-xl p-4 shadow-elegant"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="text-xs text-brown-400">{stat.label}</p>
                    <p className="font-bold text-brown-800 text-lg">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Branch filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-brown-500 shrink-0" />
          <button
            onClick={() => setSelectedBranch('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedBranch === 'all'
                ? 'bg-gradient-gold text-white shadow-gold'
                : 'bg-white border border-brown-200 text-brown-600 hover:border-gold-300'
            }`}
          >
            Semua Cabang
          </button>
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => setSelectedBranch(branch.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedBranch === branch.id
                  ? 'bg-gradient-gold text-white shadow-gold'
                  : 'bg-white border border-brown-200 text-brown-600 hover:border-gold-300'
              }`}
            >
              {branch.city}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        <div className="bg-white rounded-2xl shadow-elegant border border-brown-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-brown-50 border-b border-brown-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                    Cabang
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                    Layanan
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                    Jadwal
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-brown-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown-50">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gold-50/30 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-sm text-brown-800">
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-brown-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          {booking.customerPhone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-brown-600">
                        {getBranchName(booking.branchId)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-brown-700">
                          {booking.serviceName}
                        </p>
                        <p className="text-xs text-brown-400">
                          {booking.durationMinutes} menit
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm text-brown-700">
                          {booking.date}
                        </p>
                        <p className="text-xs text-brown-400">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-sm text-gold-600">
                        {formatPrice(booking.totalPrice)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-brown-400"
                    >
                      Belum ada booking untuk cabang ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
