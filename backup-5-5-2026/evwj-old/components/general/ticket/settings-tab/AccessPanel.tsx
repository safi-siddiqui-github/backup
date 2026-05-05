"use client";

import { toast } from "sonner";
import ToggleSwitch from "./ToggleSwitch";
import type { AccessSettings } from "../types";

type Props = {
	access: AccessSettings;
	onChange: (p: Partial<AccessSettings>) => void;
	onSave: () => void;
	onReset: () => void;
};

export default function AccessPanel({
	access,
	onChange,
	onSave,
	onReset,
}: Props) {
	return (
		<div className="!bg-white dark:!bg-slate-700/50 p-5 rounded-lg border border-gray-200 dark:border-slate-600 shadow-md [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			<h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-slate-200">
				Access Control
			</h2>
			<p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
				Configure customer requirements and permissions
			</p>

			<div className="space-y-6 max-w-2xl">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="font-medium text-gray-700 dark:text-slate-200">
							Require Phone Number
						</h3>
						<p className="text-xs text-gray-600 dark:text-slate-400">
							Customers must provide phone number during checkout
						</p>
					</div>
					<ToggleSwitch
						checked={access.requirePhone}
						onChange={(v) => {
							onChange({ requirePhone: v });
							toast(`Require Phone Number: ${v ? "Yes" : "No"}`);
						}}
					/>
				</div>

				<div className="flex justify-between items-center">
					<div>
						<h3 className="font-medium text-gray-700 dark:text-slate-200">
							Require Address
						</h3>
						<p className="text-xs text-gray-600 dark:text-slate-400">
							Customers must provide billing address
						</p>
					</div>
					<ToggleSwitch
						checked={access.requireAddress}
						onChange={(v) => {
							onChange({ requireAddress: v });
							toast(`Require Address: ${v ? "Yes" : "No"}`);
						}}
					/>
				</div>

				<div className="flex justify-between items-center">
					<div>
						<h3 className="font-medium text-gray-700 dark:text-slate-200">
							Allow Guest Checkout
						</h3>
						<p className="text-xs text-gray-600 dark:text-slate-400">
							Allow purchases without creating an account
						</p>
					</div>
					<ToggleSwitch
						checked={access.allowGuest}
						onChange={(v) => {
							onChange({ allowGuest: v });
							toast(`Guest Checkout: ${v ? "Allowed" : "Disallowed"}`);
						}}
					/>
				</div>
			</div>

			<div className="mt-6 flex gap-3">
				<button
					onClick={onSave}
					className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
				>
					Save Access
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
