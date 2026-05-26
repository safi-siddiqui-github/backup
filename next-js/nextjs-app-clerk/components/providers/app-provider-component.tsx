import NextThemesProviderComponent from "@/lib/next-themes/components/next-themes-provider-component";
import { ComponentProps } from "react";
import ShadcnTooltipProviderComponent from "./shadcn-tooltip-provider-component";
import { TanstackQueryProvider } from "./tanstack-query-provider";

export default function AppProviderComponent({
  children,
}: ComponentProps<"div">) {
  return (
    <NextThemesProviderComponent>
      <ShadcnTooltipProviderComponent>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </ShadcnTooltipProviderComponent>
    </NextThemesProviderComponent>
  );
}
