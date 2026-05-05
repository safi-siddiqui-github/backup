"use client";
import React from "react";
import {
	Zap,
	Ticket,
	Calendar,
	Armchair,
	Camera,
	Gamepad2,
	MessageSquare,
	User,
	Trophy,
	QrCode,
	Star,
} from "lucide-react";

type OverviewPanelProps = {
	onViewTicket?: () => void;
	onViewSchedule?: () => void;
	onViewSeating?: () => void;
	onUploadPhotos?: () => void;
	onPlayGames?: () => void;
	onShareWishes?: () => void;
};

export default function OverviewPanel({
	onViewTicket,
	onViewSchedule,
	onViewSeating,
	onUploadPhotos,
	onPlayGames,
	onShareWishes,
}: OverviewPanelProps = {}) {
	const handleViewTicket = () => {
		if (onViewTicket) {
			onViewTicket();
		} else {
			console.log("View Ticket clicked");
			// TODO: Navigate to ticket view
		}
	};

	const handleViewSchedule = () => {
		if (onViewSchedule) {
			onViewSchedule();
		} else {
			console.log("View Schedule clicked");
			// TODO: Navigate to schedule view
		}
	};

	const handleViewSeating = () => {
		if (onViewSeating) {
			onViewSeating();
		} else {
			console.log("My Seating clicked");
			// TODO: Navigate to seating view
		}
	};

	const handleUploadPhotos = () => {
		if (onUploadPhotos) {
			onUploadPhotos();
		} else {
			console.log("Upload Photos clicked");
			// TODO: Navigate to photo upload
		}
	};

	const handlePlayGames = () => {
		if (onPlayGames) {
			onPlayGames();
		} else {
			console.log("Wedding Games clicked");
			// TODO: Navigate to games
		}
	};

	const handleShareWishes = () => {
		if (onShareWishes) {
			onShareWishes();
		} else {
			console.log("Share Wishes clicked");
			// TODO: Navigate to wishes
		}
	};

	return (
		<div className="p-4 lg:p-6 max-w-7xl mx-auto     font-sans  ">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* === LEFT COLUMN (Quick Actions) === */}
				<div className="lg:col-span-2">
					{/* Header */}
					<div className="flex items-center gap-2 mb-6">
						<Zap className="w-6 h-6 text-blue-600 fill-blue-600" />
						<h2 className="text-xl font-bold text-slate-900 dark:text-white">
							Quick Actions
						</h2>
					</div>

					{/* Grid of Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						<ActionCard
							icon={Ticket}
							color="bg-emerald-500"
							label="View Ticket"
							status="Available"
							onClick={handleViewTicket}
						/>
						<ActionCard
							icon={Calendar}
							color="bg-blue-500"
							label="View Schedule"
							status="Available"
							onClick={handleViewSchedule}
						/>
						<ActionCard
							icon={Armchair}
							color="bg-purple-500"
							label="My Seating"
							status="Available"
							onClick={handleViewSeating}
						/>
						<ActionCard
							icon={Camera}
							color="bg-pink-500"
							label="Upload Photos"
							status="Available"
							onClick={handleUploadPhotos}
						/>
						{/* Special Case: Live Game */}
						<button
							onClick={handlePlayGames}
							className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 relative cursor-pointer hover:shadow-md transition-all group dark:bg-[#090a11] dark:border-0 dark:hover:bg-[#090a11]/80"
						>
							<div className="absolute top-3 right-3 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">
								LIVE
							</div>
							<div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white mb-1 shadow-indigo-200 shadow-lg group-hover:scale-105 transition-transform">
								<Gamepad2 className="w-7 h-7" />
							</div>
							<h3 className="font-bold text-slate-800 text-sm dark:text-gray-200">
								Wedding Games
							</h3>
							<span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center gap-1">
								<span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
								Live Now!
							</span>
						</button>

						<ActionCard
							icon={MessageSquare}
							color="bg-indigo-500"
							label="Share Wishes"
							status="Available"
							onClick={handleShareWishes}
						/>
					</div>
				</div>

				{/* === RIGHT COLUMN (Sidebar) === */}
				<div className="space-y-6">
					{/* 1. Your Information Card */}
					<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 dark:bg-[#090a11] dark:border-0">
						<div className="flex items-center gap-2 mb-4">
							<div className="p-1.5 bg-indigo-100 rounded-md">
								<User className="w-4 h-4 text-indigo-600" />
							</div>
							<h3 className="font-bold text-slate-800 dark:text-white">
								Your Information
							</h3>
						</div>

						<div className="space-y-3">
							<InfoField label="Name:" value="Guest" />
							<InfoField label="Email:" value="guest@example.com" isEmail />
							{/* Status Field */}
							<div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5 dark:bg-[#070b1c]">
								<span className="text-xs text-gray-400 font-medium">
									Status:
								</span>
								<span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
									pending
								</span>
							</div>
							<InfoField label="Table:" value="Table 5, Seat 3" />
						</div>
					</div>

					{/* 2. Your Gaming Stats Card (Gradient) */}
					<div className="bg-gradient-to-b from-[#a855f7] to-[#ec4899] rounded-xl p-1 shadow-lg text-white">
						<div className="p-5 h-full flex flex-col">
							{/* Header */}
							<div className="flex items-center gap-2 mb-6">
								<Trophy className="w-5 h-5 text-white/90" />
								<h3 className="font-bold text-white">Your Gaming Stats</h3>
							</div>

							{/* Main Points */}
							<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center mb-4 border border-white/10">
								<div className="text-4xl font-extrabold text-white mb-1">
									850
								</div>
								<div className="text-xs text-white/70 font-medium">
									Total Points
								</div>
							</div>

							{/* Stats Rows */}
							<div className="space-y-2 mb-4">
								<div className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
									<span className="text-sm text-white/80">Global Rank:</span>
									<span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded shadow-sm">
										#8
									</span>
								</div>
								<div className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg">
									<span className="text-sm text-white/80">Games Played:</span>
									<span className="font-bold">4</span>
								</div>
							</div>

							{/* Achievement */}
							<div className="bg-gradient-to-r from-orange-400/30 to-pink-500/30 border border-white/20 rounded-lg p-3">
								<div className="flex items-center gap-2 mb-1">
									<Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
									<span className="text-xs font-bold text-white">
										Latest Achievement
									</span>
								</div>
								<div className="text-xs text-white/90 pl-5">
									Social Butterfly (+100 pts)
								</div>
							</div>
						</div>
					</div>

					{/* 3. Event Access (QR) */}
					<div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 dark:bg-[#090a11] dark:border-0">
						<div className="flex items-center gap-2 mb-2">
							<QrCode className="w-5 h-5 text-red-500" />
							<h3 className="font-bold text-slate-800 dark:text-white">
								Event Access
							</h3>
						</div>

						<div className="bg-gray-50 rounded-xl p-6 mt-4 flex flex-col items-center justify-center border border-dashed border-gray-200 dark:bg-[#070b1c] dark:border-gray-800">
							<div className="mb-3 opacity-50">
								{/* Simple SVG Placeholder for QR */}
								<svg
									className="w-24 h-24 text-slate-800 dark:text-white"
									viewBox="0 0 100 100"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10 10H40V40H10V10Z"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										d="M60 10H90V40H60V10Z"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										d="M10 60H40V90H10V60Z"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<rect
										x="18"
										y="18"
										width="14"
										height="14"
										fill="currentColor"
									/>
									<rect
										x="68"
										y="18"
										width="14"
										height="14"
										fill="currentColor"
									/>
									<rect
										x="18"
										y="68"
										width="14"
										height="14"
										fill="currentColor"
									/>
									<circle cx="75" cy="75" r="8" fill="currentColor" />
								</svg>
							</div>
							<p className="text-xs font-medium text-slate-400">
								Your Digital Ticket
							</p>
						</div>
						<p className="text-[10px] text-center text-slate-400 mt-3">
							Show this QR code at check-in
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// --- Sub Components for Cleaner Code ---

// 1. Standard Action Card
function ActionCard({
	icon: Icon,
	color,
	label,
	status,
	onClick,
}: {
	icon: any;
	color: string;
	label: string;
	status: string;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group dark:bg-[#090a11] dark:border-0 dark:hover:bg-[#090a11]/80 cursor-pointer"
		>
			<div
				className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white mb-1 shadow-lg opacity-90 group-hover:scale-105 transition-transform`}
			>
				<Icon className="w-6 h-6" />
			</div>
			<h3 className="font-bold text-slate-800 text-sm dark:text-gray-200">
				{label}
			</h3>
		</button>
	);
}

// 2. Read-only Info Field
function InfoField({
	label,
	value,
	isEmail = false,
}: {
	label: string;
	value: string;
	isEmail?: boolean;
}) {
	return (
		<div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5 border border-transparent hover:border-gray-200 transition-colors dark:bg-[#070b1c] dark:hover:border-gray-700">
			<span className="text-xs text-gray-400 font-medium w-12">{label}</span>
			<span
				className={`text-sm font-semibold ${isEmail ? "text-slate-500 truncate dark:text-gray-400" : "text-slate-800 dark:text-gray-200"}`}
			>
				{value}
			</span>
		</div>
	);
}
