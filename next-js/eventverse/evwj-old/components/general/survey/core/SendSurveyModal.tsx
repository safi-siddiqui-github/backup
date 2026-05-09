"use client";
import { BsX, BsSend } from "react-icons/bs";

type SendSurveyModalProps = {
	isOpen: boolean;
	surveyTitle: string;
	onClose: () => void;
	onConfirm: () => void;
};

export default function SendSurveyModal({
	isOpen,
	surveyTitle,
	onClose,
	onConfirm,
}: SendSurveyModalProps) {
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
						<div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
							<BsSend size={32} className="text-blue-600 dark:text-blue-400" />
						</div>
					</div>

					<h2 className="text-xl font-bold text-gray-900 dark:text-slate-200 text-center mb-2">
						Send Survey
					</h2>
					<p className="text-sm text-gray-600 dark:text-slate-400 text-center mb-6">
						Are you ready to send "{surveyTitle}" to your recipients?
					</p>

					<div className="flex flex-col sm:flex-row gap-3">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-slate-300 !bg-white dark:!bg-slate-700/50 border-2 border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-all duration-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						>
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className="flex-1 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
						>
							Send Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

