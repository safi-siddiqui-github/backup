"use client";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import type { Respondent } from "../types/survey-types";

export default function RespondentList() {
	const respondents: Respondent[] = [
		{
			name: "John Smith",
			date: "10/13/2025 • 6:44:53 PM",
			status: "Incomplete",
			initial: "JS",
			bg: "bg-blue-500",
		},
		{
			name: "Sarah Johnson",
			date: "9/26/2025 • 2:52:24 PM",
			status: "Completed",
			initial: "SJ",
			bg: "bg-pink-500",
		},
		{
			name: "Mike Davis",
			date: "9/30/2025 • 6:52:39 AM",
			status: "Completed",
			initial: "MD",
			bg: "bg-green-500",
		},
		{
			name: "Emily Wilson",
			date: "9/28/2025 • 6:59:28 PM",
			status: "Completed",
			initial: "EW",
			bg: "bg-orange-500",
		},
	];

	return (
		<div className="border-t border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-[#020617]/70 px-5 sm:px-6 py-5">
			{/* Filter Bar */}
			<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
				<div className="relative w-full sm:max-w-xs">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<BsSearch className="text-gray-400 dark:text-slate-500" />
					</div>
					<input
						type="text"
						placeholder="Search respondents..."
						className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-slate-500 [background-color:white] dark:[background-color:#020617]"
					/>
				</div>
				<select className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent [background-color:white] dark:[background-color:#020617]">
					<option>All</option>
					<option>Completed</option>
					<option>Incomplete</option>
				</select>
			</div>

			{/* Respondent List */}
			<div className="space-y-4">
				{respondents.map((respondent) => (
					<div
						key={respondent.name}
						className="flex justify-between items-center !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] p-3 rounded-lg border border-gray-200 dark:border-slate-600 hover:shadow-md transition-shadow"
					>
						<div className="flex items-center space-x-3">
							<div
								className={`w-10 h-10 rounded-full ${respondent.bg} text-white flex items-center justify-center text-sm font-semibold shadow-md`}
							>
								{respondent.initial}
							</div>
							<div>
								<div className="font-semibold text-gray-900 dark:text-slate-200">
									{respondent.name}
								</div>
								<div className="text-xs text-gray-500 dark:text-slate-400">
									{respondent.date}
								</div>
							</div>
						</div>

						{respondent.status === "Completed" ? (
							<span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
								Completed
							</span>
						) : (
							<div className="flex items-center space-x-1">
								<span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
									Incomplete
								</span>
								<FaArrowDown
									className="text-gray-400 dark:text-slate-500 cursor-pointer hover:text-gray-600 dark:hover:text-slate-300"
									size={12}
								/>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Bottom fade/arrow */}
			<div className="flex justify-end mt-3">
				<BsChevronDown className="text-gray-400 dark:text-slate-500 cursor-pointer hover:text-gray-600 dark:hover:text-slate-300" />
			</div>
		</div>
	);
}
