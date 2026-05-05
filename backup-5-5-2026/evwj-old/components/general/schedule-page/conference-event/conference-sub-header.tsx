import { CalendarDays, MapPin, Award, Clock, Users } from "lucide-react";

export default function ConferenceHeader() {
	return (
		<div className="w-full mx-auto max-w-8xl p-4">
			{/* --- Top Title Block --- */}
			<div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm">
				<h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
					Tech Innovation Conference 2024
				</h1>

				{/* Metadata Section */}
				<div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 mt-3 text-gray-600 dark:text-gray-400">
					<span className="flex items-center gap-2 text-sm sm:text-base">
						<CalendarDays className="w-5 h-5 text-gray-400" />
						November 4 - November 6, 2025
					</span>

					{/* Dot Separator for desktop */}
					<span className="hidden sm:block text-gray-300 dark:text-gray-600">
						&bull;
					</span>

					<span className="flex items-center gap-2 text-sm sm:text-base">
						<MapPin className="w-5 h-5 text-gray-400" />
						Main Hall
					</span>

					{/* Dot Separator for desktop */}
					<span className="hidden sm:block text-gray-300 dark:text-gray-600">
						&bull;
					</span>

					<span className="flex items-center gap-2 text-sm sm:text-base">
						<Award className="w-5 h-5 text-gray-400" />
						3-Day Conference
					</span>
				</div>
			</div>

			{/* --- Stats Card Grid --- */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
				{/* Card 1: Conference Days */}
				<div className="flex items-center p-5 bg-purple-50 dark:bg-purple-900/30 rounded-xl shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
					<div className="shrink-0 p-4 bg-purple-100 dark:bg-purple-800/60 rounded-full">
						<CalendarDays className="w-6 h-6 text-purple-600 dark:text-purple-300" />
					</div>
					<div className="ml-4">
						<div className="text-3xl font-bold text-gray-900 dark:text-white">
							3
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-300">
							Conference Days
						</div>
					</div>
				</div>

				{/* Card 2: Total Sessions */}
				<div className="flex items-center p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
					<div className="shrink-0 p-4 bg-blue-100 dark:bg-blue-800/60 rounded-full">
						<Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
					</div>
					<div className="ml-4">
						<div className="text-3xl font-bold text-gray-900 dark:text-white">
							30
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-300">
							Total Sessions
						</div>
					</div>
				</div>

				{/* Card 3: Total Registrations */}
				<div className="flex items-center p-5 bg-green-50 dark:bg-green-900/30 rounded-xl shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
					<div className="shrink-0 p-4 bg-green-100 dark:bg-green-800/60 rounded-full">
						<Users className="w-6 h-6 text-green-600 dark:text-green-300" />
					</div>
					<div className="ml-4">
						<div className="text-3xl font-bold text-gray-900 dark:text-white">
							2184
						</div>
						<div className="text-sm text-gray-600 dark:text-gray-300">
							Total Registrations
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
