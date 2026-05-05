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
import { toast } from "sonner";

export default function NotificationsTab() {
	const [notifications, setNotifications] = useState({
		emailNotifications: true,
		smsNotifications: false,
		pushNotifications: true,
		eventReminders: true,
		rsvpUpdates: true,
		marketingEmails: false,
	});

	const handleNotificationChange = (key: string, value: boolean) => {
		setNotifications((prev) => ({ ...prev, [key]: value }));
	};

	const handleSave = () => {
		// In a real app, you would save to the database
		toast.success("Notification preferences updated successfully");
	};

	return (
		<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
			<CardHeader>
				<CardTitle>Notification Preferences</CardTitle>
				<CardDescription>
					Choose how you want to be notified about events and activities
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div className="space-y-4">
						<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
							<div className="space-y-0.5">
								<Label className="text-base">Email Notifications</Label>
								<p className="text-sm text-muted-foreground">
									Receive notifications via email
								</p>
							</div>
							<Switch
								checked={notifications.emailNotifications}
								onCheckedChange={(checked) =>
									handleNotificationChange("emailNotifications", checked)
								}
								className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
							/>
						</div>

						<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
							<div className="space-y-0.5">
								<Label className="text-base">SMS Notifications</Label>
								<p className="text-sm text-muted-foreground">
									Receive important updates via text message
								</p>
							</div>
							<Switch
								checked={notifications.smsNotifications}
								onCheckedChange={(checked) =>
									handleNotificationChange("smsNotifications", checked)
								}
								className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
							/>
						</div>

						<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
							<div className="space-y-0.5">
								<Label className="text-base">Push Notifications</Label>
								<p className="text-sm text-muted-foreground">
									Receive push notifications in your browser
								</p>
							</div>
							<Switch
								checked={notifications.pushNotifications}
								onCheckedChange={(checked) =>
									handleNotificationChange("pushNotifications", checked)
								}
								className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
							/>
						</div>

						<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
							<div className="space-y-0.5">
								<Label className="text-base">Event Reminders</Label>
								<p className="text-sm text-muted-foreground">
									Get reminded about upcoming events
								</p>
							</div>
							<Switch
								checked={notifications.eventReminders}
								onCheckedChange={(checked) =>
									handleNotificationChange("eventReminders", checked)
								}
								className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
							/>
						</div>

						<div className="flex flex-row items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-slate-950">
							<div className="space-y-0.5">
								<Label className="text-base">RSVP Updates</Label>
								<p className="text-sm text-muted-foreground">
									Get notified when guests RSVP to your events
								</p>
							</div>
							<Switch
								checked={notifications.rsvpUpdates}
								onCheckedChange={(checked) =>
									handleNotificationChange("rsvpUpdates", checked)
								}
								className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
							/>
						</div>

						<div className="flex flex-row items-center justify-between rounded-lg border p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
							<div className="space-y-0.5">
								<Label className="text-base">Marketing Emails</Label>
								<p className="text-sm text-muted-foreground">
									Receive updates about new features and tips
								</p>
							</div>
							<Switch
								checked={notifications.marketingEmails}
								onCheckedChange={(checked) =>
									handleNotificationChange("marketingEmails", checked)
								}
								className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
							/>
						</div>
					</div>

					<Button
						onClick={handleSave}
						className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
					>
						Save Preferences
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
