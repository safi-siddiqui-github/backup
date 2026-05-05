"use client";
import { FiMaximize, FiDownload, FiEye } from "react-icons/fi";

type ShareActionButtonsProps = {
	onShowLargeQR: () => void;
	onDownloadQR: () => void;
	onPreview: () => void;
};

export default function ShareActionButtons({
	onShowLargeQR,
	onDownloadQR,
	onPreview,
}: ShareActionButtonsProps) {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
			<ActionButton
				icon={<FiMaximize className="w-5 h-5" />}
				text="Large QR"
				onClick={onShowLargeQR}
			/>
			<ActionButton
				icon={<FiDownload className="w-5 h-5" />}
				text="Download QR"
				onClick={onDownloadQR}
			/>
			<ActionButton
				icon={<FiEye className="w-5 h-5" />}
				text="Preview Survey"
				onClick={onPreview}
			/>
		</div>
	);
}

function ActionButton({
	icon,
	text,
	onClick,
}: {
	icon: React.ReactNode;
	text: string;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="flex items-center justify-center gap-2 p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] border-2 border-gray-200 dark:border-slate-600 rounded-xl shadow-md hover:shadow-xl text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-[#020617] hover:border-indigo-400 dark:hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
		>
			{icon}
			<span className="text-sm font-semibold">{text}</span>
		</button>
	);
}
