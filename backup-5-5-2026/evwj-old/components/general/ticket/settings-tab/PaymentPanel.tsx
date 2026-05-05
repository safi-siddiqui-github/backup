"use client";

import { toast } from "sonner";
import type { PaymentSettings } from "../types";
import ToggleSwitch from "./ToggleSwitch";

type Props = {
	payment: PaymentSettings;
	onChange: (p: Partial<PaymentSettings>) => void;
	onSave: () => void;
	onReset: () => void;
};

export default function PaymentPanel({
	payment,
	onChange,
	onSave,
	onReset,
}: Props) {
	return (
		<div className="rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-5 shadow-md [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			<h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-slate-200">
				Payment Configuration
			</h2>
			<p className="mb-6 text-sm text-gray-600 dark:text-slate-400">
				Set up payment methods and fees
			</p>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<div>
						<label
							htmlFor="currency"
							className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200"
						>
							Currency
						</label>
						<select
							id="currency"
							value={payment.currency}
							onChange={(e) => onChange({ currency: e.target.value })}
							className="w-full rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-3 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						>
							<option value="USD">USD – US Dollar</option>
							<option value="EUR">EUR – Euro</option>
							<option value="CAD">CAD – Canadian Dollar</option>
							<option value="GBP">GBP – British Pound</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="tax-rate"
							className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200"
						>
							Tax Rate (%)
						</label>
						<input
							id="tax-rate"
							type="number"
							min={0}
							className="w-full rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-3 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							value={payment.taxRate}
							readOnly
						/>
					</div>

					<div>
						<label
							htmlFor="processing-fee"
							className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200"
						>
							Processing Fee Rate (%)
						</label>
						<input
							id="processing-fee"
							type="number"
							min={0}
							className="w-full rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-3 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							value={payment.processingFee}
							readOnly
						/>
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="text-sm font-medium text-gray-700 dark:text-slate-200">
						Payment Methods
					</h3>

					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200">
								Credit/Debit Cards
							</div>
							<div className="text-xs text-gray-600 dark:text-slate-400">
								Enable card payments
							</div>
						</div>
						<ToggleSwitch
							checked={payment.cardEnabled}
							onChange={(v) => {
								onChange({ cardEnabled: v });
								toast(`Card Payments ${v ? "Enabled" : "Disabled"}`);
							}}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200">
								PayPal
							</div>
							<div className="text-xs text-gray-600 dark:text-slate-400">
								Enable PayPal
							</div>
						</div>
						<ToggleSwitch
							checked={payment.paypalEnabled}
							onChange={(v) => {
								onChange({ paypalEnabled: v });
								toast(`PayPal ${v ? "Enabled" : "Disabled"}`);
							}}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200">
								Bank Transfer
							</div>
							<div className="text-xs text-gray-600 dark:text-slate-400">
								Enable bank transfer
							</div>
						</div>
						<ToggleSwitch
							checked={payment.bankEnabled}
							onChange={(v) => {
								onChange({ bankEnabled: v });
								toast(`Bank Transfer ${v ? "Enabled" : "Disabled"}`);
							}}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200">
								Apple Pay
							</div>
							<div className="text-xs text-gray-600 dark:text-slate-400">
								Enable Apple Pay
							</div>
						</div>
						<ToggleSwitch
							checked={payment.applePayEnabled}
							onChange={(v) => {
								onChange({ applePayEnabled: v });
								toast(`Apple Pay ${v ? "Enabled" : "Disabled"}`);
							}}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm font-medium text-gray-700 dark:text-slate-200">
								Google Pay
							</div>
							<div className="text-xs text-gray-600 dark:text-slate-400">
								Enable Google Pay
							</div>
						</div>
						<ToggleSwitch
							checked={payment.googlePayEnabled}
							onChange={(v) => {
								onChange({ googlePayEnabled: v });
								toast(`Google Pay ${v ? "Enabled" : "Disabled"}`);
							}}
						/>
					</div>
				</div>
			</div>

			<div className="mt-6 flex gap-3">
				<button
					onClick={onSave}
					className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2 font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300"
				>
					Save Payment
				</button>
				<button
					onClick={onReset}
					className="rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 px-4 py-2 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Reset
				</button>
			</div>
		</div>
	);
}
