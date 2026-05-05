"use client";

import { toast } from "sonner";
import ToggleSwitch from "./ToggleSwitch";
import type { GeneralSettings } from "../types";

type Props = {
	general: GeneralSettings;
	onChange: (p: Partial<GeneralSettings>) => void;
	onSave: () => void;
	onReset: () => void;
};

export default function GeneralPanel({
	general,
	onChange,
	onSave,
	onReset,
}: Props) {
	return (
		<div className="!bg-white dark:!bg-slate-700/50 p-5 rounded-lg border border-gray-200 dark:border-slate-600 shadow-md [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			<h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-slate-200">
				General Ticketing Settings
			</h2>
			<p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
				Configure basic ticketing functionality
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-5">
					<div className="flex justify-between items-center">
						<div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200">
								Enable Ticketing
							</div>
							<div className="text-xs text-gray-600 dark:text-slate-400">
								Turn ticketing on or off
							</div>
						</div>
						<ToggleSwitch
							checked={general.enableTicketing}
							onChange={(v) => {
								onChange({ enableTicketing: v });
								toast(`Enable Ticketing: ${v ? "On" : "Off"}`);
							}}
						/>
					</div>

					<div className="flex justify-between items-center">
						<div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200">
								Allow Refunds
							</div>
							<div className="text-xs text-gray-600 dark:text-slate-400">
								Enable refund policy
							</div>
						</div>
						<ToggleSwitch
							checked={general.allowRefunds}
							onChange={(v) => {
								onChange({ allowRefunds: v });
								toast(`Allow Refunds: ${v ? "On" : "Off"}`);
							}}
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="max-tickets"
						className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
					>
						Max Tickets per Order
					</label>
					<input
						id="max-tickets"
						type="number"
						min={1}
						className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						value={general.maxTicketsPerOrder}
						onChange={(e) =>
							onChange({ maxTicketsPerOrder: Number(e.target.value || 0) })
						}
					/>
					<div className="mt-3 text-xs text-gray-600 dark:text-slate-400">
						Current:{" "}
						<span className="font-medium">{general.maxTicketsPerOrder}</span>
					</div>
				</div>
			</div>

			<div className="mt-6 flex gap-3">
				<button
					onClick={onSave}
					className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
				>
					Save General
				</button>

				<button
					onClick={onReset}
					className="px-4 py-2 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Reset
				</button>
			</div>
		</div>
	);
}
