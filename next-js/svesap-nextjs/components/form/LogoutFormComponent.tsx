'use client';

import { logoutAction } from '@/actions/authActions';
import { pathConstants } from '@/constants/pathConstants';
import { useAdminLoginCookie } from '@/utils/zustandUtils';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import LoadingComponent from '../ui/LoadingComponent';
import { useSidebar } from '../ui/sidebar';

export default function LogoutFormComponent() {
  const [IL, setIL] = useState(false); // isLoading
  const { updateToken, updateUser } = useAdminLoginCookie(); // zustand
  const router = useRouter();
  const { open } = useSidebar();

  async function handleLogout() {
    //
    setIL(true);
    //
    const res = await logoutAction();

    if (res?.success && res?.data) {
      toast(res?.message);
      updateToken(undefined);
      updateUser(undefined);
      router.push(pathConstants.login);
    }

    //
    setIL(false);
    //
  }

  return (
    <Button disabled={IL} onClick={handleLogout}>
      {IL ? <LoadingComponent /> : <LogOut className="size-4" />}
      {open && <span>Logout</span>}
    </Button>
  );
}
