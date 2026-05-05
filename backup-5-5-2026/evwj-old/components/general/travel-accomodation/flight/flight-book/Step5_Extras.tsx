import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";

export const Step5_Extras = ({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) => {
	const [travelInsurance, setTravelInsurance] = useState(true);
	const insuranceCost = 25;
	const totalExtrasFees = travelInsurance ? insuranceCost : 0;

	return (
		<div className="space-y-6 p-2">
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold text-foreground">
					Extras & Add-ons
				</h2>
				<p className="text-muted-foreground">Enhance your flight experience</p>
			</div>

			<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-5 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div className="flex items-start space-x-4">
					<Checkbox
						id="insurance"
						checked={travelInsurance}
						onCheckedChange={(checked) => setTravelInsurance(!!checked)}
						className="mt-1"
					/>
					<div className="flex-1 space-y-3">
						<div className="flex items-center justify-between">
							<label
								htmlFor="insurance"
								className="flex items-center space-x-2 cursor-pointer"
							>
								<Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
								<span className="font-semibold text-foreground">
									Travel Insurance
								</span>
								<span className="text-sm font-medium text-foreground !bg-white dark:!bg-slate-700/50 px-2 py-0.5 rounded-md border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
									$25
								</span>
							</label>
						</div>
						<p className="text-sm text-muted-foreground">
							Protect your trip with comprehensive coverage including:
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm text-foreground">
							<li>Trip cancellation and interruption</li>
							<li>Baggage loss or delay</li>
							<li>Medical emergencies</li>
							<li>24/7 travel assistance</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-200 dark:border-slate-600 pt-4 mt-6 flex justify-between items-center">
				<h3 className="text-lg font-semibold text-foreground">Total Extras</h3>
				<span className="text-xl font-bold text-foreground">
					${totalExtrasFees}
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
					Continue to Payment
				</button>
			</div>
		</div>
	);
};

export default Step5_Extras;
