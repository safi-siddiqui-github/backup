"use client";

import {
  ControllerCheckboxComponent,
  ControllerInputComponent,
  FormButtonComponent,
} from "@/components/form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import {
  ActionResponseHelper,
  AmplifyFormSubmitHelper,
  AmplifyResponseHelper,
} from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { signIn } from "@aws-amplify/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthHeadingComponent from "../../_components/AuthHeadingComponent";
import GuestLayoutComponent from "../../_components/GuestLayoutComponent";
import { SigninSchema, SigninSchemaInfer } from "./validation";
import { AxiosClient } from "@/lib/lib-axios";

export default function SigninComponent() {
  return (
    <GuestLayoutComponent>
      <SignInForm />
      {/* <SocialLoginComponent /> */}
      <Link
        href={Routes?.web?.guest?.signup}
        className="text-center hover:underline"
      >
        <span>Don't have an account? </span>
        <span className="font-medium text-purple-500">Sign up</span>
      </Link>
    </GuestLayoutComponent>
  );
}

function SignInForm() {
  const form = useForm<SigninSchemaInfer>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });
  const router = useRouter();
  async function onSubmit(data: SigninSchemaInfer) {

    const fd = new FormData();
    fd.append("email", data?.email);
    fd.append("password", data?.password);

    
    const actionRes = await ActionResponseHelper(
      async () =>
        await AxiosClient.post(Routes.api.signin, fd),
    );

    console.log(actionRes)

    return;
    
    // const ampRes = await AmplifyResponseHelper(
    //   async () =>
    //     await signIn({
    //       username: data?.email,
    //       password: data?.password,
    //     }),
    // );
    const formRes = await AmplifyFormSubmitHelper(async () => ampRes, form);
    if (formRes?.success && ampRes?.data?.isSignedIn) {
      router?.push(Routes.web?.auth?.dashboard);
      toast("Sign In Success");
    }
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <FieldSet>
          <AuthHeadingComponent text="Welcome back" />
          <FieldDescription>
            Sign in to your account to continue
          </FieldDescription>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <ControllerInputComponent
              form={form}
              name="email"
              label="Email / Username"
              componentProps={{
                placeholder: "Enter email",
              }}
            />
            <Field>
              <ControllerInputComponent
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
            <ControllerCheckboxComponent
              form={form}
              name="remember"
              label="Remember Me"
            />
          </FieldGroup>
          <Field>
            <FormButtonComponent
              form={form}
              text="Sign In"
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}

// const axiosRes = await AxiosAmplifyResponseHelper<SignInOutput>(
//   async () => await AxiosClient.post("/auth/signin", data),
// );

// const sessionRes = await CreateSessionHelper({
//   session: {
//     accessToken: ampResSession?.data?.tokens?.accessToken?.toString(),
//     expiresAt: ampResSession?.data?.tokens?.accessToken?.payload.exp,
//   },
// });
// if (sessionRes?.success) {
// }
