import {
	EventRole,
	EventTeamMember,
	ModulePermissions,
} from "@/types/eventTeam";
import { useEffect, useState } from "react";

const STORAGE_PREFIX = "eventverse_event_team_";

export const useEventTeam = (eventId: string) => {
	// const { user } = useAuth();
	const user: Partial<{ id: string; email: string }> = {};
	const [teamMembers, setTeamMembers] = useState<EventTeamMember[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadTeamMembers();
	}, [eventId]);

	const loadTeamMembers = () => {
		try {
			const stored = localStorage.getItem(`${STORAGE_PREFIX}${eventId}`);
			if (stored) {
				const members = JSON.parse(stored);
				setTeamMembers(
					members.map((m: any) => ({
						...m,
						invitedAt: new Date(m.invitedAt),
						acceptedAt: m.acceptedAt ? new Date(m.acceptedAt) : undefined,
					})),
				);
			}
		} catch (error) {
			console.error("Error loading team members:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const saveTeamMembers = (members: EventTeamMember[]) => {
		try {
			localStorage.setItem(
				`${STORAGE_PREFIX}${eventId}`,
				JSON.stringify(members),
			);
			setTeamMembers(members);
		} catch (error) {
			console.error("Error saving team members:", error);
		}
	};

	const inviteTeamMember = (
		email: string,
		modulePermissions: ModulePermissions,
	) => {
		if (!user) return null;

		// Check if email already invited
		if (
			teamMembers.some((m) => m.email.toLowerCase() === email.toLowerCase())
		) {
			throw new Error("This email has already been invited");
		}

		const newMember: EventTeamMember = {
			id: Date.now().toString(),
			eventId,
			email,
			modulePermissions,
			invitedBy: user.id ?? "",
			invitedAt: new Date(),
			status: "pending",
		};

		const updated = [...teamMembers, newMember];
		saveTeamMembers(updated);
		return newMember;
	};

	const removeTeamMember = (memberId: string) => {
		const updated = teamMembers.filter((m) => m.id !== memberId);
		saveTeamMembers(updated);
	};

	const updateMemberPermissions = (
		memberId: string,
		newPermissions: ModulePermissions,
	) => {
		const updated = teamMembers.map((m) =>
			m.id === memberId ? { ...m, modulePermissions: newPermissions } : m,
		);
		saveTeamMembers(updated);
	};

	// Keep for backward compatibility
	const updateMemberRole = (memberId: string, newRole: EventRole) => {
		const updated = teamMembers.map((m) =>
			m.id === memberId ? { ...m, role: newRole } : m,
		);
		saveTeamMembers(updated);
	};

	const getUserRole = (): EventRole | null => {
		if (!user) return null;

		// First check sessionStorage for current event (used for mock/navigated events)
		const sessionEvent = sessionStorage.getItem("currentEvent");
		if (sessionEvent) {
			try {
				const event = JSON.parse(sessionEvent);
				if (event && event.userId === user.id) {
					return "host";
				}
			} catch (error) {
				console.error("Error parsing session event:", error);
			}
		}

		// Then check localStorage for persisted events
		const events = localStorage.getItem("eventverse_events");
		if (events) {
			const allEvents = JSON.parse(events);
			const event = allEvents.find((e: any) => e.id === eventId);
			if (event && event.userId === user.id) {
				return "host";
			}
		}

		// Check if user is a team member
		const member = teamMembers.find(
			(m) => m.email === user.email && m.status === "accepted",
		);
		return member?.role || null;
	};

	return {
		teamMembers,
		isLoading,
		inviteTeamMember,
		removeTeamMember,
		updateMemberPermissions,
		updateMemberRole, // Keep for backward compatibility
		getUserRole,
	};
};
