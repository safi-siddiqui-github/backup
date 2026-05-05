"use client";

import { useState } from "react";
import { Clock, Users, Calendar } from "lucide-react";
import BrowseSessionsView from "./browse-session";
import MyScheduleView from "./my-schedule";
import type { Session, MyScheduleSession } from "./schedule-data";
import { browseSessionsData } from "./schedule-data";

export default function ConferenceModeView() {
	const [activeConferenceTab, setActiveConferenceTab] = useState<
		"mySchedule" | "browseSessions"
	>("mySchedule");

	const [sessions, setSessions] = useState<Session[]>(() =>
		browseSessionsData.map((s) => ({ ...s })),
	);

	const [mySchedule, setMySchedule] = useState<MyScheduleSession[]>([]);

	const mapToMySchedule = (s: Session): MyScheduleSession => {
		const timeSlot = (s.time || "").split(/\s|-|–/)[0] || "09:00";
		const day =
			s.date && s.date.includes("Sep 11")
				? "Wednesday"
				: s.date && s.date.includes("Sep 12")
					? "Thursday"
					: "Tuesday";
		return {
			id: s.id,
			title: s.title,
			speaker: s.speakers && s.speakers.length ? s.speakers[0] : "TBA",
			location: s.location || "TBD",
			timeSlot,
			day,
			type: (s.type === "keynote" ? "keynote" : "session") as
				| "keynote"
				| "session",
			gradientFrom: s.type === "keynote" ? "from-purple-500" : "from-green-400",
			gradientTo: s.type === "keynote" ? "to-indigo-600" : "to-emerald-500",
		};
	};

	const handleAdd = (sessionId: string) => {
		setSessions((prev) =>
			prev.map((s) => (s.id === sessionId ? { ...s, isAdded: true } : s)),
		);
		const s = sessions.find((x) => x.id === sessionId);
		if (!s) return;
		setMySchedule((prev) => {
			if (prev.find((p) => p.id === sessionId)) return prev;
			return [...prev, mapToMySchedule(s)];
		});
	};

	const handleRemove = (sessionId: string) => {
		setSessions((prev) =>
			prev.map((s) => (s.id === sessionId ? { ...s, isAdded: false } : s)),
		);
		setMySchedule((prev) => prev.filter((p) => p.id !== sessionId));
	};

	return (
		<div className="  mx-auto   shadow-xl rounded-xl overflow-hidden mt-8  ">
			<div className="p-6 bg-white text-gray-900 dark:bg-[#090a11] dark:text-white">
				<div className="text-center">
					<h1 className="text-3xl font-bold">TechCon 2024 Schedule</h1>
					<p className="text-md text-gray-600 mt-2 dark:text-gray-300">
						Build your personalized conference experience
					</p>
					<div className="flex justify-center mt-4 space-x-4">
						<div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full dark:bg-[#070b1c] dark:text-gray-100">
							<Clock size={16} className="mr-2 text-green-400" />1 sessions
							selected
						</div>
						<div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full dark:bg-[#070b1c] dark:text-gray-100">
							<Calendar size={16} className="mr-2 text-blue-400" />
							Schedule created
						</div>
					</div>
				</div>
			</div>

			<div className="p-0 bg-white dark:bg-[#090a11] border-b border-gray-200 dark:border-gray-700">
				<div className="flex justify-start bg-transparent dark:bg-transparent">
					<button
						onClick={() => setActiveConferenceTab("mySchedule")}
						className={`relative px-6 py-3 text-lg font-medium transition-all duration-200 ${
							activeConferenceTab === "mySchedule"
								? "text-gray-900 dark:text-white"
								: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
						}`}
					>
						My Schedule
						{activeConferenceTab === "mySchedule" && (
							<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-600"></span>
						)}
					</button>
					<button
						onClick={() => setActiveConferenceTab("browseSessions")}
						className={`relative px-6 py-3 text-lg font-medium transition-all duration-200 ${
							activeConferenceTab === "browseSessions"
								? "text-gray-900 dark:text-white"
								: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
						}`}
					>
						Browse Sessions
						{activeConferenceTab === "browseSessions" && (
							<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-600"></span>
						)}
					</button>
				</div>
			</div>

			{activeConferenceTab === "mySchedule" ? (
				<MyScheduleView
					mySchedule={mySchedule}
					sessions={sessions}
					onAdd={handleAdd}
					onRemove={handleRemove}
				/>
			) : (
				<BrowseSessionsView
					sessions={sessions}
					onAdd={handleAdd}
					onRemove={handleRemove}
				/>
			)}
		</div>
	);
}
