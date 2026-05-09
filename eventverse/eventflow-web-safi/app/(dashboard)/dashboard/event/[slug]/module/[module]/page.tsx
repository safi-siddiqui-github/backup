import { findModule } from "@/actions/module";
import RsvpModule from "@/components/general/module/rsvp/RsvpModule";
import ScheduleModule from "@/components/general/module/schedule/ScheduleModule";
import SeatingModule from "@/components/general/module/seating/SeatingModule";

export default async function Page({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const slug = (await params).module;
  const moduleD = await findModule(slug);

  return (
    <div className="flex flex-col gap-10 p-4 md:px-10 md:py-8">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold md:text-3xl md:font-bold">
            {moduleD?.category?.name}
          </p>
        </div>
        <p className="">{moduleD?.category?.description}</p>
      </div>

      {slug.includes("rsvp-management") ? (
        <RsvpModule module={moduleD} />
      ) : slug.includes("schedule-timeline") ? (
        <ScheduleModule module={moduleD} />
      ) : slug.includes("seating-arrangement") ? (
        <SeatingModule module={moduleD} />
      ) : null}
    </div>
  );
}
