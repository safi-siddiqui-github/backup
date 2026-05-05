"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Avatar from "../common/Avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { GuestProfile } from "./GuestProfileDrawer";

export type GuestSortField =
	| "name"
	| "lastEvent"
	| "totalSpent"
	| "events"
	| "segments";

export interface GuestRecord extends GuestProfile {
	lastEventLabel: string;
	lastEventDate: string;
}

interface GuestTableProps {
	guests: GuestRecord[];
	selectedIds: string[];
	allVisibleSelected: boolean;
	onSelectGuest: (guestId: string, checked: boolean) => void;
	onSelectAll: (checked: boolean) => void;
	sortField: GuestSortField;
	sortDirection: "asc" | "desc";
	onSortFieldChange: (field: GuestSortField) => void;
	onRowClick: (guest: GuestRecord) => void;
}

export default function GuestTable({
	guests,
	selectedIds,
	allVisibleSelected,
	onSelectGuest,
	onSelectAll,
	sortField,
	sortDirection,
	onSortFieldChange,
	onRowClick,
}: GuestTableProps) {
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(value);

	const sortableColumns: { label: string; field?: GuestSortField }[] = [
		{ label: "Guest", field: "name" },
		{ label: "Contact" },
		{ label: "Demographics" },
		{ label: "Events", field: "events" },
		{ label: "Total Spent", field: "totalSpent" },
		{ label: "Segments", field: "segments" },
	];

	return (
		<div className="rounded-xl border">
			<Table>
				<TableHeader className="bg-muted/50">
					<TableRow className="text-muted-foreground text-xs uppercase tracking-wide">
						<TableHead className="px-4 py-3">
							<Checkbox
								checked={allVisibleSelected}
								onCheckedChange={(checked) => onSelectAll(Boolean(checked))}
								aria-label="Select all guests"
								className="text-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-blue-300"
							/>
						</TableHead>
						{sortableColumns.map((column) => {
							const isActive = column.field && sortField === column.field;
							return (
								<TableHead key={column.label} className="px-4 py-3 font-medium">
									{column.field ? (
										<button
											type="button"
											className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
											onClick={() => onSortFieldChange(column.field!)}
										>
											<span>{column.label}</span>
											<ChevronsUpDown
												className={cn(
													"h-3.5 w-3.5 transition",
													isActive
														? "text-foreground"
														: "text-muted-foreground",
												)}
												style={
													isActive && sortDirection === "asc"
														? { transform: "rotate(180deg)" }
														: undefined
												}
											/>
										</button>
									) : (
										<span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
											{column.label}
										</span>
									)}
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>

				<TableBody className="divide-y">
					{guests.map((guest) => {
						const isSelected = selectedIds.includes(guest.id);
						return (
							<TableRow
								key={guest.id}
								className="cursor-pointer transition-colors hover:bg-muted/40"
								data-state={isSelected ? "selected" : undefined}
								onClick={() => onRowClick(guest)}
							>
								<TableCell className="px-4 py-4">
									<Checkbox
										checked={isSelected}
										onCheckedChange={(checked) =>
											onSelectGuest(guest.id, Boolean(checked))
										}
										onClick={(event) => event.stopPropagation()}
										aria-label={`Select ${guest.name}`}
										className="text-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-blue-300"
									/>
								</TableCell>
								<TableCell className="px-4 py-4">
									<div className="flex items-center gap-3">
										<Avatar
											initials={guest.initials}
											color={guest.color}
											size="sm"
										/>
										<div>
											<div className="font-semibold">{guest.name}</div>
											<p className="text-xs text-muted-foreground">
												Last:{" "}
												{new Date(guest.lastEventDate).toLocaleDateString(
													"en-US",
													{
														day: "2-digit",
														month: "2-digit",
														year: "numeric",
													},
												)}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell className="px-4 py-4">
									<div className="text-sm space-y-1">
										<div className="flex items-center gap-2 text-foreground font-medium">
											<Mail className="h-3 w-3 text-muted-foreground" />
											<span>{guest.email}</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Phone className="h-3 w-3 text-muted-foreground" />
											<span>{guest.phone}</span>
										</div>
									</div>
								</TableCell>
								<TableCell className="px-4 py-4">
									<div className="text-sm text-muted-foreground flex flex-col gap-1">
										<span className="text-foreground font-semibold border p-1 px-2 rounded-full w-fit">
											{guest.ageRange}
										</span>
										<span className="flex items-center gap-1 text-muted-foreground">
											<MapPin className="h-3 w-3 text-muted-foreground" />
											{guest.location}
										</span>
									</div>
								</TableCell>
								<TableCell className="px-4 py-4">
									<div className="text-sm font-semibold">
										{guest.eventsAttended}{" "}
										{guest.eventsAttended > 1 ? "events" : "event"}
									</div>
									<p className="text-xs text-muted-foreground">
										{guest.lastEventLabel}
									</p>
								</TableCell>
								<TableCell className="px-4 py-4">
									<div
										className={cn(
											"text-sm font-semibold",
											guest.totalSpent >= 1000
												? "text-green-600"
												: guest.totalSpent >= 500
													? "text-amber-600"
													: "text-muted-foreground",
										)}
									>
										{formatCurrency(guest.totalSpent)}
									</div>
								</TableCell>
								<TableCell className="px-4 py-4">
									<div className="flex flex-wrap gap-2">
										{guest.segments.map((segment) => (
											<Badge
												key={segment}
												variant="secondary"
												className="text-xs"
											>
												{segment}
											</Badge>
										))}
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
