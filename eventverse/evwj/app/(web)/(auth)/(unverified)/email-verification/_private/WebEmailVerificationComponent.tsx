"use client";

import {
  EmailVerificationWebSchema,
  EmailVerificationWebSchemaInfer,
} from "@/app/api/web/auth/email-verification/verify/_private/validation";
import {
  RHFormButtonComponent,
  RHFormControllerInputOTPComponent,
} from "@/lib/lib-react-hook-form";
import { FormSubmitHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/shadcn/ui/field";
import { useUserStore } from "@/store/store-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  WebEmailVerificationAction,
  WebEmailVerificationResendAction,
} from "./action";

export default function WebEmailVerificationComponent() {
  return (
    <div className="flex flex-col gap-2">
      <EmailVerificationForm />
      <EmailVerificationResendForm />
      {/* <WebGuestSocialLoginComponent /> */}
    </div>
  );
}

function EmailVerificationForm() {
  const router = useRouter();
  const userStore = useUserStore();
  const form = useForm<EmailVerificationWebSchemaInfer>({
    resolver: zodResolver(EmailVerificationWebSchema),
    defaultValues: {
      code: "",
    },
  });
  async function onSubmit(data: EmailVerificationWebSchemaInfer) {
    const actionRes = await WebEmailVerificationAction({
      otp: {
        code: Number(data?.code),
      },
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
            Verify You Email
          </FieldLegend>
          <FieldDescription>
            Get verified with EventVerse today
          </FieldDescription>
          <FieldGroup className="flex flex-col">
            <RHFormControllerInputOTPComponent
              form={form}
              name="code"
              label="Otp Code"
            />
          </FieldGroup>
          <Field>
            <RHFormButtonComponent
              form={form}
              text="Verify Account"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}

function EmailVerificationResendForm() {
  const form = useForm();
  async function onSubmit() {
    const actionRes = await WebEmailVerificationResendAction();
    const formRes = await FormSubmitHelper(async () => actionRes, form);
    if (formRes?.success) {
      return toast.success(formRes?.message);
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
          <Field>
            <RHFormButtonComponent
              form={form}
              text="Resend Email"
            />
            <FieldError errors={[form?.formState?.errors?.code]} />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
