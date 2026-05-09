"use client";

import {
  WebSignupSchema,
  WebSignupSchemaInfer,
} from "@/app/api/web/guest/signup/_private/validation";
import {
  RHFormButtonComponent,
  RHFormControllerCheckboxComponent,
  RHFormControllerInputComponent,
  RHFormControllerPhoneNumberCountryCodeComponent,
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
import { WebSignupAction } from "./action";

export default function WebSignupComponent() {
  return (
    <div className="flex flex-col gap-2">
      <SignUpForm />
      <Link
        href={Routes?.web?.guest?.signin}
        className="text-center hover:underline"
      >
        <span>Already have an account? </span>
        <span className="font-medium text-purple-500">Sign in</span>
      </Link>
      <WebGuestSocialLoginComponent />
    </div>
  );
}

function SignUpForm() {
  const router = useRouter();
  const userStore = useUserStore();
  const form = useForm<WebSignupSchemaInfer>({
    resolver: zodResolver(WebSignupSchema),
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
  async function onSubmit(data: WebSignupSchemaInfer) {
    const actionRes = await WebSignupAction({
      user: data,
    });
    const formRes = await FormSubmitHelper(async () => actionRes, form);
    if (formRes?.success) {
      userStore?.setUser(formRes?.data?.token?.user);
      toast.success("Verification Email Sent");
      return router?.push(Routes.web?.auth?.emailVerification);
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
            Create your account
          </FieldLegend>
          <FieldDescription>Get started with EventVerse today</FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <RHFormControllerInputComponent
              form={form}
              name="firstname"
              label="First Name"
              componentProps={{
                placeholder: "John",
              }}
            />
            <RHFormControllerInputComponent
              form={form}
              name="lastname"
              label="Last Name"
              componentProps={{
                placeholder: "Doe",
              }}
            />
            <RHFormControllerInputComponent
              form={form}
              name="email"
              label="Email"
              componentProps={{
                placeholder: "johndoe@gmail.com",
              }}
            />
            <RHFormControllerPhoneNumberCountryCodeComponent
              form={form}
              label="Phone Number"
              countryCodeName="countryCode"
              phoneNumberName="phone"
              phoneNumberProps={{
                placeholder: "Enter Phone Number",
              }}
            />
            <RHFormControllerInputComponent
              form={form}
              name="password"
              label="Password"
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
            <RHFormControllerCheckboxComponent
              form={form}
              name="agreedTerms"
              label="I agree to the Terms of Services and Privacy Policy"
            />
          </FieldGroup>
          <Field>
            <RHFormButtonComponent
              form={form}
              text="Create Account"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
