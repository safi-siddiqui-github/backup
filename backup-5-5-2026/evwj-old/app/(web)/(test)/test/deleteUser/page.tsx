"use client";

import { Spinner } from "@/components/ui/spinner";
import { AmplifyResponseHelper, ApiResponseHelper } from "@/lib/lib-responses";
import { deleteUser } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

export default function Page() {
  const router = useRouter();
  const deleteUserFN = useCallback(async () => {
    return await ApiResponseHelper(async () => {
      const ampRes = await AmplifyResponseHelper(
        async () => await deleteUser(),
      );
      if (ampRes?.success) {
        router.push("/test/logout");
        toast("Delete User Success");
      }
      throw new ZodError([
        {
          code: "custom",
          message: "DeleteUser API Failed",
          path: ["email"],
        },
      ]);
    });
  }, []);

  useEffect(() => {
    deleteUserFN();
  }, []);

  return (
    <div className="">
      <h2 className="">deleteUser Test</h2>
      <Spinner />
    </div>
  );
}
