"use client";

import { Check, Users } from "lucide-react";
import { AUDIENCE_OPTIONS } from "./constants";

type Props = {
	selectedAudienceId: string;
	selectedSubOptions: Record<string, string[]>;
	customEmails: string;
	onAudienceChange: (id: string) => void;
	onSubOptionToggle: (subId: string) => void;
	onCustomEmailsChange: (v: string) => void;
	recipientCount: number;
};

export default function AudienceSelector({
	selectedAudienceId,
	selectedSubOptions,
	customEmails,
	onAudienceChange,
	onSubOptionToggle,
	onCustomEmailsChange,
	recipientCount,
}: Props) {
	return (
		<div>
			<div className="mb-2 flex items-center justify-between">
				<label className="text-sm font-medium text-gray-700 dark:text-slate-200">
					Target Audience
				</label>
				<span className="flex items-center gap-1.5 rounded-md !bg-white dark:!bg-slate-700/50 px-2 py-1 text-xs font-medium text-gray-600 dark:text-slate-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<Users size={14} /> {recipientCount} recipients
				</span>
			</div>
			<div className="space-y-3">
				{AUDIENCE_OPTIONS.map((option) => (
					<div
						key={option.id}
						className={`rounded-lg border-2 p-4 transition-all ${selectedAudienceId === option.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-slate-600"}`}
					>
						<div
							onClick={() => onAudienceChange(option.id)}
							className="flex cursor-pointer items-center gap-4"
						>
							<div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<div
									className={`h-2.5 w-2.5 rounded-full ${selectedAudienceId === option.id ? "bg-blue-600 dark:bg-blue-400" : ""}`}
								></div>
							</div>
							{option.icon}
							<div>
								<p className="font-semibold text-gray-900 dark:text-slate-200">
									{option.title}
								</p>
								<p className="text-sm text-gray-500 dark:text-slate-400">
									{option.description}
								</p>
							</div>
						</div>
						{selectedAudienceId === option.id && option.subOptions && (
							<div className="mt-4 space-y-3 pl-12">
								{option.subOptions.map((sub) => {
									const isChecked = (
										selectedSubOptions[option.id] || []
									).includes(sub.id);
									return (
										<div
											key={sub.id}
											className="flex cursor-pointer items-center justify-between"
											onClick={() => onSubOptionToggle(sub.id)}
										>
											<div className="flex items-center gap-3">
												<div
													className={`flex h-5 w-5 items-center justify-center rounded border-2 ${isChecked ? "border-blue-600 bg-blue-600 dark:bg-blue-400" : "border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"}`}
												>
													{isChecked && (
														<Check size={14} className="text-white" />
													)}
												</div>
												<span className="text-sm font-medium text-gray-700 dark:text-slate-200">
													{sub.name}
												</span>
											</div>
											<span className="rounded-md !bg-white dark:!bg-slate-700/50 px-2 py-0.5 text-sm text-gray-500 dark:text-slate-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
												{sub.count}
											</span>
										</div>
									);
								})}
							</div>
						)}
						{selectedAudienceId === option.id &&
							option.id === "Custom Email List" && (
								<div className="mt-4 pl-12">
									<textarea
										value={customEmails}
										onChange={(e) => onCustomEmailsChange(e.target.value)}
										placeholder={
											"Enter email addresses (one per line or comma-separated)\nexample1@email.com\nexample2@email.com"
										}
										rows={4}
										className="w-full rounded-lg border border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									/>
								</div>
							)}
					</div>
				))}
			</div>
		</div>
	);
}
