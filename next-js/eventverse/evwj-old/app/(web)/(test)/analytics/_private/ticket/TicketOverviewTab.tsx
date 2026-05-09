"use client";

import React from "react";
import { ReusableBarChart } from "../lib/lib-barchart";
import SimpleLineChart from "../lib/lib-linechart";

/* ===================== MAIN COMPONENT ===================== */

export default function EventAnalytics() {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            label="Total Revenue"
            value="$24,750"
            color="green"
            gradient="from-green-300 via-green-500 to-green-700"
          />
          <MetricCard
            label="Tickets Sold"
            value="189"
            color="blue"
            gradient="from-blue-300 via-blue-500 to-blue-700"
          />
          <MetricCard
            label="Capacity"
            value="250"
            color="yellow"
            subValue="75.6%"
            gradient="from-yellow-200 via-yellow-400 to-yellow-600"
          />
          <MetricCard
            label="Avg. Ticket Price"
            value="$131"
            color="orange"
            gradient="from-orange-200 via-orange-400 to-orange-600"
          />
          <MetricCard
            label="Checked In"
            value="156"
            color="indigo"
            subValue="82.5%"
            gradient="from-indigo-200 via-indigo-400 to-indigo-600"
          />
          <MetricCard
            label="Refunds"
            value="8"
            color="rose"
            subValue="4.2%"
            gradient="from-rose-200 via-rose-400 to-rose-600"
          />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Daily Sales Performance"
          gradient="from-indigo-100 via-blue-100 to-green-100 dark:from-indigo-900/40 dark:via-blue-900/40 dark:to-green-900/40"
        >
          <SimpleLineChart
            data={dailySalesData}
            lines={[{ dataKey: "sales", stroke: "#6366f1" }]}
            xKey="date"
            height={220}
          />
        </ChartCard>

        <ChartCard
          title="Ticket Type Sales"
          gradient="from-pink-100 via-violet-100 to-blue-100 dark:from-pink-900/40 dark:via-violet-900/40 dark:to-blue-900/40"
        >
          <ReusableBarChart
            data={ticketTypeSalesData}
            title="Ticket Type Sales"
            bars={[{ dataKey: "sold", name: "Tickets Sold", fill: "#6366f1" }]}
            dimensions={{ width: "100%", height: 220 }}
          />
        </ChartCard>
      </div>

      {/* Ticket Type Performance Table */}
      <div className="bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 dark:from-green-900/40 dark:via-yellow-900/40 dark:to-red-900/40 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-slate-200">
          Ticket Type Performance
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-100 via-blue-100 to-green-100 dark:from-indigo-900/40 dark:via-blue-900/40 dark:to-green-900/40">
                {["Type", "Price", "Sold", "Revenue", "Refunds", "Sold %"].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-3 py-2 text-left font-medium text-gray-700 dark:text-slate-300"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {ticketTypePerformance.map((row) => (
                <tr
                  key={row.type}
                  className="border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-white via-gray-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
                >
                  <td className="px-3 py-2 font-semibold text-gray-900 dark:text-slate-200">
                    {row.type}
                  </td>
                  <td className="px-3 py-2">{row.price}</td>
                  <td className="px-3 py-2">
                    {row.sold}/{row.capacity}
                  </td>
                  <td className="px-3 py-2">{row.revenue}</td>
                  <td className="px-3 py-2">{row.refunds}</td>
                  <td className="px-3 py-2">{row.soldPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== METRIC CARD ===================== */

const colorMap = {
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-900/40",
    text: "text-indigo-700 dark:text-indigo-300",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/40",
    text: "text-green-700 dark:text-green-300",
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-900/40",
    text: "text-yellow-700 dark:text-yellow-300",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/40",
    text: "text-orange-700 dark:text-orange-300",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-900/40",
    text: "text-rose-700 dark:text-rose-300",
  },
};

type MetricCardProps = {
  label: string;
  value: string | number;
  color: keyof typeof colorMap;
  subValue?: string;
  gradient?: string;
};

function MetricCard({
  label,
  value,
  color,
  subValue,
  gradient,
}: MetricCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border border-gray-200 dark:border-slate-700 ${colorMap[color].bg} bg-gradient-to-br ${
        gradient ?? ""
      }`}
    >
      <div className={`text-xl font-bold ${colorMap[color].text}`}>
        {value}
      </div>
      <div className="text-sm font-medium text-gray-900 dark:text-slate-200">
        {label}
      </div>
      {subValue && (
        <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
          {subValue}
        </div>
      )}
    </div>
  );
}

/* ===================== CHART CARD ===================== */

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  gradient?: string;
};

function ChartCard({ title, children, gradient }: ChartCardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900 bg-gradient-to-br ${
        gradient ?? ""
      }`}
    >
      <h3 className="text-base font-semibold mb-3 text-gray-900 dark:text-slate-200">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ===================== DATA ===================== */

const dailySalesData = [
  { date: "Mar 1", sales: 20 },
  { date: "Mar 8", sales: 35 },
  { date: "Mar 15", sales: 50 },
  { date: "Mar 22", sales: 40 },
  { date: "Mar 29", sales: 30 },
  { date: "Apr 5", sales: 14 },
  { date: "Today", sales: 0 },
];

const ticketTypeSalesData = [
  { type: "Early Bird", sold: 45 },
  { type: "Regular", sold: 89 },
  { type: "VIP", sold: 25 },
  { type: "Student", sold: 30 },
];

const ticketTypePerformance = [
  {
    type: "Early Bird",
    price: "$99",
    sold: 45,
    capacity: 50,
    revenue: "$4,455",
    refunds: 2,
    soldPercent: 90,
  },
  {
    type: "Regular",
    price: "$149",
    sold: 89,
    capacity: 150,
    revenue: "$13,261",
    refunds: 5,
    soldPercent: 59,
  },
  {
    type: "VIP",
    price: "$299",
    sold: 25,
    capacity: 30,
    revenue: "$7,475",
    refunds: 1,
    soldPercent: 83,
  },
  {
    type: "Student",
    price: "$79",
    sold: 30,
    capacity: 20,
    revenue: "$2,370",
    refunds: 0,
    soldPercent: 150,
  },
];
