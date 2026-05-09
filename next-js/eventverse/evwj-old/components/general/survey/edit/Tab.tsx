"use client";

type Props = {
	isActive: boolean;
	onClick: () => void;
	children: React.ReactNode;
	count?: number;
};

export default function Tab({ isActive, onClick, children, count }: Props) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
				isActive
					? "bg-indigo-600 text-white shadow-md"
					: "!bg-white dark:!bg-slate-700/50 text-gray-700 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
			}`}
		>
			{children}
			{count !== undefined && (
				<span
					className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
						isActive
							? "bg-indigo-100 text-indigo-800"
							: "bg-gray-100 text-gray-600 dark:bg-[#020617] dark:text-slate-300"
					}`}
				>
					{count}
				</span>
			)}
		</button>
	);
}
