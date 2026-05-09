"use client";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Props = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	totalItems: number;
	itemsPerPage: number;
};

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	totalItems,
	itemsPerPage,
}: Props) {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-6 border-t border-gray-200 dark:border-slate-600 gap-4">
			<div className="text-sm text-gray-600 dark:text-slate-400">
				Showing <span className="font-medium">{startItem}</span> to{" "}
				<span className="font-medium">{endItem}</span> of{" "}
				<span className="font-medium">{totalItems}</span> responses
			</div>
			<div className="flex items-center gap-2">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 !bg-white dark:!bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					<BsChevronLeft className="w-4 h-4 mr-1" />
					Previous
				</button>

				<div className="flex items-center gap-1">
					{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
						let pageNum;
						if (totalPages <= 5) {
							pageNum = i + 1;
						} else if (currentPage <= 3) {
							pageNum = i + 1;
						} else if (currentPage >= totalPages - 2) {
							pageNum = totalPages - 4 + i;
						} else {
							pageNum = currentPage - 2 + i;
						}

						return (
							<button
								key={pageNum}
								onClick={() => onPageChange(pageNum)}
								className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium border rounded-lg transition-all ${
									pageNum === currentPage
										? "bg-indigo-600 border-indigo-600 text-white shadow-md"
										: "!bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								}`}
							>
								{pageNum}
							</button>
						);
					})}
				</div>

				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 !bg-white dark:!bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Next
					<BsChevronRight className="w-4 h-4 ml-1" />
				</button>
			</div>
		</div>
	);
}
