"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AccountTab() {
	const handleChangePassword = () => {
		toast.info("Password change feature coming soon");
	};

	const handleSetup2FA = () => {
		toast.info("Two-factor authentication setup coming soon");
	};

	const handleManageSessions = () => {
		toast.info("Session management coming soon");
	};

	const handleDeactivateAccount = () => {
		toast.info("Account deactivation feature coming soon");
	};

	const handleDeleteAccount = () => {
		if (
			confirm(
				"Are you sure you want to delete your account? This action cannot be undone.",
			)
		) {
			toast.info("Account deletion feature coming soon");
		}
	};

	return (
		<div className="space-y-6">
			{/* Account Management */}
			<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
				<CardHeader>
					<CardTitle>Account Management</CardTitle>
					<CardDescription>
						Manage your account security and preferences
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
							<div>
								<h3 className="font-medium">Password</h3>
								<p className="text-muted-foreground text-sm">
									Last changed 30 days ago
								</p>
							</div>
							<Button variant="outline" onClick={handleChangePassword}>
								Change Password
							</Button>
						</div>

						<div className="flex items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
							<div>
								<h3 className="font-medium">Two-Factor Authentication</h3>
								<p className="text-muted-foreground text-sm">
									Add an extra layer of security to your account
								</p>
							</div>
							<Button variant="outline" onClick={handleSetup2FA}>
								Setup 2FA
							</Button>
						</div>

						<div className="flex items-center justify-between rounded-lg border bg-white/80 p-4 backdrop-blur-sm dark:bg-[#020617]">
							<div>
								<h3 className="font-medium">Login Sessions</h3>
								<p className="text-muted-foreground text-sm">
									View and manage your active sessions
								</p>
							</div>
							<Button variant="outline" onClick={handleManageSessions}>
								Manage Sessions
							</Button>
						</div>
					</div>

					<Separator />

					<div className="space-y-4">
						<h3 className="font-medium text-red-600 dark:text-red-400">
							Danger Zone
						</h3>
						<div className="space-y-4 rounded-lg border border-red-200 p-4 dark:border-red-800">
							<div>
								<h4 className="font-medium">Deactivate Account</h4>
								<p className="text-muted-foreground text-sm">
									Temporarily disable your account. You can reactivate it
									anytime.
								</p>
								<Button
									variant="outline"
									className="mt-2 border-red-200 text-red-600 dark:border-red-800 dark:text-red-400"
									onClick={handleDeactivateAccount}
								>
									Deactivate Account
								</Button>
							</div>

							<Separator />

							<div>
								<h4 className="font-medium text-red-600 dark:text-red-400">
									Delete Account
								</h4>
								<p className="text-muted-foreground text-sm">
									Permanently delete your account and all associated data. This
									action cannot be undone.
								</p>
								<Button
									variant="destructive"
									className="mt-2"
									onClick={handleDeleteAccount}
								>
									<Trash2 className="mr-2 h-4 w-4" />
									Delete Account
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
