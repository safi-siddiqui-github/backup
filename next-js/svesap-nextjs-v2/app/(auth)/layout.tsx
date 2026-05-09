import LogoutComponent from '@/components/ui/LogoutComponent';
import { Toaster } from '@/components/ui/sonner';
import { pathConstants } from '@/constants/pathConstants';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SVESAP - Admin Panel',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex ">
      <div className="flex flex-col gap-4 p-4 w-full max-w-44">
        <Link href={pathConstants.dashboard} className="font-medium text-lg">
          SVESAP
        </Link>

        <Link href={pathConstants.categories.read}>Categories</Link>

        <LogoutComponent />
      </div>

      {children}

      <Toaster />
    </main>
  );
}
