import { useState } from "react";
import type { PromoCode } from "../types";
import { toast } from "sonner";

type Props = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onCreate: (promo: PromoCode) => void;
};

export default function CreatePromoModal({
	open,
	onOpenChange,
	onCreate,
}: Props) {
	const [title, setTitle] = useState("");
	const [code, setCode] = useState("");
	const [description, setDescription] = useState("");
	const [discountType, setDiscountType] = useState<"Percentage" | "Fixed">(
		"Percentage",
	);
	const [discountValue, setDiscountValue] = useState<number | "">("");
	const [maxUses, setMaxUses] = useState<number | "">("");
	const [minOrder, setMinOrder] = useState<number | "">(0);
	const [validFrom, setValidFrom] = useState("");
	const [validUntil, setValidUntil] = useState("");

	const handleSubmit = () => {
		if (!title) return toast.error("Campaign Name is required");
		const promo: PromoCode = {
			id: String(Date.now()),
			icon: "percent",
			title: title || "Promo",
			status: "Active",
			description: description || "",
			promoCode: code || `AUTO${Math.floor(Math.random() * 9000) + 1000}`,
			promoValue:
				discountType === "Percentage"
					? `${discountValue || 0}%`
					: `$${discountValue || 0}`,
			usageCurrent: 0,
			usageLimit: typeof maxUses === "number" && maxUses > 0 ? maxUses : 0,
			revenueImpact: 0,
			discountAmount: 0,
			validFrom: validFrom || new Date().toLocaleString(),
			validTo: validUntil || new Date().toLocaleString(),
		};
		onCreate(promo);
		onOpenChange(false);
		toast.success("Promo code created");
		// reset
		setTitle("");
		setCode("");
		setDescription("");
		setDiscountType("Percentage");
		setDiscountValue("");
		setMaxUses("");
		setMinOrder(0);
		setValidFrom("");
		setValidUntil("");
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={() => onOpenChange(false)}
			/>
			<div
				className="relative w-[720px] !bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg p-6 shadow-lg z-10 border border-gray-200 dark:border-slate-600 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]"
				role="dialog"
				aria-modal
			>
				<h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-slate-200">
					Create Promo Code
				</h3>
				<p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
					Set up a new promotional code for your event
				</p>

				<div className="grid gap-3">
					<div>
						<label className="text-xs text-gray-700 dark:text-slate-200">
							Campaign Name
						</label>
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="e.g. Early Bird Special"
							className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						/>
					</div>

					<div>
						<label className="text-xs text-gray-700 dark:text-slate-200">
							Promo Code (Optional)
						</label>
						<input
							value={code}
							onChange={(e) => setCode(e.target.value)}
							placeholder="Leave blank for auto-generation"
							className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						/>
					</div>

					<div>
						<label className="text-xs text-gray-700 dark:text-slate-200">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Describe this promo code..."
							className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="text-xs text-gray-700 dark:text-slate-200">
								Discount Type
							</label>
							<select
								value={discountType}
								onChange={(e) =>
									setDiscountType(e.target.value as "Percentage" | "Fixed")
								}
								className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<option>Percentage Discount</option>
								<option>Fixed Ammount</option>
								<option value="">Free Ticket</option>
							</select>
						</div>

						<div>
							<label className="text-xs text-gray-700 dark:text-slate-200">
								Discount Value
							</label>
							<input
								value={discountValue === "" ? "" : discountValue}
								onChange={(e) =>
									setDiscountValue(
										e.target.value === "" ? "" : Number(e.target.value),
									)
								}
								placeholder="e.g. 10 for 10% or $10"
								className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="text-xs text-gray-700 dark:text-slate-200">
								Maximum Uses
							</label>
							<input
								value={maxUses === "" ? "" : maxUses}
								onChange={(e) =>
									setMaxUses(
										e.target.value === "" ? "" : Number(e.target.value),
									)
								}
								placeholder="Leave blank for unlimited"
								className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>
						</div>
						<div>
							<label className="text-xs text-gray-700 dark:text-slate-200">
								Minimum Order ($)
							</label>
							<input
								value={minOrder === "" ? "" : minOrder}
								onChange={(e) =>
									setMinOrder(
										e.target.value === "" ? "" : Number(e.target.value),
									)
								}
								placeholder="0 for no minimum"
								className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="text-xs text-gray-700 dark:text-slate-200">
								Valid From
							</label>
							<input
								value={validFrom}
								onChange={(e) => setValidFrom(e.target.value)}
								placeholder="mm/dd/yyyy, --:-- --"
								className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>
						</div>
						<div>
							<label className="text-xs text-gray-700 dark:text-slate-200">
								Valid Until
							</label>
							<input
								value={validUntil}
								onChange={(e) => setValidUntil(e.target.value)}
								placeholder="mm/dd/yyyy, --:-- --"
								className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							/>
						</div>
					</div>

					<div className="flex justify-end gap-3 mt-2">
						<button
							onClick={() => onOpenChange(false)}
							className="px-4 py-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						>
							Cancel
						</button>
						<button
							onClick={handleSubmit}
							className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
						>
							Create Promo Code
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
