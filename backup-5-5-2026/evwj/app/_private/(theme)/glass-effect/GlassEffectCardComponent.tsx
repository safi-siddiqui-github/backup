import { cn } from "@/lib/lib-shadcn";
import { ComponentPropsType } from "@/type/type-component";
import GlassEffectBackgroundComponent from "./GlassEffectBackgroundComponent";

type Props = ComponentPropsType<"div">;

export default function GlassEffectCardComponent(props?: Props) {
  const { children, className } = props ?? {};

  return (
    <GlassEffectBackgroundComponent
      className={cn(
        "flex flex-col gap-1 overflow-hidden rounded-2xl p-2",
        className,
      )}
    >
      {children}
    </GlassEffectBackgroundComponent>
  );
}
