"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Page, Website } from "@/types/website";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface StickyHeaderProps {
  website: Website;
  pages: Page[];
  currentPage: Page;
  onPageChange?: (pageId: string) => void;
  isEditMode?: boolean;
}

export const StickyHeader = ({
  website,
  pages,
  currentPage,
  onPageChange,
  isEditMode = false,
}: StickyHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationConfig = website.navigationConfig;
  const headerButtons =
    navigationConfig?.buttons?.filter((btn) => btn.showInHeader) || [];

  const handlePageClick = (pageId: string) => {
    if (onPageChange) {
      onPageChange(pageId);
    }
    setMobileMenuOpen(false);
  };

  const handleSmoothScroll = (link: string) => {
    if (link.startsWith("#")) {
      const element = document.querySelector(
        `[data-section-id*="${link.slice(1)}"]`,
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            {navigationConfig?.logoImage ? (
              <>
                {/* <img
                  src={navigationConfig.logoImage}
                  alt={website.name}
                  className="h-8 w-auto"
                /> */}

                <Image
                  src={navigationConfig.logoImage}
                  alt={website.name}
                  className="h-8 w-auto"
                />
              </>
            ) : (
              <h1 className="text-foreground text-xl font-bold">
                {navigationConfig?.logoText || website.name}
              </h1>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            {/* Page Navigation */}
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.id)}
                className={`hover:text-primary text-sm font-medium transition-colors ${
                  currentPage.id === page.id
                    ? "text-primary border-primary border-b-2"
                    : "text-muted-foreground"
                }`}
              >
                {page.name}
              </button>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden items-center space-x-2 md:flex">
            {headerButtons.map((button, index) => (
              <Button
                key={index}
                variant={
                  button.style === "primary"
                    ? "default"
                    : button.style === "secondary"
                      ? "secondary"
                      : "outline"
                }
                size="sm"
                asChild
              >
                <a
                  href={button.link}
                  target={button.target}
                  onClick={(e) => {
                    if (button.link.startsWith("#")) {
                      e.preventDefault();
                      handleSmoothScroll(button.link);
                    }
                  }}
                >
                  {button.text}
                </a>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Sheet
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px]"
            >
              <SheetHeader>
                <SheetTitle>{website.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {/* Mobile Page Navigation */}
                <div className="space-y-2">
                  <h3 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                    Pages
                  </h3>
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handlePageClick(page.id)}
                      className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                        currentPage.id === page.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {page.name}
                    </button>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                {headerButtons.length > 0 && (
                  <div className="space-y-2 border-t pt-4">
                    <h3 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                      Actions
                    </h3>
                    {headerButtons.map((button, index) => (
                      <Button
                        key={index}
                        variant={
                          button.style === "primary"
                            ? "default"
                            : button.style === "secondary"
                              ? "secondary"
                              : "outline"
                        }
                        className="w-full justify-start"
                        asChild
                      >
                        <a
                          href={button.link}
                          target={button.target}
                          onClick={(e) => {
                            if (button.link.startsWith("#")) {
                              e.preventDefault();
                              handleSmoothScroll(button.link);
                            }
                            setMobileMenuOpen(false);
                          }}
                        >
                          {button.text}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
