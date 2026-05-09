import { SidebarComponent } from '@/components/sidebar/SidebarComponent';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'SVESAP - Admin Panel',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarComponent />

      <main className='flex flex-col w-full'>
        <SidebarTrigger />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
