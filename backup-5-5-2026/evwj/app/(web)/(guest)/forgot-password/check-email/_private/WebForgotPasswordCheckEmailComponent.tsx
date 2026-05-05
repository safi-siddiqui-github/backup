"use client";

import {
  WebForgotPasswordCheckEmailSchema,
  WebForgotPasswordCheckEmailSchemaInfer,
} from "@/app/api/web/guest/forgot-password/check-email/_private/validation";
import {
  RHFormButtonComponent,
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { WebForgotPasswordCheckEmailAction } from "./action";

export default function WebForgotPasswordCheckEmailComponent() {
  return (
    <div className="flex flex-col gap-2">
      <FPCheckEmailForm />
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

function FPCheckEmailForm() {
  const router = useRouter();
  const form = useForm<WebForgotPasswordCheckEmailSchemaInfer>({
    resolver: zodResolver(WebForgotPasswordCheckEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data: WebForgotPasswordCheckEmailSchemaInfer) {
    const actionRes = await WebForgotPasswordCheckEmailAction({
      user: data,
    });
    const formRes = await FormSubmitHelper(async () => actionRes, form);
    if (formRes?.success) {
      router?.push(
        `${Routes.web?.guest?.forgotPasswordUpdatePassword}?email=${data?.email}`,
      );
      return toast.success("OTP Email Sent");
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
            Forgot Password?
          </FieldLegend>
          <FieldDescription>
            Enter your email to update your credentials
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1">
            <RHFormControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                placeholder: "johndoe@gmail.com",
              }}
            />
          </FieldGroup>
          <Field>
            <RHFormButtonComponent
              form={form}
              text="Get Reset Link"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
