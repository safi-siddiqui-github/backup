"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatCardProps } from "../types/survey-types";

export default function StatCard({ icon, value, title }: StatCardProps) {
	return (
		<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<CardHeader className="pb-2">
				<CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<div className="text-2xl font-bold text-gray-900 dark:text-slate-200">
						{value}
					</div>
					<div className="p-2 bg-white dark:bg-[#020617] rounded-lg">
						{icon}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
