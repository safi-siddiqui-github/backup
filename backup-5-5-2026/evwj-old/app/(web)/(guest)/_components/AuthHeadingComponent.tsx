"use client";

import { FieldLegend } from "@/components/ui/field";

export default function AuthHeadingComponent({ text }: { text?: string }) {
  return (
    <FieldLegend className="text-2xl! font-bold md:text-3xl!">
      {text}
    </FieldLegend>
  );
}
