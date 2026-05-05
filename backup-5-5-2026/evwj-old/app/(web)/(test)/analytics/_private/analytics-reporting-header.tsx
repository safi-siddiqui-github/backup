import {
  Activity,
  Clock,
  DollarSign,
  Gauge,
  Grid3X3,
  HardDrive,
  TrendingUp,
  Users,
  BellRing,
} from "lucide-react";
import { BarChart3, Sparkles } from "lucide-react";

export default function AnalyticsAndReportingHeader() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 text-black dark:text-white">
      <div className="mb-6">
        <div className="relative overflow-hidden rounded-2xl border shadow-sm">
          {/* Light mode: softer pastel gradient for better text contrast */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-100 via-blue-100 to-cyan-100 opacity-90 dark:hidden" />
          {/* Dark mode: vivid gradient with reduced opacity */}
          <div className="absolute inset-0 hidden dark:block bg-linear-to-r from-violet-700 via-indigo-700 to-sky-700 opacity-60" />
          {/* Subtle highlight overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15)_0,transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.10)_0,transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08)_0,transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06)_0,transparent_30%)]" />
          <div className="relative flex items-center gap-4 p-6">
            <div className="bg-white/40 dark:bg-black/30 backdrop-blur rounded-xl p-3">
              <BarChart3 className="h-8 w-8 text-slate-700 dark:text-sky-200" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight bg-linear-to-r from-fuchsia-500 via-violet-500 to-sky-500 bg-clip-text text-transparent dark:from-fuchsia-400 dark:via-violet-400 dark:to-sky-400">
                Analytics Overview
              </h2>
              <p className="text-sm lg:text-base flex items-center gap-2 bg-linear-to-r from-emerald-600 via-amber-600 to-rose-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-amber-400 dark:to-rose-400">
                <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                Key performance indicators for your event
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6">
        <div className="flex min-w-0 flex-col rounded-xl border bg-linear-to-br from-pink-100 via-rose-50 to-orange-100 p-4 shadow-sm dark:from-pink-900/30 dark:via-rose-900/20 dark:to-orange-900/30">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
              <DollarSign className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="text-muted-foreground text-xs">Total Revenue</p>
          </div>
          <div className="mt-1 flex flex-wrap items-end gap-2">
            <span className="text-2xl font-bold sm:text-3xl">$248K</span>
            <span className="text-[11px] font-medium text-emerald-600 sm:text-xs">
              +23.5% vs forecast
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border bg-linear-to-br from-blue-100 via-indigo-50 to-cyan-100 p-4 shadow-sm dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-cyan-900/30">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-muted-foreground text-xs">Total Attendees</p>
          </div>
          <div className="mt-1 flex flex-wrap items-end gap-2">
            <span className="text-2xl font-bold sm:text-3xl">1,247</span>
            <span className="text-[11px] font-medium text-emerald-600 sm:text-xs">
              +12.3% vs planned
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border bg-linear-to-br from-emerald-100 via-green-50 to-teal-100 p-4 shadow-sm dark:from-emerald-900/30 dark:via-green-900/20 dark:to-teal-900/30">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
              <Activity className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-muted-foreground text-xs">Engagement</p>
          </div>
          <div className="mt-1 flex flex-wrap items-end gap-2">
            <span className="text-2xl font-bold sm:text-3xl">94.3%</span>
            <span className="text-primary text-[11px] font-medium sm:text-xs">
              Excellent performance
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border bg-linear-to-br from-violet-100 via-purple-50 to-fuchsia-100 p-4 shadow-sm dark:from-violet-900/30 dark:via-purple-900/20 dark:to-fuchsia-900/30">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
              <Grid3X3 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <p className="text-muted-foreground text-xs">Module Utilization</p>
          </div>
          <div className="mt-1 flex flex-wrap items-end gap-2">
            <span className="text-2xl font-bold sm:text-3xl">87.5%</span>
            <span className="text-primary text-[11px] font-medium sm:text-xs">
              Optimal coverage
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border bg-linear-to-br from-amber-100 via-yellow-50 to-lime-100 p-4 shadow-sm dark:from-amber-900/30 dark:via-yellow-900/20 dark:to-lime-900/30">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
              <Gauge className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-muted-foreground text-xs">Event Efficiency</p>
          </div>
          <div className="mt-1 flex flex-wrap items-end gap-2">
            <span className="text-2xl font-bold sm:text-3xl">92.1%</span>
            <span className="text-primary text-[11px] font-medium sm:text-xs">
              High performance
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border bg-linear-to-br from-sky-100 via-slate-50 to-blue-100 p-4 shadow-sm dark:from-sky-900/30 dark:via-slate-900/20 dark:to-blue-900/30">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
              <TrendingUp className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-muted-foreground text-xs">Predicted ROI</p>
          </div>
          <div className="mt-1 flex flex-wrap items-end gap-2">
            <span className="text-2xl font-bold sm:text-3xl">340%</span>
            <span className="text-primary text-[11px] font-medium sm:text-xs">
              Above industry avg
            </span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-8">
        <h3 className="text-foreground flex items-center gap-2 text-2xl font-bold lg:text-3xl">
          <BellRing className="h-7 w-7 text-rose-600 dark:text-rose-400" />
          <span>Real-time Intelligence Alerts</span>
        </h3>
        <div className="mt-3 space-y-3">
          <div className="rounded-lg border border-rose-200 bg-linear-to-br from-rose-100 via-pink-50 to-orange-100 p-4 dark:border-rose-700 dark:from-rose-900/30 dark:via-pink-900/20 dark:to-orange-900/30">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
                <TrendingUp className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <p className="font-medium">
                VIP ticket sales surge detected (+45% in last hour)
              </p>
            </div>
            <p className="text-sm text-rose-700 dark:text-rose-300">
              Recommended Action: Consider dynamic pricing
            </p>
            <p className="text-muted-foreground text-xs">2 minutes ago</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-linear-to-br from-amber-100 via-yellow-50 to-lime-100 p-4 dark:border-amber-700 dark:from-amber-900/30 dark:via-yellow-900/20 dark:to-lime-900/30">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="font-medium">
                Schedule running 8 minutes behind in Track A
              </p>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Recommended Action: Adjust buffer times
            </p>
            <p className="text-muted-foreground text-xs">5 minutes ago</p>
          </div>
          <div className="rounded-lg border border-sky-200 bg-linear-to-br from-sky-100 via-slate-50 to-blue-100 p-4 dark:border-sky-700 dark:from-sky-900/30 dark:via-slate-900/20 dark:to-blue-900/30">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-white/40 p-1.5 dark:bg-black/20">
                <HardDrive className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <p className="font-medium">
                Photo upload rate exceeding storage projections
              </p>
            </div>
            <p className="text-sm text-sky-700 dark:text-sky-300">
              Recommended Action: Monitor capacity
            </p>
            <p className="text-muted-foreground text-xs">12 minutes ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
