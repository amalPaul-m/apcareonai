import { Inter } from 'next/font/google';
import './globals.css';
import { MedicineProvider } from '@/context/MedicineContext';
import Navbar from '@/components/Navbar';
import PWARegister from '@/components/PWARegister';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'apcareon ai',
  description: 'Identify medicines instantly with AI',
  manifest: '/manifest.webmanifest',
  themeColor: '#2563EB',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'apcareon ai'
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MedicineProvider>
          <PWARegister />
          <Navbar />
          <div className="pt-16 min-h-screen bg-[var(--background)]">
            {children}
          </div>
          <footer className="border-t border-[var(--primary)]/15 bg-[var(--background)] py-4 text-center text-sm text-[var(--foreground)]/70">
            amal paul careon ai. All rights reserved.
          </footer>
        </MedicineProvider>
      </body>
    </html>
  );
}
