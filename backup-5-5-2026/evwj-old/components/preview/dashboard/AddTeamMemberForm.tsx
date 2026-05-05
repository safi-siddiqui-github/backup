import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	EventModule,
	MODULE_DESCRIPTIONS,
	MODULE_LABELS,
	ModulePermissions,
} from "@/types/eventTeam";
import { useState } from "react";

interface AddTeamMemberFormProps {
	onInvite: (email: string, modulePermissions: ModulePermissions) => void;
	onCancel: () => void;
	isLoading?: boolean;
}

export const AddTeamMemberForm = ({
	onInvite,
	onCancel,
	isLoading,
}: AddTeamMemberFormProps) => {
	const [email, setEmail] = useState("");
	const [modulePermissions, setModulePermissions] = useState<ModulePermissions>({});
	const [emailError, setEmailError] = useState("");

	const availableModules: EventModule[] = [
		"tickets",
		"rsvp",
		"checkin",
		"surveys",
		"schedule",
		"gallery",
		"analytics",
		"communications",
		"vendors",
	];

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleModulePermissionChange = (
		module: EventModule,
		permission: "view" | "admin" | "none",
	) => {
		setModulePermissions((prev) => {
			const updated = { ...prev };
			if (permission === "none") {
				delete updated[module];
			} else {
				updated[module] = permission as "view" | "admin";
			}
			return updated;
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setEmailError("Email is required");
			return;
		}

		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email address");
			return;
		}

		if (Object.keys(modulePermissions).length === 0) {
			setEmailError("Please assign at least one module permission");
			return;
		}

		setEmailError("");
		onInvite(email, modulePermissions);
		setEmail("");
		setModulePermissions({});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-card space-y-4 rounded-lg border p-4"
		>
			<div className="space-y-2">
				<Label htmlFor="email">Email Address</Label>
				<Input
					id="email"
					type="email"
					placeholder="teammate@example.com"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setEmailError("");
					}}
					disabled={isLoading}
				/>
				{emailError && <p className="text-destructive text-sm">{emailError}</p>}
			</div>

			<div className="space-y-4">
				<Label>Module Permissions</Label>
				<p className="text-muted-foreground text-xs">
					Select access level for each module. View = read-only, Admin = full
					access.
				</p>

				<div className="space-y-3 rounded-lg border p-4 max-h-[400px] overflow-y-auto">
					{availableModules.map((module) => (
						<div
							key={module}
							className="flex items-center justify-between gap-4 py-2 border-b last:border-b-0"
						>
							<div className="flex-1 min-w-0">
								<Label className="font-medium">
									{MODULE_LABELS[module]}
								</Label>
								<p className="text-muted-foreground text-xs">
									{MODULE_DESCRIPTIONS[module]}
								</p>
							</div>

							<RadioGroup
								value={
									modulePermissions[module] || "none"
								}
								onValueChange={(value) =>
									handleModulePermissionChange(
										module,
										value as "view" | "admin" | "none",
									)
								}
								className="flex gap-4"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="view"
										id={`${module}-view`}
										disabled={isLoading}
									/>
									<Label
										htmlFor={`${module}-view`}
										className="cursor-pointer text-sm font-normal"
									>
										View
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="admin"
										id={`${module}-admin`}
										disabled={isLoading}
									/>
									<Label
										htmlFor={`${module}-admin`}
										className="cursor-pointer text-sm font-normal"
									>
										Admin
									</Label>
								</div>
							</RadioGroup>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isLoading}
				>
					Cancel
				</Button>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Sending..." : "Send Invite"}
				</Button>
			</div>
		</form>
	);
};
