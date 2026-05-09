'use client';

import { loginAction } from '@/actions/authActions';
import { pathConstants } from '@/constants/pathConstants';
import { useAdminLoginCookie } from '@/utils/zustandUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
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
import { Toggle } from '../ui/toggle';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Email must be valid',
    })
    .trim(),
  password: z
    .string({
      required_error: 'Email is required.',
    })
    .min(5, 'Password must have five or more characters.')
    .trim(),
});

export default function LoginFormComponent() {
  // States
  const [SP, setSP] = useState(false); // showPassword
  const [IL, setIL] = useState(false); // isLoading
  const { updateToken, updateUser } = useAdminLoginCookie(); // zustand
  const router = useRouter();

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //
    setIL(true);
    //
    const res = await loginAction(values);

    if (!res?.success && res?.errors) {
      if (res?.errors?.email) {
        form.setError('email', {
          message: res?.errors?.email,
        });

        form.setFocus('email');
      }

      if (res?.errors?.password) {
        form.setError('password', {
          message: res?.errors?.password,
        });

        form.setFocus('password');
      }
    }

    if (res?.success && res?.data) {
      toast(res?.message);
      updateToken(res?.data?.token);
      updateUser(res?.data?.user);
      router.push(pathConstants.dashboard);
    }

    //
    setIL(false);
    //
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-md md:shadow p-6 md:rounded-xl bg-white"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">SVESAP Auth</h2>
          <p className="font-medium">Kindly use appropriately !</p>

          <div className="flex flex-col text-xs">
            <p className="font-medium">Hint: Email/Password</p>
            <p className="">safisiddiqui.work@gmail.com</p>
            <p className="">aaaaa</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="safisiddiqui.work@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Provide SVESAP Admin Email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
                <Toggle variant="outline" onClick={() => setSP(!SP)}>
                  {SP ? <Eye /> : <EyeClosed />}
                </Toggle>
              </div>
              <FormControl>
                <Input
                  type={SP ? 'text' : 'password'}
                  placeholder="********"
                  {...field}
                />
              </FormControl>

              <FormDescription>Provide SVESAP Admin password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={IL}>
          {IL && <Loader2 className="animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
