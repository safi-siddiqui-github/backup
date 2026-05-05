"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import { Eye } from "lucide-react";
import SeatingArrangementCanvasComponent from "./SeatingArrangementCanvasComponent";
import SeatingArrangementLayoutComponent from "./SeatingArrangementLayoutComponent";
import SeatingArrangementPreviewComponent from "./SeatingArrangementPreviewComponent";

export default function SeatingArrangementTabComponent() {
	//
	const { seatingArrangementTab, setSeatingArrangementTab } =
		useNavigationStore();

	//
	return (
		<div className="flex flex-col gap-4 overflow-hidden">
			{/*  */}

			{/*  */}
			<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-wrap items-center justify-between gap-4">
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2">
						{/*  */}
						<Eye />
						{/*  */}
						<CardTitle>Seating View</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-col overflow-auto">
						{/*  */}

						{/*  */}
						<Tabs
							value={seatingArrangementTab ?? ""}
							onValueChange={setSeatingArrangementTab}
						>
							{/*  */}

							{/*  */}
							<TabsList className="h-full w-full justify-start gap-2 overflow-x-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
								{/*  */}

								{/*  */}
								<TabsTrigger
									value="canvas"
									className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
								>
									Canvas
								</TabsTrigger>
								{/*  */}

								{/*  */}
								<TabsTrigger
									value="background"
									className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
								>
									Background
								</TabsTrigger>
								{/*  */}

								{/*  */}
								<TabsTrigger
									value="preview"
									className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
								>
									Preview
								</TabsTrigger>
								{/*  */}

								{/*  */}
							</TabsList>
							{/*  */}

							{/*  */}
						</Tabs>

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
			<Tabs value={seatingArrangementTab ?? ""}>
				{/*  */}

				{/*  */}
				<TabsContent value="canvas">
					{/*  */}
					<SeatingArrangementCanvasComponent />
					{/*  */}
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="background">
					{/*  */}
					<SeatingArrangementLayoutComponent />
					{/*  */}
				</TabsContent>
				{/*  */}

				{/*  */}
				<TabsContent value="preview">
					{/*  */}
					<SeatingArrangementPreviewComponent />
					{/*  */}
				</TabsContent>
				{/*  */}

				{/*  */}
			</Tabs>
			{/*  */}

			{/*  */}
		</div>
	);
}
