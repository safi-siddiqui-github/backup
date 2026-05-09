import { useState } from "react";
// import { useAuth } from "./useAuth";

interface EventData {
	id: string;
	userId: string;
	eventName: string;
	eventType: string;
	startDate: Date;
	endDate: Date;
	description?: string;
	location?: string;
	maxGuests?: number;
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export const useEventStorage = () => {
	// const { user } = useAuth();
	const user = { id: "abcd" };
	const [events, setEvents] = useState<EventData[]>([]);

	// useEffect(() => {
	//   if (user) {
	//     const storedEvents = localStorage.getItem("eventverse_events");
	//     if (storedEvents) {
	//       const allEvents = JSON.parse(storedEvents);
	//       // Filter events for current user
	//       const userEvents = allEvents.filter(
	//         (event: EventData) => event.userId === user.id,
	//       );
	//       setEvents(userEvents);
	//     }
	//   } else {
	//     setEvents([]);
	//   }
	// }, [user]);

	const saveEvent = (
		eventData: Omit<EventData, "id" | "userId" | "createdAt" | "updatedAt">,
	) => {
		// if (!user) return null;
		if (true) return null;

		const newEvent: EventData = {
			...eventData,
			id: Date.now().toString(),
			userId: user?.id,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Get all events from storage
		const storedEvents = localStorage.getItem("eventverse_events");
		// const allEvents = storedEvents ? JSON.parse(storedEvents) : [];

		// Add new event
		// const updatedEvents = [...allEvents, newEvent];
		// localStorage.setItem("eventverse_events", JSON.stringify(updatedEvents));

		// Update local state
		setEvents((prev) => [...prev, newEvent]);

		return newEvent;
	};

	const updateEvent = (eventId: string, updates: Partial<EventData>) => {
		if (!user) return;

		// Get all events from storage
		const storedEvents = localStorage.getItem("eventverse_events");
		const allEvents = storedEvents ? JSON.parse(storedEvents) : [];

		// Update the specific event
		const updatedAllEvents = allEvents.map((event: EventData) =>
			event.id === eventId && event.userId === user.id
				? { ...event, ...updates, updatedAt: new Date() }
				: event,
		);

		localStorage.setItem("eventverse_events", JSON.stringify(updatedAllEvents));

		// Update local state
		setEvents((prev) =>
			prev.map((event) =>
				event.id === eventId
					? { ...event, ...updates, updatedAt: new Date() }
					: event,
			),
		);
	};

	const deleteEvent = (eventId: string) => {
		if (!user) return;

		// Get all events from storage
		const storedEvents = localStorage.getItem("eventverse_events");
		const allEvents = storedEvents ? JSON.parse(storedEvents) : [];

		// Remove the event
		const updatedAllEvents = allEvents.filter(
			(event: EventData) => !(event.id === eventId && event.userId === user.id),
		);

		localStorage.setItem("eventverse_events", JSON.stringify(updatedAllEvents));

		// Update local state
		setEvents((prev) => prev.filter((event) => event.id !== eventId));
	};

	const getEvent = (eventId: string) => {
		return events.find((event) => event.id === eventId);
	};

	return {
		events,
		saveEvent,
		updateEvent,
		deleteEvent,
		getEvent,
	};
};
