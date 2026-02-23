import { Inter } from 'next/font/google';
import './globals.css';
import { MedicineProvider } from '@/context/MedicineContext';
import Navbar from '@/components/Navbar';
import PWARegister from '@/components/PWARegister';
import AppLaunchSplash from '@/components/AppLaunchSplash';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'apcareon ai',
  applicationName: 'apcareon ai',
  description: 'Identify medicines instantly with AI',
  manifest: '/manifest.webmanifest',
  themeColor: '#FFFFFF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'apcareon ai'
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png'
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MedicineProvider>
          <PWARegister />
          <AppLaunchSplash />
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
