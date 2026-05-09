"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import ScheduleItemComponent from "@/components/ui-extends/schedule/ScheduleItemComponent";
import ScheduleOverviewComponent from "@/components/ui-extends/schedule/ScheduleOverviewComponent";

export default function ScheduleSimple(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-col md:max-w-xs md:flex-1">
        <ScheduleOverviewComponent module={moduleD} />
      </div>

      <div className="flex flex-col md:flex-1">
        <ScheduleItemComponent />
      </div>
    </div>
  );
}
