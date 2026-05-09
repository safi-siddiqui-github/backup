import { Button } from '@/components/ui/button';
import { pathConstants } from '@/constants/pathConstants';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SVESAP - Categories',
};

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <h2 className="text-2xl">Categories</h2>

      <div className="flex gap-2">
        <Button asChild>
          <Link href={pathConstants.categories.read}>All</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={pathConstants.categories.recover}>Recover</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href={pathConstants.categories.create}>Create</Link>
        </Button>
      </div>

      {children}
    </div>
  );
}
