"use client";
import { BsX, BsExclamationTriangle } from "react-icons/bs";
import type { DeleteSurveyModalProps } from "../types/survey-types";

export default function DeleteSurveyModal({
	isOpen,
	surveyTitle,
	onClose,
	onConfirm,
}: DeleteSurveyModalProps) {
	if (!isOpen) return null;

	const handleOverlayClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
			onClick={handleOverlayClick}
		>
			<div className="relative w-full max-w-md !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border border-gray-200 dark:border-slate-600 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
					aria-label="Close modal"
				>
					<BsX size={24} />
				</button>

				<div className="p-6 sm:p-8">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
							<BsExclamationTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
						</div>
					</div>

					<h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-200 text-center mb-3">
						Delete Survey
					</h2>

					<p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 text-center mb-6">
						Are you sure you want to delete{" "}
						<span className="font-semibold text-gray-900 dark:text-slate-200">
							&quot;{surveyTitle}&quot;
						</span>
						? This action cannot be undone and all responses will be lost.
					</p>

					<div className="flex flex-col-reverse sm:flex-row gap-3">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-2.5 !bg-white dark:!bg-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-900 dark:text-slate-200 rounded-xl font-semibold transition-all duration-200 border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						>
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Delete Survey
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
