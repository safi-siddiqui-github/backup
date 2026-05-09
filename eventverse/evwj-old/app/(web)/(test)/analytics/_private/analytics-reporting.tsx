import AnalyticsAndReportingTabs from "./analytics-reporting-tab";
import { BarChart3, Sparkles } from "lucide-react";

export default function AnalyticsAndReportingComponent() {
  return (
    <>
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
      </div>

      <AnalyticsAndReportingTabs />
    </>
  );
}
