import { Users, MapPin, Utensils, TrendingUp, Clock, Navigation } from "lucide-react";

export default function RSVPDemographics() {
  const ageGroups = [
    {
      range: "18-25 years old",
      guests: 23,
      responseRate: 65.2,
      avgTime: "4.2 days",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
      barColor: "from-blue-400 to-blue-600",
    },
    {
      range: "26-35 years old",
      guests: 67,
      responseRate: 82.1,
      avgTime: "2.8 days",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
      barColor: "from-green-400 to-green-600",
    },
    {
      range: "36-50 years old",
      guests: 58,
      responseRate: 87.9,
      avgTime: "2.1 days",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
      barColor: "from-purple-400 to-purple-600",
    },
    {
      range: "51+ years old",
      guests: 41,
      responseRate: 92.7,
      avgTime: "1.8 days",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-800",
      barColor: "from-orange-400 to-orange-600",
    },
  ];

  const geoDistribution = [
    {
      zone: "Local",
      range: "<10 mi",
      guests: 142,
      percentage: 75.1,
      travel: "15 min",
      icon: MapPin,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      zone: "Regional",
      range: "10-50 mi",
      guests: 32,
      percentage: 16.9,
      travel: "45 min",
      icon: Navigation,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      zone: "Long Distance",
      range: ">50 mi",
      guests: 15,
      percentage: 7.9,
      travel: "2+ hrs",
      icon: Navigation,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      borderColor: "border-red-200 dark:border-red-800",
    },
  ];

  const dietaryPreferences = [
    {
      preference: "No Restrictions",
      guests: 142,
      percentage: 75.1,
      allergies: [],
      icon: Utensils,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      preference: "Vegetarian",
      guests: 28,
      percentage: 14.8,
      allergies: ["Eggs (3)", "Dairy (2)"],
      icon: Utensils,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      preference: "Vegan",
      guests: 12,
      percentage: 6.3,
      allergies: [],
      icon: Utensils,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      preference: "Gluten-Free",
      guests: 5,
      percentage: 2.6,
      allergies: ["Celiac (3)", "Sensitivity (2)"],
      icon: Utensils,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      preference: "Kosher",
      guests: 3,
      percentage: 1.6,
      allergies: [],
      icon: Utensils,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
    {
      preference: "Halal",
      guests: 2,
      percentage: 1.1,
      allergies: [],
      icon: Utensils,
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      borderColor: "border-pink-200 dark:border-pink-800",
    },
  ];

  const allergyData = [
    { name: "Nut Allergy", guests: 7, allergens: ["Peanuts (4)", "Tree Nuts (3)"] },
  ];

  return (
    <div className="w-full space-y-8 p-6 bg-white dark:bg-gray-900">
      {/* Age-Based Response Analytics */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="h-6 w-6" />
          Age-Based Response Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ageGroups.map((group, index) => (
            <div
              key={index}
              className={`rounded-lg border ${group.bgColor} ${group.borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {group.range}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {group.guests}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">guests</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Response Rate
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {group.responseRate}%
                  </p>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r ${group.barColor}`}
                    style={{ width: `${group.responseRate}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Avg response: <span className="font-semibold text-gray-900 dark:text-white">{group.avgTime}</span></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Geographic Distribution */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Geographic Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {geoDistribution.map((geo, index) => {
            const Icon = geo.icon;
            return (
              <div
                key={index}
                className={`rounded-lg border ${geo.bgColor} ${geo.borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {geo.zone}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {geo.range}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {geo.guests}
                    </p>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {geo.percentage}% of guests
                    </p>
                  </div>
                  <Icon className={`h-6 w-6 ${geo.color}`} />
                </div>
                <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Estimated travel
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {geo.travel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dietary Preferences & Allergies */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <Utensils className="h-6 w-6" />
          Dietary Preferences & Allergies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dietaryPreferences.map((diet, index) => {
            const Icon = diet.icon;
            return (
              <div
                key={index}
                className={`rounded-lg border ${diet.bgColor} ${diet.borderColor} p-5 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {diet.preference}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {diet.guests}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {diet.percentage}% of guests
                    </p>
                  </div>
                  <Icon className={`h-6 w-6 ${diet.color}`} />
                </div>

                {diet.allergies.length > 0 && (
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-3">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Related Allergies:
                    </p>
                    <div className="space-y-1">
                      {diet.allergies.map((allergy, idx) => (
                        <p
                          key={idx}
                          className="text-xs bg-white dark:bg-gray-800 rounded px-2 py-1 text-gray-600 dark:text-gray-400"
                        >
                          • {allergy}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Allergy Summary */}
        <div className="mt-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
            Critical Allergy Alert
          </h4>
          <div className="space-y-3">
            {allergyData.map((allergy, index) => (
              <div key={index}>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {allergy.name}: {allergy.guests} guests
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allergy.allergens.map((allergen, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}