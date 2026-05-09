'use client';

import { ResponseResultType } from '@/types/responseTypes';
import { ArchiveRestore, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Button } from './button';
import LoadingComponent from './LoadingComponent';

type ActionDataComponentType = {
  action: (
    _: ResponseResultType,
    formData: FormData
  ) => Promise<ResponseResultType>;
  redirect: string;
  id?: string;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;

  work: 'delete' | 'recover';
};

export default function ActionDataComponent(props: ActionDataComponentType) {
  const router = useRouter();
  const { action, redirect, id, variant, work } = props;
  const [state, formAction, pending] = useActionState(action, {});

  useEffect(() => {
    if (state?.success) {
      router.push(redirect);
    }
  }, [state, router, redirect]);

  let icon = null;
  switch (work) {
    case 'delete':
      icon = <Trash2 />;
      break;
    case 'recover':
      icon = <ArchiveRestore />;
      break;

    default:
      break;
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="id" defaultValue={id} />

      <Button variant={variant}>{pending ? <LoadingComponent /> : icon}</Button>
    </form>
  );
}
