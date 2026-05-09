'use client';

import { logoutAction } from '@/actions/authActions';
import { pathConstants } from '@/constants/pathConstants';
import { useAdminLoginCookie } from '@/utils/zustandUtils';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { Button } from './button';
import LoadingComponent from './LoadingComponent';

export default function LogoutComponent() {
  const { updateToken, updateUser } = useAdminLoginCookie();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(logoutAction, {});
  const [isP, setIsP] = useState(pending);

  useEffect(() => {
    if (state?.success) {
      updateToken(undefined);
      updateUser(undefined);
      router.push(pathConstants.login);
    }
    setIsP(pending);
  }, [state, router, updateToken, updateUser, setIsP, pending]);

  return (
    <form action={formAction}>
      <Button variant={'outline'}>
        {isP ? <LoadingComponent /> : <LogOut />}
      </Button>
    </form>
  );
}
