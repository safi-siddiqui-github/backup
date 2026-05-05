import { FaPercent, FaDollarSign, FaGift } from "react-icons/fa";
import type { PromoCodeIcon, PromoCodeStatus } from "../types";

export function PromoIcon({ icon }: { icon: PromoCodeIcon }) {
	let iconComponent;
	switch (icon) {
		case "percent":
			iconComponent = (
				<FaPercent size={20} className="text-gray-600 dark:text-slate-400" />
			);
			break;
		case "dollar":
			iconComponent = (
				<FaDollarSign size={20} className="text-gray-600 dark:text-slate-400" />
			);
			break;
		case "gift":
			iconComponent = (
				<FaGift size={20} className="text-gray-600 dark:text-slate-400" />
			);
			break;
	}
	return (
		<div className="w-10 h-10 rounded-full !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 flex items-center justify-center [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			{iconComponent}
		</div>
	);
}

export function StatusBadge({ status }: { status: PromoCodeStatus }) {
	const base =
		"inline-block text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ml-2 align-middle";
	if (status === "Active")
		return (
			<span
				className={
					base +
					" !bg-white dark:!bg-slate-700/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				}
			>
				{status}
			</span>
		);
	return (
		<span
			className={
				base +
				" !bg-white dark:!bg-slate-700/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
			}
		>
			{status}
		</span>
	);
}
