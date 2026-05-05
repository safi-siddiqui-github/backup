"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AppearanceTab() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
			<CardHeader>
				<CardTitle>Appearance</CardTitle>
				<CardDescription>
					Customize how EventDome looks and feels
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<div>
						<Label className="text-base">Theme</Label>
						<p className="text-sm text-muted-foreground mb-3">
							Choose your preferred color scheme
						</p>
						<div className="grid grid-cols-3 gap-3">
							<Button
								variant={theme === "light" ? "default" : "outline"}
								onClick={() => setTheme("light")}
								className="justify-start"
							>
								<div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300 mr-2" />
								Light
							</Button>
							<Button
								variant={theme === "dark" ? "default" : "outline"}
								onClick={() => setTheme("dark")}
								className="justify-start"
							>
								<div className="w-4 h-4 rounded-full bg-gray-900 mr-2" />
								Dark
							</Button>
							<Button
								variant={theme === "system" ? "default" : "outline"}
								onClick={() => setTheme("system")}
								className="justify-start"
							>
								<div className="w-4 h-4 rounded-full bg-gradient-to-r from-white to-gray-900 mr-2" />
								System
							</Button>
						</div>
					</div>

					<Separator />

					<div>
						<Label className="text-base">Language</Label>
						<p className="text-sm text-muted-foreground mb-3">
							Choose your preferred language
						</p>
						<Select defaultValue="en">
							<SelectTrigger className="w-[200px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="en">English</SelectItem>
								<SelectItem value="es">Español</SelectItem>
								<SelectItem value="fr">Français</SelectItem>
								<SelectItem value="de">Deutsch</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Separator />

					<div>
						<Label className="text-base">Timezone</Label>
						<p className="text-sm text-muted-foreground mb-3">
							Select your timezone for accurate event scheduling
						</p>
						<Select defaultValue="UTC">
							<SelectTrigger className="w-[300px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="UTC">UTC</SelectItem>
								<SelectItem value="America/Los_Angeles">
									Pacific Time (PT)
								</SelectItem>
								<SelectItem value="America/Denver">
									Mountain Time (MT)
								</SelectItem>
								<SelectItem value="America/Chicago">
									Central Time (CT)
								</SelectItem>
								<SelectItem value="America/New_York">
									Eastern Time (ET)
								</SelectItem>
								<SelectItem value="Europe/London">London (GMT)</SelectItem>
								<SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
								<SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
