import { useState, useMemo, useEffect } from "react";
import { EventWithDistance } from "../utils/eventFiltering";

export function useEventPagination(events: EventWithDistance[]) {
	const [currentPage, setCurrentPage] = useState(1);
	const [eventsPerPage, setEventsPerPage] = useState(12);

	// Reset to page 1 when events change
	useEffect(() => {
		setCurrentPage(1);
	}, [events.length]);

	const paginatedEvents = useMemo(() => {
		const startIndex = (currentPage - 1) * eventsPerPage;
		const endIndex = startIndex + eventsPerPage;
		return events.slice(startIndex, endIndex);
	}, [events, currentPage, eventsPerPage]);

	const totalPages = Math.ceil(events.length / eventsPerPage);

	const goToPage = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(totalPages, page)));
	};

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages, prev + 1));
	};

	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(1, prev - 1));
	};

	const changeItemsPerPage = (newItemsPerPage: number) => {
		setEventsPerPage(newItemsPerPage);
		setCurrentPage(1);
	};

	return {
		currentPage,
		eventsPerPage,
		totalPages,
		paginatedEvents,
		goToPage,
		goToNextPage,
		goToPreviousPage,
		changeItemsPerPage,
	};
}
