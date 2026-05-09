"use client";
export default function AmenityTag({ text }: { text: string }) {
	return (
		<span className="rounded-full !bg-white dark:!bg-slate-700/50 px-2.5 py-1 text-xs font-medium text-foreground border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			{text}
		</span>
	);
}
