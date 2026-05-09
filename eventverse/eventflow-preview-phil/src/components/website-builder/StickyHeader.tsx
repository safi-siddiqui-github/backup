import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Website, Page, NavigationButton } from '@/types/website';

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
  isEditMode = false 
}: StickyHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationConfig = website.navigationConfig;
  const headerButtons = navigationConfig?.buttons?.filter(btn => btn.showInHeader) || [];

  const handlePageClick = (pageId: string) => {
    if (onPageChange) {
      onPageChange(pageId);
    }
    setMobileMenuOpen(false);
  };

  const handleSmoothScroll = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.querySelector(`[data-section-id*="${link.slice(1)}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            {navigationConfig?.logoImage ? (
              <img 
                src={navigationConfig.logoImage} 
                alt={website.name}
                className="h-8 w-auto"
              />
            ) : (
              <h1 className="text-xl font-bold text-foreground">
                {navigationConfig?.logoText || website.name}
              </h1>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Page Navigation */}
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => handlePageClick(page.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage.id === page.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {page.name}
              </button>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {headerButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.style === 'primary' ? 'default' : button.style === 'secondary' ? 'secondary' : 'outline'}
                size="sm"
                asChild
              >
                <a
                  href={button.link}
                  target={button.target}
                  onClick={(e) => {
                    if (button.link.startsWith('#')) {
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
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{website.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {/* Mobile Page Navigation */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Pages
                  </h3>
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handlePageClick(page.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage.id === page.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {page.name}
                    </button>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                {headerButtons.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Actions
                    </h3>
                    {headerButtons.map((button, index) => (
                      <Button
                        key={index}
                        variant={button.style === 'primary' ? 'default' : button.style === 'secondary' ? 'secondary' : 'outline'}
                        className="w-full justify-start"
                        asChild
                      >
                        <a
                          href={button.link}
                          target={button.target}
                          onClick={(e) => {
                            if (button.link.startsWith('#')) {
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