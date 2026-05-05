import { ReusableAreaChart } from "../lib/lib-areachart";
import { Flame, CalendarClock, ShieldCheck } from "lucide-react";

const cashflowData = [
    { week: "Week 1", value: 0 },
    { week: "Week 2", value: 15000 },
    { week: "Week 3", value: 30000 },
    { week: "Week 4", value: 45000 },
    { week: "Week 5", value: 48000 },
    { week: "Week 6", value: 52000 },
    { week: "Week 7", value: 57000 },
    { week: "Week 8", value: 60000 },
].map((d) => ({
    week: String(d.week),
    value: typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0,
}));

export default function BudgetCashflowTab() {
    const validData = Array.isArray(cashflowData) && cashflowData.length > 0 && cashflowData.every(d => typeof d.value === 'number' && !isNaN(d.value));
    return (
        <div className="space-y-10">
            {/* <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6">
                {validData ? (
                    <ReusableAreaChart
                        data={cashflowData}
                        areas={[{
                            dataKey: "value",
                            stroke: "#6366f1",
                            fill: "#6366f1",
                            type: "monotone"
                        }]}
                        title="Cash Flow Projection"
                        xAxisKey="week"
                        tooltipFormatter={(payload) => {
                            // recharts payload shape: [{ payload: { week, value }, ... }]
                            const d = Array.isArray(payload) && payload.length > 0 ? payload[0] : null;
                            if (!d || !d.payload) return null;
                            return (
                                <div className="p-2 rounded bg-white dark:bg-slate-800 shadow text-xs">
                                    <div className="font-semibold">{d.payload.week}</div>
                                    <div>Cash Flow: <span className="font-mono">${typeof d.payload.value === 'number' ? d.payload.value.toLocaleString() : 0}</span></div>
                                </div>
                            );
                        }}
                        dimensions={{ width: "100%", height: 320 }}
                    />
                ) : (
                    <div className="text-center text-gray-500 dark:text-slate-400 py-12">No cash flow data available.</div>
                )}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Weekly Burn Rate */}
                <div className="flex flex-col items-center bg-gradient-to-br from-white via-rose-50 to-rose-100 dark:from-slate-900 dark:via-rose-900/30 dark:to-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg">
                    <span className="rounded-full bg-gradient-to-tr from-rose-400 to-rose-600 p-2 shadow mb-2">
                        <Flame className="h-8 w-8 text-white drop-shadow" />
                    </span>
                    <div className="text-2xl font-bold">$1.6K</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">Weekly Burn Rate</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">Average per week</div>
                </div>
                {/* Budget Runway */}
                <div className="flex flex-col items-center bg-gradient-to-br from-white via-indigo-50 to-indigo-100 dark:from-slate-900 dark:via-indigo-900/30 dark:to-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg">
                    <span className="rounded-full bg-gradient-to-tr from-indigo-400 to-indigo-600 p-2 shadow mb-2">
                        <CalendarClock className="h-8 w-8 text-white drop-shadow" />
                    </span>
                    <div className="text-2xl font-bold">3 weeks</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">Budget Runway</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">Until event date</div>
                </div>
                {/* Recommended Contingency */}
                <div className="flex flex-col items-center bg-gradient-to-br from-white via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-emerald-900/30 dark:to-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg">
                    <span className="rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 p-2 shadow mb-2">
                        <ShieldCheck className="h-8 w-8 text-white drop-shadow" />
                    </span>
                    <div className="text-2xl font-bold">$2.5K</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">Recommended Contingency</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">5% buffer</div>
                </div>
            </div>
        </div>
    );
}