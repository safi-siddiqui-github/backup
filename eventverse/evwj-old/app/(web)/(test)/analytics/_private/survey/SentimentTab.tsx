import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaSmile, FaMeh, FaFrown, FaThumbsUp, FaThumbsDown, FaUtensils, FaBuilding, FaMicrophone, FaUsers, FaCalendarAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaCommentDots } from "react-icons/fa";

const sentimentSummary = [
  { label: "Positive Sentiment", value: "68%", icon: <FaSmile className="text-green-500 text-2xl" /> },
  { label: "Neutral Sentiment", value: "22%", icon: <FaMeh className="text-yellow-500 text-2xl" /> },
  { label: "Negative Sentiment", value: "10%", icon: <FaFrown className="text-red-500 text-2xl" /> },
  { label: "Total Comments", value: "428", icon: <FaCommentDots className="text-indigo-500 text-2xl" /> },
];

const topicData = [
  { icon: <FaBuilding className="text-indigo-500 text-xl" />, topic: "Venue", mentions: 156, positive: "85%", negative: "5%" },
  { icon: <FaUtensils className="text-pink-500 text-xl" />, topic: "Food & Drinks", mentions: 134, positive: "72%", negative: "10%" },
  { icon: <FaMicrophone className="text-yellow-500 text-xl" />, topic: "Speakers", mentions: 98, positive: "78%", negative: "7%" },
  { icon: <FaUsers className="text-green-500 text-xl" />, topic: "Networking", mentions: 87, positive: "65%", negative: "15%" },
  { icon: <FaCheckCircle className="text-blue-500 text-xl" />, topic: "Organization", mentions: 76, positive: "82%", negative: "6%" },
  { icon: <FaCalendarAlt className="text-indigo-400 text-xl" />, topic: "Schedule", mentions: 65, positive: "58%", negative: "17%" },
];

const areaData = [
  { time: "9 AM", sentiment: 60 },
  { time: "10 AM", sentiment: 75 },
  { time: "11 AM", sentiment: 80 },
  { time: "12 PM", sentiment: 90 },
  { time: "1 PM", sentiment: 100 },
  { time: "2 PM", sentiment: 85 },
  { time: "3 PM", sentiment: 70 },
  { time: "4 PM", sentiment: 65 },
  { time: "5 PM", sentiment: 50 },
];

const positivePhrases = [
  { icon: <FaThumbsUp className="text-green-500 text-xl" />, phrase: "excellent organization", mentions: 45 },
  { icon: <FaThumbsUp className="text-green-500 text-xl" />, phrase: "amazing venue", mentions: 38 },
  { icon: <FaThumbsUp className="text-green-500 text-xl" />, phrase: "great speakers", mentions: 32 },
  { icon: <FaThumbsUp className="text-green-500 text-xl" />, phrase: "loved the food", mentions: 28 },
  { icon: <FaThumbsUp className="text-green-500 text-xl" />, phrase: "well planned", mentions: 24 },
];

const negativePhrases = [
  { icon: <FaThumbsDown className="text-red-500 text-xl" />, phrase: "long wait times", mentions: 18 },
  { icon: <FaThumbsDown className="text-red-500 text-xl" />, phrase: "crowded spaces", mentions: 12 },
  { icon: <FaThumbsDown className="text-red-500 text-xl" />, phrase: "parking issues", mentions: 10 },
  { icon: <FaThumbsDown className="text-red-500 text-xl" />, phrase: "wifi problems", mentions: 8 },
  { icon: <FaThumbsDown className="text-red-500 text-xl" />, phrase: "confusing schedule", mentions: 6 },
];

function StatCard({ icon, value, label }: any) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[100px]">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide text-center">{label}</div>
    </div>
  );
}

function TopicCard({ icon, topic, mentions, positive, negative }: any) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <div>{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{topic}</div>
        <div className="flex flex-wrap gap-4 mt-1 text-sm">
          <span className="text-gray-500 dark:text-gray-300">{mentions} mentions</span>
          <span className="text-green-600 dark:text-green-300 font-semibold">{positive} positive</span>
          <span className="text-red-600 dark:text-red-300 font-semibold">{negative} negative</span>
        </div>
      </div>
    </div>
  );
}

function PhraseCard({ icon, phrase, mentions }: any) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl shadow p-3 mb-2">
      {icon}
      <span className="font-semibold text-gray-700 dark:text-gray-200">{phrase}</span>
      <span className="ml-auto text-gray-500 dark:text-gray-400">{mentions} mentions</span>
    </div>
  );
}

export default function SentimentTab() {
  return (
    <div className="space-y-10">
      {/* Sentiment Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {sentimentSummary.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Sentiment by Topic & Area Chart */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="w-full lg:w-1/2">
          <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Sentiment by Topic</div>
          {topicData.map((topic, idx) => (
            <TopicCard key={idx} {...topic} />
          ))}
        </div>
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Sentiment Throughout the Day</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" className="text-xs"/>
              <YAxis className="text-xs"/>
              <Tooltip />
              <Area type="monotone" dataKey="sentiment" stroke="#6366f1" fillOpacity={1} fill="url(#colorSentiment)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Positive & Negative Phrases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="font-bold text-lg mb-2 text-green-700 dark:text-green-300">Top Positive Phrases</div>
          {positivePhrases.map((phrase, idx) => (
            <PhraseCard key={idx} {...phrase} />
          ))}
        </div>
        <div>
          <div className="font-bold text-lg mb-2 text-red-700 dark:text-red-300">Top Negative Phrases</div>
          {negativePhrases.map((phrase, idx) => (
            <PhraseCard key={idx} {...phrase} />
          ))}
        </div>
      </div>
    </div>
  );
}
