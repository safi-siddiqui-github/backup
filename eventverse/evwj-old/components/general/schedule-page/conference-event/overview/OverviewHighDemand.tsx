"use client";
import React from "react";
import { TrendingUp, User } from "lucide-react";

type Session = {
	title: string;
	status: string;
	track: string;
	type: string;
	time: string;
	capacity: string;
	waitlist: string;
	attendees: string[];
	utilization: number;
};

const AvatarStack = ({ attendees }: { attendees: string[] }) => (
	<div className="flex -space-x-2 overflow-hidden">
		{attendees.slice(0, 5).map((att, index) => (
			<span
				key={index}
				className={`inline-flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-900 text-xs font-medium text-white
        ${index === 0 ? "bg-indigo-500" : index === 1 ? "bg-blue-500" : index === 2 ? "bg-pink-500" : index === 3 ? "bg-red-500" : "bg-yellow-500"}`}
			>
				{att}
			</span>
		))}
		{attendees.length > 5 && (
			<span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium ring-2 ring-white dark:ring-gray-900">
				{attendees[5]}
			</span>
		)}
	</div>
);

export default function OverviewHighDemand({
	sessions,
}: {
	sessions: Session[];
}) {
	return (
		<section>
			<div className="flex items-center gap-3">
				<div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
					<TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-300" />
				</div>
				<h2 className="text-xl font-bold text-gray-900 dark:text-white">
					High Demand Sessions
				</h2>
				<span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium px-2.5 py-0.5 rounded-full">
					3
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 mt-6">
				{sessions.map((session) => (
					<div
						key={session.title}
						className="p-4 pl-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors relative overflow-hidden"
					>
						<div
							className={`absolute left-0 top-0 h-full w-1.5 ${session.track === "AI & Machine Learning" ? "bg-blue-500" : ""} ${session.track === "Security & Privacy" ? "bg-orange-500" : ""}`}
						></div>
						<div className="flex flex-col md:flex-row md:items-center justify-between">
							<div className="flex-1">
								<div className="flex items-center gap-3">
									<h3 className="text-lg font-bold text-gray-900 dark:text-white">
										{session.title}
									</h3>
									<span className="px-2.5 py-0.5 text-xs font-medium text-red-800 bg-red-100 dark:text-red-100 dark:bg-red-700 rounded-full">
										{session.status}
									</span>
								</div>
								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-1.5">
									<span
										className={`px-2 py-0.5 text-xs font-medium rounded ${session.track === "AI & Machine Learning" ? "text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-800" : ""} ${session.track === "Security & Privacy" ? "text-orange-700 bg-orange-100 dark:text-orange-100 dark:bg-orange-800" : ""}`}
									>
										{session.track}
									</span>
									<span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700 rounded">
										{session.type}
									</span>
									<span>{session.time}</span>
								</div>
							</div>

							<div className="flex-1 flex flex-col md:flex-row md:items-center justify-end gap-6 mt-4 md:mt-0">
								<div className="flex items-center gap-2">
									<User className="w-4 h-4 text-gray-400" />
									<span className="text-sm text-gray-600 dark:text-gray-300">
										<span className="font-bold text-gray-900 dark:text-white">
											{session.capacity}
										</span>{" "}
										capacity
									</span>
									<span className="text-sm font-medium text-red-600 dark:text-red-400">
										{session.waitlist}
									</span>
								</div>
								<AvatarStack attendees={session.attendees} />
							</div>

							<div className="md:ml-6 mt-4 md:mt-0 shrink-0">
								<div className="w-16 h-16 relative">
									<div
										className="w-16 h-16 rounded-full flex items-center justify-center radial-progress"
										style={
											{
												"--value":
													session.utilization > 100 ? 100 : session.utilization,
											} as React.CSSProperties
										}
									>
										<span className="text-lg font-bold text-blue-600 dark:text-blue-400">
											{session.utilization}%
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
