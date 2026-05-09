import { ThemeProviderComponent } from '@/components/provider/ThemeProviderComponent';
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased text-sm">
        <ThemeProviderComponent
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
