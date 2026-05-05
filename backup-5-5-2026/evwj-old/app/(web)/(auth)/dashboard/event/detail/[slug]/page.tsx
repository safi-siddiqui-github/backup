import EventDashboardHostingDetailComponent, {
  EventDashboardGoLiveFooter,
} from "@/components/general/event-dashboard/EventDashboardHostingDetailComponent";
import { ServerPropType } from "@/type";

export default async function Page(props: ServerPropType) {
  //
  const slug = (await props.params)?.slug;
  if (slug) {
  }
  //
  return (
    <div className="whatsapp-doodle-bg flex min-h-screen flex-col bg-white dark:bg-black">
      <div className="relative flex flex-1 flex-col">
        {/* Blurred gradient orbs backdrop (same style as home filtered events) */}
        <div className="pointer-events-none absolute top-0 flex h-full w-full flex-col">
          {/* Primary center orbs */}
          <div className="sticky top-32 flex w-full justify-center gap-4">
            <div className="h-56 max-w-xl flex-1 bg-blue-300/30 blur-3xl 2xl:max-w-2xl dark:bg-blue-600/30" />
            <div className="h-56 max-w-xl flex-1 bg-purple-300/30 blur-3xl 2xl:max-w-2xl dark:bg-purple-600/30" />
          </div>

          {/* Mid-page side orbs */}
          <div className="mt-[35vh] flex w-full justify-between px-6 md:px-12">
            <div className="h-40 w-40 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-600/25" />
            <div className="h-40 w-40 rounded-full bg-purple-300/25 blur-3xl dark:bg-purple-600/25" />
          </div>

          {/* Lower ambient orbs */}
          <div className="mt-auto mb-24 flex w-full justify-center gap-8">
            <div className="h-44 w-44 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/25" />
            <div className="h-44 w-44 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-600/25" />
          </div>
        </div>

        <div className="z-10 flex flex-1 flex-col">
          <div className="py-10 md:py-10 lg:py-9 xl:py-11" />
          <div className="flex-1 pb-24">
            <EventDashboardHostingDetailComponent slug={slug} />
          </div>
        </div>
      </div>

      <EventDashboardGoLiveFooter />

      {/*  */}
      {/* Component V2 */}
      {/* <EventDashboard /> */}
      {/*  */}
      {/*  */}
      {/* Component V1 */}
      {/* <div className="flex min-h-screen flex-col bg-linear-to-b from-blue-700 to-black">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="flex flex-1 flex-col gap-4 pt-28 pb-10 md:pt-32 lg:flex-row lg:gap-8">
            <div className="flex w-full flex-col lg:w-80 lg:shrink-0">
              <EventDashboardDetailComponent slug={slug} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <EventDashboardModuleComponent slug={slug} />
            </div>
          </div>
        </div>
      </div> */}
      {/*  */}
    </div>
  );
}
