import { ModuleWithSubsTwo } from "@/actions/module";
import { findScheduleDayWhereModuleId } from "@/actions/schedule";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDayTime, formatLowercase } from "@/lib/helpers";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event as RBCEvent,
  View,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import LoaderSpin from "../LoaderSpin";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

type CustomEvent = {
  description?: string;
} & RBCEvent;

export default function ConferenceCalendar(props: {
  module: ModuleWithSubsTwo;
}) {
  const moduleD = props.module;
  const [isLoading, setIsLoading] = useState(false);
  // const [scheduleTracks, setScheduleTracks] = useState<ScheduleTrack[]>([]);
  //
  const [scheduleDays, setScheduleDays] = useState<CustomEvent[]>([]);
  // const [scheduleDay, setScheduleDay] = useState<ScheduleDayWithSubs | null>(
  //   null,
  // );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.DAY);
  const views = useMemo(
    () =>
      Object.values(Views).filter((each) => {
        return each !== "work_week" && each !== "agenda";
      }),
    [],
  );
  //
  const findScheduleDaysFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findScheduleDayWhereModuleId(moduleD?.id ?? 0);

    const modify: CustomEvent[] =
      result?.flatMap(
        (each) =>
          each?.scheduleSessions?.map((eachS) => ({
            id: eachS?.id ?? each?.id, // unique id
            title: eachS?.name ?? "",
            description: eachS?.description ?? "",
            start: formatDayTime(each?.day, eachS?.startTime), // Date ✅
            end: formatDayTime(each?.day, eachS?.endTime), // Date ✅
            // start: new Date(formatDayTime(each?.day, eachS?.startTime)), // Date ✅
            // end: new Date(formatDayTime(each?.day, eachS?.endTime)), // Date ✅
          })) ?? [],
      ) ?? [];

    // setScheduleDays(result);
    setScheduleDays(modify);
    setIsLoading(false);
  }, [moduleD?.id]);
  //
  useEffect(() => {
    findScheduleDaysFN();
  }, [findScheduleDaysFN]);
  //
  return (
    <Card className="flex flex-col gap-4">
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">Conference Calendar</CardTitle>
          {isLoading ? <LoaderSpin /> : null}
        </div>

        {/*  */}
      </CardContent>

      <Separator />

      <style></style>

      <CardContent className="flex w-full flex-col overflow-x-auto">
        <Calendar
          localizer={localizer}
          // events={events}
          events={scheduleDays}
          startAccessor="start"
          endAccessor="end"
          step={30}
          timeslots={2}
          // style={{ height: "100%" }}
          className="w-full min-w-max"
          date={currentDate} // controlled date
          onNavigate={(date) => setCurrentDate(date)} // navigation works
          views={["month", "week", "day", "agenda"]} // ✅ enable all views
          view={view}
          onView={(newView) => setView(newView)} // track view change
          dayLayoutAlgorithm="no-overlap"
          components={{
            toolbar: ({ onNavigate, label, onView }) => (
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    onClick={() => onNavigate("PREV")}
                  >
                    Previous
                  </Button>
                  <Button onClick={() => onNavigate("TODAY")}>Today</Button>
                  <Button
                    variant={"outline"}
                    onClick={() => onNavigate("NEXT")}
                  >
                    Next
                  </Button>
                </div>

                <CardTitle>{label}</CardTitle>

                <div className="flex items-center gap-2">
                  {views?.map((each) => (
                    <Button
                      key={each}
                      variant={"outline"}
                      onClick={() => onView(each)}
                    >
                      {formatLowercase(each)}
                    </Button>
                  ))}
                </div>
              </div>
            ),
            //   toolbar: ({ label, onNavigate, onView }) => (
            //     <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3 shadow-sm">
            //       <div className="flex gap-2">
            //         <button
            //           onClick={() => onNavigate("PREV")}
            //           className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
            //         >
            //           Previous
            //         </button>
            //         <button
            //           onClick={() => onNavigate("TODAY")}
            //           className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white shadow hover:bg-blue-700"
            //         >
            //           Today
            //         </button>
            //         <button
            //           onClick={() => onNavigate("NEXT")}
            //           className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
            //         >
            //           Next
            //         </button>
            //       </div>
            //       <h2 className="text-lg font-semibold">{label}</h2>
            //       <div className="flex gap-2">
            //         {["month", "week", "day", "agenda"].map((v) => (
            //           <button
            //             key={v}
            //             onClick={() => onView(v)}
            //             className={`rounded-md px-3 py-1 text-sm capitalize ${
            //               view === v
            //                 ? "bg-blue-600 text-white shadow"
            //                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            //             }`}
            //           >
            //             {v}
            //           </button>
            //         ))}
            //       </div>
            //     </div>
            //   ),

            //   header: ({ label }) => (
            //     <div className="w-full border-b bg-gray-50 py-2 text-center text-sm font-medium text-gray-700">
            //       {label}
            //     </div>
            //   ),

            //   // ✅ Day column wrapper (week/day views)
            //   dayColumnWrapper: ({ children }) => (
            //     <div className="relative border-l">{children}</div>
            //   ),

            //   // ✅ Date cell (month view)
            //   dateCellWrapper: ({ children, value }) => (
            //     <div className="h-24 border-r border-b bg-white p-1 hover:bg-gray-50">
            //       <span className="block text-xs text-gray-500">
            //         {value.getDate()}
            //       </span>
            //       {children}
            //     </div>
            //   ),

            //   // ✅ Time gutter (week/day left column)
            //   timeGutterHeader: () => (
            //     <div className="bg-gray-100 text-xs font-medium text-gray-600">
            //       Time
            //     </div>
            //   ),
            //   timeGutterWrapper: ({ children }) => (
            //     <div className="border-r bg-gray-50 text-xs text-gray-500">
            //       {children}
            //     </div>
            //   ),

            //   // ✅ Event block
            //   event: ({ event }) => (
            //     <div className="rounded-md border border-blue-300 bg-blue-100 p-1.5 text-xs text-blue-900 shadow-sm">
            //       <p className="text-sm font-medium">{event.title}</p>
            //       {event?.description && (
            //         <p className="line-clamp-2 text-xs text-gray-700">
            //           {event.description}
            //         </p>
            //       )}
            //     </div>
            //   ),

            //   // ✅ Agenda view
            //   agenda: {
            //     date: ({ label }) => (
            //       <div className="px-2 py-1 text-sm font-medium text-gray-600">
            //         {label}
            //       </div>
            //     ),
            //     time: ({ label }) => (
            //       <div className="px-2 py-1 text-xs text-gray-500">{label}</div>
            //     ),
            //     event: ({ event }) => (
            //       <div className="rounded-md bg-blue-50 px-2 py-1 text-sm text-blue-800">
            //         {event.title}
            //       </div>
            //     ),
            //   },

            //   // dateCellWrapper: () => <div className="">as</div>,

            //   // dayColumnWrapper: ({ children, props }) => (
            //   //   <div className="relative">{children}</div>
            //   // ),

            //   // dateCellWrapper:({children})=>(
            //   //   <div className="min-w-max bg-blue-500">
            //   //     {children}
            //   //   </div>
            //   // ),
            // eventContainerWrapper: ({ children }) => (
            //   <div className="w-full !min-w-max">{children}</div>
            // ),

            // eventWrapper: ({ label, children }) => (
            //   <div className="min-w-max min-w-96">{children}</div>
            // ),

            event: ({ event }) => (
              <div className="min-w-max rounded-lg border border-blue-300 bg-blue-100 p-2 text-blue-900 shadow-sm">
                <p className="font-semibold">{event.title}</p>
                <p className="text-xs">{event?.description}</p>
              </div>
            ),
          }}
        />
      </CardContent>

      {/*  */}
    </Card>
  );
}
