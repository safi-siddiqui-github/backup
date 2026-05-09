'use client';

import { createCategoryAction } from '@/actions/categoryActions';
import { useAdminLoginCookie } from '@/utils/zustandUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import LoadingComponent from '../ui/LoadingComponent';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, 'Name must have 3 or more characters.')
    .max(20, 'Name cannot have more then 20 characters.')
    .trim(),
  description: z
    .string({
      required_error: 'Description is required.',
    })
    .min(10, 'Description must have 10 or more characters.')
    .max(50, 'Description cannot have more then 50 characters.')
    .trim(),
  image: z.instanceof(File).optional(),
});

export default function CreateCategoryFormComponent() {
  // States
  const [SP, setSP] = useState(false); // showPassword
  const [IL, setIL] = useState(false); // isLoading
  const { updateToken, updateUser } = useAdminLoginCookie(); // zustand
  const router = useRouter();

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: undefined,
    },
  });

  // Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //
    setIL(true);
    //
    const res = await createCategoryAction(values);

    if (!res?.success && res?.errors) {
      if (res?.errors?.name) {
        form.setError('name', {
          message: res?.errors?.name,
        });

        form.setFocus('name');
      }

      if (res?.errors?.description) {
        form.setError('description', {
          message: res?.errors?.description,
        });

        form.setFocus('description');
      }

      if (res?.errors?.image) {
        form.setError('image', {
          message: res?.errors?.image,
        });

        form.setFocus('image');
      }
    }

    if (res?.success && res?.data) {
      toast(res?.message);
      // router.push(pathConstants.dashboard);
    }

    //
    setIL(false);
    //
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-md p-4"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">Create Categories</h2>
          <p className="font-medium">Kindly use appropriately !</p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Laptop" {...field} />
              </FormControl>
              <FormDescription>Provide category name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Work professionaly" {...field} />
              </FormControl>
              <FormDescription>Provide category description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  name={name}
                  onBlur={onBlur}
                  ref={ref}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file || undefined);
                  }}
                />
              </FormControl>
              <FormDescription>
                Optional image for the category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={IL}>
          {IL && <LoadingComponent />}
          Create
        </Button>
      </form>
    </Form>
  );
}
