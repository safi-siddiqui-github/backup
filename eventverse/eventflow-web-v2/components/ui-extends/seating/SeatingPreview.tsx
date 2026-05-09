"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import SeatingArrangementComponent from "./SeatingArrangementComponent";
import SeatingCanvasComponent from "./SeatingCanvasComponent";

export default function SeatingPreview(props: { module: ModuleWithSubsTwo }) {
  //
  const moduleD = props?.module;
  //
  return (
    <div className="flex flex-col overflow-auto border">
      <div className="relative flex min-h-[2000px] min-w-[2000px] resize flex-col overflow-auto">
        {/*  */}
        <div className="absolute top-0 left-0 flex h-full w-full flex-col opacity-25">
          <SeatingCanvasComponent module={moduleD} />
        </div>
        <div className="absolute top-0 left-0 flex h-full w-full flex-col opacity-75">
          <SeatingArrangementComponent module={moduleD} />
        </div>
      </div>
    </div>
  );
}
