import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RootLayoutClient from '@/components/layout/RootLayoutClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Dashboard',
  description: 'Teamups technical exercise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
