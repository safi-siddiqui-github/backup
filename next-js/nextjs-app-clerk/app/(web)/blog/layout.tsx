import { ConstantRoutes } from "@/constants/constants-routes";
import { ClerkProvider } from "@clerk/nextjs";
import { ComponentProps } from "react";

export default function Layout({ children }: ComponentProps<"div">) {
  return (
    <ClerkProvider afterSignOutUrl={ConstantRoutes?.blog?.home}>
      {children}
    </ClerkProvider>
  );
}
