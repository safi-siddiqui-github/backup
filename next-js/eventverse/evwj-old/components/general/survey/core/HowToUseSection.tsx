"use client";

const HowToUseSection: React.FC = () => {
	return (
		<div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
			<h4 className="font-bold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
				<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
				How to use
			</h4>
			<ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
				<li className="flex items-start gap-2">
					<span className="text-green-600 dark:text-green-400 font-bold mt-0.5">
						•
					</span>
					<span>Print the QR code and place it at tables or entry points</span>
				</li>
				<li className="flex items-start gap-2">
					<span className="text-green-600 dark:text-green-400 font-bold mt-0.5">
						•
					</span>
					<span>
						Share the direct link via email, social media, or messaging
					</span>
				</li>
				<li className="flex items-start gap-2">
					<span className="text-green-600 dark:text-green-400 font-bold mt-0.5">
						•
					</span>
					<span>Guests can scan with any QR code reader or camera app</span>
				</li>
				<li className="flex items-start gap-2">
					<span className="text-green-600 dark:text-green-400 font-bold mt-0.5">
						•
					</span>
					<span>Survey responses are collected in real-time</span>
				</li>
				<li className="flex items-start gap-2">
					<span className="text-green-600 dark:text-green-400 font-bold mt-0.5">
						•
					</span>
					<span>View results in the Analytics module</span>
				</li>
			</ul>
		</div>
	);
};

export default HowToUseSection;
