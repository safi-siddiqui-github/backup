// Custom tooltip for the radar chart
type BudgetRadarTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

function BudgetRadarTooltip({ active, payload, label }: BudgetRadarTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const { metric, value } = payload[0]?.payload || {};
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 10,
        fontSize: 13,
        minWidth: 160,
      }}
    >
      <div>
        <b>Metric:</b> {metric}
      </div>
      <div style={{ marginTop: 4 }}>
        <span style={{ color: "#8884d8" }}>Score:</span> {value ?? "-"}
      </div>
    </div>
  );
}
import SimpleLineChart from "../lib/lib-linechart";
import { SimpleRadarChart } from "../lib/lib-radarchart";
 

export type BudgetTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

export function BudgetTooltip({ active, payload, label }: BudgetTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const planned = payload.find((p) => p.dataKey === "planned")?.value;
  const actual = payload.find((p) => p.dataKey === "actual")?.value;
  const forecast = payload.find((p) => p.dataKey === "forecast")?.value;
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 10,
        fontSize: 13,
      }}
    >
      <div>
        <b>Date:</b> {label}
      </div>
      <div style={{ marginTop: 4 }}>
        <span style={{ color: "#8884d8" }}>Planned:</span> {planned ?? "-"}
        <br />
        <span style={{ color: "#82ca9d" }}>Actual:</span> {actual ?? "-"}
        <br />
        <span style={{ color: "#ffc658" }}>Forecast:</span> {forecast ?? "-"}
      </div>
    </div>
  );
}

const LineChartData = [
  { name: "Jan", planned: 5000, actual: 2000, forecast: 2500 },
  { name: "Feb", planned: 3500, actual: 4200, forecast: 3900 },
  { name: "Mar", planned: 7000, actual: 6700, forecast: 7600 },
  { name: "Apr", planned: 11000, actual: 10500, forecast: 12000 },
  { name: "May", planned: 15500, actual: 15000, forecast: 16200 },
  { name: "Jun", planned: 18000, actual: 17500, forecast: 19000 },
  { name: "Jul", planned: 21000, actual: 22000, forecast: 21500 },
  { name: "Aug", planned: 25000, actual: 24500, forecast: 26000 },
  { name: "Sep", planned: 27000, actual: 26500, forecast: 28000 },
  { name: "Oct", planned: 30000, actual: 31000, forecast: 32000 },
]


const radarData = [
  { metric: "Spending Pace", value: 78 },
  { metric: "Vendor Reliability", value: 92 },
  { metric: "Payment Timeliness", value: 65 },
  { metric: "ROI Potential", value: 83 },
  { metric: "Risk Management", value: 55 },
];

const radarLines = [
  {
    name: "Score",
    dataKey: "value",
    stroke: "#8884d8",
    fill: "#8884d8",
    fillOpacity: 0.6,
  },
];


export default function BudgetOverview() {
  return (
    <div className="w-full   mx-auto px-2 py-4 flex flex-col gap-10 text-center">
      <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 md:p-10 flex flex-col gap-6 transition-colors text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2 text-center">Budget Timeline &amp; Forecast</h1>
        <div className="w-full overflow-x-auto flex justify-center">
          <SimpleLineChart
            data={LineChartData}
            lines={[
              { dataKey: "planned", stroke: "#8884d8" },
              { dataKey: "actual", stroke: "#82ca9d" },
              { dataKey: "forecast", stroke: "#ffc658" },
            ]}
            xKey="name"
            height={300}
            customTooltip={BudgetTooltip}
          />
        </div>
      </section>
      <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 md:p-10 flex flex-col gap-6 transition-colors text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2 text-center">Budget Health Score Components</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <SimpleRadarChart data={radarData} lines={radarLines} customTooltip={BudgetRadarTooltip} />
          </div>
          <ul className="w-full md:w-1/2 flex flex-col gap-3 text-zinc-700 dark:text-zinc-200 text-base md:text-lg text-center">
            {radarData.map((item) => (
              <li key={item.metric} className="flex  gap-5 items-center   border-b border-zinc-200 dark:border-zinc-700 py-2 last:border-b-0 text-center">
                <span className="font-medium">{item.metric}</span>
                <span className="font-mono text-lg">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
