import { useState } from "react";

export interface Service {
  id: string;
  name: string;
  category: string;
}

export function useServicesForm() {
  const [services, setServices] = useState<Service[]>([
    { id: "1", name: "Full Service Catering", category: "Catering" },
    { id: "2", name: "Wedding Cakes", category: "Catering" },
    { id: "3", name: "Bar Service", category: "Catering" },
    { id: "4", name: "Setup & Cleanup", category: "Catering" },
  ]);

  const [specialties, setSpecialties] = useState<string[]>([
    "Italian Cuisine",
    "Vegan Options",
    "Gluten-Free",
  ]);

  const [serviceInput, setServiceInput] = useState("");
  const [serviceCategory, setServiceCategory] = useState<string>("");
  const [specialtyInput, setSpecialtyInput] = useState("");

  const addService = (category?: string) => {
    const categoryToUse = category || serviceCategory;
    if (serviceInput.trim() && categoryToUse) {
      const newService: Service = {
        id: Date.now().toString(),
        name: serviceInput.trim(),
        category: categoryToUse,
      };
      if (!services.some((s) => s.name === newService.name && s.category === newService.category)) {
        setServices([...services, newService]);
        setServiceInput("");
        setServiceCategory("");
      }
    }
  };

  const removeService = (serviceId: string) => {
    setServices(services.filter((s) => s.id !== serviceId));
  };

  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  return {
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
  };
}

