'use client';

import { registerUserPrisma } from '@/actions/auth';
import { Button } from '@/shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { registerFormSchemaZod } from '@/zod/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function PrismaRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchemaZod>>({
    resolver: zodResolver(registerFormSchemaZod),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function submitForm(values: z.infer<typeof registerFormSchemaZod>) {
    setIsLoading(true);
    const res = await registerUserPrisma(values);
    if (!res.success && res.param === 'email') {
      form.setError('email', { type: 'validate', message: res.error });
    }
    if (res.success) {
      toast(res.message);
    }
    setIsLoading(false);
  }

  return (
    <div className='flex w-full max-w-sm flex-col gap-4'>
      <h2 className='text-xl font-medium'>Prisma Register Form</h2>

      <Form {...form}>
        <form className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='johndoe'
                    autoComplete='name'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='john@gmail.com'
                    autoComplete='email'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='john-doe'
                    autoComplete='current-password'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your private password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            onClick={form.handleSubmit(submitForm)}
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className='animate-spin' />}
            Register With Prisma
          </Button>
        </form>
      </Form>
    </div>
  );
}
