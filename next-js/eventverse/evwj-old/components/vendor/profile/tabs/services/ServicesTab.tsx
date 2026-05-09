"use client";

import { useMemo } from "react";
import { useServicesForm } from "./use-services-form";
import { useVendorProfile } from "../../context/VendorProfileContext";
import ServicesGroupedCard from "./ServicesGroupedCard";
import ServiceCard from "./ServiceCard";
import { ServicesTabProps } from "./types";

export default function ServicesTab({ isEditMode }: ServicesTabProps) {
  const { categories } = useVendorProfile();
  const {
    services,
    serviceInput,
    setServiceInput,
    serviceCategory,
    setServiceCategory,
    addService,
    removeService,
    specialties,
    specialtyInput,
    setSpecialtyInput,
    addSpecialty,
    removeSpecialty,
  } = useServicesForm();

  // Group services by category
  const groupedServices = useMemo(() => {
    const grouped: Record<string, typeof services> = {};
    
    // Initialize groups for each selected category
    categories.forEach((category) => {
      grouped[category] = [];
    });

    // Assign services to their categories
    services.forEach((service) => {
      if (grouped[service.category]) {
        grouped[service.category].push(service);
      } else {
        // If category doesn't exist in selected categories, add to "Other"
        if (!grouped["Other"]) {
          grouped["Other"] = [];
        }
        grouped["Other"].push(service);
      }
    });

    // Remove empty categories and "Other" if empty
    Object.keys(grouped).forEach((key) => {
      if (grouped[key].length === 0 && key !== "Other") {
        delete grouped[key];
      }
    });

    return grouped;
  }, [services, categories]);

  const handleServiceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addService();
    }
  };

  const handleSpecialtyKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSpecialty();
    }
  };

  return (
    <div className="space-y-6">
      <ServicesGroupedCard
        title="Services Offered"
        description="List the services your business provides"
        groupedServices={groupedServices}
        categories={categories}
        serviceInput={serviceInput}
        serviceCategory={serviceCategory}
        onServiceInputChange={setServiceInput}
        onServiceCategoryChange={setServiceCategory}
        onAdd={addService}
        onRemove={removeService}
        onKeyPress={handleServiceKeyPress}
        isEditMode={isEditMode}
      />

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <ServiceCard
          title="Specialties"
          description="What makes your business unique"
          items={specialties}
          inputValue={specialtyInput}
          onInputChange={setSpecialtyInput}
          onAdd={addSpecialty}
          onRemove={removeSpecialty}
          onKeyPress={handleSpecialtyKeyPress}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
}

