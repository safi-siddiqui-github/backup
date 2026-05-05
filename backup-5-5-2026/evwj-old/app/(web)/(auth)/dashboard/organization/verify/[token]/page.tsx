"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyOrganizationPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const token = params.token as string;
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification token");
        return;
      }

      // const response = await ActionResponseHelper(async () => {
      //   return await VerifyOrganizationEmailAction(token);
      // });

      // if (response.success) {
      //   setStatus("success");
      //   setMessage(
      //     response.message || "Organization email verified successfully",
      //   );
      //   toast.success(response.message || "Organization verified successfully");
      //   // Redirect after 3 seconds
      //   setTimeout(() => {
      //     router.push(`${Routes.web.auth.dashboardSettings}?tab=account`);
      //   }, 3000);
      // } else {
      //   setStatus("error");
      //   setMessage(response.message || "Failed to verify organization email");
      //   toast.error(response.message || "Verification failed");
      // }
    };

    verify();
  }, [params.token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white! backdrop-blur-sm dark:bg-slate-800/95!">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <div className="mb-4 flex justify-center">
                <Loader2 className="text-primary h-16 w-16 animate-spin" />
              </div>
              <CardTitle>Verifying Organization</CardTitle>
              <CardDescription>
                Please wait while we verify your organization email...
              </CardDescription>
            </>
          )}
          {status === "success" && (
            <>
              <div className="mb-4 flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-green-600 dark:text-green-400">
                Verification Successful
              </CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}
          {status === "error" && (
            <>
              <div className="mb-4 flex justify-center">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-red-600 dark:text-red-400">
                Verification Failed
              </CardTitle>
              <CardDescription>{message}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="text-center">
          {status === "success" && (
            <p className="text-muted-foreground mb-4 text-sm">
              Redirecting to settings...
            </p>
          )}
          {status === "error" && (
            <Link href={Routes.web.auth.dashboardSettings}>
              <Button className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Go to Settings
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
