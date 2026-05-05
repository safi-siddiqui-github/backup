import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

interface AgeDistributionChartProps {
	range: string;
	percentage: number;
}

export default function AgeDistributionChart({
	range,
	percentage,
}: AgeDistributionChartProps) {
	return (
		<div className="flex flex-col items-center">
			<ChartContainer
				config={{
					age: {
						label: "Age",
						color: "hsl(var(--foreground))",
					},
				}}
				className="h-[120px] w-[120px]"
			>
				<PieChart>
					<Pie
						data={[
							{
								name: range,
								value: percentage,
							},
							{
								name: "Other",
								value: 100 - percentage,
							},
						]}
						cx="50%"
						cy="100%"
						innerRadius={0}
						outerRadius={60}
						startAngle={180}
						endAngle={0}
						dataKey="value"
						stroke="none"
					>
						<Cell fill="hsl(var(--foreground))" />
						<Cell fill="transparent" />
					</Pie>
				</PieChart>
			</ChartContainer>
			<p className="text-sm font-semibold mt-2">
				{range} ({percentage}%)
			</p>
		</div>
	);
}
