import { useState } from "react";
import { Country, State } from "country-state-city";
import { ServiceArea, BasicInfoFormData } from "./types";

export function useBasicInfoForm() {
  const [formData, setFormData] = useState<BasicInfoFormData>({
    businessName: "Demo Vendor Business",
    category: ["Catering"],
    description: "Premium catering services for weddings and special events",
    phone: "+1-555-0123",
    email: "neqifit@mailinator.com",
    website: "www.example.com",
    businessStreet: "123 Business St",
    businessCity: "City",
    businessState: "ST",
    businessZip: "12345",
    yearEstablished: "2015",
    teamSize: "10-20",
    serviceAreas: [
      {
        id: "1",
        countryCode: "US",
        countryName: "United States",
        stateCode: "CA",
        stateName: "California",
        cityName: "Los Angeles",
        miles: 50,
      },
    ],
  });

  const updateField = (field: keyof BasicInfoFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addServiceArea = () => {
    const newArea: ServiceArea = {
      id: Date.now().toString(),
      countryCode: "",
      countryName: "",
      stateCode: "",
      stateName: "",
      cityName: "",
      miles: 50,
    };
    setFormData((prev) => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, newArea],
    }));
  };

  const removeServiceArea = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((area) => area.id !== id),
    }));
  };

  const updateServiceArea = (
    id: string,
    field: keyof ServiceArea,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.map((area) => {
        if (area.id !== id) return area;

        const updated = { ...area };

        // When country changes, reset state and city
        if (field === "countryCode") {
          const countries = Country.getAllCountries();
          const country = countries.find((c) => c.isoCode === value);
          if (country) {
            updated.countryCode = country.isoCode;
            updated.countryName = country.name;
            updated.stateCode = "";
            updated.stateName = "";
            updated.cityName = "";
          }
        }
        // When state changes, reset city
        else if (field === "stateCode") {
          const states = State.getStatesOfCountry(updated.countryCode);
          const state = states.find((s) => s.isoCode === value);
          if (state) {
            updated.stateCode = state.isoCode;
            updated.stateName = state.name;
            updated.cityName = "";
          }
        }
        // When city changes
        else if (field === "cityName") {
          updated.cityName = value;
        }
        // For miles
        else if (field === "miles") {
          updated.miles = value;
        }

        return updated;
      }),
    }));
  };

  return {
    formData,
    updateField,
    addServiceArea,
    removeServiceArea,
    updateServiceArea,
  };
}

