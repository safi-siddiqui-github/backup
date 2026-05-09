import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Safi Siddiqui',
  description: 'Profile',
  keywords: [
    'web',
    'app',
    'mobile',
    'front',
    'back',
    'full',
    'stack',
    'html',
    'css',
    'javascript',
    'typescript',
    'react',
    'next',
    'vue',
    'php',
    'laravel',
    'livewire',
    'inertia',
    'native',
    'expo',
    'profile',
  ],
};

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased text-sm">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
