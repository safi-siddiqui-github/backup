import { ReusableBarChart } from "../lib/lib-barchart";
import { ReusablePieChart } from "../lib/lib-piechart";

const categories = [
  {
    name: "Venue",
    vendors: 1,
    status: "on-budget",
    budgeted: 15000,
    spent: 15000,
    committed: 0,
    remaining: 0,
    roi: 4.2,
    color:
      "from-blue-100 via-cyan-50 to-indigo-100 dark:from-blue-900/30 dark:via-cyan-900/20 dark:to-indigo-900/30",
  },
  {
    name: "Catering",
    vendors: 2,
    status: "under-budget",
    budgeted: 12000,
    spent: 9800,
    committed: 1500,
    remaining: 700,
    roi: 3.8,
    color:
      "from-emerald-100 via-lime-50 to-green-100 dark:from-emerald-900/30 dark:via-lime-900/20 dark:to-green-900/30",
  },
  {
    name: "Photography",
    vendors: 1,
    status: "on-budget",
    budgeted: 8000,
    spent: 7500,
    committed: 0,
    remaining: 500,
    roi: 5.1,
    color:
      "from-fuchsia-100 via-pink-50 to-purple-100 dark:from-fuchsia-900/30 dark:via-pink-900/20 dark:to-purple-900/30",
  },
  {
    name: "Flowers",
    vendors: 1,
    status: "under-budget",
    budgeted: 5000,
    spent: 3200,
    committed: 800,
    remaining: 1000,
    roi: 2.9,
    color:
      "from-rose-100 via-orange-50 to-yellow-100 dark:from-rose-900/30 dark:via-orange-900/20 dark:to-yellow-900/30",
  },
  {
    name: "Music/DJ",
    vendors: 1,
    status: "on-budget",
    budgeted: 4000,
    spent: 3250,
    committed: 0,
    remaining: 750,
    roi: 4.7,
    color:
      "from-indigo-100 via-sky-50 to-blue-100 dark:from-indigo-900/30 dark:via-sky-900/20 dark:to-blue-900/30",
  },
  {
    name: "Other",
    vendors: 3,
    status: "pending",
    budgeted: 6000,
    spent: 0,
    committed: 4200,
    remaining: 1800,
    roi: null,
    color:
      "from-slate-100 via-gray-50 to-zinc-100 dark:from-slate-900/30 dark:via-gray-900/20 dark:to-zinc-900/30",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "on-budget":
      return "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30";
    case "under-budget":
      return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
    case "pending":
      return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30";
    default:
      return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30";
  }
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mt-1 mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800">
      <div
        className="h-full bg-linear-to-r from-sky-400 via-indigo-400 to-fuchsia-400 transition-all dark:from-sky-600 dark:via-indigo-600 dark:to-fuchsia-600"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function BudgetCategoryTab() {
  return (
    <>
      <h1 className="mb-4 text-center text-2xl font-semibold">
        Category Budget Performance
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((cat) => {
          const committedPercent = cat.budgeted
            ? (cat.committed / cat.budgeted) * 100
            : 0;
          return (
            <div
              key={cat.name}
              className={`relative rounded-2xl border bg-linear-to-br p-6 shadow-sm ${cat.color} transition-colors`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {cat.name}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusColor(cat.status)}`}
                >
                  {cat.status.replace("-", " ")}
                </span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span>
                  {cat.vendors} vendor{cat.vendors > 1 ? "s" : ""}
                </span>
              </div>
              <div className="mb-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="text-gray-500 dark:text-slate-400">
                  Budgeted
                </div>
                <div className="font-mono text-slate-800 dark:text-slate-100">
                  ${cat.budgeted.toLocaleString()}
                </div>
                <div className="text-gray-500 dark:text-slate-400">Spent</div>
                <div className="font-mono text-rose-600 dark:text-rose-400">
                  ${cat.spent.toLocaleString()}
                </div>
                <div className="text-gray-500 dark:text-slate-400">
                  Committed
                </div>
                <div className="font-mono text-amber-600 dark:text-amber-400">
                  ${cat.committed.toLocaleString()}
                </div>
                <div className="text-gray-500 dark:text-slate-400">
                  Remaining
                </div>
                <div className="font-mono text-emerald-600 dark:text-emerald-400">
                  ${cat.remaining.toLocaleString()}
                </div>
              </div>
              <ProgressBar
                value={cat.committed}
                max={cat.budgeted}
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-slate-400">
                  Estimated ROI:
                </span>
                <span className="font-mono text-base font-semibold text-indigo-600 dark:text-indigo-400">
                  {cat.roi ? (
                    `${cat.roi}x`
                  ) : (
                    <span className="text-gray-400 dark:text-slate-500">
                      --
                    </span>
                  )}
                </span>
              </div>
              <div className="pointer-events-none absolute top-4 right-4 text-6xl font-extrabold opacity-10 select-none">
                {cat.name[0]}
              </div>
            </div>
          );
        })}
      </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 flex flex-col items-center">
            <ReusablePieChart
              data={categories.map((cat) => ({ name: cat.name, value: cat.budgeted }))}
              title="Budget Allocation"
              colors={["#6366f1", "#06b6d4", "#f472b6", "#f59e42", "#10b981", "#64748b"]}
              dimensions={{ width: "100%", height: 320 }}
              tooltipFormatter={(data) => {
                const d = Array.isArray(data) ? data[0] : data;
                if (!d) return null;
                return (
                  <div className="p-2 rounded bg-white dark:bg-slate-800 shadow text-xs">
                    <div className="font-semibold">{d.name}</div>
                    <div>Budgeted: <span className="font-mono">${d.value?.toLocaleString?.() ?? d.value}</span></div>
                  </div>
                );
              }}
            />
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 flex flex-col items-center">
            <ReusableBarChart
              data={categories.map((cat, idx) => ({ name: cat.name, Spent: cat.spent, fill: ["#6366f1", "#06b6d4", "#f472b6", "#f59e42", "#10b981", "#64748b"][idx] }))}
              title="Actual Spending by Category"
              bars={categories.map((cat, idx) => ({ dataKey: "Spent", name: cat.name, fill: ["#6366f1", "#06b6d4", "#f472b6", "#f59e42", "#10b981", "#64748b"][idx] }))}
              yAxisLabel="$"
              dimensions={{ width: "100%", maxWidth: 500, height: 320 }}
              barSize={32}
            />
          </div>
        </div>
    </>
  );
}
