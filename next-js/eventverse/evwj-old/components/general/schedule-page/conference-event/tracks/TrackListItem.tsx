"use client";
import { ClipboardList, Users, ChevronRight } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import { Track } from "./data";
import Image from "next/image";

export default function TrackListItem({
	track,
	onClick,
}: {
	track: Track;
	onClick: () => void;
}) {
	const {
		title,
		description,
		sessions,
		registered,
		utilization,
		avgCapacity,
		status,
		colors,
		photo,
		icon,
		tags,
		organizer,
		location,
	} = track;
	const bg = colors.bg || "bg-white";
	const border = colors.border || "border-gray-200";
	const text = colors.text || "text-gray-900";
	const darkBg = colors.darkBg || "dark:bg-gray-900";
	const darkText = colors.darkText || "dark:text-white";
	const progress = colors.progress || "bg-blue-500";
	const statusBg = colors.statusBg || "bg-gray-100";
	const statusText = colors.statusText || "text-gray-700";
	const darkStatusBg = colors.darkStatusBg || "dark:bg-gray-700";
	const darkStatusText = colors.darkStatusText || "dark:text-gray-300";

	return (
		<div
			onClick={onClick}
			className={`rounded-lg border ${border} ${bg} ${darkBg} cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md hover:border-opacity-80`}
		>
			<div className="flex items-center gap-4 p-4">
				{/* Photo/Icon */}
				{photo ? (
					<div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
						<Image
							src={photo}
							alt={title}
							fill
							className="object-cover"
						/>
					</div>
				) : icon ? (
					<div className="h-20 w-20 flex-shrink-0 flex items-center justify-center text-3xl rounded-lg bg-gray-100 dark:bg-gray-800">
						{icon}
					</div>
				) : (
					<div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800" />
				)}

				{/* Main Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<h3 className={`text-lg font-bold ${text} ${darkText}`}>
									{title}
								</h3>
								{tags && tags.length > 0 && (
									<div className="flex flex-wrap gap-1">
										{tags.slice(0, 2).map((tag, index) => (
											<span
												key={index}
												className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-1">
								{description}
							</p>
							{(organizer || location) && (
								<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
									{organizer && (
										<span className="truncate">
											<span className="font-medium">Org:</span> {organizer.split(",")[0]}
										</span>
									)}
									{location && (
										<span>
											<span className="font-medium">Location:</span> {location}
										</span>
									)}
								</div>
							)}
						</div>

						{/* Stats */}
						<div className="flex items-center gap-6 flex-shrink-0">
							<div className="flex items-center gap-2">
								<ClipboardList className="h-4 w-4 text-gray-400" />
								<div className="text-right">
									<div className="text-xl font-bold text-gray-900 dark:text-white">
										<AnimatedNumber end={sessions} />
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										Sessions
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-gray-400" />
								<div className="text-right">
									<div className="text-xl font-bold text-gray-900 dark:text-white">
										<AnimatedNumber end={registered} />
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										Registered
									</div>
								</div>
							</div>
							<div className="w-24">
								<div className="mb-1 flex justify-between text-xs">
									<span className="text-gray-600 dark:text-gray-400">
										Utilization
									</span>
									<span className={`font-bold ${text} ${darkText}`}>
										<AnimatedNumber end={utilization} />%
									</span>
								</div>
								<div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										className={`h-1.5 rounded-full ${progress}`}
										style={{ width: `${utilization}%` }}
									/>
								</div>
							</div>
							<div className="text-right">
								<span
									className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusBg} ${darkStatusBg} ${statusText} ${darkStatusText}`}
								>
									{status}
								</span>
								<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
									Avg: {avgCapacity}
								</p>
							</div>
							<ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

