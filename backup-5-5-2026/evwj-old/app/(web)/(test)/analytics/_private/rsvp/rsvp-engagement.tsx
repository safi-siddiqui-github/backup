import { Activity, Users, UserCheck, Zap, Network } from "lucide-react";

export default function RSVPEngagement() {
  const engagementScores = [
    {
      level: "High Engagement",
      guests: 67,
      percentage: 35.4,
      score: 9.2,
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      level: "Medium Engagement",
      guests: 89,
      percentage: 47.1,
      score: 6.8,
      icon: Activity,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      level: "Low Engagement",
      guests: 33,
      percentage: 17.5,
      score: 3.4,
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
  ];

  const socialNetworks = [
    {
      name: "Work Colleagues",
      people: 45,
      connections: 127,
      density: 85,
      central: "John Smith",
    },
    {
      name: "College Friends",
      people: 38,
      connections: 89,
      density: 72,
      central: "Sarah Johnson",
    },
    {
      name: "Family",
      people: 32,
      connections: 78,
      density: 91,
      central: "Mary Davis",
    },
    {
      name: "Sports Team",
      people: 28,
      connections: 56,
      density: 68,
      central: "Mike Wilson",
    },
    {
      name: "Neighbors",
      people: 18,
      connections: 34,
      density: 74,
      central: "Lisa Brown",
    },
  ];

  const plusOneData = {
    totalInvites: 189,
    withPlusOne: 89,
    rate: 47.1,
    confirmed: 67,
    pending: 22,
  };

  return (
    <div className="w-full space-y-8 p-6 bg-white dark:bg-gray-900">
      {/* Guest Engagement Scoring */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Guest Engagement Scoring
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagementScores.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`rounded-lg border ${item.bgColor} ${item.borderColor} p-6 shadow-sm`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {item.level}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.guests}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.percentage}% of guests
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.score}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Network Analysis */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <Network className="h-6 w-6" />
          Social Network Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  Network
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  People
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  Connections
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  Density
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  Central Figure
                </th>
              </tr>
            </thead>
            <tbody>
              {socialNetworks.map((network, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                    {network.name}
                  </td>
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {network.people}
                  </td>
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {network.connections}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-indigo-600 to-purple-600"
                          style={{ width: `${network.density}%` }}
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {network.density}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                    {network.central}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Plus-One Analysis */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <UserCheck className="h-6 w-6" />
          Plus-One Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Total Invites
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {plusOneData.totalInvites}
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              With Plus-One
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {plusOneData.withPlusOne}
            </p>
          </div>

          <div className="bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Plus-One Rate
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {plusOneData.rate}%
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Confirmed
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {plusOneData.confirmed}
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Pending
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {plusOneData.pending}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}