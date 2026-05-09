import { ModuleWithSubsTwo } from "@/actions/module";
import {
  findScheduleDay,
  findScheduleDayWhereModuleId,
  ScheduleDayWithSubs,
  ScheduleDayWithSubsTwo,
} from "@/actions/schedule";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateToString } from "@/lib/helpers";
import { useCallback, useEffect, useState } from "react";
import LoaderSpin from "../LoaderSpin";

export default function ScheduleOverviewComponent(props: {
  module: ModuleWithSubsTwo;
}) {
  //
  const moduleD = props.module;
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleDays, setScheduleDays] = useState<ScheduleDayWithSubs[]>([]);
  const [scheduleDay, setScheduleDay] = useState<ScheduleDayWithSubsTwo | null>(
    null,
  );
  const findScheduleDaysFN = useCallback(async () => {
    setIsLoading(true);
    const scheduleDays = await findScheduleDayWhereModuleId(moduleD?.id ?? 0);
    setScheduleDays(scheduleDays);
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findScheduleDaysFN();
  }, [findScheduleDaysFN]);
  //
  const findScheduleDayFN = async (id: number) => {
    setIsLoading(true);
    const scheduleDay = await findScheduleDay(id);
    setScheduleDay(scheduleDay);
    setIsLoading(false);
  };
  //
  const triggerFindScheduleItemsFN = async (id: number) => {
    await findScheduleDayFN(id);
    const event = new CustomEvent("findScheduleItemsAction", {
      detail: id,
    });
    window.dispatchEvent(event);
  };
  return (
    <Card className="flex flex-col gap-4">
      {/*  */}

      <CardContent>
        <CardTitle>Schedule Overview</CardTitle>
      </CardContent>

      {/*  */}

      <CardContent className="flex flex-wrap items-center justify-evenly text-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-purple-600">
            {scheduleDays?.reduce(
              (acc, day) => acc + day.scheduleItems.length,
              0,
            ) ?? 0}
          </p>
          <CardDescription>Total Items</CardDescription>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-blue-600">
            {scheduleDays?.length ?? 0}
          </p>
          <CardDescription>Event Days</CardDescription>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-green-600">
            {scheduleDay?.scheduleItems?.length ?? 0}
          </p>
          <CardDescription>Today&apos;s Items</CardDescription>
        </div>
      </CardContent>

      <Separator />

      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <CardTitle>Event Days</CardTitle>
          {isLoading ? <LoaderSpin /> : null}
        </div>

        {/*  */}
      </CardContent>

      {/*  */}

      <CardContent className="flex flex-col gap-2">
        {scheduleDays?.map((each) => (
          <Button
            key={each?.id}
            variant={each?.id === scheduleDay?.id ? "default" : "outline"}
            className="flex h-fit flex-col"
            onClick={() => triggerFindScheduleItemsFN(each?.id)}
          >
            <CardTitle>
              {`${each?.name} - ${formatDateToString(each?.day)}`}
            </CardTitle>
            <CardDescription>
              {each?.scheduleItems?.length ?? 0} Items | 09:00 - 11:00
            </CardDescription>
          </Button>
        ))}
      </CardContent>

      {/*  */}
    </Card>
  );
}
