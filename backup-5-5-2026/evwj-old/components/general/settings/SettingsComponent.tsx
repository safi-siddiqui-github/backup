"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import ProfileTab from "./tabs/ProfileTab";
import SocialTab from "./tabs/SocialTab";
import NotificationsTab from "./tabs/NotificationsTab";
import PrivacyTab from "./tabs/PrivacyTab";
import AppearanceTab from "./tabs/AppearanceTab";
import AccountTab from "./tabs/AccountTab";
import OrganizationTab from "./tabs/OrganizationTab";
import {
	User,
	Link as LinkIcon,
	Bell,
	Shield,
	Palette,
	Globe,
	Building2,
} from "lucide-react";

export default function SettingsComponent() {
	const { settingsTab, setSettingsTab } = useNavigationStore();
	const [activeTab, setActiveTab] = useState(settingsTab || "profile");

	const handleTabChange = (value: string) => {
		setActiveTab(value);
		setSettingsTab(value);
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="mb-4">
				<h1 className="text-3xl font-bold text-foreground">Settings</h1>
				<p className="mt-2 text-muted-foreground">
					Manage your account settings and preferences
				</p>
			</div>

			{/* Settings card: light mode on white, third near-black tone in dark mode */}
			<div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:bg-[#020617]">
				<Tabs
					value={activeTab}
					onValueChange={handleTabChange}
					className="space-y-6"
				>
					<TabsList className="h-full w-full justify-start overflow-x-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						<TabsTrigger
							value="profile"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
						>
							<User className="w-4 h-4" />
							Profile
						</TabsTrigger>
						<TabsTrigger
							value="social"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
						>
							<LinkIcon className="w-4 h-4" />
							Social
						</TabsTrigger>
						<TabsTrigger
							value="organization"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
						>
							<Building2 className="w-4 h-4" />
							Organization
						</TabsTrigger>
						<TabsTrigger
							value="notifications"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
						>
							<Bell className="w-4 h-4" />
							Notifications
						</TabsTrigger>
						<TabsTrigger
							value="privacy"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
						>
							<Shield className="w-4 h-4" />
							Privacy
						</TabsTrigger>
						<TabsTrigger
							value="appearance"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
						>
							<Palette className="w-4 h-4" />
							Appearance
						</TabsTrigger>
						<TabsTrigger
							value="account"
							className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
						>
							<Globe className="w-4 h-4" />
							Account
						</TabsTrigger>
					</TabsList>

					<TabsContent value="profile">
						<ProfileTab />
					</TabsContent>

					<TabsContent value="social">
						<SocialTab />
					</TabsContent>

					<TabsContent value="organization">
						<OrganizationTab />
					</TabsContent>

					<TabsContent value="notifications">
						<NotificationsTab />
					</TabsContent>

					<TabsContent value="privacy">
						<PrivacyTab />
					</TabsContent>

					<TabsContent value="appearance">
						<AppearanceTab />
					</TabsContent>

					<TabsContent value="account">
						<AccountTab />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
