"use client";

import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/lib-routes";
import { cn } from "@/lib/utils";
import { LogIn, Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
// import LogoutComponent from "../auth/LogoutComponent";
import LogoutComponent from "@/app/(web)/(auth)/_components/LogoutComponent";
import { DropdownAccountComponent } from "../dropdown/DropdownAccountComponent";
import NotificationBell from "../notification/NotificationBell";
import ThemeHandleComponent from "../theme/ThemeHandleComponent";
import HeaderLocationComponent from "./HeaderLocationComponent";

const NavLinkComponent = (props: {
  linkUrl?: string;
  isActiveLink?: (text: string) => boolean;
  handleLinkClick?: () => void;
  children?: ReactNode;
  variant?: "desktop" | "mobile";
  isDashboardLightMode?: boolean;
}) => {
  //
  const {
    linkUrl,
    isActiveLink,
    children,
    handleLinkClick,
    variant = "desktop",
    isDashboardLightMode = false,
  } = props;
  const [isMounted, setIsMounted] = useState(false);

  // Only check active state after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive =
    isMounted && isActiveLink ? isActiveLink(linkUrl ?? "") : false;

  // On dashboard pages in light mode, use light colors; in dark mode or other pages, use original dark colors
  const inactiveLinkStyles = isDashboardLightMode
    ? "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
    : "bg-white/10 text-white hover:bg-white/20";

  //
  return (
    <Link
      href={linkUrl ?? ""}
      className={cn(
        "group relative overflow-hidden rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:cursor-pointer hover:shadow-xl min-[2560px]:px-4 min-[2560px]:py-2.5 min-[2560px]:text-base lg:px-2.5 lg:py-1.5 lg:text-[11px] xl:px-3 xl:py-2 xl:text-sm",
        variant === "desktop"
          ? isActive
            ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white"
            : inactiveLinkStyles
          : isActive
            ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white"
            : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
      )}
      onClick={() => {
        if (handleLinkClick) {
          handleLinkClick();
        }
      }}
    >
      {isActive && (
        <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export default function WebHeaderComponent() {
  //
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  //
  const handleLinkClick = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isSheetOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position when menu closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isSheetOpen]);

  const isActiveLink = useCallback(
    (path: string) => {
      return pathname === path;
    },
    [pathname],
  );
  //

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //

  // Check if we're on an auth page
  // Always show dark background on auth pages for better visibility
  const isAuthPage =
    pathname?.includes("/login") ||
    pathname?.includes("/signup") ||
    pathname?.includes("/forgot-password");

  // Check if we're on a dashboard/module page
  const isDashboardPage = pathname?.includes("/dashboard");

  // Force dark background if on signup page (where onboarding wizard appears)
  // or if scrolled, or if explicitly on auth page
  const shouldShowDarkBackground =
    isScrolled || isAuthPage || pathname?.includes("/signup");

  // On dashboard pages: light mode needs light background with dark text, dark mode keeps transparent with white text (original behavior)
  const isEventPage = pathname?.startsWith("/events") || pathname?.startsWith("/home/explore-events");
  const isEventPageLightMode = isEventPage && !shouldShowDarkBackground;
  const isFeaturesPage = pathname === Routes.web.general.features;
  const isOrganizerPage = pathname?.startsWith("/organizers");
  const isOrganizerPageLightMode = isOrganizerPage && !shouldShowDarkBackground;
  const isDashboardLightMode = isDashboardPage && !shouldShowDarkBackground;
  const isLightModeVariant =
    isDashboardLightMode || isEventPageLightMode || isFeaturesPage || isOrganizerPageLightMode;

  //
  return (
    <>
      <div
        className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between gap-2 px-4 py-6 transition-all duration-300 min-[2560px]:gap-5 min-[2560px]:px-12 min-[2560px]:py-8 md:px-6 lg:gap-2 lg:px-6 lg:py-5 xl:gap-3 xl:px-8 xl:py-7 2xl:gap-4 ${
          shouldShowDarkBackground
            ? "bg-black text-white shadow-lg backdrop-blur-lg"
            : isLightModeVariant
              ? "bg-white/80 text-gray-900 shadow-lg backdrop-blur-lg dark:bg-transparent dark:text-white"
              : "bg-transparent text-white"
        }`}
      >
        <Link
          href={Routes.web.general.home}
          className="shrink-0 text-lg font-semibold min-[2560px]:text-2xl lg:text-[18px] xl:text-xl"
        >
          EventVerse
        </Link>

        <nav className="hidden max-w-full min-w-0 flex-1 justify-center lg:flex">
          <div className="flex items-center gap-1 font-medium tracking-tight min-[2560px]:gap-4 lg:gap-1.5 xl:gap-2 2xl:gap-3">
            <NavLinkComponent
              linkUrl={Routes.web.general.home}
              isActiveLink={isActiveLink}
              isDashboardLightMode={isLightModeVariant}
            >
              Home
            </NavLinkComponent>

            <NavLinkComponent
              linkUrl={Routes.web.general.events}
              isActiveLink={isActiveLink}
              isDashboardLightMode={isLightModeVariant}
            >
              Explore Events
            </NavLinkComponent>

            {/* <NavLinkComponent
              linkUrl={Routes.web.general.organizers.name}
              isActiveLink={isActiveLink}
              isDashboardLightMode={isDashboardLightMode}
            >
              Organizers
            </NavLinkComponent> */}

            <NavLinkComponent
              linkUrl={Routes.web.general.features}
              isActiveLink={isActiveLink}
              isDashboardLightMode={isLightModeVariant}
            >
              Features
            </NavLinkComponent>

            <NavLinkComponent
              linkUrl={Routes.web.general.forVendors}
              isActiveLink={isActiveLink}
              isDashboardLightMode={isLightModeVariant}
            >
              For Vendors
            </NavLinkComponent>

            {/* <NavLinkComponent
              linkUrl={Routes.web.general.howItWorks}
              isActiveLink={isActiveLink}
            >
              How It Works
            </NavLinkComponent> */}

            {/* <NavLinkComponent
              linkUrl={Routes.web.general.help}
              isActiveLink={isActiveLink}
            >
              Help
            </NavLinkComponent> */}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-1 min-[2560px]:gap-4 lg:flex lg:gap-1.5 xl:gap-2 2xl:gap-3">
          {/* Create Event Button - Always Visible */}

          <Link href={Routes.web.auth.dashboardEventCreate}>
            <Button className="group relative overflow-hidden rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:cursor-pointer hover:shadow-xl min-[2560px]:px-6 min-[2560px]:py-3 min-[2560px]:text-lg lg:px-3 lg:py-1.5 lg:text-[11px] xl:px-4 xl:py-2 xl:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base">
              <span className="relative z-10 flex items-center gap-1 min-[2560px]:gap-2.5 lg:gap-1.5 xl:gap-2">
                <Plus className="h-3 w-3 min-[2560px]:h-5 min-[2560px]:w-5 lg:h-3.5 lg:w-3.5 xl:h-4 xl:w-4" />
                <span className="whitespace-nowrap">Create Event</span>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </Link>

          <div className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
            <HeaderLocationComponent
              isDashboardLightMode={isLightModeVariant}
              shouldShowDarkBackground={shouldShowDarkBackground}
            />

            {/* {userStore?.user && <NotificationBell />} */}
            <NotificationBell />
          </div>

          {/* <ThemeHandleComponent /> */}

          <DropdownAccountComponent />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {/* Hide location and notification on very small screens (320px and below) */}
          {/* Show on screens wider than 320px */}
          <div className="hidden items-center gap-2 min-[321px]:flex">
            <HeaderLocationComponent
              isDashboardLightMode={isLightModeVariant}
              shouldShowDarkBackground={shouldShowDarkBackground}
            />

            {/* {userStore?.user && <NotificationBell />} */}
            <NotificationBell />
          </div>

          <DropdownAccountComponent />

          {/* New Animated Hamburger Menu */}
          <div className="relative lg:hidden">
            {/* Hamburger Button */}
            <Button
              onClick={() => setIsSheetOpen(!isSheetOpen)}
              className="rounded-full"
              aria-label="Toggle menu"
            >
              <>
                {isSheetOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </>
            </Button>

            {/* Animated Menu Overlay */}
            {isSheetOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="animate-in fade-in fixed inset-0 z-60 bg-black/50 backdrop-blur-sm duration-300"
                  onClick={() => setIsSheetOpen(false)}
                  onTouchMove={(e) => e.preventDefault()}
                  style={{ touchAction: "none" }}
                />

                {/* Menu Panel */}
                <div className="bg-background animate-in slide-in-from-right fixed top-0 right-0 z-70 h-screen w-80 text-black shadow-2xl duration-300 dark:text-white">
                  <div className="flex h-full flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex shrink-0 items-center justify-between border-b p-6">
                      <h2 className="text-xl font-bold">EventVerse</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSheetOpen(false)}
                        className="rounded-full"
                        aria-label="Close menu"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Navigation Links with Staggered Animation */}
                    <nav
                      className="flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-6"
                      style={{ WebkitOverflowScrolling: "touch" }}
                    >
                      <div className="flex flex-col gap-2">
                        {[
                          { label: "Home", url: Routes.web.general.home },
                          {
                            label: "Explore Events",
                            url: Routes.web.general.events,
                          },
                          // { label: "Organizers", url: Routes.web.general.organizers.name },
                          {
                            label: "Features",
                            url: Routes.web.general.features,
                          },
                          {
                            label: "For Vendors",
                            url: Routes.web.general.forVendors,
                          },
                          {
                            label: "How It Works",
                            url: Routes.web.general.howItWorks,
                          },
                          { label: "Help", url: Routes.web.general.help },
                        ].map((item, index) => (
                          <Link
                            key={item.label}
                            href={item.url}
                            onClick={handleLinkClick}
                            className={cn(
                              "group relative overflow-hidden rounded-lg px-4 py-3 text-base font-medium transition-all duration-300",
                              "hover:bg-linear-to-r hover:from-purple-600/10 hover:to-cyan-600/10",
                              isActiveLink(item.url) &&
                                "bg-linear-to-r from-purple-600 to-cyan-600 text-white shadow-lg",
                            )}
                            style={{
                              animation: `slideInFromRight 0.4s ease-out ${index * 0.1}s both`,
                            }}
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              {item.label}
                              {/* {isActiveLink(item.url) && (
                                <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                              )} */}
                            </span>
                            {isActiveLink(item.url) && (
                              <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </nav>

                    {/* Footer */}
                    <div className="shrink-0 space-y-3 border-t p-4">
                      {/* Show location and notification at bottom for very small screens (320px and below) */}
                      {/* Hidden on screens wider than 320px, shown on 320px and below */}
                      <div className="mb-3 flex items-center justify-between gap-2 border-b pb-3 min-[321px]:hidden">
                        <HeaderLocationComponent
                          isDashboardLightMode={isLightModeVariant}
                          shouldShowDarkBackground={shouldShowDarkBackground}
                        />
                        {/* {userStore?.user && <NotificationBell />} */}
                        <NotificationBell />
                      </div>

                      <ThemeHandleComponent variant="button" />
                      {/* {userStore?.user ? ( */}
                      {false ? (
                        <LogoutComponent />
                      ) : (
                        <Button
                          asChild
                          className="group relative w-full overflow-hidden rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:cursor-pointer hover:shadow-xl"
                        >
                          <Link href={Routes.web.guest.signin}>
                            <div className="relative z-10 flex items-center justify-center gap-2">
                              <LogIn className="h-4 w-4" />
                              <span>Log In</span>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <div className="bg-foreground dark:bg-background h-25"></div> */}
    </>
  );
}
