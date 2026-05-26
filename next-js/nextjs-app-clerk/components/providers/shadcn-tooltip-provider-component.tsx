import { ComponentProps } from "react";
import { TooltipProvider } from "../ui/tooltip";

export default function ShadcnTooltipProviderComponent({
  children,
}: ComponentProps<typeof TooltipProvider>) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
