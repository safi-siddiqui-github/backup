"use client";

import { TrendingUp, Eye, CheckCircle2, Sparkles, Target } from "lucide-react";
import { CampaignDetail } from "../types";
import MetricCard from "../../components/MetricCard";

interface PerformanceMetricsSectionProps {
	metrics: CampaignDetail["metrics"];
}

export default function PerformanceMetricsSection({
	metrics,
}: PerformanceMetricsSectionProps) {
	if (!metrics) return null;

	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 space-y-4">
			<div className="flex items-center gap-2">
				<TrendingUp className="h-5 w-5" />
				<h3 className="text-base font-semibold">Performance Metrics</h3>
			</div>

			{/* Top Row - Larger Cards */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<MetricCard
					value={metrics.reach || 0}
					label="Reach"
					icon={Eye}
					colorScheme="blue"
					iconSize="lg"
				/>
				<MetricCard
					value={metrics.delivered || 0}
					label="Delivered"
					icon={CheckCircle2}
					colorScheme="blue"
					iconSize="md"
				/>
				<MetricCard
					value={metrics.clicked || 0}
					label="Clicked"
					icon={Sparkles}
					colorScheme="green"
					iconSize="md"
				/>
				<MetricCard
					value={metrics.conversions || 0}
					label="Conversions"
					icon={Target}
					colorScheme="purple"
					iconSize="md"
				/>
			</div>

			{/* Bottom Row - Smaller Cards */}
			<div className="grid grid-cols-3 gap-4">
				<MetricCard
					value={`${metrics.engagement?.toFixed(1) || "0.0"}%`}
					label="Engagement"
					variant="secondary"
					colorScheme="blue"
				/>
				<MetricCard
					value={`${metrics.conversion?.toFixed(1) || "0.0"}%`}
					label="Conversion"
					variant="secondary"
					colorScheme="green"
				/>
				<MetricCard
					value={`$${metrics.roi?.toLocaleString() || "0"}`}
					label="ROI"
					variant="secondary"
					colorScheme="green"
				/>
			</div>
		</div>
	);
}
