"use client";

interface StatsHighlightCardProps {
	value: string | number;
	label: string;
	valueClassName?: string;
}

export default function StatsHighlightCard({
	value,
	label,
	valueClassName = "",
}: StatsHighlightCardProps) {
	return (
		<div className="rounded-2xl bg-[#FCFCFC] px-6 py-4 flex flex-col items-center text-center gap-1">
			<span className={`text-2xl font-semibold ${valueClassName}`}>
				{value}
			</span>
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
	);
}
