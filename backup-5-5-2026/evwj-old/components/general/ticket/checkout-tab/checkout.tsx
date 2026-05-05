"use client";

import { useState, useMemo, useEffect } from "react";
import {
	Users,
	UserCheck,
	Clock,
	CheckCircle,
	QrCode,
	X,
	Camera,
	Search,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Attendee, StatsCardProps } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockAttendees: Attendee[] = [
	{
		id: 1,
		name: "John Smith",
		email: "john@example.com",
		ticketType: "General Admission",
		quantity: 2,
		orderId: "ORD001",
		status: "Checked In",
		checkInTime: "10:30 AM",
	},
	{
		id: 2,
		name: "Sarah Johnson",
		email: "sarah@example.com",
		ticketType: "VIP Premium",
		quantity: 1,
		orderId: "ORD002",
		status: "Pending",
		checkInTime: null,
	},
	{
		id: 3,
		name: "Mike Davis",
		email: "mike@example.com",
		ticketType: "General Admission",
		quantity: 1,
		orderId: "ORD003",
		status: "Pending",
		checkInTime: null,
	},
	{
		id: 4,
		name: "Emily Chen",
		email: "emily@example.com",
		ticketType: "VIP Premium",
		quantity: 2,
		orderId: "ORD004",
		status: "Checked In",
		checkInTime: "10:32 AM",
	},
	{
		id: 5,
		name: "Alex Rodriguez",
		email: "alex@example.com",
		ticketType: "Early Bird",
		quantity: 1,
		orderId: "ORD005",
		status: "Checked In",
		checkInTime: "10:35 AM",
	},
];

const StatsCard: React.FC<StatsCardProps> = ({
	title,
	value,
	icon: Icon,
	colorClass = "blue",
}) => {
	const map = {
		blue: [
			"bg-blue-100 dark:bg-blue-900/30",
			"text-blue-600 dark:text-blue-400",
		],
		green: [
			"bg-green-100 dark:bg-green-900/30",
			"text-green-600 dark:text-green-400",
		],
		orange: [
			"bg-orange-100 dark:bg-orange-900/30",
			"text-orange-600 dark:text-orange-400",
		],
		purple: [
			"bg-purple-100 dark:bg-purple-900/30",
			"text-purple-600 dark:text-purple-400",
		],
	} as Record<string, [string, string]>;

	const [bgColor, textColor] = map[colorClass] ?? map.blue;
	const IconToRender = Icon ?? Users;

	return (
		<div className="flex items-center p-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-slate-600 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<div className={`p-2 rounded-full ${bgColor} ${textColor}`}>
				<IconToRender size={18} />
			</div>
			<div className="ml-3">
				<p className="text-xs font-medium text-gray-600 dark:text-slate-400">
					{title}
				</p>
				<p className="text-xl font-semibold text-gray-900 dark:text-slate-200">
					{value}
				</p>
			</div>
		</div>
	);
};

const StatusBadge: React.FC<{ status: Attendee["status"] }> = ({ status }) =>
	status === "Checked In" ? (
		<span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium !bg-white dark:!bg-slate-700/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			<CheckCircle size={14} className="mr-1" /> Checked In
		</span>
	) : (
		<span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium !bg-white dark:!bg-slate-700/50 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			<Clock size={14} className="mr-1" /> Pending
		</span>
	);

const ScannerComponent: React.FC<{
	onClose: () => void;
	onManualCheckIn: (orderId: string) => void;
}> = ({ onClose, onManualCheckIn }) => {
	const [manualOrderId, setManualOrderId] = useState("");

	const handleManualCheckIn = (e: React.FormEvent) => {
		e.preventDefault();
		const id = manualOrderId.trim();
		if (id) {
			onManualCheckIn(id.toUpperCase());
			setManualOrderId("");
		}
	};

	return (
		<div className="mb-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-slate-600 overflow-hidden [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-slate-600">
				<div className="flex items-center gap-2">
					<Camera className="text-indigo-600 dark:text-indigo-400" />
					<h2 className="text-sm font-semibold text-gray-900 dark:text-slate-200">
						QR Scanner
					</h2>
				</div>
				<button
					onClick={onClose}
					className="p-1 rounded-full text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700/50"
				>
					<X size={18} />
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 items-start">
				<div className="p-3 !bg-white dark:!bg-slate-700/50 flex flex-col items-center justify-center gap-3 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<div className="w-full h-40 bg-black rounded-md flex items-center justify-center text-white text-center text-sm px-2">
						<div>
							<div className="font-medium">Camera unavailable</div>
							<div className="text-xs text-gray-300">
								Use manual entry below
							</div>
						</div>
					</div>
				</div>

				<div className="p-4 space-y-3 border-t md:border-t-0 md:border-l border-gray-200 dark:border-slate-600">
					<form onSubmit={handleManualCheckIn}>
						<label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-1">
							Manual Entry
						</label>
						<input
							type="text"
							value={manualOrderId}
							onChange={(e) => setManualOrderId(e.target.value)}
							placeholder="QR123456789 or ORD001"
							className="w-full px-3 py-2 border border-gray-200 dark:border-slate-600 rounded-md !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						/>
						<button
							type="submit"
							className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
						>
							Check In
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export function CheckInTabContent(): React.ReactElement {
	const [attendees, setAttendees] = useState<Attendee[]>(mockAttendees);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState<"All" | "Checked In" | "Pending">(
		"All",
	);
	const [showScanner, setShowScanner] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [pendingCheckInId, setPendingCheckInId] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	const stats = useMemo(() => {
		const total = attendees.length;
		const checkedIn = attendees.filter((a) => a.status === "Checked In").length;
		const pending = total - checkedIn;
		const rate = total > 0 ? Math.round((checkedIn / total) * 100) : 0;
		return { total, checkedIn, pending, rate };
	}, [attendees]);

	const filteredAttendees = useMemo(() => {
		const searchLower = searchTerm.toLowerCase();
		return attendees.filter((a) => {
			const matchTab =
				activeTab === "All" ||
				(activeTab === "Checked In" && a.status === "Checked In") ||
				(activeTab === "Pending" && a.status === "Pending");
			const matchSearch =
				a.name.toLowerCase().includes(searchLower) ||
				a.email.toLowerCase().includes(searchLower) ||
				a.orderId.toLowerCase().includes(searchLower);
			return matchTab && matchSearch;
		});
	}, [attendees, activeTab, searchTerm]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredAttendees.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedAttendees = filteredAttendees.slice(startIndex, endIndex);

	// Reset to page 1 when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [activeTab, searchTerm, itemsPerPage]);

	const handleCheckIn = (id: number) => {
		setAttendees((prev) =>
			prev.map((a) =>
				a.id === id
					? {
							...a,
							status: "Checked In",
							checkInTime: new Date().toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							}),
						}
					: a,
			),
		);
	};

	const confirmPendingCheckIn = () => {
		if (pendingCheckInId != null) {
			handleCheckIn(pendingCheckInId);
			setPendingCheckInId(null);
			setShowConfirm(false);
		}
	};

	const handleManualCheckIn = (orderId: string) => {
		const target = attendees.find(
			(a) => a.orderId.toUpperCase() === orderId.toUpperCase(),
		);
		if (!target) return alert("Order ID not found.");
		if (target.status === "Checked In")
			return alert("This attendee is already checked in.");
		handleCheckIn(target.id);
	};

	return (
		<div className="p-4 md:p-8">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-sm text-gray-600 dark:text-slate-400">
					Manage attendee check-ins and real-time attendance
				</h1>
				<button
					onClick={() => setShowScanner((p) => !p)}
					className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
				>
					{showScanner ? <X size={18} /> : <QrCode size={18} />}
					{showScanner ? "Close Scanner" : "QR Scanner"}
				</button>
			</div>

			{showScanner && (
				<ScannerComponent
					onClose={() => setShowScanner(false)}
					onManualCheckIn={handleManualCheckIn}
				/>
			)}

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start mb-6">
				<StatsCard
					title="Total Attendees"
					value={stats.total}
					icon={Users}
					colorClass="blue"
				/>
				<StatsCard
					title="Checked In"
					value={stats.checkedIn}
					icon={UserCheck}
					colorClass="green"
				/>
				<StatsCard
					title="Pending"
					value={stats.pending}
					icon={Clock}
					colorClass="orange"
				/>
				<StatsCard
					title="Check-in Rate"
					value={`${stats.rate}%`}
					icon={CheckCircle}
					colorClass="purple"
				/>
			</div>

			{/* Attendees Table */}
			<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 overflow-hidden [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<div className="p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
						Attendee List
					</h2>
					<div className="relative w-full md:w-auto">
						<input
							type="text"
							placeholder="Search by name, email, or order ID..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						/>
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
							size={20}
						/>
					</div>
				</div>

				{/* Tabs */}
				<nav className="flex border-b border-gray-200 dark:border-slate-600 px-4 md:px-6">
					{["All", "Checked In", "Pending"].map((tab) => (
						<button
							key={tab}
							onClick={() =>
								setActiveTab(tab as unknown as "All" | "Checked In" | "Pending")
							}
							className={`px-4 py-3 text-sm font-medium border-b-2 ${
								activeTab === tab
									? "border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
									: "border-transparent text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
							}`}
						>
							{tab} (
							{stats[tab.toLowerCase() as "total" | "checkedIn" | "pending"] ??
								0}
							)
						</button>
					))}
				</nav>

				{filteredAttendees.length === 0 ? (
					<div className="p-6 text-center text-gray-600 dark:text-slate-400">
						No attendees found.
					</div>
				) : (
					<table className="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
						<thead className="!bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<tr>
								{[
									"Attendee",
									"Ticket Type",
									"Quantity",
									"Order ID",
									"Status",
									"Check-in Time",
									"Actions",
								].map((h) => (
									<th
										key={h}
										className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-slate-400 uppercase"
									>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="!bg-white dark:!bg-[#020617] divide-y divide-gray-200 dark:divide-slate-600 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
							{paginatedAttendees.map((a) => (
								<tr key={a.id}>
									<td className="px-6 py-4">
										<div className="font-medium text-gray-900 dark:text-slate-200">
											{a.name}
										</div>
										<div className="text-sm text-gray-600 dark:text-slate-400">
											{a.email}
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-200">
										{a.ticketType}
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-200">
										×{a.quantity}
									</td>
									<td className="px-6 py-4 text-sm font-mono text-indigo-600 dark:text-indigo-400">
										{a.orderId}
									</td>
									<td className="px-6 py-4">
										<StatusBadge status={a.status} />
									</td>
									<td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-200">
										{a.checkInTime ?? "–"}
									</td>
									<td className="px-6 py-4 text-sm">
										{a.status === "Checked In" ? (
											<span className="text-gray-600 dark:text-slate-400">
												Checked
											</span>
										) : (
											<button
												onClick={() => {
													setPendingCheckInId(a.id);
													setShowConfirm(true);
												}}
												className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
											>
												Check In
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* Pagination */}
			{filteredAttendees.length > 0 && (
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
										setItemsPerPage(Number(e.target.value));
										setCurrentPage(1);
									}}
									className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									<option value={10}>10</option>
									<option value={20}>20</option>
									<option value={30}>30</option>
									<option value={40}>40</option>
									<option value={50}>50</option>
								</select>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600 dark:text-slate-400">
									Showing {startIndex + 1} -{" "}
									{Math.min(endIndex, filteredAttendees.length)} of{" "}
									{filteredAttendees.length}
								</span>
								<div className="flex items-center gap-1">
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentPage((prev) => Math.max(1, prev - 1))
										}
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
										onClick={() =>
											setCurrentPage((prev) =>
												Math.min(totalPages, prev + 1),
											)
										}
										disabled={currentPage === totalPages}
									>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Confirmation Modal */}
			{showConfirm && pendingCheckInId != null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="fixed inset-0 bg-black/60 backdrop-blur-sm"
						onClick={() => {
							setShowConfirm(false);
							setPendingCheckInId(null);
						}}
					/>
					<div className="relative !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 rounded-lg shadow-xl z-10 w-full max-w-md mx-4 border border-gray-200 dark:border-slate-600 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
						<h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-200">
							Confirm Check In
						</h4>
						<p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
							Are you sure you want to check in{" "}
							<span className="font-medium text-gray-900 dark:text-slate-200">
								{attendees.find((a) => a.id === pendingCheckInId)?.name}
							</span>
							?
						</p>
						<div className="flex justify-end gap-3">
							<button
								onClick={() => {
									setShowConfirm(false);
									setPendingCheckInId(null);
								}}
								className="px-4 py-2 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-md text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								Cancel
							</button>
							<button
								onClick={confirmPendingCheckIn}
								className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
