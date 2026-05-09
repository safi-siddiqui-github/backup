"use client";

import { FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { AmplifyResponseHelper } from "@/lib/lib-responses";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import AuthHeadingComponent from "../../_components/AuthHeadingComponent";
import GuestLayoutComponent from "../../_components/GuestLayoutComponent";

export default function SocialLoginResponseComponent() {
  return (
    <GuestLayoutComponent>
      <SocialLoginResponseForm />
    </GuestLayoutComponent>
  );
}

function SocialLoginResponseForm() {
  const router = useRouter();
  const params = useSearchParams();

  const signUserIn = useCallback(async () => {
    // const email = params?.get("email");
    const ampResSession = await AmplifyResponseHelper(
      async (ctx) => await fetchAuthSession(ctx),
    );

    try {
      // const ampResSess = await AmplifyResponseHelper(
      //   async () => await getCurrentUser(),
      // );

    } catch (error) {
    }

 
  }, []);
  useEffect(() => {
    signUserIn();
  }, [signUserIn]);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center">
        <AuthHeadingComponent text="Social Login" />
        <FieldDescription>Logging user in</FieldDescription>
      </div>
      <Spinner />
    </div>
  );
}
