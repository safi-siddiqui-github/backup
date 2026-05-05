import type { PromoCode } from "../types";
import ActionButton from "./ActionButton";
import { PromoIcon, StatusBadge } from "./PromoIcon";

type Props = {
	promo: PromoCode;
	onCopy?: (code: string) => void;
	onToggleStatus?: (id: string) => void;
};

export default function PromoCodeCard({
	promo,
	onCopy,
	onToggleStatus,
}: Props) {
	return (
		<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-xl p-6 mb-4 shadow-lg [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
			<div className="flex justify-between items-start mb-6">
				<div className="flex items-start gap-4">
					<PromoIcon icon={promo.icon} />
					<div>
						<div className="text-lg font-semibold text-gray-900 dark:text-slate-200 flex items-center gap-2">
							{promo.title}
							<StatusBadge status={promo.status} />
						</div>
						<div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
							{promo.description}
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2 ml-4">
					<ActionButton
						variant="secondary"
						onClick={() => onCopy?.(promo.promoCode)}
					>
						<span className="sr-only">Copy promo code</span>
						<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
							<path
								d="M9 12h6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Copy Code
					</ActionButton>
					{promo.status === "Active" ? (
						<ActionButton
							variant="destructive"
							onClick={() => onToggleStatus?.(promo.id)}
						>
							Deactivate
						</ActionButton>
					) : (
						<ActionButton
							variant="primary"
							onClick={() => onToggleStatus?.(promo.id)}
						>
							Activate
						</ActionButton>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
				<div>
					<div className="text-xs text-gray-600 dark:text-slate-400 uppercase font-medium">
						Promo Code
					</div>
					<div className="font-semibold text-gray-900 dark:text-slate-200 uppercase">
						{promo.promoCode}
					</div>
					<div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
						{promo.promoValue}
					</div>
				</div>

				<div>
					<div className="text-xs text-gray-600 dark:text-slate-400 uppercase font-medium">
						Usage
					</div>
					<div className="font-semibold text-gray-900 dark:text-slate-200">
						{promo.usageCurrent} / {promo.usageLimit}
					</div>
					<div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
						{promo.usageLimit - promo.usageCurrent} remaining
					</div>
				</div>

				<div>
					<div className="text-xs text-gray-600 dark:text-slate-400 uppercase font-medium">
						Revenue Impact
					</div>
					<div className="font-semibold text-green-600 dark:text-green-400">
						${promo.revenueImpact.toFixed(2)}
					</div>
					<div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
						${promo.discountAmount.toFixed(2)} discounted
					</div>
				</div>

				<div>
					<div className="text-xs text-gray-600 dark:text-slate-400 uppercase font-medium">
						Valid Period
					</div>
					<div className="font-semibold text-gray-900 dark:text-slate-200">
						{promo.validFrom}
					</div>
					<div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
						to {promo.validTo}
					</div>
				</div>
			</div>
		</div>
	);
}
