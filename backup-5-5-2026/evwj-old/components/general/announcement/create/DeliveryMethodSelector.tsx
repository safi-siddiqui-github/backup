"use client";

import { Check, Smartphone, Mail, MessageSquare } from "lucide-react";

export type DeliveryMethod = "In-App" | "SMS" | "Email";

type Props = {
	selectedMethods: DeliveryMethod[];
	onChange: (methods: DeliveryMethod[]) => void;
};

const DELIVERY_METHODS: Array<{
	id: DeliveryMethod;
	label: string;
	icon: React.ReactNode;
	description: string;
}> = [
	{
		id: "In-App",
		label: "In-App",
		icon: <Smartphone size={20} className="text-blue-600" />,
		description: "Notification within the app",
	},
	{
		id: "SMS",
		label: "SMS",
		icon: <MessageSquare size={20} className="text-green-600" />,
		description: "Text message to phone",
	},
	{
		id: "Email",
		label: "Email",
		icon: <Mail size={20} className="text-purple-600" />,
		description: "Email notification",
	},
];

export default function DeliveryMethodSelector({
	selectedMethods,
	onChange,
}: Props) {
	const handleToggle = (method: DeliveryMethod) => {
		if (selectedMethods.includes(method)) {
			onChange(selectedMethods.filter((m) => m !== method));
		} else {
			onChange([...selectedMethods, method]);
		}
	};

	return (
		<div>
			<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
				Method of Delivery
			</label>
			<p className="mb-4 text-xs text-gray-500 dark:text-slate-400">
				Select one or more delivery methods for your announcement
			</p>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				{DELIVERY_METHODS.map((method) => {
					const isSelected = selectedMethods.includes(method.id);
					return (
						<button
							key={method.id}
							type="button"
							onClick={() => handleToggle(method.id)}
							className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all w-full min-w-0 cursor-pointer ${
								isSelected
									? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
									: "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
							}`}
						>
							<div
								className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
									isSelected
										? "border-blue-600 bg-blue-600 dark:bg-blue-400"
										: "border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								}`}
							>
								{isSelected && (
									<Check size={14} className="text-white" />
								)}
							</div>
							<div className="flex-shrink-0">{method.icon}</div>
							<div className="min-w-0 flex-1">
								<span
									className={`font-semibold text-sm sm:text-base break-words ${
										isSelected
											? "text-blue-700 dark:text-blue-300"
											: "text-gray-700 dark:text-slate-200"
									}`}
								>
									{method.label}
								</span>
								<p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
									{method.description}
								</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}

