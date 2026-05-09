import { ModuleWithSubsTwo } from "@/actions/module";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConferenceOverview(props: {
  module: ModuleWithSubsTwo;
}) {
  const moduleD = props.module;
  //
  const [totalDays, setTotalDays] = useState(0);
  const [totalSesions, setTotalSesions] = useState(0);
  //
  useEffect(() => {
    setTotalDays(moduleD?.scheduleDays?.length ?? 0);
    setTotalSesions(
      moduleD?.scheduleDays?.reduce(
        (acc, day) => acc + day.scheduleItems.length,
        0,
      ) ?? 0,
    );
  }, [moduleD]);

  return (
    <div className="flex flex-col gap-10">
      {/*  */}
      <div className="flex flex-wrap items-center gap-4">
        {/*  */}
        <Card className="flex-1">
          <CardContent className="flex items-center gap-4">
            <Calendar className="size-7" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">{totalDays}</CardTitle>
              <CardDescription>Conference Days</CardDescription>
            </div>
          </CardContent>
        </Card>
        {/*  */}
        <Card className="flex-1">
          <CardContent className="flex items-center gap-4">
            <Clock className="size-7" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">{totalSesions}</CardTitle>
              <CardDescription>Total Sessions</CardDescription>
            </div>
          </CardContent>
        </Card>
        {/*  */}
        <Card className="flex-1">
          <CardContent className="flex items-center gap-4">
            <Users className="size-7" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">{totalSesions}</CardTitle>
              <CardDescription>Total Registrations</CardDescription>
            </div>
          </CardContent>
        </Card>
        {/*  */}
      </div>
    </div>
  );
}
