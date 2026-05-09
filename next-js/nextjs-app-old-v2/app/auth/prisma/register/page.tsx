import PrismaRegisterForm from '@/components/auth/prisma-register-form';

export default function Page() {
  return (
    <div className='flex flex-col gap-10 p-4'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl font-semibold'>Prisma Register</h2>
        <p className='tracking-tight'>Try our prisma register system</p>
      </div>

      <PrismaRegisterForm />
    </div>
  );
}
