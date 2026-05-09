import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SVESAP',
  description: 'Single Vendor Ecommerce Store Admin Panel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-sm">{children}</body>
    </html>
  );
}
