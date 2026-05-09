"use client";
import { ClipboardList, Users, Pencil, Trash2 } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import { Track } from "./data";
import Image from "next/image";

export default function TrackCard({
	track,
	onClick,
	onEdit,
	onDelete,
}: {
	track: Track;
	onClick: () => void;
	onEdit?: (track: Track) => void;
	onDelete?: (track: Track) => void;
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
			className={`rounded-2xl border overflow-hidden ${border} ${bg} ${darkBg} cursor-pointer shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg`}
		>
			{/* Track Photo */}
			{photo && (
				<div className="relative h-40 w-full">
					<Image
						src={photo}
						alt={title}
						fill
						className="object-cover"
					/>
				</div>
			)}
			
			<div className="p-6">
				<div className="flex items-start gap-3">
					{icon && (
						<span className="text-2xl flex-shrink-0">{icon}</span>
					)}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2">
							<h3 className={`text-xl font-bold ${text} ${darkText}`}>
								{title}
							</h3>
							{(onEdit || onDelete) && (
								<div className="flex items-center gap-1 shrink-0">
									{onEdit && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												onEdit(track);
											}}
											className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white transition-colors"
											aria-label="Edit track"
										>
											<Pencil className="w-4 h-4" />
										</button>
									)}
									{onDelete && (
										<button
											onClick={(e) => {
												e.stopPropagation();
												onDelete(track);
											}}
											className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-500 transition-colors"
											aria-label="Delete track"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									)}
								</div>
							)}
						</div>
						{tags && tags.length > 0 && (
							<div className="flex flex-wrap gap-1 mt-1">
								{tags.map((tag, index) => (
									<span
										key={index}
										className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
				<p className="mt-1 h-10 text-sm text-gray-600 dark:text-gray-400">
					{description}
				</p>
				{(organizer || location) && (
					<div className="mt-2 space-y-1">
						{organizer && (
							<p className="text-xs text-gray-500 dark:text-gray-400">
								<span className="font-medium">Organizer:</span> {organizer}
							</p>
						)}
						{location && (
							<p className="text-xs text-gray-500 dark:text-gray-400">
								<span className="font-medium">Location:</span> {location}
							</p>
						)}
					</div>
				)}
				<div className="mt-6 flex items-end gap-6">
					<div className="flex items-center gap-2">
						<ClipboardList className="h-5 w-5 text-gray-400" />
						<div>
							<div className="text-3xl font-bold text-gray-900 dark:text-white">
								<AnimatedNumber end={sessions} />
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Sessions
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Users className="h-5 w-5 text-gray-400" />
						<div>
							<div className="text-3xl font-bold text-gray-900 dark:text-white">
								<AnimatedNumber end={registered} />
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Registered
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<div className="mb-1 flex justify-between">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Capacity Utilization
						</span>
						<span className={`text-sm font-bold ${text} ${darkText}`}>
							<AnimatedNumber end={utilization} />%
						</span>
					</div>
					<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
						<div
							className={`h-2.5 rounded-full ${progress}`}
							style={{ width: `${utilization}%` }}
						/>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
					<span className="text-sm text-gray-500 dark:text-gray-400">
						Avg. capacity:{" "}
						<b className="text-gray-700 dark:text-gray-200">{avgCapacity}</b> per
						session
					</span>
					<span
						className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusBg} ${darkStatusBg} ${statusText} ${darkStatusText}`}
					>
						{status}
					</span>
				</div>
			</div>
		</div>
	);
}
