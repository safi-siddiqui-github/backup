"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange: (itemsPerPage: number) => void;
	itemsPerPageOptions?: number[];
}

export default function PaginationControls({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
	onItemsPerPageChange,
	itemsPerPageOptions = [10, 20, 30, 40, 50],
}: PaginationControlsProps) {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
			<CardContent className="p-4">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-600 dark:text-slate-400">
							Items per page:
						</span>
						<select
							value={itemsPerPage}
							onChange={(e) => {
								onItemsPerPageChange(Number(e.target.value));
								onPageChange(1);
							}}
							className="dark:bg-background rounded-md border px-3 py-1.5 text-sm"
						>
							{itemsPerPageOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-600 dark:text-slate-400">
							Showing {startItem} - {endItem} of {totalItems}
						</span>
						<div className="flex items-center gap-1">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(Math.max(1, currentPage - 1))}
								disabled={currentPage === 1}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<span className="px-2 text-sm text-gray-600 dark:text-slate-400">
								Page {currentPage} of {totalPages}
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
								disabled={currentPage === totalPages}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

