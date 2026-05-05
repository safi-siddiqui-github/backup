"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import {
	getAllServices,
	searchServices,
	type VendorService,
} from "@/lib/mock-vendor-services";
import type { OnboardingFormData } from "../VendorOnboardingWizard";
import ServiceCard from "../ServiceCard";

export default function Step2_Services({
	formData,
	updateFormData,
	onNext,
	onBack,
}: {
	formData: OnboardingFormData;
	updateFormData: (updates: Partial<OnboardingFormData>) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const [searchQuery, setSearchQuery] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);

	const allServices = getAllServices();
	const selectedServiceIds = new Set(formData.selectedServices);

	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) return [];
		return searchServices(searchQuery);
	}, [searchQuery]);

	const selectedServices = useMemo(() => {
		return formData.selectedServices
			.map((id) => {
				const service = allServices.find((s) => s.id === id);
				return service ? { id, name: service.name } : { id, name: id };
			})
			.filter(Boolean);
	}, [formData.selectedServices, allServices]);

	const toggleService = (serviceId: string) => {
		const newSelected = selectedServiceIds.has(serviceId)
			? formData.selectedServices.filter((id) => id !== serviceId)
			: [...formData.selectedServices, serviceId];
		updateFormData({ selectedServices: newSelected });
	};

	const addCustomService = () => {
		if (searchQuery.trim() && !selectedServiceIds.has(searchQuery.trim())) {
			updateFormData({
				selectedServices: [...formData.selectedServices, searchQuery.trim()],
			});
			setSearchQuery("");
			setShowSuggestions(false);
		}
	};

	const removeService = (serviceId: string) => {
		updateFormData({
			selectedServices: formData.selectedServices.filter(
				(id) => id !== serviceId,
			),
		});
	};

	const handleSearchKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && searchQuery.trim()) {
			e.preventDefault();
			addCustomService();
		}
	};

	const canContinue = formData.selectedServices.length > 0;

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">What Services Do You Offer?</h2>
				<p className="text-muted-foreground">
					Select the services you provide or add custom ones.
				</p>
			</div>

			{/* Search Bar */}
			<div className="relative">
				<Input
					type="text"
					placeholder="Search for services or add a custom service..."
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						setShowSuggestions(true);
					}}
					onFocus={() => setShowSuggestions(true)}
					onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
					onKeyDown={handleSearchKeyDown}
					className="pr-10"
				/>
				{searchQuery.trim() && (
					<button
						type="button"
						onClick={() => {
							setSearchQuery("");
							setShowSuggestions(false);
						}}
						className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
					>
						<X className="h-4 w-4" />
					</button>
				)}

				{/* Suggestions Dropdown */}
				{showSuggestions && searchResults.length > 0 && (
					<div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
						{searchResults.map((service) => {
							const isSelected = selectedServiceIds.has(service.id);
							return (
								<button
									key={service.id}
									type="button"
									onClick={() => {
										toggleService(service.id);
										setSearchQuery("");
										setShowSuggestions(false);
									}}
									className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
										isSelected ? "bg-purple-50 dark:bg-purple-950/30" : ""
									}`}
								>
									<div className="flex items-center justify-between">
										<span>{service.name}</span>
										{isSelected && (
											<span className="text-purple-600 dark:text-purple-400 text-sm">
												Selected
											</span>
										)}
									</div>
								</button>
							);
						})}
					</div>
				)}

				{/* Add Custom Service Button */}
				{searchQuery.trim() &&
					searchResults.length === 0 &&
					!selectedServiceIds.has(searchQuery.trim()) && (
						<div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg p-2">
							<button
								type="button"
								onClick={addCustomService}
								className="w-full text-left px-4 py-2 hover:bg-muted rounded transition-colors"
							>
								Add &quot;{searchQuery}&quot; as custom service
							</button>
						</div>
					)}
			</div>

			{/* Selected Services Display */}
			{selectedServices.length > 0 && (
				<div>
					<h3 className="text-sm font-medium mb-2">
						Selected Services ({selectedServices.length})
					</h3>
					<div className="flex flex-wrap gap-2">
						{selectedServices.map((service) => (
							<div
								key={service.id}
								className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
							>
								<span>{service.name}</span>
								<button
									type="button"
									onClick={() => removeService(service.id)}
									className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
								>
									<X className="h-3 w-3" />
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Service Cards Grid */}
			<div>
				<h3 className="text-sm font-medium mb-4">Common Services</h3>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{allServices.map((service) => (
						<ServiceCard
							key={service.id}
							service={service}
							isSelected={selectedServiceIds.has(service.id)}
							onClick={() => toggleService(service.id)}
						/>
					))}
				</div>
			</div>

			{/* Navigation */}
			<div className="flex gap-4 pt-4">
				<Button type="button" variant="outline" onClick={onBack}>
					Back
				</Button>
				<Button
					type="button"
					onClick={onNext}
					disabled={!canContinue}
					className="flex-1"
				>
					Continue
				</Button>
			</div>
		</div>
	);
}

