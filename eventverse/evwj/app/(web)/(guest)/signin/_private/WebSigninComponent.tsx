"use client";

import {
  WebSigninSchema,
  WebSigninSchemaInfer,
} from "@/app/api/web/guest/signin/_private/validation";
import {
  RHFormButtonComponent,
  RHFormControllerCheckboxComponent,
  RHFormControllerInputComponent,
} from "@/lib/lib-react-hook-form";
import { FormSubmitHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/shadcn/ui/field";
import { useUserStore } from "@/store/store-user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import WebGuestSocialLoginComponent from "../../_private/WebGuestSocialLoginComponent";
import { WebSigninAction } from "./action";

export default function WebSigninComponent() {
  return (
    <div className="flex flex-col gap-2">
      <SigninForm />
      <Link
        href={Routes?.web?.guest?.signup}
        className="text-center hover:underline"
      >
        <span>Create a new account? </span>
        <span className="font-medium text-purple-500">Sign up</span>
      </Link>
      <WebGuestSocialLoginComponent />
    </div>
  );
}

function SigninForm() {
  const router = useRouter();
  const userStore = useUserStore();
  const form = useForm<WebSigninSchemaInfer>({
    resolver: zodResolver(WebSigninSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });
  async function onSubmit(data: WebSigninSchemaInfer) {
    const actionRes = await WebSigninAction({
      user: data,
    });
    const formRes = await FormSubmitHelper(async () => actionRes, form);
    if (formRes?.success) {
      userStore?.setUser(formRes?.data?.token?.user);
      toast.success(formRes?.message);
      return router?.push(Routes.web?.auth?.dashboard);
    }
    toast.error(actionRes?.error?.at(0)?.message ?? "Porcess Not Completed");
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="text-2xl! font-bold md:text-3xl!">
            Welcome Back
          </FieldLegend>
          <FieldDescription>Get started with EventVerse today</FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <RHFormControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                placeholder: "johndoe@gmail.com",
              }}
            />
            <Field>
              <RHFormControllerInputComponent
                form={form}
                name="password"
                label="Password"
                componentProps={{
                  placeholder: "********",
                  type: "password",
                }}
              />
              <Link
                className="text-sm hover:underline"
                href={Routes.web.guest.forgotPasswordCheckEmail}
              >
                Forgot Password?
              </Link>
            </Field>
            <RHFormControllerCheckboxComponent
              form={form}
              name="remember"
              label="Remember Me"
            />
          </FieldGroup>
          <Field>
            <RHFormButtonComponent
              form={form}
              text="Sign In"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
