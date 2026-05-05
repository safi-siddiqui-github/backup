"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface EventsPaginationProps {
	currentPage: number;
	totalPages: number;
	totalEvents: number;
	eventsPerPage: number;
	onPageChange: (page: number) => void;
	onNextPage: () => void;
	onPreviousPage: () => void;
	onEventsPerPageChange: (value: number) => void;
}

export default function EventsPagination({
	currentPage,
	totalPages,
	totalEvents,
	eventsPerPage,
	onPageChange,
	onNextPage,
	onPreviousPage,
	onEventsPerPageChange,
}: EventsPaginationProps) {
	if (totalEvents === 0) return null;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handlePageChange = (page: number) => {
		scrollToTop();
		onPageChange(page);
	};

	const handleNextPage = () => {
		scrollToTop();
		onNextPage();
	};

	const handlePreviousPage = () => {
		scrollToTop();
		onPreviousPage();
	};

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={handlePreviousPage}
								className={
									currentPage === 1
										? "pointer-events-none opacity-50"
										: "cursor-pointer"
								}
							/>
						</PaginationItem>

						{Array.from({ length: totalPages }, (_, i) => {
							const page = i + 1;
							const isCurrentPage = page === currentPage;
							const showPage =
								page === 1 ||
								page === totalPages ||
								Math.abs(page - currentPage) <= 1;

							if (!showPage) {
								if (page === 2 && currentPage > 4) {
									return (
										<PaginationItem key={`ellipsis-${page}`}>
											<span className="px-2">...</span>
										</PaginationItem>
									);
								}
								if (page === totalPages - 1 && currentPage < totalPages - 3) {
									return (
										<PaginationItem key={`ellipsis-${page}`}>
											<span className="px-2">...</span>
										</PaginationItem>
									);
								}
								return null;
							}

							return (
								<PaginationItem key={page}>
									<PaginationLink
										onClick={() => handlePageChange(page)}
										isActive={isCurrentPage}
										className="cursor-pointer"
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							);
						})}

						<PaginationItem>
							<PaginationNext
								onClick={handleNextPage}
								className={
									currentPage === totalPages
										? "pointer-events-none opacity-50"
										: "cursor-pointer"
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>

				{/* Items per page selector */}
				<div className="flex items-center gap-2 whitespace-nowrap">
					<span className="text-muted-foreground text-sm">Show:</span>
					<Select
						value={eventsPerPage.toString()}
						onValueChange={(value) => onEventsPerPageChange(parseInt(value))}
					>
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="6">6</SelectItem>
							<SelectItem value="12">12</SelectItem>
							<SelectItem value="24">24</SelectItem>
							<SelectItem value="36">36</SelectItem>
						</SelectContent>
					</Select>
					<span className="text-muted-foreground text-sm">per page</span>
				</div>
			</div>

			<p className="text-sm text-muted-foreground">
				Showing {(currentPage - 1) * eventsPerPage + 1} to{" "}
				{Math.min(currentPage * eventsPerPage, totalEvents)} of {totalEvents}{" "}
				events
			</p>
		</div>
	);
}
