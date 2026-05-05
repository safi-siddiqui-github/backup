"use client";
import { FiDownload } from "react-icons/fi";

type LargeQRModalProps = {
	isOpen: boolean;
	surveyName: string;
	largeQrCanvasRef: React.RefObject<HTMLCanvasElement | null>;
	onClose: () => void;
	onDownload: () => void;
};

export default function LargeQRModal({
	isOpen,
	surveyName,
	largeQrCanvasRef,
	onClose,
	onDownload,
}: LargeQRModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
			onClick={onClose}
		>
			<div
				className="relative !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl p-8 max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-slate-600 animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer z-10"
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

				<h3 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-2 text-center pr-8">
					Large QR Code
				</h3>
				<p className="text-sm text-gray-600 dark:text-slate-400 mb-6 text-center">
					{surveyName}
				</p>

				<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] p-8 rounded-xl border-2 border-gray-200 dark:border-slate-600 mx-auto w-fit shadow-lg">
					<canvas ref={largeQrCanvasRef} className="mx-auto" />
				</div>

				<p className="text-sm text-gray-600 dark:text-slate-400 mt-6 text-center">
					Scan this code with your phone camera to access the survey
				</p>

				<div className="flex gap-3 mt-6">
					<button
						onClick={onDownload}
						className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
					>
						<FiDownload className="w-5 h-5" />
						Download QR Code
					</button>
					<button
						onClick={onClose}
						className="flex-1 px-4 py-3 !bg-white dark:!bg-[#020617] hover:bg-gray-50 dark:hover:bg-[#020617] text-gray-900 dark:text-slate-200 rounded-xl font-semibold transition-all duration-200 cursor-pointer border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
