import { AppRoutes } from '@/lib/general/routes';
import { Button } from '@/shadcn/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-col gap-10 p-4'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl font-semibold'>Auth App</h2>
        <p className='tracking-tight'>All authentication systems</p>
      </div>

      <div className='flex flex-col items-start gap-2'>
        <h2 className='text-xl font-semibold'>Prisma Auth App</h2>
        <p className='tracking-tight'>
          Explore our authentication system made with prisma
        </p>
        <Button asChild>
          <Link href={AppRoutes.prismaPage}>Prisma System</Link>
        </Button>
      </div>
    </div>
  );
}
