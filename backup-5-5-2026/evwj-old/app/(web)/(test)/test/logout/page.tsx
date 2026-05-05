"use client";

import { Spinner } from "@/components/ui/spinner";
import { AmplifyResponseHelper, ApiResponseHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { DeleteSessionHelper } from "@/lib/lib-session";
import { signOut } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

export default function Page() {
  const router = useRouter();
  const logoutFN = useCallback(async () => {
    return await ApiResponseHelper(async () => {
      // const webUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
      const ampRes = await AmplifyResponseHelper(async () => await signOut());
      const sessionRes = await DeleteSessionHelper();
      if (ampRes?.success || sessionRes?.success) {
        router.push(Routes.web.guest.signin);
        toast("Logout Success");
      }
      throw new ZodError([
        {
          code: "custom",
          message: "Logout API Failed",
          path: ["email"],
        },
      ]);
    });
  }, []);

  useEffect(() => {
    logoutFN();
  }, []);

  return (
    <div className="">
      <h2 className="">Logout Test</h2>
      <Spinner />
    </div>
  );
}
