import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "T.U.R.K.I — Tempat Urut Reflexology Keluarga Indonesia",
  description:
    "Booking reflexology & massage terbaik di Jakarta Timur, Depok, dan Bekasi. Harga terjangkau, layanan profesional. T.U.R.K.I — Tempat Urut Reflexology Keluarga Indonesia.",
  keywords: [
    "reflexology",
    "massage",
    "pijat",
    "urut",
    "bekasi",
    "depok",
    "jakarta timur",
    "turki reflexology",
    "booking pijat",
    "spa",
    "lulur",
  ],
  openGraph: {
    title: "T.U.R.K.I — Tempat Urut Reflexology Keluarga Indonesia",
    description:
      "Booking reflexology & massage profesional di 3 cabang: Jakarta Timur, Depok, Bekasi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
