import PrismaLoginForm from "@/components/auth/prisma-login-form";

export default function Page() {
  return (
    <div className='flex flex-col gap-10 p-4'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl font-semibold'>Prisma Login</h2>
        <p className='tracking-tight'>Try our prisma login system</p>
      </div>

      <PrismaLoginForm />
    </div>
  );
}
