import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/common/SmoothScroll';
import AiConcierge from '@/components/chat/AiConcierge';

export const metadata: Metadata = {
  metadataBase: new URL('https://homelyf.thewebvale.com'),
  title: 'Homelyf Solutions | Buy, Sell & Rent Property in India | Verified Real Estate',
  description: 'Homelyf Solutions is India’s premier transparent real estate marketplace. Explore verified residential & commercial properties in Bhopal, Indore & across India with 0% brokerage.',
  keywords: ['real estate Bhopal', 'properties in Bhopal', 'Arera Colony flats', 'MP Nagar commercial', 'Indore Super Corridor', 'buy property India', 'Homelyf Solutions', 'RERA verified'],
  authors: [{ name: 'Homelyf Solutions Pvt Ltd' }],
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: 'Homelyf Solutions | Buy, Sell & Rent Property in India',
    description: 'Explore verified residential & commercial properties with zero brokerage and transparent pricing.',
    url: 'https://homelyf.thewebvale.com',
    siteName: 'Homelyf Solutions',
    images: [
      {
        url: '/images/hero_bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Homelyf Real Estate Platform'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0fca98',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
        <SmoothScroll>
          {children}
          <AiConcierge />
        </SmoothScroll>
      </body>
    </html>
  );
}
