import { useState, useRef } from "react";
import { PortfolioItem } from "./types";
import { MOCK_PORTFOLIO_ITEMS } from "./mock-data";

export function usePortfolioManager() {
  const [portfolioItems, setPortfolioItems] =
    useState<PortfolioItem[]>(MOCK_PORTFOLIO_ITEMS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newItem: PortfolioItem = {
            id: Date.now().toString(),
            imageUrl: reader.result as string,
            title: file.name.replace(/\.[^/.]+$/, ""),
          };
          setPortfolioItems((prev) => [...prev, newItem]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    portfolioItems,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    removeItem,
  };
}

