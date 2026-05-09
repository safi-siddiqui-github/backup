"use client";
import { FiEye } from "react-icons/fi";

type SurveyPreviewModalProps = {
	isOpen: boolean;
	surveyName: string;
	surveyLink: string;
	onClose: () => void;
};

export default function SurveyPreviewModal({
	isOpen,
	surveyName,
	surveyLink,
	onClose,
}: SurveyPreviewModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
			onClick={onClose}
		>
			<div
				className="relative !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-gray-200 dark:border-slate-600 animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-600 bg-indigo-50 dark:bg-indigo-950/50">
					<div>
						<h3 className="text-2xl font-bold text-gray-900 dark:text-slate-200">
							Survey Preview
						</h3>
						<p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
							{surveyName}
						</p>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
						aria-label="Close modal"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Modal Content - Survey Preview */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8">
					<div className="max-w-3xl mx-auto space-y-6">
						{/* Survey Title & Description */}
						<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-3">
								{surveyName}
							</h2>
							<p className="text-gray-600 dark:text-slate-400">
								Thank you for taking the time to complete this survey. Your
								feedback is valuable to us and will help us improve our
								services.
							</p>
						</div>

						{/* Question 1 - Rating */}
						<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg">
							<label className="block text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
								1. How would you rate your overall experience?
								<span className="text-red-500 ml-1">*</span>
							</label>
							<div className="flex gap-2 justify-center py-4">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										className="text-4xl text-gray-300 dark:text-slate-600 hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors cursor-pointer"
									>
										★
									</button>
								))}
							</div>
						</div>

						{/* Question 2 - Multiple Choice */}
						<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg">
							<label className="block text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
								2. How did you hear about this event?
								<span className="text-red-500 ml-1">*</span>
							</label>
							<div className="space-y-3">
								{[
									"Social Media",
									"Email Newsletter",
									"Friend or Colleague",
									"Website",
									"Other",
								].map((option) => (
									<label
										key={option}
										className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
									>
										<input
											type="radio"
											name="source"
											className="w-5 h-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
										/>
										<span className="text-gray-700 dark:text-gray-300">
											{option}
										</span>
									</label>
								))}
							</div>
						</div>

						{/* Question 3 - Checkboxes */}
						<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg">
							<label className="block text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
								3. Which aspects did you enjoy the most? (Select all that apply)
							</label>
							<div className="space-y-3">
								{[
									"Venue & Atmosphere",
									"Food & Beverages",
									"Entertainment",
									"Networking Opportunities",
									"Content & Speakers",
								].map((option) => (
									<label
										key={option}
										className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
									>
										<input
											type="checkbox"
											className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
										/>
										<span className="text-gray-700 dark:text-slate-300">
											{option}
										</span>
									</label>
								))}
							</div>
						</div>

						{/* Question 4 - Text Area */}
						<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg">
							<label className="block text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
								4. What suggestions do you have for improvement?
							</label>
							<textarea
								rows={4}
								placeholder="Share your thoughts..."
								className="w-full p-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 [background-color:white] dark:[background-color:#020617]"
							/>
						</div>

						{/* Question 5 - Yes/No */}
						<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl p-6 border border-gray-200 dark:border-slate-600 shadow-lg">
							<label className="block text-lg font-semibold text-gray-900 dark:text-slate-200 mb-4">
								5. Would you recommend this event to others?
								<span className="text-red-500 ml-1">*</span>
							</label>
							<div className="flex gap-4">
								<button className="flex-1 py-3 px-6 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl font-semibold transition-all duration-200 border-2 border-green-300 dark:border-green-700 cursor-pointer">
									👍 Yes
								</button>
								<button className="flex-1 py-3 px-6 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-xl font-semibold transition-all duration-200 border-2 border-red-300 dark:border-red-700 cursor-pointer">
									👎 No
								</button>
							</div>
						</div>

						{/* Submit Button */}
						<div className="flex justify-center pt-4">
							<button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
								Submit Survey
							</button>
						</div>

						{/* Preview Note */}
						<div className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
							This is a preview. Submissions are not recorded in preview mode.
						</div>
					</div>
				</div>

				{/* Modal Footer */}
				<div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#020617]">
					<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
						<FiEye className="w-4 h-4" />
						<span>Preview Mode - Not accepting responses</span>
					</div>
					<div className="flex gap-3">
						<button
							onClick={() => {
								window.open(surveyLink, "_blank");
							}}
							className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#020617] dark:hover:bg-[#020617] text-gray-900 dark:text-white rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
							Open Live Survey
						</button>
						<button
							onClick={onClose}
							className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
						>
							Close Preview
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
