"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function PrivacyTab() {
	const [privacySettings, setPrivacySettings] = useState({
		profileVisibility: true,
		showInSearch: true,
		contactInformation: false,
		analyticsData: true,
	});

	const handlePrivacyChange = (key: string, value: boolean) => {
		setPrivacySettings((prev) => ({ ...prev, [key]: value }));
	};

	const exportData = () => {
		const dataToExport = {
			exportDate: new Date().toISOString(),
		};
		const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `event-dome-data-${new Date().toISOString().split("T")[0]}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		toast.success("Data exported successfully");
	};

	return (
		<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
			<CardHeader>
				<CardTitle>Privacy Settings</CardTitle>
				<CardDescription>
					Control your privacy and data sharing preferences
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
						<div className="space-y-0.5">
							<Label className="text-base">Profile Visibility</Label>
							<p className="text-sm text-muted-foreground">
								Make your profile visible to other event organizers
							</p>
						</div>
						<Switch
							checked={privacySettings.profileVisibility}
							onCheckedChange={(checked) =>
								handlePrivacyChange("profileVisibility", checked)
							}
							className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
						/>
					</div>

					<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
						<div className="space-y-0.5">
							<Label className="text-base">Show in Search Results</Label>
							<p className="text-sm text-muted-foreground">
								Allow your events to appear in public search results
							</p>
						</div>
						<Switch
							checked={privacySettings.showInSearch}
							onCheckedChange={(checked) =>
								handlePrivacyChange("showInSearch", checked)
							}
							className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
						/>
					</div>

					<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
						<div className="space-y-0.5">
							<Label className="text-base">Contact Information</Label>
							<p className="text-sm text-muted-foreground">
								Allow guests to see your contact information
							</p>
						</div>
						<Switch
							checked={privacySettings.contactInformation}
							onCheckedChange={(checked) =>
								handlePrivacyChange("contactInformation", checked)
							}
							className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
						/>
					</div>

					<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
						<div className="space-y-0.5">
							<Label className="text-base">Analytics Data</Label>
							<p className="text-sm text-muted-foreground">
								Help improve EventDome by sharing anonymous usage data
							</p>
						</div>
						<Switch
							checked={privacySettings.analyticsData}
							onCheckedChange={(checked) =>
								handlePrivacyChange("analyticsData", checked)
							}
							className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
						/>
					</div>
				</div>

				<Separator />

				<div className="space-y-4">
					<h3 className="text-lg font-medium">Data Management</h3>
					<div className="flex gap-2">
						<Button variant="outline" onClick={exportData}>
							<Download className="w-4 h-4 mr-2" />
							Export My Data
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
