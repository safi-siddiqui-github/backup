"use client";

import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Influencer } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ReferralsTabContent() {
	const base: Influencer = {
		id: "inf-1",
		name: "Sarah Johnson",
		email: "sarah.j@influencer.com",
		code: "SARA1A2B",
		commissionLabel: "10% commission",
		clicks: 487,
		sales: 45,
		revenue: 11250,
		commissionTotal: 1125,
		paidAmount: 562.5,
		amountOwed: 562.5,
		status: "Active",
		paymentDue: true,
		notes: "Instagram influencer with 50k followers",
	};

	const [influencers, setInfluencers] = useState<Influencer[]>([
		base,
		{
			...base,
			id: "inf-2",
			name: "Mike Thompson",
			email: "mike@eventpromo.com",
			code: "MIKE3C4D",
			commissionLabel: "$25 per sale",
			clicks: 312,
			sales: 28,
			revenue: 7000,
			commissionTotal: 700,
			paidAmount: 700,
			amountOwed: 0,
			paymentDue: false,
			notes: "YouTube content creator partnership",
		},
		{
			...base,
			id: "inf-3",
			name: "Emily Rodriguez",
			email: "emily.r@partners.com",
			code: "EMIL5E6F",
			status: "Inactive",
			paymentDue: false,
			amountOwed: 0,
			paidAmount: 0,
			notes: "Affiliate partner",
		},
	]);

	const totalOwed = influencers.reduce((s, i) => s + i.amountOwed, 0);

	const copyToClipboard = async (text: string, label = "Copied") => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success(`${label}`);
		} catch {
			// fallback message
			toast.error("Unable to copy");
		}
	};

	const handleCopyCode = (code: string) => {
		copyToClipboard(code, "Code copied to clipboard");
	};

	const handleCopyLink = (code: string) => {
		const link = `${typeof window !== "undefined" ? window.location.origin : ""}/r/${code}`;
		copyToClipboard(link, "Link copied to clipboard");
	};

	const handleMarkPaid = (id: string) => {
		setInfluencers((prev) =>
			prev.map((i) => {
				if (i.id !== id) return i;
				const updated = {
					...i,
					paidAmount: i.commissionTotal,
					amountOwed: 0,
					paymentDue: false,
				};
				toast.success(`${i.name} marked as paid`);
				return updated;
			}),
		);
	};

	const handleToggleActive = (id: string) => {
		setInfluencers((prev) =>
			prev.map((i) => {
				if (i.id !== id) return i;
				const nextStatus = i.status === "Active" ? "Inactive" : "Active";
				toast.success(`${i.name} is now ${nextStatus}`);
				return { ...i, status: nextStatus };
			}),
		);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	const [form, setForm] = useState({
		name: "",
		email: "",
		commissionType: "Percentage",
		commissionRate: "",
		notes: "",
	});

	const resetForm = () =>
		setForm({
			name: "",
			email: "",
			commissionType: "Percentage",
			commissionRate: "",
			notes: "",
		});

	const generateCode = (name: string) => {
		const initials = name
			.split(" ")
			.map((n) => n[0])
			.slice(0, 3)
			.join("")
			.toUpperCase();
		const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
		return `${initials}${suffix}`;
	};

	const handleCreateInfluencer = () => {
		if (!form.name.trim()) return toast.error("Please provide influencer name");
		if (!form.email.trim()) return toast.error("Please provide email address");
		if (!form.commissionRate.trim())
			return toast.error("Please provide commission rate");

		const code = generateCode(form.name);
		const commissionLabel =
			form.commissionType === "Percentage"
				? `${form.commissionRate}% commission`
				: `$${Number(form.commissionRate).toFixed(2)} per sale`;

		const newInf: Influencer = {
			id: `inf-${Date.now()}`,
			name: form.name,
			email: form.email,
			code,
			commissionLabel,
			clicks: 0,
			sales: 0,
			revenue: 0,
			commissionTotal: 0,
			paidAmount: 0,
			amountOwed: 0,
			status: "Active",
			paymentDue: false,
			notes: form.notes || undefined,
		};

		setInfluencers((prev) => [newInf, ...prev]);
		toast.success("Referral created");
		resetForm();
		setIsModalOpen(false);
	};

	// Pagination calculations
	const totalPages = Math.ceil(influencers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedInfluencers = influencers.slice(startIndex, endIndex);

	// Reset to page 1 when items per page changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	return (
		<>
			<div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 p-4 gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
						Referral Codes
					</h1>
					<p className="text-md text-gray-600 dark:text-slate-400">
						Manage influencer partnerships and track commissions
					</p>
				</div>

				<div className="flex items-center space-x-4">
					<div className="p-4 rounded-lg !bg-white dark:!bg-slate-700/50 border border-indigo-200 dark:border-indigo-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						<p className="text-sm text-right text-gray-600 dark:text-slate-400">
							Total Commission Owed
						</p>
						<p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
							${totalOwed.toFixed(2)}
						</p>
					</div>

					<button
						onClick={() => setIsModalOpen(true)}
						className="flex items-center text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Add Influencer
					</button>
				</div>
			</div>

			<div className="space-y-6">
				{paginatedInfluencers.map((inf) => (
					<div
						key={inf.id}
						className="!bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 p-6 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
					>
						<div className="flex justify-between items-start mb-4 pb-4">
							<div className="flex items-center space-x-4">
								<div className="h-12 w-12 flex items-center justify-center rounded-full font-bold text-indigo-700 dark:text-indigo-300 !bg-white dark:!bg-slate-700/50 border border-indigo-200 dark:border-indigo-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
									{inf.name
										.split(" ")
										.map((n) => n[0])
										.slice(0, 2)
										.join("")}
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
										{inf.name}
									</h2>
									<p className="text-sm text-gray-600 dark:text-slate-400">
										{inf.email}
									</p>
								</div>

								<span
									className={`text-xs font-semibold px-3 py-1 rounded-full border ${inf.status === "Active" ? "!bg-white dark:!bg-slate-700/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" : "!bg-white dark:!bg-slate-700/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"} [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]`}
								>
									{inf.status}
								</span>

								{inf.paymentDue && (
									<span className="text-xs font-semibold px-3 py-1 rounded-full !bg-white dark:!bg-slate-700/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
										Payment Due
									</span>
								)}
							</div>

							<div className="flex space-x-2">
								<button
									onClick={() => handleCopyCode(inf.code)}
									className="py-2 px-4 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 !bg-white dark:!bg-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition cursor-pointer [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									Copy Code
								</button>
								<button
									onClick={() => handleCopyLink(inf.code)}
									className="py-2 px-4 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 !bg-white dark:!bg-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition cursor-pointer [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
								>
									Copy Link
								</button>
								{inf.amountOwed > 0 && (
									<button
										onClick={() => handleMarkPaid(inf.id)}
										className="py-2 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
									>
										Mark as Paid
									</button>
								)}
								<button
									onClick={() => handleToggleActive(inf.id)}
									className={`py-2 px-4 rounded-lg font-medium border transition cursor-pointer ${inf.status === "Active" ? "!bg-white dark:!bg-slate-700/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20" : "!bg-white dark:!bg-slate-700/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"} [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]`}
								>
									{inf.status === "Active" ? "Deactivate" : "Activate"}
								</button>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 border-t border-gray-200 dark:border-slate-600 pt-4">
							<div>
								<p className="text-xs text-gray-600 dark:text-slate-400 uppercase font-semibold tracking-wide">
									Referral Code
								</p>
								<p className="text-lg font-medium text-gray-900 dark:text-slate-200 mt-1">
									{inf.code}
								</p>
								<p className="text-sm text-gray-600 dark:text-slate-400">
									{inf.commissionLabel}
								</p>
							</div>

							<div>
								<p className="text-xs text-gray-600 dark:text-slate-400 uppercase font-semibold tracking-wide">
									Performance
								</p>
								<p className="text-lg font-medium text-gray-900 dark:text-slate-200 mt-1">
									{inf.clicks} clicks
								</p>
								<p className="text-sm text-gray-600 dark:text-slate-400">
									{inf.sales} sales (
									{((inf.sales / Math.max(1, inf.clicks)) * 100).toFixed(1)}%)
								</p>
							</div>

							<div>
								<p className="text-xs text-gray-600 dark:text-slate-400 uppercase font-semibold tracking-wide">
									Revenue Generated
								</p>
								<p className="text-lg font-medium mt-1 text-green-600 dark:text-green-400">
									${inf.revenue.toFixed(2)}
								</p>
								<p className="text-sm text-gray-600 dark:text-slate-400">
									Total sales
								</p>
							</div>

							<div>
								<p className="text-xs text-gray-600 dark:text-slate-400 uppercase font-semibold tracking-wide">
									Commission
								</p>
								<p className="text-lg font-medium text-gray-900 dark:text-slate-200 mt-1">
									${inf.commissionTotal.toFixed(2)} total
								</p>
								<p className="text-sm text-gray-600 dark:text-slate-400">
									${inf.paidAmount.toFixed(2)} paid
								</p>
							</div>

							<div>
								<p className="text-xs text-gray-600 dark:text-slate-400 uppercase font-semibold tracking-wide">
									Amount Owed
								</p>
								<p className="text-lg font-medium mt-1 text-orange-600 dark:text-orange-400">
									${inf.amountOwed.toFixed(2)}
								</p>
								<span
									className={`text-xs font-semibold px-3 py-1 rounded-full border ${inf.amountOwed > 0 ? "!bg-white dark:!bg-slate-700/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800" : "!bg-white dark:!bg-slate-700/50 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800"} [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]`}
								>
									{inf.amountOwed > 0 ? "pending" : "paid"}
								</span>
							</div>
						</div>

						<div className="border-t border-gray-200 dark:border-slate-600 mt-4 pt-4">
							<p className="text-xs text-gray-600 dark:text-slate-400 uppercase font-semibold tracking-wide">
								Notes
							</p>
							<p className="text-sm text-gray-700 dark:text-slate-300 mt-1">
								{inf.notes}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			{influencers.length > 0 && (
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
									{Math.min(endIndex, influencers.length)} of{" "}
									{influencers.length}
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

			{/* Add Influencer Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={() => setIsModalOpen(false)}
					/>
					<div className="relative w-full max-w-2xl mx-6 !bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200 dark:border-slate-600 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
							Add Influencer Partner
						</h3>
						<p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
							Create a referral code for an influencer or partner
						</p>

						<div className="mt-4 grid grid-cols-1 gap-3">
							<label className="text-xs text-gray-700 dark:text-slate-200">
								Influencer Name
							</label>
							<input
								value={form.name}
								onChange={(e) =>
									setForm((f) => ({ ...f, name: e.target.value }))
								}
								placeholder="e.g. Sarah Johnson"
								className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>

							<label className="text-xs text-gray-700 dark:text-slate-200">
								Email Address
							</label>
							<input
								value={form.email}
								onChange={(e) =>
									setForm((f) => ({ ...f, email: e.target.value }))
								}
								placeholder="sarah@example.com"
								className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>

							<label className="text-xs text-gray-700 dark:text-slate-200">
								Commission Type
							</label>
							<select
								value={form.commissionType}
								onChange={(e) =>
									setForm((f) => ({ ...f, commissionType: e.target.value }))
								}
								className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<option>Percentage</option>
								<option>Fixed</option>
							</select>

							<label className="text-xs text-gray-700 dark:text-slate-200">
								Commission Rate
							</label>
							<input
								value={form.commissionRate}
								onChange={(e) =>
									setForm((f) => ({ ...f, commissionRate: e.target.value }))
								}
								placeholder="e.g. 10 for 10% or $10"
								className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>

							<label className="text-xs text-gray-700 dark:text-slate-200">
								Notes (Optional)
							</label>
							<textarea
								value={form.notes}
								onChange={(e) =>
									setForm((f) => ({ ...f, notes: e.target.value }))
								}
								placeholder="Partnership details, special terms, etc..."
								className="w-full px-3 py-2 rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>
						</div>

						<div className="mt-4 flex justify-end space-x-3">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 rounded !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								Cancel
							</button>
							<button
								onClick={handleCreateInfluencer}
								className="px-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Create Referral Code
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
