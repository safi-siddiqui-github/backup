"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AmplifyResponseHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { signOut } from "aws-amplify/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LogoutComponent() {
  const router = useRouter();
  const form = useForm();
  async function onSubmit() {
    const ampRes = await AmplifyResponseHelper(async () => await signOut());
    if (ampRes?.success) {
      router.push(Routes.web.guest.signin);
      toast("Logout Success");
    }
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Button
        variant={"destructive"}
        className="w-full"
        disabled={form?.formState?.isSubmitting}
      >
        {form?.formState?.isSubmitting ? (
          <Spinner className="" />
        ) : (
          <LogOut className="" />
        )}
        <span>Logout</span>
      </Button>
    </form>
  );
}
