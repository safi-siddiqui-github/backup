import VerifyEmail from '@/email-service/resend/template/auth/verify-email';

export default function Page() {
  return (
    <div className='flex flex-col gap-10 p-4'>
      <VerifyEmail
        code='789465132'
        email='lkasjdlkadsjlkad'
      />
    </div>
  );
}
