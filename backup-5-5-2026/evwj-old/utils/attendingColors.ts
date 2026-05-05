// Color mapping utilities for attending events

export const eventTypeGradients: Record<string, string> = {
	Wedding: "from-pink-500 via-rose-500 to-red-500",
	Conference: "from-blue-500 via-indigo-500 to-purple-500",
	Party: "from-purple-500 via-pink-500 to-fuchsia-500",
	Concert: "from-orange-500 via-red-500 to-pink-500",
	Sports: "from-green-500 via-emerald-500 to-teal-500",
	"Birthday Party": "from-purple-500 via-pink-500 to-rose-500",
	"Baby Shower": "from-pink-400 via-rose-400 to-pink-500",
	Anniversary: "from-rose-500 via-red-500 to-pink-600",
	Corporate: "from-slate-500 via-gray-600 to-slate-700",
	Default: "from-purple-500 via-blue-500 to-indigo-500",
};

export const moduleGradients: Record<string, string> = {
	rsvp: "from-green-400 to-emerald-600",
	tickets: "from-green-400 to-emerald-600",
	schedule: "from-blue-400 to-blue-600",
	seating: "from-purple-400 to-purple-600",
	media: "from-pink-400 to-pink-600",
	games: "from-orange-400 to-red-600",
	surveys: "from-indigo-400 to-indigo-600",
	travel: "from-cyan-400 to-blue-600",
};

export const statusColors: Record<string, string> = {
	confirmed: "bg-green-500",
	pending: "bg-amber-500",
	declined: "bg-red-500",
	attending: "bg-green-500",
	"checked-in": "bg-emerald-500",
	hot: "bg-gradient-to-r from-red-500 to-orange-500",
	live: "bg-gradient-to-r from-purple-500 to-pink-500",
	vip: "bg-gradient-to-r from-yellow-400 to-orange-500",
};

export const getEventTypeGradient = (eventType?: string): string => {
	if (!eventType) return eventTypeGradients.Default;
	const key = Object.keys(eventTypeGradients).find((k) =>
		eventType.toLowerCase().includes(k.toLowerCase()),
	);
	return eventTypeGradients[key || "Default"];
};

export const getEventTypeBorder = (eventType?: string): string => {
	if (!eventType) return "border-l-purple-500";

	if (eventType.toLowerCase().includes("wedding")) return "border-l-pink-500";
	if (eventType.toLowerCase().includes("conference"))
		return "border-l-blue-500";
	if (eventType.toLowerCase().includes("party")) return "border-l-purple-500";
	if (eventType.toLowerCase().includes("concert")) return "border-l-orange-500";
	if (eventType.toLowerCase().includes("sport")) return "border-l-green-500";

	return "border-l-indigo-500";
};
