import { cn } from "@/lib/lib-shadcn";
import { ComponentPropsType } from "@/type/type-component";
import GlassEffectBackgroundComponent from "./GlassEffectBackgroundComponent";

type Props = ComponentPropsType<"div">;

export default function GlassEffectIconComponent(props?: Props) {
  const { children, className } = props ?? {};

  return (
    <GlassEffectBackgroundComponent
      className={cn("rounded-full p-2 *:size-5", className)}
    >
      {children}
    </GlassEffectBackgroundComponent>
  );
}
