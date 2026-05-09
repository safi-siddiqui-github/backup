"use client";

import type { AnnouncementModalRecipientsTableProps } from "./announcement-types";

const getInitials = (name: string): string => {
	const names = name.trim().split(" ");
	if (names.length >= 2) {
		return (names[0][0] + names[names.length - 1][0]).toUpperCase();
	}
	return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name: string): string => {
	const colors = [
		"bg-blue-500",
		"bg-green-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-yellow-500",
		"bg-indigo-500",
		"bg-red-500",
		"bg-teal-500",
	];
	const charCode = name.charCodeAt(0);
	return colors[charCode % colors.length];
};

export default function AnnouncementModalRecipientsTable({
	recipients,
}: AnnouncementModalRecipientsTableProps) {
	return (
		<div className="mt-4 sm:mt-6 overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 sm:mx-0">
			<div className="inline-block min-w-full align-middle">
				<table className="min-w-full table-auto">
					<thead>
						<tr className="border-b border-gray-200 dark:border-slate-600 text-left text-xs sm:text-sm text-gray-700 dark:text-slate-400">
							<th className="px-2 sm:px-4 py-2">Profile</th>
							<th className="px-2 sm:px-4 py-2">Name</th>
							<th className="px-2 sm:px-4 py-2 hidden sm:table-cell">Email</th>
							<th className="px-2 sm:px-4 py-2 hidden md:table-cell">Source</th>
							<th className="px-2 sm:px-4 py-2">Status</th>
							<th className="px-2 sm:px-4 py-2 hidden lg:table-cell">
								Delivered
							</th>
						</tr>
					</thead>
					<tbody>
						{recipients.map((recipient, index) => (
							<tr
								key={index}
								className="border-b border-gray-200 dark:border-slate-600"
							>
								<td className="px-2 sm:px-4 py-2">
									<div
										className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white font-semibold text-xs sm:text-sm ${getAvatarColor(recipient.name)}`}
									>
										{getInitials(recipient.name)}
									</div>
								</td>
								<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-slate-200">
									<div className="min-w-[80px]">{recipient.name}</div>
								</td>
								<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 dark:text-slate-400 hidden sm:table-cell">
									<div className="min-w-[150px]">{recipient.email}</div>
								</td>
								<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 dark:text-slate-400 hidden md:table-cell">
									{recipient.source}
								</td>
								<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 dark:text-slate-400">
									<span
										className={`rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 font-semibold text-xs text-white ${
											recipient.status === "Delivered"
												? "bg-green-500"
												: recipient.status === "Opened"
													? "bg-blue-500"
													: recipient.status === "Clicked"
														? "bg-purple-500"
														: "bg-gray-500"
										}`}
									>
										{recipient.status}
									</span>
								</td>
								<td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 dark:text-slate-400 hidden lg:table-cell">
									{recipient.deliveredAt}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
