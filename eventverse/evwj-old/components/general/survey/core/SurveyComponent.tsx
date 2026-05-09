"use client";

import {
	BsBarChartLine,
	BsClock,
	BsFileEarmarkText,
	BsPeople,
} from "react-icons/bs";
import StatCard from "../common/StatCard";
import SurveyTabs from "../common/SurveyTabs";

export default function SurveyPageComponent() {
	return (
		<div className="">
			<div className="relative z-10 w-full">
				<div className="space-y-6">
					{/* Top Stats Section */}
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<StatCard
							icon={
								<BsFileEarmarkText
									className="text-blue-600 dark:text-blue-400"
									size={24}
								/>
							}
							value="3"
							title="Active Surveys"
							color="blue"
						/>
						<StatCard
							icon={
								<BsPeople
									className="text-green-600 dark:text-green-400"
									size={24}
								/>
							}
							value="156"
							title="Total Responses"
							color="green"
						/>
						<StatCard
							icon={
								<BsBarChartLine
									className="text-purple-600 dark:text-purple-400"
									size={24}
								/>
							}
							value="78%"
							title="Completion Rate"
							color="purple"
						/>
						<StatCard
							icon={
								<BsClock
									className="text-orange-600 dark:text-orange-400"
									size={24}
								/>
							}
							value="2.5"
							title="Avg. Minutes"
							color="orange"
						/>
					</div>

					{/* Main Survey Management Section */}
					<div className="space-y-6">
						{/* SurveyTabs component now handles all tab content */}
						<SurveyTabs />
					</div>
				</div>
			</div>
		</div>
	);
}
