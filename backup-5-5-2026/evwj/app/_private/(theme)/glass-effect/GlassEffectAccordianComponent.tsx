import { cn } from "@/lib/lib-shadcn";
import { ComponentPropsType } from "@/type/type-component";
import { ReactNode } from "react";
import {
  ShadcnAccordionItemComponent,
  ShadcnAccordionItemComponentProps,
} from "../../(shadcn)/ShadcnAccordianComponent";
import GlassEffectBackgroundComponent from "./GlassEffectBackgroundComponent";

type Props = {
  divProps?: ComponentPropsType<"div">;
  accordianProps: ShadcnAccordionItemComponentProps;
  children?: ReactNode;
};

export function GlassEffectAccordionItemComponent({
  children,
  accordianProps,
  divProps,
}: Props) {
  const { className, ...inlineDivProps } = divProps ?? {};

  return (
    <GlassEffectBackgroundComponent
      className={cn("rounded-2xl p-2", className)}
      {...inlineDivProps}
    >
      <ShadcnAccordionItemComponent {...accordianProps}>
        {children}
      </ShadcnAccordionItemComponent>
    </GlassEffectBackgroundComponent>
  );
}
