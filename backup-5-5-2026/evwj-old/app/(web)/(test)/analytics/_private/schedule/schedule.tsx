import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SimpleRadarChart } from "../lib/lib-radarchart";

const timelineData = [
  {
    event: "Welcome Reception",
    attendance: 95,
    status: "Delayed",
    time: "14:00 → 14:05",
  },
  {
    event: "Ceremony",
    attendance: 98,
    status: "Delayed",
    time: "15:00 → 15:10",
  },
  {
    event: "Cocktail Hour",
    attendance: 85,
    status: "Delayed",
    time: "16:00 → 16:15",
  },
  { event: "Dinner", attendance: 92, status: "On Time", time: "18:00 → 18:00" },
  {
    event: "Speeches",
    attendance: 88,
    status: "Delayed",
    time: "19:30 → 19:25",
  },
  {
    event: "Dancing",
    attendance: 78,
    status: "On Time",
    time: "20:00 → 20:00",
  },
];

const radarLines = [
  {
    name: "Attendance",
    dataKey: "attendance",
    stroke: "#6366f1",
    fill: "#6366f1",
    fillOpacity: 0.5,
  },
];

const attendanceBarData = [
  { name: "14:00", attendance: 95 },
  { name: "15:00", attendance: 98 },
  { name: "16:00", attendance: 85 },
  { name: "17:00", attendance: 90 },
  { name: "18:00", attendance: 92 },
  { name: "19:00", attendance: 88 },
  { name: "20:00", attendance: 78 },
  { name: "21:00", attendance: 70 },
];

export default function ScheduleAnalytics() {
  return (
    <div className="space-y-10">
      {/* Radar Chart: Event Timeline Performance */}
      <div className="mb-8 rounded-2xl bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 p-8 shadow-lg dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
        <h3 className="mb-6 text-center text-3xl font-bold text-indigo-700 dark:text-indigo-300">
          Event Timeline Performance
        </h3>
        <div className="mx-auto w-full max-w-2xl">
          <SimpleRadarChart
            data={timelineData.map((e) => ({
              subject: e.event,
              attendance: e.attendance,
            }))}
            lines={radarLines}
            angleKey="subject"
            outerRadius="80%"
            height={350}
            legend={false}
          />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {timelineData.map((e, idx) => {
            // Assign a unique gradient and accent color per card
            const gradients = [
              "from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950",
              "from-green-100 via-emerald-100 to-teal-100 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950",
              "from-pink-100 via-fuchsia-100 to-rose-100 dark:from-pink-950 dark:via-fuchsia-950 dark:to-rose-950",
              "from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-950 dark:via-orange-950 dark:to-red-950",
              "from-purple-100 via-blue-100 to-green-100 dark:from-purple-950 dark:via-blue-950 dark:to-green-950",
              "from-cyan-100 via-sky-100 to-blue-100 dark:from-cyan-950 dark:via-sky-950 dark:to-blue-950",
            ];
            const accents = [
              "#6366f1",
              "#10b981",
              "#f472b6",
              "#f59e42",
              "#8b5cf6",
              "#06b6d4",
            ];
            const gradient = gradients[idx % gradients.length];
            const accent = accents[idx % accents.length];
            return (
              <div
                key={e.event}
                className={`flex flex-col gap-2 rounded-xl border-t-4 bg-linear-to-br p-6 shadow ${gradient} text-center`}
                style={{ borderColor: accent }}
              >
                <div className="mb-2 flex flex-col items-center gap-1">
                  <span
                    className="text-lg font-bold"
                    style={{ color: accent }}
                  >
                    {e.event}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-300">
                    {e.time}
                  </span>
                </div>
                <div className="mb-1 flex flex-col items-center gap-1 text-sm">
                  <span>
                    Attendance:{" "}
                    <span className="font-semibold">{e.attendance}%</span>
                  </span>
                  <span>
                    Status:{" "}
                    <span
                      className={`font-semibold ${e.status === "On Time" ? "text-green-700 dark:text-green-300" : "text-yellow-700 dark:text-yellow-300"}`}
                    >
                      {e.status}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bar Chart: Attendance Throughout Event */}
      <div className="mb-8 rounded-2xl bg-linear-to-br from-green-100 via-yellow-100 to-pink-100 p-8 shadow-lg dark:from-green-950 dark:via-yellow-950 dark:to-pink-950">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Attendance Throughout Event
        </h2>
        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            height: 350,
            margin: "0 auto",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={attendanceBarData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                label={{
                  value: "Attendance (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="attendance"
                name="Attendance"
              >
                {attendanceBarData.map((entry, idx) => {
                  const barColors = [
                    "#6366f1",
                    "#10b981",
                    "#f472b6",
                    "#f59e42",
                    "#8b5cf6",
                    "#06b6d4",
                    "#f43f5e",
                    "#facc15",
                  ];
                  return (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={barColors[idx % barColors.length]}
                    />
                  );
                })}
              </Bar> 
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
