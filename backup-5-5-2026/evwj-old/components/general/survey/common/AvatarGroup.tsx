"use client";

export default function AvatarGroup() {
	return (
		<div className="flex items-center">
			<div className="flex -space-x-2 overflow-hidden">
				<div className="flex h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-blue-500 text-white text-xs items-center justify-center font-medium">
					JS
				</div>
				<div className="flex h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-pink-500 text-white text-xs items-center justify-center font-medium">
					SJ
				</div>
				<div className="flex h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-green-500 text-white text-xs items-center justify-center font-medium">
					MC
				</div>
				<div className="flex h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-orange-500 text-white text-xs items-center justify-center font-medium">
					EW
				</div>
				<div className="flex h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-teal-500 text-white text-xs items-center justify-center font-medium">
					DB
				</div>
			</div>
			<div className="ml-2 text-xs font-semibold text-gray-700 dark:text-slate-300 bg-gray-200 dark:bg-[#020617] rounded-full px-2.5 py-0.5">
				+40
			</div>
		</div>
	);
}
