"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OnboardingFormData } from "../VendorOnboardingWizard";
import { useState } from "react";

export default function Step1_Account({
	formData,
	updateFormData,
	onNext,
}: {
	formData: OnboardingFormData;
	updateFormData: (updates: Partial<OnboardingFormData>) => void;
	onNext: () => void;
}) {
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: Record<string, string> = {};

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (formData.isSignUp) {
			if (!formData.name.trim()) {
				newErrors.name = "Name is required";
			}
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});
		onNext();
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
				<p className="text-muted-foreground">
					Sign up or sign in to get started with your vendor profile.
				</p>
			</div>

			<div className="flex gap-2 mb-6">
				<Button
					type="button"
					variant={formData.isSignUp ? "default" : "outline"}
					onClick={() => updateFormData({ isSignUp: true })}
					className="flex-1"
				>
					Sign Up
				</Button>
				<Button
					type="button"
					variant={!formData.isSignUp ? "default" : "outline"}
					onClick={() => updateFormData({ isSignUp: false })}
					className="flex-1"
				>
					Sign In
				</Button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				{formData.isSignUp && (
					<div className="space-y-2">
						<Label htmlFor="name">Full Name</Label>
						<Input
							id="name"
							type="text"
							placeholder="John Doe"
							value={formData.name}
							onChange={(e) =>
								updateFormData({ name: e.target.value })
							}
							aria-invalid={!!errors.name}
						/>
						{errors.name && (
							<p className="text-sm text-destructive">{errors.name}</p>
						)}
					</div>
				)}

				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="you@example.com"
						value={formData.email}
						onChange={(e) =>
							updateFormData({ email: e.target.value })
						}
						aria-invalid={!!errors.email}
					/>
					{errors.email && (
						<p className="text-sm text-destructive">{errors.email}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						placeholder="••••••••"
						value={formData.password}
						onChange={(e) =>
							updateFormData({ password: e.target.value })
						}
						aria-invalid={!!errors.password}
					/>
					{errors.password && (
						<p className="text-sm text-destructive">{errors.password}</p>
					)}
				</div>

				<div className="pt-4">
					<Button type="submit" className="w-full" size="lg">
						Continue
					</Button>
					<p className="text-xs text-muted-foreground mt-2 text-center">
						Note: This is a mock authentication. Backend integration will be
						added later.
					</p>
				</div>
			</form>
		</div>
	);
}

