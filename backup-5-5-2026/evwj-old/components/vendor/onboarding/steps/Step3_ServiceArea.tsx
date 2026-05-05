"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	getCitiesByStateAndCountry,
	getStatesByCountry,
	MOCK_COUNTRIES,
	searchCities,
} from "@/lib/mock-locations";
import { Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { OnboardingFormData } from "../VendorOnboardingWizard";
import ServiceAreaCard, { type ServiceArea } from "../ServiceAreaCard";

export default function Step3_ServiceArea({
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
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [newArea, setNewArea] = useState<ServiceArea>({
		country: "",
		state: "",
		city: "",
		radius: 25,
	});
	const [citySearch, setCitySearch] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});

	const availableStates = useMemo(() => {
		if (!newArea.country) return [];
		return getStatesByCountry(newArea.country);
	}, [newArea.country]);

	const availableCities = useMemo(() => {
		if (!newArea.state || !newArea.country) return [];
		return getCitiesByStateAndCountry(newArea.state, newArea.country);
	}, [newArea.state, newArea.country]);

	const citySearchResults = useMemo(() => {
		if (!citySearch.trim()) return availableCities;
		return searchCities(citySearch, newArea.state, newArea.country);
	}, [citySearch, newArea.state, newArea.country, availableCities]);

	const handleAddArea = () => {
		const newErrors: Record<string, string> = {};

		if (!newArea.country) newErrors.country = "Country is required";
		if (!newArea.state) newErrors.state = "State is required";
		if (!newArea.city) newErrors.city = "City is required";
		if (!newArea.radius || newArea.radius <= 0) {
			newErrors.radius = "Radius must be greater than 0";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});

		if (editingIndex !== null) {
			// Update existing area
			const updated = [...formData.serviceAreas];
			updated[editingIndex] = newArea;
			updateFormData({ serviceAreas: updated });
			setEditingIndex(null);
		} else {
			// Add new area
			updateFormData({
				serviceAreas: [...formData.serviceAreas, newArea],
			});
		}

		setNewArea({ country: "", state: "", city: "", radius: 25 });
		setCitySearch("");
	};

	const handleEdit = (index: number) => {
		setEditingIndex(index);
		setNewArea(formData.serviceAreas[index]);
		setCitySearch(formData.serviceAreas[index].city);
	};

	const handleDelete = (index: number) => {
		updateFormData({
			serviceAreas: formData.serviceAreas.filter((_, i) => i !== index),
		});
	};

	const handleCancelEdit = () => {
		setEditingIndex(null);
		setNewArea({ country: "", state: "", city: "", radius: 25 });
		setCitySearch("");
		setErrors({});
	};

	const handleCountryChange = (countryCode: string) => {
		setNewArea({ ...newArea, country: countryCode, state: "", city: "" });
		setCitySearch("");
		setErrors({});
	};

	const handleStateChange = (stateCode: string) => {
		setNewArea({ ...newArea, state: stateCode, city: "" });
		setCitySearch("");
		setErrors({});
	};

	const canContinue = formData.serviceAreas.length > 0;

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">Service Area</h2>
				<p className="text-muted-foreground">
					Define the areas where you provide services. You can add multiple
					service areas.
				</p>
			</div>

			{/* Add/Edit Form */}
			<div className="border border-border rounded-lg p-4 space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="country">Country</Label>
						<select
							id="country"
							value={newArea.country}
							onChange={(e) => handleCountryChange(e.target.value)}
							className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							<option value="">Select Country</option>
							{MOCK_COUNTRIES.map((country) => (
								<option key={country.code} value={country.code}>
									{country.name}
								</option>
							))}
						</select>
						{errors.country && (
							<p className="text-sm text-destructive">{errors.country}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="state">State</Label>
						<select
							id="state"
							value={newArea.state}
							onChange={(e) => handleStateChange(e.target.value)}
							disabled={!newArea.country}
							className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<option value="">Select State</option>
							{availableStates.map((state) => (
								<option key={state.code} value={state.code}>
									{state.name}
								</option>
							))}
						</select>
						{errors.state && (
							<p className="text-sm text-destructive">{errors.state}</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="city">City</Label>
						<div className="relative">
							<Input
								id="city"
								type="text"
								placeholder="Search or select city"
								value={citySearch}
								onChange={(e) => {
									setCitySearch(e.target.value);
									if (e.target.value) {
										const found = citySearchResults.find(
											(c) =>
												c.name.toLowerCase() ===
												e.target.value.toLowerCase(),
										);
										if (found) {
											setNewArea({ ...newArea, city: found.name });
										} else {
											setNewArea({ ...newArea, city: e.target.value });
										}
									}
								}}
								disabled={!newArea.state}
								aria-invalid={!!errors.city}
							/>
							{citySearch && citySearchResults.length > 0 && (
								<div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
									{citySearchResults.map((city) => (
										<button
											key={`${city.name}-${city.stateCode}`}
											type="button"
											onClick={() => {
												setNewArea({ ...newArea, city: city.name });
												setCitySearch(city.name);
											}}
											className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
										>
											{city.name}
										</button>
									))}
								</div>
							)}
						</div>
						{errors.city && (
							<p className="text-sm text-destructive">{errors.city}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="radius">Service Radius (miles)</Label>
						<Input
							id="radius"
							type="number"
							min="1"
							value={newArea.radius || ""}
							onChange={(e) =>
								setNewArea({
									...newArea,
									radius: parseInt(e.target.value) || 0,
								})
							}
							aria-invalid={!!errors.radius}
						/>
						{errors.radius && (
							<p className="text-sm text-destructive">{errors.radius}</p>
						)}
					</div>
				</div>

				<div className="flex gap-2">
					<Button
						type="button"
						onClick={handleAddArea}
						className="flex-1"
					>
						{editingIndex !== null ? (
							<>Update Service Area</>
						) : (
							<>
								<Plus className="h-4 w-4 mr-2" />
								Add Service Area
							</>
						)}
					</Button>
					{editingIndex !== null && (
						<Button
							type="button"
							variant="outline"
							onClick={handleCancelEdit}
						>
							<X className="h-4 w-4 mr-2" />
							Cancel
						</Button>
					)}
				</div>
			</div>

			{/* Existing Service Areas */}
			{formData.serviceAreas.length > 0 && (
				<div>
					<h3 className="text-sm font-medium mb-4">
						Service Areas ({formData.serviceAreas.length})
					</h3>
					<div className="space-y-3">
						{formData.serviceAreas.map((area, index) => (
							<ServiceAreaCard
								key={index}
								area={area}
								onEdit={() => handleEdit(index)}
								onDelete={() => handleDelete(index)}
							/>
						))}
					</div>
				</div>
			)}

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

