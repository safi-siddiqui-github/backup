import { FaTrophy } from "react-icons/fa";

const abTests = [
  {
    title: "Subject Line Test",
    improvement: "+6.6% improvement",
    variants: [
      { label: "Variant A", desc: "Urgent Tone", value: "67.8%", winner: false },
      { label: "Variant B", desc: "Friendly Tone", value: "72.3%", winner: true },
    ],
  },
  {
    title: "Send Time Test",
    improvement: "+21.9% improvement",
    variants: [
      { label: "Variant A", desc: "Morning 9 AM", value: "58.4%", winner: false },
      { label: "Variant B", desc: "Evening 7 PM", value: "71.2%", winner: true },
    ],
  },
  {
    title: "CTA Button Test",
    improvement: "+35.9% improvement",
    variants: [
      { label: "Variant A", desc: "View Details", value: "23.4%", winner: false },
      { label: "Variant B", desc: "Don't Miss Out", value: "31.8%", winner: true },
    ],
  },
];

function ABTestCard({ title, improvement, variants }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{title}</div>
        <div className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          {improvement}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-2">
        {variants.map((v: any, idx: number) => (
          <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg ${v.winner ? "bg-indigo-50 dark:bg-indigo-900 border-2 border-indigo-400 dark:border-indigo-500" : "bg-gray-50 dark:bg-gray-800"}`}>
            <div className="font-semibold text-sm w-20">{v.label}</div>
            <div className="flex-1 text-gray-700 dark:text-gray-200">{v.desc}</div>
            <div className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{v.value}</div>
            {v.winner && (
              <span className="flex items-center gap-1 text-xs font-bold text-yellow-600 dark:text-yellow-300 ml-2">
                <FaTrophy className="inline-block text-yellow-400 text-base" /> Winner
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ABTestingTab() {
  return (
    <div className="space-y-8">
      <div className="font-bold text-2xl mb-6 text-indigo-700 dark:text-indigo-300 text-center">A/B Testing Results</div>
      {abTests.map((test, idx) => (
        <ABTestCard key={idx} {...test} />
      ))}
    </div>
  );
}
