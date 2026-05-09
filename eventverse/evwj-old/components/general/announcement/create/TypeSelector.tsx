"use client";

import { ANNOUNCEMENT_TYPES } from "./constants";

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export default function TypeSelector({ value, onChange }: Props) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{ANNOUNCEMENT_TYPES.map((t) => {
				const active = value === t.name;
				return (
					<button
						key={t.name}
						type="button"
						onClick={() => onChange(t.name)}
						className={`flex items-center gap-3 rounded-lg border-2 p-3 sm:p-4 text-left transition-all w-full min-w-0 ${
							active
								? `${t.selectedBorderColor} ${t.selectedBgColor} cursor-pointer`
								: "cursor-pointer border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
						}`}
					>
						<div className={`flex-shrink-0 rounded-md p-2 ${t.iconContainerBg}`}>
							<div className={t.textColor}>{t.icon}</div>
						</div>
						<span
							className={`font-semibold text-sm sm:text-base break-words min-w-0 flex-1 ${active ? t.textColor : "text-gray-700 dark:text-slate-200"}`}
						>
							{t.name}
						</span>
					</button>
				);
			})}
		</div>
	);
}
