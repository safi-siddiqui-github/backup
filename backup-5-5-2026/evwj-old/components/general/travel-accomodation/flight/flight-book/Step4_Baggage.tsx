import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export const Step4_Baggage = ({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) => {
	const [checkedBags, setCheckedBags] = useState(0);

	const calculateTotal = () => {
		if (checkedBags === 0) return 0;
		if (checkedBags === 1) return 35;
		return 45 + 34 + (checkedBags - 2) * 45;
	};

	const totalBaggageFees = calculateTotal();

	const handleIncrement = () => setCheckedBags((prev) => prev + 1);
	const handleDecrement = () =>
		setCheckedBags((prev) => (prev > 0 ? prev - 1 : 0));

	return (
		<div className="space-y-6 p-2">
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold text-foreground">
					Baggage Selection
				</h2>
				<p className="text-muted-foreground">
					Add checked bags for each passenger
				</p>
			</div>

			<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 flex justify-between items-center !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div>
					<h3 className="font-semibold text-foreground">Carry-on Bag</h3>
					<p className="text-sm text-muted-foreground">Included</p>
				</div>
				<span className="font-semibold text-green-600 dark:text-green-400">
					Free
				</span>
			</div>

			<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 flex justify-between items-center !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div>
					<h3 className="font-semibold text-foreground">Checked Bags</h3>
					<p className="text-sm text-muted-foreground">
						$35 for 1st, $45 for 2nd
					</p>
				</div>
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2 border border-gray-300 dark:border-slate-600 rounded-lg p-1 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
						<button
							onClick={handleDecrement}
							disabled={checkedBags === 0}
							className="p-1 rounded-md text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 disabled:opacity-50"
						>
							<Minus className="h-4 w-4" />
						</button>
						<span className="w-8 text-center font-medium text-foreground">
							{checkedBags}
						</span>
						<button
							onClick={handleIncrement}
							className="p-1 rounded-md text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50"
						>
							<Plus className="h-4 w-4" />
						</button>
					</div>
					{checkedBags > 0 && (
						<span className="!bg-white dark:!bg-slate-700/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold px-3 py-1 rounded-full border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							Total: ${totalBaggageFees}
						</span>
					)}
				</div>
			</div>

			<div className="border-t border-gray-200 dark:border-slate-600 pt-4 mt-6 flex justify-between items-center">
				<h3 className="text-lg font-semibold text-foreground">
					Total Baggage Fees
				</h3>
				<span className="text-xl font-bold text-foreground">
					${totalBaggageFees}
				</span>
			</div>

			<div className="flex justify-between pt-4">
				<button
					onClick={onBack}
					className="px-6 py-2 border border-gray-200 dark:border-slate-600 rounded-lg !bg-white dark:!bg-slate-800/95 backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
				>
					Back
				</button>
				<button
					onClick={onNext}
					className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg"
				>
					Continue to Extras
				</button>
			</div>
		</div>
	);
};

export default Step4_Baggage;
