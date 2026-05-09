'use client';

import { loginUserPrisma } from '@/actions/auth';
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
import { loginFormSchemaZod } from '@/zod/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function PrismaLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchemaZod>>({
    resolver: zodResolver(loginFormSchemaZod),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function submitForm(values: z.infer<typeof loginFormSchemaZod>) {
    setIsLoading(true);
    const res = await loginUserPrisma(values);
    if (!res.success && res.param === 'email') {
      form.setError('email', { type: 'validate', message: res.error });
    }
    if (res.success) {
      toast(res.message);
    }
    setIsLoading(false);
  }

  return (
    <div className='flex flex-col gap-4 max-w-sm w-full'>
      <h2 className='text-xl font-medium'>Login Form</h2>

      <Form {...form}>
        <form className='space-y-8'>
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
            Login With Prisma
          </Button>
        </form>
      </Form>
    </div>
  );
}
