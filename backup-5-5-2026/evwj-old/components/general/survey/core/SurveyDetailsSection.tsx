"use client";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDownIcon, X } from "lucide-react";
import type { SurveyDetailsSectionProps } from "../types/survey-types";
import { SURVEY_ALL_RECIPIENTS } from "./survey-recipient-data";

export default function SurveyDetailsSection({
	title,
	description,
	scheduleTime,
	sendTo = [],
	onTitleChange,
	onDescriptionChange,
	onScheduleTimeChange,
	onSendToChange,
	titleError,
}: SurveyDetailsSectionProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleRecipient = (recipientId: string) => {
		if (!onSendToChange) return;
		const newSendTo = sendTo.includes(recipientId)
			? sendTo.filter((id) => id !== recipientId)
			: [...sendTo, recipientId];
		onSendToChange(newSendTo);
	};

	const handleRemoveRecipient = (recipientId: string, e: React.MouseEvent) => {
		e.stopPropagation();
		if (!onSendToChange) return;
		onSendToChange(sendTo.filter((id) => id !== recipientId));
	};
	return (
		<section className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border border-gray-200 dark:border-slate-600 rounded-xl p-4 sm:p-6 shadow-sm">
			<h3 className="text-lg font-bold text-gray-900 dark:text-slate-200 mb-4 flex items-center gap-2">
				<span className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
					1
				</span>
				Survey Details
			</h3>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2"
					>
						Survey Title <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => onTitleChange(e.target.value)}
						placeholder="e.g., Event Feedback Survey"
						className={`w-full p-3 sm:p-4 border-2 ${
							titleError
								? "border-red-500 dark:border-red-500"
								: "border-gray-300 dark:border-slate-600"
						} rounded-xl bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 [background-color:white] dark:[background-color:#020617]`}
					/>
					{titleError && (
						<p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
							<BsInfoCircle /> {titleError}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor="description"
						className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2"
					>
						Description{" "}
						<span className="text-gray-400 text-xs">(Optional)</span>
					</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => onDescriptionChange(e.target.value)}
						rows={3}
						placeholder="Tell your guests what this survey is about..."
						className="w-full p-3 sm:p-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-none [background-color:white] dark:[background-color:#020617]"
					/>
				</div>
				{onScheduleTimeChange && (
					<div>
						<label
							htmlFor="scheduleTime"
							className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2"
						>
							Schedule Survey{" "}
							<span className="text-gray-400 text-xs">(Optional)</span>
						</label>
						<input
							type="datetime-local"
							id="scheduleTime"
							value={scheduleTime || ""}
							onChange={(e) => onScheduleTimeChange(e.target.value)}
							min={new Date().toISOString().slice(0, 16)}
							className="w-full p-3 sm:p-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 [background-color:white] dark:[background-color:#020617]"
						/>
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							Select when the survey should be sent out
						</p>
					</div>
				)}
				{onSendToChange && (
					<div>
						<label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
							Send to{" "}
							<span className="text-gray-400 text-xs">(Optional)</span>
						</label>
						<Popover open={isOpen} onOpenChange={setIsOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									className="w-full justify-between p-3 sm:p-4 h-auto min-h-[3rem] border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 [background-color:white] dark:[background-color:#020617]"
								>
									<div className="flex flex-wrap gap-1.5 flex-1 text-left">
										{sendTo.length === 0 ? (
											<span className="text-gray-400 dark:text-slate-500">
												Select recipients...
											</span>
										) : (
											SURVEY_ALL_RECIPIENTS.filter((r) => sendTo.includes(r.id)).map(
												(recipient) => (
													<span
														key={recipient.id}
														className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium"
													>
														{recipient.name}
														<X
															size={12}
															className="cursor-pointer hover:text-indigo-900 dark:hover:text-indigo-100"
															onClick={(e) => handleRemoveRecipient(recipient.id, e)}
														/>
													</span>
												),
											)
										)}
									</div>
									<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full p-0" align="start">
								<Command>
									<CommandInput placeholder="Search groups or ticket tiers..." />
									<CommandList>
										<CommandEmpty>No recipients found.</CommandEmpty>
										<CommandGroup>
											{SURVEY_ALL_RECIPIENTS.map((recipient) => {
												const isSelected = sendTo.includes(recipient.id);
												return (
													<CommandItem
														key={recipient.id}
														value={recipient.id}
														onSelect={() => handleToggleRecipient(recipient.id)}
														className="flex items-center gap-2 cursor-pointer"
													>
														<Checkbox
															checked={isSelected}
															onCheckedChange={() => handleToggleRecipient(recipient.id)}
														/>
														<div className="flex-1 flex items-center justify-between">
															<span>{recipient.name}</span>
															<span className="text-xs text-gray-500 dark:text-slate-400 ml-2">
																({recipient.count})
															</span>
														</div>
													</CommandItem>
												);
											})}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							Select specific groups or ticket tiers to send the survey to
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
