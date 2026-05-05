import { FaUserFriends, FaEnvelopeOpenText, FaUsers, FaSnowflake, FaArrowUp, FaPalette, FaFont, FaFileAlt } from "react-icons/fa";

const segments = [
  {
    name: "Past Attendees",
    icon: <FaUserFriends className="text-indigo-500 text-2xl" />,
    reached: 5600,
    conversions: 156,
    convRate: "2.79%",
    avgValue: "$125",
    color: "from-indigo-100 to-indigo-300 dark:from-indigo-900 dark:to-indigo-700"
  },
  {
    name: "Newsletter Subscribers",
    icon: <FaEnvelopeOpenText className="text-pink-500 text-2xl" />,
    reached: 8900,
    conversions: 89,
    convRate: "1%",
    avgValue: "$95",
    color: "from-pink-100 to-pink-300 dark:from-pink-900 dark:to-pink-700"
  },
  {
    name: "Social Followers",
    icon: <FaUsers className="text-blue-500 text-2xl" />,
    reached: 12300,
    conversions: 45,
    convRate: "0.37%",
    avgValue: "$85",
    color: "from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700"
  },
  {
    name: "Cold Audience",
    icon: <FaSnowflake className="text-cyan-500 text-2xl" />,
    reached: 18870,
    conversions: 22,
    convRate: "0.12%",
    avgValue: "$75",
    color: "from-cyan-100 to-cyan-300 dark:from-cyan-900 dark:to-cyan-700"
  },
];

const abTests = [
  {
    name: "CTA Button Color",
    icon: <FaPalette className="text-pink-500 text-xl" />,
    improvement: "+34.8%",
    variantA: { label: "Blue", value: "2.3%" },
    variantB: { label: "Green", value: "3.1%" },
  },
  {
    name: "Email Subject",
    icon: <FaFont className="text-indigo-500 text-xl" />,
    improvement: "+18.4%",
    variantA: { label: "Formal", value: "38%" },
    variantB: { label: "Casual", value: "45%" },
  },
  {
    name: "Landing Page",
    icon: <FaFileAlt className="text-blue-500 text-xl" />,
    improvement: "+33.3%",
    variantA: { label: "Long Form", value: "1.8%" },
    variantB: { label: "Short Form", value: "2.4%" },
  },
];

function SegmentCard({ icon, name, reached, conversions, convRate, avgValue, color }: any) {
  return (
    <div className={`flex flex-col bg-gradient-to-br ${color} rounded-xl shadow p-4 min-w-[220px]`}>  
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-bold text-gray-800 dark:text-gray-100 text-lg">{name}</span>
      </div>
      <div className="flex flex-wrap gap-4 text-sm mb-2">
        <span className="text-indigo-700 dark:text-indigo-200 font-semibold">{reached.toLocaleString()} reached</span>
        <span className="text-green-700 dark:text-green-300 font-semibold">{conversions} Conversions</span>
      </div>
      <div className="flex gap-4 text-xs">
        <span className="text-pink-700 dark:text-pink-200">Conv. Rate: {convRate}</span>
        <span className="text-blue-700 dark:text-blue-200">Avg Value: {avgValue}</span>
      </div>
    </div>
  );
}

function ABTestCard({ icon, name, improvement, variantA, variantB }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col gap-2 min-w-[220px]">
      <div className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-100 text-base">
        {icon}
        {name}
      </div>
      <div className="flex items-center gap-2 text-green-600 dark:text-green-300 font-semibold">
        <FaArrowUp /> {improvement} improvement
      </div>
      <div className="flex gap-4 text-xs mt-1">
        <span className="bg-indigo-100 dark:bg-indigo-800 rounded px-2 py-1">Variant A: <b>{variantA.label}</b> ({variantA.value})</span>
        <span className="bg-pink-100 dark:bg-pink-800 rounded px-2 py-1">Variant B: <b>{variantB.label}</b> ({variantB.value})</span>
      </div>
    </div>
  );
}

export default function MarketingInsightsTab() {
  return (
    <div className="space-y-10">
      {/* Audience Segment Performance */}
      <div>
        <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">Audience Segment Performance</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {segments.map((seg, idx) => (
            <SegmentCard key={idx} {...seg} />
          ))}
        </div>
      </div>

      {/* A/B Test Results */}
      <div>
        <div className="font-bold text-lg mb-4 text-pink-700 dark:text-pink-300">A/B Test Results</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {abTests.map((test, idx) => (
            <ABTestCard key={idx} {...test} />
          ))}
        </div>
      </div>
    </div>
  );
}
