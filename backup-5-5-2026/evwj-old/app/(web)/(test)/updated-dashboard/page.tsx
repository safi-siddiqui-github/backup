 
import UserDashboard from "@/components/preview/dashboard/UserDashboard";

export default function DashboardPage() {
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
          <div className="py-7" />
          <UserDashboard />
          {/* <DashboardPageComponent /> */}
        </div>
      </div>
    </div>
  );
}
