import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
	icon: LucideIcon;
	value: string | number;
	label: string;
	color?: "blue" | "green" | "purple" | "orange" | "red";
	className?: string;
}

const colorClasses = {
	blue: {
		card: "bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30",
		iconBg: "bg-blue-100 dark:bg-blue-900/30",
		iconColor: "text-blue-600 dark:text-blue-400",
	},
	green: {
		card: "bg-green-50/50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30",
		iconBg: "bg-green-100 dark:bg-green-900/30",
		iconColor: "text-green-600 dark:text-green-400",
	},
	purple: {
		card: "bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30",
		iconBg: "bg-purple-100 dark:bg-purple-900/30",
		iconColor: "text-purple-600 dark:text-purple-400",
	},
	orange: {
		card: "bg-orange-50/50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30",
		iconBg: "bg-orange-100 dark:bg-orange-900/30",
		iconColor: "text-orange-600 dark:text-orange-400",
	},
	red: {
		card: "bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30",
		iconBg: "bg-red-100 dark:bg-red-900/30",
		iconColor: "text-red-600 dark:text-red-400",
	},
};

export default function MetricCard({
	icon: Icon,
	value,
	label,
	color = "blue",
	className,
}: MetricCardProps) {
	const colors = colorClasses[color];

	return (
		<Card className={cn(colors.card, className, "p-0")}>
			<CardContent className="p-3">
				<div className="flex flex-col items-center text-center">
					<Icon className={cn("h-6 w-6 mb-2", colors.iconColor)} />
					<p className="text-2xl font-bold mb-0.5">{value}</p>
					<p className="text-xs text-muted-foreground">{label}</p>
				</div>
			</CardContent>
		</Card>
	);
}
