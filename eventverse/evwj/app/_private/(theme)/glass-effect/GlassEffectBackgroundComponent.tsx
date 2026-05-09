import { cn } from "@/lib/lib-shadcn";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function GlassEffectBackgroundComponent(props?: Props) {
  const { children, className } = props ?? {};

  return (
    <div
      className={cn(
        "overflow-hidden bg-white/10 backdrop-blur hover:bg-black/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
