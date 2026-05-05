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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthHeadingComponent from "../../../_components/AuthHeadingComponent";
import GuestLayoutComponent from "../../../_components/GuestLayoutComponent";
import {
  ForgotPasswordUpdatePasswordSchema,
  ForgotPasswordUpdatePasswordSchemaInfer,
} from "./validation";

export default function ForgotPasswordUpdatePasswordComponent() {
  return (
    <GuestLayoutComponent>
      <FPUpdatePasswordForm />
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

function FPUpdatePasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const form = useForm<ForgotPasswordUpdatePasswordSchemaInfer>({
    resolver: zodResolver(ForgotPasswordUpdatePasswordSchema),
    defaultValues: {
      email: params?.get("email") ?? "",
      token: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: ForgotPasswordUpdatePasswordSchemaInfer) {
    const axiosRes = await AxiosAmplifyResponseHelper(
      async () =>
        await AxiosClient.post(Routes.api.forgotPasswordUpdatePassword, data),
    );
    const formRes = await AmplifyFormSubmitHelper(async () => axiosRes, form);
    if (formRes?.success) {
      router?.push(Routes.web?.guest.signin);
      toast("Password Updated");
    }
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <AuthHeadingComponent text="Update password" />
          <FieldDescription>
            Enter new credentials for your account
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <ControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                placeholder: "Enter email address",
                disabled: true,
              }}
            />
            <ControllerInputComponent
              form={form}
              name="token"
              label="Code"
              componentProps={{
                placeholder: "Enter OTP code",
              }}
            />
            <ControllerInputComponent
              form={form}
              name="password"
              label="New Password"
              componentProps={{
                placeholder: "********",
                type: "password",
              }}
            />
            <ControllerInputComponent
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
            <FormButtonComponent
              form={form}
              text="Update Credentials"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
