'use client';

import { motion, Variants } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ChevronDown,
  Sparkles,
  Heart,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { branches } from '@/lib/data';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* ==================== NAVBAR ==================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-brown-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-white font-heading font-bold text-sm">T</span>
              </div>
              <div>
                <h1 className="font-heading text-lg font-bold text-brown-900 tracking-wide">
                  T.U.R.K.I
                </h1>
                <p className="text-[10px] text-brown-500 -mt-0.5 tracking-wider uppercase">
                  Reflexology
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brown-600">
              <a href="#layanan" className="hover:text-gold-600 transition-colors">
                Layanan
              </a>
              <a href="#cabang" className="hover:text-gold-600 transition-colors">
                Cabang
              </a>
              <a href="#tentang" className="hover:text-gold-600 transition-colors">
                Tentang
              </a>
            </div>
            <Link
              href="/booking"
              className="bg-gradient-gold text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-gold transition-all duration-300 hover:scale-105"
            >
              Booking Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D49A1F' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Static ornaments */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase">
                ✦ Premium Reflexology & Massage ✦
              </p>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            >
              T.U.R.K.I
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-brown-300 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            >
              <span className="text-gold-300 font-medium">
                Tempat Urut Reflexology Keluarga Indonesia
              </span>
              <br />
              Nikmati pengalaman pijat & reflexology profesional dengan sentuhan
              tradisional khas Nusantara
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/booking"
                className="bg-gradient-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-gold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Booking Sekarang
              </Link>
              <a
                href="#layanan"
                className="border border-gold-400/30 text-gold-300 px-8 py-4 rounded-full text-lg font-medium hover:bg-gold-500/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                Lihat Menu Layanan
                <ChevronDown className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-6 pt-8 text-brown-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>3 Cabang</span>
              </div>
              <div className="w-px h-4 bg-brown-600" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>09:00 - 22:00</span>
              </div>
              <div className="w-px h-4 bg-brown-600" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gold-400" />
                <span>Terpercaya</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold-400/50" />
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section id="tentang" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-gold-600 font-semibold tracking-widest text-sm uppercase"
            >
              Mengapa Memilih Kami
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl sm:text-4xl font-bold mt-3 text-brown-900"
            >
              Pengalaman Pijat Terbaik
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Heart className="w-7 h-7" />,
                title: 'Sentuhan Profesional',
                desc: 'Terapis berpengalaman dengan teknik tradisional & modern',
              },
              {
                icon: <Shield className="w-7 h-7" />,
                title: 'Harga Terjangkau',
                desc: 'Promo harga spesial untuk semua layanan kami',
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: 'Untuk Keluarga',
                desc: 'Tempat yang nyaman dan aman untuk seluruh keluarga',
              },
              {
                icon: <Sparkles className="w-7 h-7" />,
                title: 'Berbagai Treatment',
                desc: 'Refleksi, massage, lulur, bekam, dan banyak lagi',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="glass-card rounded-2xl p-6 text-center shadow-elegant hover:shadow-gold transition-all duration-500 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-brown-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-brown-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SERVICES HIGHLIGHT ==================== */}
      <section id="layanan" className="py-20 px-4 bg-brown-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D49A1F' fill-opacity='0.4'%3E%3Ccircle cx='40' cy='40' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-gold-400 font-semibold tracking-widest text-sm uppercase"
            >
              Menu Layanan
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl sm:text-4xl font-bold mt-3 text-white"
            >
              Pilihan Treatment Kami
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-brown-300 mt-4 max-w-xl mx-auto"
            >
              Beragam pilihan layanan pijat dan perawatan tubuh dengan harga promo
              spesial
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                emoji: '🦶',
                title: 'Refleksi',
                desc: 'Pijat titik refleksi kaki untuk relaksasi dan kesehatan tubuh',
                price: 'Mulai Rp 98.000',
                duration: '60 - 90 menit',
              },
              {
                emoji: '💆',
                title: 'Full Body Massage',
                desc: 'Pijat seluruh tubuh untuk menghilangkan pegal dan lelah',
                price: 'Mulai Rp 98.000',
                duration: '60 - 90 menit',
              },
              {
                emoji: '✨',
                title: 'Totok Wajah',
                desc: 'Perawatan wajah tradisional untuk kecantikan alami',
                price: 'Mulai Rp 28.000',
                duration: '15 - 30 menit',
              },
              {
                emoji: '🔥',
                title: 'Special Treatment',
                desc: 'Kop, Kerik, Keselo, Ear Candle, dan perawatan khusus lainnya',
                price: 'Mulai Rp 35.000',
                duration: '30 menit',
              },
              {
                emoji: '⭐',
                title: 'Best Seller',
                desc: 'Thai Massage, Turkish Massage, Hot Stone, Bekam Sunnah',
                price: 'Mulai Rp 70.000',
                duration: '30 - 90 menit',
              },
              {
                emoji: '🌿',
                title: 'Lulur',
                desc: 'Keraton Traditional, Balinese Scrub, dan paket combo perawatan',
                price: 'Mulai Rp 126.000',
                duration: '80 - 90 menit',
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-brown-800/50 border border-gold-500/10 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-500 group hover:-translate-y-1"
              >
                <span className="text-4xl">{service.emoji}</span>
                <h3 className="font-heading text-xl font-semibold text-white mt-4 mb-2 group-hover:text-gold-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-brown-400 text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-brown-700/50">
                  <span className="text-gold-400 font-semibold text-sm">
                    {service.price}
                  </span>
                  <span className="text-brown-500 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <Link
              href="/booking"
              className="bg-gradient-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-gold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Booking Treatment Sekarang
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== BRANCHES ==================== */}
      <section id="cabang" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-gold-600 font-semibold tracking-widest text-sm uppercase"
            >
              Lokasi Cabang
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl sm:text-4xl font-bold mt-3"
            >
              Kunjungi Cabang Terdekat
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {branches.map((branch) => (
              <motion.div
                key={branch.id}
                variants={fadeInUp}
                className="glass-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-gold transition-all duration-500 hover:-translate-y-1 group"
              >
                <div className="h-3 bg-gradient-gold" />
                <div className="p-6">
                  <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-gold group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6 text-gold-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brown-900 mb-2">
                    {branch.city}
                  </h3>
                  <p className="text-brown-500 text-sm leading-relaxed mb-4">
                    {branch.address}
                  </p>
                  <div className="flex items-center gap-2 text-brown-600 text-sm mb-4">
                    <Phone className="w-4 h-4 text-gold-500" />
                    <span className="font-medium">{branch.whatsappFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2 text-brown-500 text-xs mb-6">
                    <Clock className="w-3.5 h-3.5 text-gold-500" />
                    <span>Buka setiap hari • 09:00 - 22:00</span>
                  </div>
                  <Link
                    href={`/booking?branch=${branch.id}`}
                    className="block w-full text-center bg-brown-800 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gradient-gold transition-all duration-300"
                  >
                    Booking di Cabang Ini
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Tubuh Sehat, <span className="text-gradient-gold">Hidup Berkualitas</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-brown-300 text-lg mb-8 max-w-xl mx-auto"
            >
              Jangan tunda lagi! Booking jadwal reflexology Anda sekarang dan rasakan
              manfaatnya.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/booking"
                className="bg-gradient-gold text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-gold transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Booking Sekarang
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-brown-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-sm">T</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    T.U.R.K.I
                  </h3>
                  <p className="text-brown-500 text-xs">Reflexology</p>
                </div>
              </div>
              <p className="text-brown-500 text-sm leading-relaxed">
                Tempat Urut Reflexology Keluarga Indonesia. Melayani pijat & perawatan
                tubuh profesional sejak bertahun-tahun.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-white font-semibold mb-4">Cabang Kami</h4>
              <ul className="space-y-3 text-sm text-brown-400">
                {branches.map((branch) => (
                  <li key={branch.id} className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-brown-300">{branch.city}</p>
                      <p className="text-brown-500 text-xs">{branch.whatsappFormatted}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-white font-semibold mb-4">Jam Operasional</h4>
              <div className="text-sm text-brown-400 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <span>Senin - Minggu</span>
                </div>
                <p className="text-gold-400 font-semibold ml-6">09:00 - 22:00 WIB</p>
              </div>
            </div>
          </div>

          <div className="border-t border-brown-800 pt-8 text-center">
            <p className="text-brown-600 text-sm">
              © 2026 T.U.R.K.I — Tempat Urut Reflexology Keluarga Indonesia. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
