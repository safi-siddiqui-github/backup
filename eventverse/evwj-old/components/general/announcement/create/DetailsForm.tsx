"use client";

type Props = {
	title: string;
	message: string;
	priority: "low" | "medium" | "high";
	onChange: (
		patch: Partial<{
			title: string;
			message: string;
			priority: "low" | "medium" | "high";
		}>,
	) => void;
	errors?: Partial<{ title: string; message: string }>;
};

export default function DetailsForm({
	title,
	message,
	priority,
	onChange,
	errors,
}: Props) {
	return (
		<div className="space-y-6">
			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
					Title <span className="text-red-500">*</span>
				</label>
				<input
					value={title}
					onChange={(e) => onChange({ title: e.target.value })}
					className={`w-full rounded-lg border p-3 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)] ${
						errors?.title
							? "border-red-500 dark:border-red-400"
							: "border-gray-300 dark:border-slate-600"
					}`}
				/>
				{errors?.title && (
					<p className="mt-1 text-xs text-red-500 dark:text-red-400">
						{errors.title}
					</p>
				)}
			</div>
			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
					Message Content <span className="text-red-500">*</span>
				</label>
				<textarea
					value={message}
					placeholder="Enter your announcement message"
					onChange={(e) => onChange({ message: e.target.value })}
					rows={5}
					className={`w-full resize-none rounded-lg border p-3 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)] ${
						errors?.message
							? "border-red-500 dark:border-red-400"
							: "border-gray-300 dark:border-slate-600"
					}`}
				/>
				{errors?.message && (
					<p className="mt-1 text-xs text-red-500 dark:text-red-400">
						{errors.message}
					</p>
				)}
			</div>
			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
					Priority Level
				</label>
				<select
					value={priority}
					onChange={(e) =>
						onChange({ priority: e.target.value as Props["priority"] })
					}
					className="w-full rounded-lg border border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
			</div>
		</div>
	);
}
