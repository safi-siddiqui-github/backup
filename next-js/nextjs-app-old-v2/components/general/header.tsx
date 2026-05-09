import { AppRoutes } from '@/lib/general/routes';
import { ModeToggle } from '@/shadcn/components/general/mode-toggle';
import Link from 'next/link';

export default function Header() {
  return (
    <div className='flex justify-between border-b p-4'>
      <Link href={AppRoutes.homepage}>
        <h1 className='text-2xl font-medium'>Safi Siddiqui</h1>
      </Link>
      <ModeToggle />
    </div>
  );
}
