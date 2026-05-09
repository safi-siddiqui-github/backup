import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface EventTypeAttendanceChartProps {
	events: { type: string; percentage: number }[];
}

export default function EventTypeAttendanceChart({
	events,
}: EventTypeAttendanceChartProps) {
	return (
		<ChartContainer
			config={{
				attendance: {
					label: "Attendance",
					color: "hsl(221.2 83.2% 53.3%)",
				},
			}}
			className="h-[120px] w-full"
		>
			<BarChart
				data={events.map((event) => ({
					name: event.type,
					value: 1,
				}))}
				margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
				<XAxis
					dataKey="name"
					tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
				/>
				<YAxis
					domain={[0, 1]}
					ticks={[0, 0.25, 0.5, 0.75, 1]}
					tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
				/>
				<Bar
					dataKey="value"
					fill="hsl(221.2 83.2% 53.3%)"
					radius={[0, 0, 0, 0]}
				/>
			</BarChart>
		</ChartContainer>
	);
}
