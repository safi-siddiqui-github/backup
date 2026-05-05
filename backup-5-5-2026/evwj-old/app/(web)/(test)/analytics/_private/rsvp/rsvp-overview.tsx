import { ReusablePieChart } from "../lib/lib-piechart";
import { ReusableAreaChart } from "../lib/lib-areachart";
import { ReusableBarChart } from "../lib/lib-barchart";

export default function RSVPOverview() {

      const timelineData = [
    { date: "Jan 1", confirmed: 45, pending: 20, declined: 5 },
    { date: "Jan 5", confirmed: 82, pending: 28, declined: 8 },
    { date: "Jan 10", confirmed: 120, pending: 35, declined: 12 },
    { date: "Jan 15", confirmed: 156, pending: 30, declined: 15 },
    { date: "Jan 20", confirmed: 185, pending: 25, declined: 18 },
    { date: "Jan 25", confirmed: 205, pending: 20, declined: 20 },
    { date: "Jan 30", confirmed: 217, pending: 15, declined: 23 },
  ];

  const timelineAreas = [
    { dataKey: "confirmed", stroke: "#10b981", fill: "#10b981", stackId: "1", type: "monotone" as const },
    { dataKey: "pending", stroke: "#f59e0b", fill: "#f59e0b", stackId: "1", type: "monotone" as const },
    { dataKey: "declined", stroke: "#ef4444", fill: "#ef4444", stackId: "1", type: "monotone" as const },
  ];

  const pieChartData = [
    { name: "Confirmed", value: 76.2 },
    { name: "Pending", value: 13.7 },
    { name: "Declined", value: 7.3 },
    { name: "No Response", value: 2.8 },
  ];

  const pieChartColors = ["#10b981", "#f59e0b", "#ef4444", "#6b7280"];

  const renderPieTooltip = (data: any) => (
    <div className="rounded-lg border bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <p className="font-semibold text-gray-900 dark:text-white">
        {data.payload.name}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {data.payload.value}%
      </p>
    </div>
  );

  const renderTimelineTooltip = (payload: any) => {
    const data = payload[0]?.payload;
    if (!data) return null;

    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">{data.date}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Confirmed: <span className="font-semibold">{data.confirmed}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Pending: <span className="font-semibold">{data.pending}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Declined: <span className="font-semibold">{data.declined}</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const guestGroupData = [
    { name: "Singles", confirmed: 85, pending: 12, declined: 8 },
    { name: "Couples", confirmed: 92, pending: 15, declined: 5 },
    { name: "Families", confirmed: 78, pending: 18, declined: 10 },
    { name: "Large Groups", confirmed: 88, pending: 14, declined: 7 },
  ];

  const guestGroupBars = [
    { dataKey: "confirmed", name: "Confirmed", fill: "#10b981" },
    { dataKey: "pending", name: "Pending", fill: "#f59e0b" },
    { dataKey: "declined", name: "Declined", fill: "#ef4444" },
  ];
    return <>
    
     <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ReusablePieChart
              data={pieChartData}
              title="RSVP Status Distribution"
              colors={pieChartColors}
              isAnimationActive={true}
              tooltipFormatter={renderPieTooltip}
              dimensions={{ width: "100%", height: 400 }}
            />
    
            <ReusableAreaChart
              data={timelineData}
              areas={timelineAreas}
              title="RSVP Response Timeline"
              xAxisKey="date"
              yAxisWidth={60}
              isAnimationActive={true}
              tooltipFormatter={renderTimelineTooltip}
              dimensions={{ width: "100%", height: 400 }}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            />
          </div>
    
          <div className="mt-8 w-full">
            <ReusableBarChart
              data={guestGroupData}
              title="Guest Group Analysis"
              bars={guestGroupBars}
              yAxisLabel="Responses (Count)"
              isAnimationActive={true}
              dimensions={{ width: "100%", height: 500 }}
              barSize={40}
            />
          </div>
    </>
}