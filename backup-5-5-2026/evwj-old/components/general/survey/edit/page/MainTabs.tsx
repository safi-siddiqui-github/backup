"use client";

import { BsBarChart, BsGear } from "react-icons/bs";

type TabKey = "questions" | "analytics" | "settings";
type Props = { active: TabKey; onChange: (tab: TabKey) => void };

export default function MainTabs({ active, onChange }: Props) {
	const base = "flex items-center px-1 py-4 text-sm font-medium border-b-2";
	const activeCls =
		"border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400";
	const idle =
		"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600";
	return (
		<div className="border-b border-gray-200 dark:border-gray-700">
			<nav className="flex -mb-px space-x-6" aria-label="Tabs">
				<button
					className={`${base} ${active === "questions" ? activeCls : idle}`}
					onClick={() => onChange("questions")}
				>
					<BsBarChart className="w-5 h-5 mr-2" />
					Question Responses
				</button>
				<button
					className={`${base} ${active === "analytics" ? activeCls : idle}`}
					onClick={() => onChange("analytics")}
				>
					<BsBarChart className="w-5 h-5 mr-2" />
					Analytics
				</button>
				<button
					className={`${base} ${active === "settings" ? activeCls : idle}`}
					onClick={() => onChange("settings")}
				>
					<BsGear className="w-5 h-5 mr-2" />
					Settings
				</button>
			</nav>
		</div>
	);
}
