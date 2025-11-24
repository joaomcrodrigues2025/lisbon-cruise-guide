import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lisbonshore.com'),
  title: "Lisbon Shore Guide | 70 Wonderful Attractions for Cruise Passengers",
  description: "Discover 70 amazing tourist attractions in Lisbon perfect for cruise ship passengers. Complete guide with hours, prices, directions from port, photos, and insider tips.",
  keywords: "Lisbon attractions, cruise port Lisbon, Lisbon tourism, things to do Lisbon, Lisbon shore excursions, cruise passenger guide",
  openGraph: {
    title: "Lisbon Shore Guide - 70 Wonderful Attractions for Cruise Passengers",
    description: "Explore 70 amazing attractions in Lisbon with photos, prices, and visitor information optimized for cruise passengers",
    type: "website",
    siteName: "Lisbon Shore Guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisbon Shore Guide - 70 Wonderful Attractions",
    description: "Complete guide to Lisbon attractions for cruise passengers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lisbonshore.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.className}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="relative flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white px-4 py-8 mt-12">
            <div className="max-w-6xl mx-auto text-center text-slate-600">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#FFC72C] text-3xl">anchor</span>
                <span className="text-lg font-bold text-[#003366]">Lisbon Shore</span>
              </div>
              <p className="text-sm">
                Your comprehensive guide to Lisbon attractions for cruise ship passengers
              </p>
              <p className="text-xs mt-4 text-slate-500">
                © {new Date().getFullYear()} Lisbon Shore Guide. All information subject to change.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
