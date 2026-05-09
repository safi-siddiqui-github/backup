import { cn } from "@/lib/lib-shadcn";
import { ComponentPropsType } from "@/type/type-component";

type Props = ComponentPropsType<"button">;

export default function GlassEffectButtonComponent(props?: Props) {
  const { children, className, ...propsInline } = props ?? {};

  return (
    <button
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur hover:bg-black/40",
        className,
      )}
      {...propsInline}
    >
      {children}
    </button>
  );
}
