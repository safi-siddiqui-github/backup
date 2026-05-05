import { cn } from "@/lib/lib-shadcn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
import {
  AccordionMultipleProps,
  AccordionSingleProps,
} from "@radix-ui/react-accordion";
import { ComponentProps } from "react";

type ShadcnAccordionMultipleProps = Partial<AccordionMultipleProps>;
export function ShadcnAccordionMultipleComponent({
  children,
  type = "multiple",
  ...props
}: ShadcnAccordionMultipleProps) {
  return (
    <Accordion
      {...props}
      type={type}
    >
      {children}
    </Accordion>
  );
}

type ShadcnAccordionSingleProps = Partial<AccordionSingleProps>;
export function ShadcnAccordionSingleComponent({
  children,
  type = "single",
  collapsible = true,
  ...props
}: ShadcnAccordionSingleProps) {
  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      {...props}
    >
      {children}
    </Accordion>
  );
}

export type ShadcnAccordionItemComponentProps = ComponentProps<
  typeof AccordionItem
>;
export function ShadcnAccordionItemComponent({
  children,
  ...props
}: ShadcnAccordionItemComponentProps) {
  return <AccordionItem {...props}>{children}</AccordionItem>;
}

type ShadcnAccordionTriggerComponentProps = ComponentProps<
  typeof AccordionTrigger
>;
export function ShadcnAccordionTriggerComponent({
  children,
  className,
  ...props
}: ShadcnAccordionTriggerComponentProps) {
  return (
    <AccordionTrigger
      className={cn("items-center py-0", className)}
      {...props}
    >
      {children}
    </AccordionTrigger>
  );
}

type ShadcnAccordionContentComponentProps = ComponentProps<
  typeof AccordionContent
>;
export function ShadcnAccordionContentComponent({
  children,
  className,
  ...props
}: ShadcnAccordionContentComponentProps) {
  return (
    <AccordionContent
      className={`flex flex-col gap-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </AccordionContent>
  );
}
