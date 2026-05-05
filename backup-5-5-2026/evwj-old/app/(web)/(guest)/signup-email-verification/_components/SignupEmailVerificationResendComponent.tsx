"use client";

import { FormButtonComponent } from "@/components/form";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { AxiosClient } from "@/lib/lib-axios";
import { AxiosAmplifyResponseHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { ResendSignUpCodeOutput } from "@aws-amplify/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  SignupEmailVerificationResendSchema,
  SignupEmailVerificationResendSchemaInfer,
} from "./validation";

export default function SignupEmailVerificationResendComponent() {
  const params = useSearchParams();

  const form = useForm<SignupEmailVerificationResendSchemaInfer>({
    resolver: zodResolver(SignupEmailVerificationResendSchema),
    defaultValues: {
      email: params?.get("email") ?? "",
    },
  });
  async function onSubmit(data: SignupEmailVerificationResendSchemaInfer) {
    const axiosRes = await AxiosAmplifyResponseHelper<ResendSignUpCodeOutput>(
      async () =>
        await AxiosClient.post(Routes.api.signupEmailVerificationResend, data),
    );
    if (!axiosRes?.success) {
      return toast(`Email not sent`);
    }
    if (axiosRes?.success && axiosRes?.data?.destination) {
      toast(`Email sent to ${axiosRes?.data?.destination}`);
    }
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <Field>
            <FormButtonComponent
              form={form}
              text="Resend Verification Email"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
