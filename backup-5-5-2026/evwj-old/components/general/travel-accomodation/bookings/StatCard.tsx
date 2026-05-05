import type { Stat } from "./data";

export default function StatCard({ label, value }: Stat) {
	return (
		<div className="rounded-lg bg-white/10 p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			<p className="text-sm text-purple-200 dark:text-purple-300">{label}</p>
			<p className="mt-1 text-3xl font-bold text-white dark:text-white">
				{value}
			</p>
		</div>
	);
}
