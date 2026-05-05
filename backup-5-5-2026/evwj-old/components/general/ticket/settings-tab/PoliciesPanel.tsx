"use client";

import type { Policies } from "../types";

type Props = {
	policies: Policies;
	onChange: (p: Partial<Policies>) => void;
	onSave: () => void;
	onClear: () => void;
};

export default function PoliciesPanel({
	policies,
	onChange,
	onSave,
	onClear,
}: Props) {
	return (
		<div className="!bg-white dark:!bg-slate-700/50 p-5 rounded-lg border border-gray-200 dark:border-slate-600 shadow-md [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			<div className="flex items-center space-x-2 mb-2">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-200">
					Terms & Policies
				</h2>
			</div>

			<p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
				Set up legal terms, refund policy and privacy settings
			</p>

			<div className="space-y-4">
				<div>
					<label
						htmlFor="terms"
						className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
					>
						Terms and Conditions
					</label>
					<textarea
						id="terms"
						rows={4}
						className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						value={policies.terms}
						onChange={(e) => onChange({ terms: e.target.value })}
						placeholder="Enter your terms and conditions..."
					/>
				</div>

				<div>
					<label
						htmlFor="refund-policy"
						className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
					>
						Refund Policy
					</label>
					<textarea
						id="refund-policy"
						rows={4}
						className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						value={policies.refundPolicy}
						onChange={(e) => onChange({ refundPolicy: e.target.value })}
						placeholder="Enter your refund policy..."
					/>
				</div>

				<div>
					<label
						htmlFor="privacy-policy"
						className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2"
					>
						Privacy Policy
					</label>
					<textarea
						id="privacy-policy"
						rows={4}
						className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						value={policies.privacyPolicy}
						onChange={(e) => onChange({ privacyPolicy: e.target.value })}
						placeholder="Enter your privacy policy..."
					/>
				</div>
			</div>

			<div className="mt-6 flex gap-3">
				<button
					onClick={onSave}
					className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
				>
					Save Policies
				</button>
				<button
					onClick={onClear}
					className="px-4 py-2 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Clear
				</button>
			</div>
		</div>
	);
}
