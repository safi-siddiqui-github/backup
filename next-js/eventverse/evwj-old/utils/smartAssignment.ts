import { Guest, Table } from "@/types/venue";

export interface SmartAssignmentOptions {
	prioritizeGroups: boolean;
	respectDietary: boolean;
	balanceLoad: boolean;
	vipPriority: boolean;
}

export const smartAssignGuests = (
	guests: Guest[],
	tables: Table[],
	options: SmartAssignmentOptions = {
		prioritizeGroups: true,
		respectDietary: true,
		balanceLoad: true,
		vipPriority: true,
	},
): { tables: Table[]; unassigned: Guest[] } => {
	const updatedTables = tables.map((table) => ({
		...table,
		seatAssignments: {},
		guests: [],
	}));

	let remainingGuests = [...guests];

	// Sort guests by priority
	if (options.vipPriority) {
		remainingGuests.sort((a, b) => {
			if (a.group === "VIP" && b.group !== "VIP") return -1;
			if (b.group === "VIP" && a.group !== "VIP") return 1;
			return 0;
		});
	}

	// Group guests by their group attribute
	const guestGroups = remainingGuests.reduce(
		(groups, guest) => {
			if (!groups[guest?.group ?? 0]) groups[guest?.group ?? 0] = [];
			groups[guest?.group ?? 0].push(guest);
			return groups;
		},
		{} as Record<string, Guest[]>,
	);

	// Assign groups to tables
	for (const [groupName, groupGuests] of Object.entries(guestGroups)) {
		for (const guest of groupGuests) {
			// Find best table
			const availableTable = findBestTable(guest, updatedTables, options);
			if (availableTable) {
				const assignedSeats = Object.keys(
					availableTable.seatAssignments || {},
				).length;
				if (assignedSeats < availableTable.seats) {
					if (!availableTable.seatAssignments)
						availableTable.seatAssignments = {};
					availableTable.seatAssignments[assignedSeats + 1] = guest;
					availableTable.guests.push(guest);
					remainingGuests = remainingGuests.filter((g) => g.id !== guest.id);
				}
			}
		}
	}

	return { tables: updatedTables, unassigned: remainingGuests };
};

const findBestTable = (
	guest: Guest,
	tables: Table[],
	options: SmartAssignmentOptions,
): Table | null => {
	const availableTables = tables.filter((table) => {
		const assignedSeats = Object.keys(table.seatAssignments || {}).length;
		return assignedSeats < table.seats;
	});

	if (availableTables.length === 0) return null;

	// Score tables based on preferences
	const scoredTables = availableTables.map((table) => {
		let score = 0;

		// Prefer tables with same group
		if (options.prioritizeGroups && table.targetGroup === guest.group) {
			score += 100;
		}

		// Prefer tables with similar guests already assigned
		if (options.prioritizeGroups) {
			const sameGroupGuests = table.guests.filter(
				(g) => g.group === guest.group,
			).length;
			score += sameGroupGuests * 50;
		}

		// Load balancing - prefer less occupied tables
		if (options.balanceLoad) {
			const occupancy =
				Object.keys(table.seatAssignments || {}).length / table.seats;
			score += (1 - occupancy) * 30;
		}

		return { table, score };
	});

	// Return highest scoring table
	scoredTables.sort((a, b) => b.score - a.score);
	return scoredTables[0].table;
};

export const resetArrangement = (tables: Table[]) => {
	return tables.map((table) => ({
		...table,
		guests: [],
		seatAssignments: {},
	}));
};
