"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import SeatingArrangement from "@/components/ui-extends/seating/SeatingArrangement";

export default function SeatingModule(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  //
  return (
    <div className="flex flex-col gap-10">
      <SeatingArrangement module={moduleD} />
    </div>
  );
}
