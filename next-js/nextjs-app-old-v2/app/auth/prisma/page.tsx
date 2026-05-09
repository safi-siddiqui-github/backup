import { AppRoutes } from '@/lib/general/routes';
import { Button } from '@/shadcn/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-col gap-10 p-4'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl font-semibold'>Prisma Auth App</h2>
        <p className='tracking-tight'>
          Explore our authentication system made with prisma
        </p>
      </div>

      <div className='flex flex-col gap-1'>
        <p className='text-lg font-medium'>Prisma Environment</p>
        <div className='flex flex-col'>
          <p className=''>
            Use prisma to sign in / sign up using many reseources listed below
          </p>
          <p className=''>Prisma ORM</p>
          <p className=''>PostgreSQL Database</p>
          <p className=''>React Hook Form</p>
          <p className=''>ZOD Validation</p>
          <p className=''>Bcrypt Password Hash</p>
          <p className=''>Jose Json Web Token</p>
          <p className=''>Resend Email</p>
        </div>
      </div>

      <div className='flex flex-wrap gap-4'>
        <Button asChild>
          <Link href={AppRoutes.prismaRegisterPage}>Prisma Register</Link>
        </Button>
        <Button asChild>
          <Link href={AppRoutes.prismaLoginPage}>Prisma Login</Link>
        </Button>
      </div>
    </div>
  );
}
