"use client";

import { Progress } from "@/shadcn/ui/progress";
import { ReactNode } from "react";

export default function ProgressComponent({
  progressValue = 50,
  progressShow = true,
  progressContent,
}: {
  progressValue?: number;
  progressShow?: boolean;
  progressContent?: ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <Progress
          // className="*:data-[slot=progress-indicator]:bg-ev-1"
          className="*:data-[slot=progress-indicator]:bg-white"
          value={progressValue}
        />
        {progressShow && (
          // <p className="text-ev-1 text-right font-medium">
          <p className="text-right font-medium text-white">
            {progressValue}% Completed
          </p>
        )}
        {progressContent}
      </div>
    </div>
  );
}
