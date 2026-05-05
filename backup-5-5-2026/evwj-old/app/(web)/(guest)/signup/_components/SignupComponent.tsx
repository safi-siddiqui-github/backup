"use client";

import {
  ControllerCheckboxComponent,
  ControllerInputComponent,
  ControllerPhoneNumberCountryCodeComponent,
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
import { SignUpOutput } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthHeadingComponent from "../../_components/AuthHeadingComponent";
import GuestLayoutComponent from "../../_components/GuestLayoutComponent";
import { SignupSchema, SignupSchemaInfer } from "./validation";

export default function SignupComponent() {
  return (
    <GuestLayoutComponent>
      <SignUpForm />
      {/* <SocialLoginComponent /> */}
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

function SignUpForm() {
  const form = useForm<SignupSchemaInfer>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      countryCode: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreedTerms: true,
    },
  });
  const router = useRouter();
  async function onSubmit(data: SignupSchemaInfer) {
    const axiosRes = await AxiosAmplifyResponseHelper<SignUpOutput>(
      async () => await AxiosClient.post(Routes.api.signup, data),
    );
    const formRes = await AmplifyFormSubmitHelper(async () => axiosRes, form);
    if (
      formRes?.success &&
      axiosRes?.data?.nextStep?.signUpStep === "CONFIRM_SIGN_UP"
    ) {
      router?.push(
        `${Routes.web?.guest?.signupEmailVerification}?email=${data?.email}`,
      );
      toast("Verification Email Sent");
    }
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <AuthHeadingComponent text="Create your account" />
          <FieldDescription>Get started with EventVerse today</FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <ControllerInputComponent
              form={form}
              name="firstname"
              label="First Name"
              componentProps={{
                placeholder: "John",
              }}
            />
            <ControllerInputComponent
              form={form}
              name="lastname"
              label="Last Name"
              componentProps={{
                placeholder: "Doe",
              }}
            />
            <ControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                placeholder: "johndoe@gmail.com",
              }}
            />
            <ControllerPhoneNumberCountryCodeComponent
              form={form}
              label="Phone Number"
              countryCodeName="countryCode"
              phoneNumberName="phone"
              phoneNumberProps={{
                placeholder: "Enter Phone Number",
              }}
            />
            <ControllerInputComponent
              form={form}
              name="password"
              label="Password"
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
            <ControllerCheckboxComponent
              form={form}
              name="agreedTerms"
              label="I agree to the Terms of Services and Privacy Policy"
            />
          </FieldGroup>
          <Field>
            <FormButtonComponent
              form={form}
              text="Create Account"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
