"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface VendorProfileContextType {
  categories: string[];
  setCategories: (categories: string[]) => void;
}

const VendorProfileContext = createContext<VendorProfileContextType | undefined>(undefined);

export function VendorProfileProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<string[]>(["Catering"]);

  return (
    <VendorProfileContext.Provider value={{ categories, setCategories }}>
      {children}
    </VendorProfileContext.Provider>
  );
}

export function useVendorProfile() {
  const context = useContext(VendorProfileContext);
  if (context === undefined) {
    throw new Error("useVendorProfile must be used within a VendorProfileProvider");
  }
  return context;
}

