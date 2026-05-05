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
import { ConfirmSignUpOutput } from "@aws-amplify/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthHeadingComponent from "../../_components/AuthHeadingComponent";
import GuestLayoutComponent from "../../_components/GuestLayoutComponent";
import SignupEmailVerificationResendComponent from "./SignupEmailVerificationResendComponent";
import {
  SignupEmailVerificationSchema,
  SignupEmailVerificationSchemaInfer,
} from "./validation";

export default function SignupEmailVerificationComponent() {
  return (
    <GuestLayoutComponent>
      <EVCheckEmailForm />
      <SignupEmailVerificationResendComponent />
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

function EVCheckEmailForm() {
  const params = useSearchParams();
  const email = params?.get("email") ?? "";
  // autoSignIn
  // const socialSEV = params?.get("socialSEV") ?? "";
  const router = useRouter();
  const form = useForm<SignupEmailVerificationSchemaInfer>({
    resolver: zodResolver(SignupEmailVerificationSchema),
    defaultValues: {
      email: email,
      token: "",
    },
  });
  async function onSubmit(data: SignupEmailVerificationSchemaInfer) {
    const axiosRes = await AxiosAmplifyResponseHelper<ConfirmSignUpOutput>(
      async () =>
        await AxiosClient.post(Routes.api.signupEmailVerification, data),
    );
    const formRes = await AmplifyFormSubmitHelper(async () => axiosRes, form);
    if (formRes?.success && axiosRes?.data?.isSignUpComplete) {
      router?.push(Routes.web?.guest?.signin);
      toast("Email Verifed");
    }
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <AuthHeadingComponent text="Email Verified?" />
          <FieldDescription>
            Verify your email to verify your credentials
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <ControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                disabled: true,
                placeholder: "Enter email address",
              }}
            />
            <ControllerInputComponent
              form={form}
              name="token"
              label="Token"
              componentProps={{
                placeholder: "Enter OTP code",
              }}
            />
          </FieldGroup>
          <Field>
            <FormButtonComponent
              form={form}
              text="Verify Your Email"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}

// if (socialSEV === "autoSignIn") {
//   const ampRes = await AmplifyResponseHelper(
//     async () =>
//       await signIn({
//         username: email,
//       }),
//   );
// }

// return;
