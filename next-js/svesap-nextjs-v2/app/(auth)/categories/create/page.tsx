'use client';

import { createCategoryAction } from '@/actions/categoryActions';
import FileInputComponent from '@/components/input/FileInputComponent';
import TextInputComponent from '@/components/input/TextInputComponent';
import { Button } from '@/components/ui/button';
import LoadingComponent from '@/components/ui/LoadingComponent';
import { pathConstants } from '@/constants/pathConstants';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

export default function Page() {
  const [state, formAction, pending] = useActionState(createCategoryAction, {});
  const router = useRouter();
  const [isP, setIsP] = useState(pending);

  useEffect(() => {
    if (state?.success) {
      router.push(pathConstants.categories.read);
    }
    setIsP(pending);
  }, [state, router, setIsP, pending]);

  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <h2 className="text-2xl">Categories / Create</h2>

      <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
        <TextInputComponent
          id="name"
          label="Name"
          defaultValue={state?.old?.name}
          name="name"
          error={state.errors?.name}
        />

        <TextInputComponent
          id="description"
          label="Description"
          defaultValue={state?.old?.description}
          name="description"
          error={state.errors?.description}
        />

        <FileInputComponent
          id="image"
          label="Image"
          name="image"
          error={state.errors?.image}
        />

        <Button type="submit">{isP ? <LoadingComponent /> : 'Submit'}</Button>
      </form>
    </div>
  );
}
