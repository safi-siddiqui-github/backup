"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MySurveys from "../core/MySurveys";
import ShareSurvey from "../share/ShareSurvey";

export default function SurveyTabs() {
	return (
		<Tabs defaultValue="surveys" className="w-full space-y-6">
			<TabsList className="grid w-full grid-cols-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<TabsTrigger
					value="surveys"
					className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
				>
					My Surveys
				</TabsTrigger>
				<TabsTrigger
					value="share"
					className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
				>
					Share & QR
				</TabsTrigger>
			</TabsList>

			<TabsContent value="surveys" className="space-y-4">
				<MySurveys />
			</TabsContent>

			<TabsContent value="share" className="space-y-4">
				<ShareSurvey />
			</TabsContent>
		</Tabs>
	);
}
