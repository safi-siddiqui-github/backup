"use client";

import {
  ControllerInputComponent,
  FormButtonComponent,
} from "@/components/form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { AxiosClient } from "@/lib/lib-axios";
import {
  AmplifyFormSubmitHelper,
  AxiosAmplifyResponseHelper,
} from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { ResetPasswordOutput } from "@aws-amplify/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthHeadingComponent from "../../../_components/AuthHeadingComponent";
import GuestLayoutComponent from "../../../_components/GuestLayoutComponent";
import {
  ForgotPasswordCheckEmailSchema,
  ForgotPasswordCheckEmailSchemaInfer,
} from "./validation";

export default function ForgotPasswordCheckEmailComponent() {
  return (
    <GuestLayoutComponent>
      <FPCheckEmailForm />
      <Link
        href={Routes?.web?.guest?.signin}
        className="text-center hover:underline"
      >
        <span>Already have an account? </span>
        <span className="font-medium text-purple-500">Sign in</span>
      </Link>
    </GuestLayoutComponent>
  );
}

function FPCheckEmailForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordCheckEmailSchemaInfer>({
    resolver: zodResolver(ForgotPasswordCheckEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data: ForgotPasswordCheckEmailSchemaInfer) {
    const axiosRes = await AxiosAmplifyResponseHelper<ResetPasswordOutput>(
      async () =>
        await AxiosClient.post(Routes.api.forgotPasswordCheckEmail, data),
    );
    const formRes = await AmplifyFormSubmitHelper(async () => axiosRes, form);
    if (
      formRes?.success &&
      formRes?.data?.nextStep?.resetPasswordStep ===
        "CONFIRM_RESET_PASSWORD_WITH_CODE"
    ) {
      router?.push(
        `${Routes.web?.guest?.forgotPasswordUpdatePassword}?email=${data?.email}`,
      );
      toast("OTP Email Sent");
    }
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <AuthHeadingComponent text="Forgot Password?" />
          <FieldDescription>
            Enter your email to update your credentials
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1">
            <ControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                placeholder: "Enter email address",
              }}
            />
          </FieldGroup>
          <Field>
            <FormButtonComponent
              form={form}
              text="Get Reset Link"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
