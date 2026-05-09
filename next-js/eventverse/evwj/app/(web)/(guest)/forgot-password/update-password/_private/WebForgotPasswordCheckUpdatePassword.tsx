"use client";

import {
  WebForgotPasswordUpdatePasswordSchema,
  WebForgotPasswordUpdatePasswordSchemaInfer,
} from "@/app/api/web/guest/forgot-password/update-password/_private/validation";
import {
  RHFormButtonComponent,
  RHFormControllerInputComponent,
  RHFormControllerInputOTPComponent,
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { WebForgotPasswordUpdatePasswordAction } from "./action";

export default function ForgotPasswordUpdatePasswordComponent() {
  return (
    <div className="flex flex-col gap-2">
      <Suspense>
        <FPUpdatePasswordForm />
      </Suspense>
      <Link
        href={Routes?.web?.guest?.signin}
        className="text-center hover:underline"
      >
        <span>Already have an account? </span>
        <span className="font-medium text-purple-500">Sign in</span>
      </Link>
    </div>
  );
}

function FPUpdatePasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const form = useForm<WebForgotPasswordUpdatePasswordSchemaInfer>({
    resolver: zodResolver(WebForgotPasswordUpdatePasswordSchema),
    defaultValues: {
      email: params?.get("email") ?? "",
      code: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: WebForgotPasswordUpdatePasswordSchemaInfer) {
    const actionRes = await WebForgotPasswordUpdatePasswordAction({
      user: data,
    });
    const formRes = await FormSubmitHelper(async () => actionRes, form);
    if (formRes?.success) {
      router?.push(Routes.web?.guest.signin);
      return toast.success("Password Updated");
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
            Update password
          </FieldLegend>
          <FieldDescription>
            Enter new credentials for your account
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <RHFormControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                placeholder: "Enter email address",
                disabled: true,
              }}
            />
            <RHFormControllerInputOTPComponent
              form={form}
              name="code"
              label="Code"
            />
            <RHFormControllerInputComponent
              form={form}
              name="password"
              label="New Password"
              componentProps={{
                placeholder: "********",
                type: "password",
              }}
            />
            <RHFormControllerInputComponent
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              componentProps={{
                placeholder: "********",
                type: "password",
              }}
            />
          </FieldGroup>
          <Field>
            <RHFormButtonComponent
              form={form}
              text="Update Credentials"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
