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
import { ReusableBarChart } from '../lib/lib-barchart';
import { ReusablePieChart } from '../lib/lib-piechart';
import ModulePerformanceCards from './module-performance-cards';

const data = [
  { name: 'RSVP', performance: 92, efficiency: 88, engagement: 85 },
  { name: 'Ticketing', performance: 88, efficiency: 91, engagement: 82 },
  { name: 'Budget', performance: 85, efficiency: 89, engagement: 79 },
  { name: 'Seating', performance: 90, efficiency: 87, engagement: 88 },
  { name: 'Media', performance: 86, efficiency: 84, engagement: 91 },
  { name: 'Schedule', performance: 89, efficiency: 90, engagement: 86 },
  { name: 'Announcements', performance: 87, efficiency: 85, engagement: 89 },
  { name: 'Games', performance: 91, efficiency: 83, engagement: 94 },
  { name: 'Survey', performance: 84, efficiency: 82, engagement: 80 },
];

const revenueData = [
  { name: 'RSVP', value: 15000 },
  { name: 'Ticketing', value: 22000 },
  { name: 'Budget', value: 8500 },
  { name: 'Seating', value: 5200 },
  { name: 'Media', value: 12000 },
  { name: 'Schedule', value: 4800 },
  { name: 'Announcements', value: 3500 },
  { name: 'Games', value: 9800 },
  { name: 'Survey', value: 2100 },
];

const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#14b8a6'];

const getRevenueTooltip = (revenueData: unknown[]) => {
  return (data: unknown) => {
    const item = data as { name?: string; value?: number };
    const totalRevenue = (revenueData as { value?: number }[]).reduce((sum, d) => sum + (d.value || 0), 0);
    const percentage = item.value ? ((item.value / totalRevenue) * 100).toFixed(2) : '0';

    return (
      <div className="rounded-md bg-white p-3 shadow-md border text-sm">
        <p className="font-semibold text-gray-800">{item.name}</p>
        <p className="text-blue-600">Revenue: ${(item.value || 0).toLocaleString()}</p>
        <p className="text-green-600">Percentage: {percentage}%</p>
        <p className="text-gray-500 text-xs mt-1">of total income</p>
      </div>
    );
  };
};

const getModuleDescription = (label?: string | number) => {
  switch (label) {
    case 'RSVP':
      return 'Response management and attendee tracking';
    case 'Ticketing':
      return 'Ticket generation and validation system';
    case 'Budget':
      return 'Financial tracking and allocation management';
    case 'Seating':
      return 'Venue seating arrangement and management';
    case 'Media':
      return 'Media upload, storage, and distribution';
    case 'Schedule':
      return 'Event timeline and activity scheduling';
    case 'Announcements':
      return 'Communication and notifications system';
    case 'Games':
      return 'Gamification and interactive features';
    case 'Survey':
      return 'Feedback collection and analytics';
    default:
      return '';
  }
};

const barConfig = [
  { dataKey: 'performance', name: 'Performance', fill: '#3b82f6' },
  { dataKey: 'efficiency', name: 'Efficiency', fill: '#10b981' },
  { dataKey: 'engagement', name: 'Engagement', fill: '#a855f7' },
];



export default function OverviewCharts({
  isAnimationActive = true,
  onNavigateTab,
}: {
  isAnimationActive?: boolean;
  onNavigateTab?: (label: string) => void;
}) {
  return (
    <>
      <div className="w-full text-black dark:text-white mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ReusableBarChart
            data={data}
            title="Module Performance Matrix"
            bars={barConfig}
            yAxisLabel="Score (%)"
            isAnimationActive={isAnimationActive}
            getDescription={getModuleDescription}
            dimensions={{ width: '100%', maxWidth: '100%', height: 400 }}
            barSize={25}
          />
        </div>

        <ReusablePieChart
          data={revenueData}
          title="Revenue by Module"
          colors={COLORS}
          isAnimationActive={isAnimationActive}
          tooltipFormatter={getRevenueTooltip(revenueData)}
          dimensions={{ width: '100%', height: 400 }}
        />
      </div>

      <ModulePerformanceCards onNavigateTab={onNavigateTab} />
    </>
  );
}
