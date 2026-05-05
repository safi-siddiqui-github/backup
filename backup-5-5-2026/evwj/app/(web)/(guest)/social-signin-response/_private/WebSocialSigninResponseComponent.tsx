"use client";

import { Routes } from "@/lib/lib-routes";
import { FieldDescription, FieldLegend } from "@/shadcn/ui/field";
import { Spinner } from "@/shadcn/ui/spinner";
import { useUserStore } from "@/store/store-user";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { WebSocialSigninResponseAction } from "./action";

export default function WebSocialSigninResponseComponent() {
  return (
    <div className="flex flex-col">
      <Suspense>
        <WebSocialLoginResponseForm />
      </Suspense>
    </div>
  );
}

function WebSocialLoginResponseForm() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const params = useSearchParams();
  const encrypted = params.get("responseStatus");

  const socialSigninFN = useCallback(async () => {
    const actionRes = await WebSocialSigninResponseAction({
      token: {
        encrypted,
      },
    });

    if (actionRes?.success) {
      setUser(actionRes?.data?.token?.user);

      if (actionRes?.data?.token?.user?.emailVerified) {
        toast.success("Sign In Success");
        return router?.push(Routes.web?.auth?.dashboard);
      } else {
        toast.success("Verification Email Sent");
        return router?.push(Routes.web?.auth?.emailVerification);
      }
    }

    toast.error(actionRes?.error?.at(0)?.message ?? "Porcess Not Completed");
  }, [encrypted, router, setUser]);

  useEffect(() => {
    socialSigninFN();
  }, [socialSigninFN]);

  return (
    <div className="flex flex-col p-4">
      <FieldLegend className="text-2xl! font-bold md:text-3xl!">
        Social Sign In
      </FieldLegend>
      <FieldDescription>Signing user in...</FieldDescription>
      <Spinner />
    </div>
  );
}
