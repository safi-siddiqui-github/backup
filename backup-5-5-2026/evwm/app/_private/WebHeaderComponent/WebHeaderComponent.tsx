// "use client";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
// 	DropdownMenuGroup,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/shadcn/ui/dropdown-menu";
// import { Check, LogOut, MapPin, Moon, Settings, Sun, UserPlus } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "@/shadcn/ui/button";
// import {
// 	Command,
// 	CommandEmpty,
// 	CommandGroup,
// 	CommandInput,
// 	CommandItem,
// 	CommandList,
// } from "@/shadcn/ui/command";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/shadcn/ui/popover";
// import { LogIn, Menu, Plus, X, LayoutDashboard } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { ReactNode, useCallback, useEffect, useState } from "react";
// import { cn } from "@/lib/lib-shadcn";
// import { Routes } from "@/lib/lib-routes";
// import WebHeaderNotificationBellComponent from "./WebHeaderNotificationBellComponent";
// import { Spinner } from "@/shadcn/ui/spinner";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { UserModelType } from "@/type/type-model";
// import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";

// const NavLinkComponent = (props: {
//   linkUrl?: string;
//   isActiveLink?: (text: string) => boolean;
//   handleLinkClick?: () => void;
//   children?: ReactNode;
//   variant?: "desktop" | "mobile";
//   isDashboardLightMode?: boolean;
// }) => {
//   //
//   const {
//     linkUrl,
//     isActiveLink,
//     children,
//     handleLinkClick,
//     variant = "desktop",
//     isDashboardLightMode = false,
//   } = props;
//   const isActive = isActiveLink ? isActiveLink(linkUrl ?? "") : false;

//   const inactiveLinkStyles = isDashboardLightMode
//     ? "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
//     : "bg-white/10 text-white hover:bg-white/20";

//   //
//   return (
//     <Link
//       href={linkUrl ?? ""}
//       className={cn(
//         "group relative overflow-hidden rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:cursor-pointer hover:shadow-xl min-[2560px]:px-4 min-[2560px]:py-2.5 min-[2560px]:text-base lg:px-2.5 lg:py-1.5 lg:text-[11px] xl:px-3 xl:py-2 xl:text-sm",
//         variant === "desktop"
//           ? isActive
//             ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white"
//             : inactiveLinkStyles
//           : isActive
//             ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white"
//             : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
//       )}
//       onClick={() => {
//         if (handleLinkClick) {
//           handleLinkClick();
//         }
//       }}
//     >
//       <div
//         className={
//           "absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 transition-opacity duration-300 group-hover:opacity-100 " +
//           (isActive ? " opacity-100" : " opacity-0")
//         }
//       />
//       <span className="relative z-10">{children}</span>
//     </Link>
//   );
// };

// export default function WebHeaderComponent() {
//   //
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const pathname = usePathname();
//   //
//   const handleLinkClick = useCallback(() => {
//     setIsSheetOpen(false);
//   }, []);

//   // Lock body scroll when menu is open
//   useEffect(() => {
//     if (isSheetOpen) {
//       // Store the current scroll position
//       const scrollY = window.scrollY;
//       // Lock body scroll
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = "100%";
//       document.body.style.overflow = "hidden";

//       return () => {
//         // Restore scroll position when menu closes
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.width = "";
//         document.body.style.overflow = "";
//         window.scrollTo(0, scrollY);
//       };
//     }
//   }, [isSheetOpen]);

//   const isActiveLink = useCallback(
//     (path: string) => {
//       return pathname === path;
//     },
//     [pathname],
//   );
//   //

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);


//   const isAuthPage =
//     pathname?.includes("/login") ||
//     pathname?.includes("/signup") ||
//     pathname?.includes("/forgot-password");

//   const isDashboardPage = pathname?.includes("/dashboard");

//   const shouldShowDarkBackground =
//     isScrolled || isAuthPage || pathname?.includes("/signup");

//   const isEventPage = pathname?.startsWith("/events");
//   const isEventPageLightMode = isEventPage && !shouldShowDarkBackground;
//   const isFeaturesPage = pathname === Routes.web.general.eventsDiscover;
//   const isDashboardLightMode = isDashboardPage && !shouldShowDarkBackground;
//   const isLightModeVariant =
//     isDashboardLightMode || isEventPageLightMode || isFeaturesPage;

//   return (
//     <>
//       <div
//         className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between gap-2 px-4 py-6 transition-all duration-300 min-[2560px]:gap-5 min-[2560px]:px-12 min-[2560px]:py-8 md:px-6 lg:gap-2 lg:px-6 lg:py-5 xl:gap-3 xl:px-8 xl:py-7 2xl:gap-4 ${
//           shouldShowDarkBackground
//             ? "bg-black text-white shadow-lg backdrop-blur-lg"
//             : isLightModeVariant
//               ? "bg-white/80 text-gray-900 shadow-lg backdrop-blur-lg dark:bg-transparent dark:text-white"
//               : "bg-transparent text-white"
//         }`}
//       >
//         <Link
//           href={Routes.web.general.home}
//           className="shrink-0 text-lg font-semibold min-[2560px]:text-2xl lg:text-[18px] xl:text-xl"
//         >
//           EventVerse
//         </Link>
//         <nav className="hidden max-w-full min-w-0 flex-1 justify-center lg:flex">
//           <div className="flex items-center gap-1 font-medium tracking-tight min-[2560px]:gap-4 lg:gap-1.5 xl:gap-2 2xl:gap-3">
//             <NavLinkComponent
//               linkUrl={Routes.web.general.home}
//               isActiveLink={isActiveLink}
//               isDashboardLightMode={isLightModeVariant}
//             >
//               Home
//             </NavLinkComponent>
//             <NavLinkComponent
//               linkUrl={Routes.web.general.eventsDiscover}
//               isActiveLink={isActiveLink}
//               isDashboardLightMode={isLightModeVariant}
//             >
//               Explore Events
//             </NavLinkComponent>

//             <NavLinkComponent
//               linkUrl={Routes.web.general.eventsDiscover}
//               isActiveLink={isActiveLink}
//               isDashboardLightMode={isLightModeVariant}
//             >
//               Features
//             </NavLinkComponent>

//             <NavLinkComponent
//               linkUrl={Routes.web.general.eventsDiscover}
//               isActiveLink={isActiveLink}
//               isDashboardLightMode={isLightModeVariant}
//             >
//               For Vendors
//             </NavLinkComponent>

//           </div>
//         </nav>

//         <div className="hidden shrink-0 items-center gap-1 min-[2560px]:gap-4 lg:flex lg:gap-1.5 xl:gap-2 2xl:gap-3">

//           <Link href={Routes.web.general.eventsCreate} passHref>
//             <Button className="group relative overflow-hidden rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:cursor-pointer hover:shadow-xl min-[2560px]:px-6 min-[2560px]:py-3 min-[2560px]:text-lg lg:px-3 lg:py-1.5 lg:text-[11px] xl:px-4 xl:py-2 xl:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base">
//               <span className="relative z-10 flex items-center gap-1 min-[2560px]:gap-2.5 lg:gap-1.5 xl:gap-2">
//                 <Plus className="h-3 w-3 min-[2560px]:h-5 min-[2560px]:w-5 lg:h-3.5 lg:w-3.5 xl:h-4 xl:w-4" />
//                 <span className="whitespace-nowrap">Create Event</span>
//               </span>
//               <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//             </Button>
//           </Link>

//           <div className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
//             <HeaderLocationComponent
//               isDashboardLightMode={isLightModeVariant}
//               shouldShowDarkBackground={shouldShowDarkBackground}
//             />

//             <WebHeaderNotificationBellComponent />
//           </div>

//           {/* <ThemeHandleComponent /> */}

//           <DropdownAccountComponent />
//         </div>

//         <div className="flex items-center gap-2 lg:hidden">
 
//           <div className="hidden items-center gap-2 min-[321px]:flex">
//             <HeaderLocationComponent
//               isDashboardLightMode={isLightModeVariant}
//               shouldShowDarkBackground={shouldShowDarkBackground}
//             />
//             {/* {userStore?.user && <NotificationBell />} */}
//             <WebHeaderNotificationBellComponent />
//           </div>

//           <DropdownAccountComponent />

//           {/* New Animated Hamburger Menu */}
//           <div className="relative lg:hidden">
//             {/* Hamburger Button */}
//             <Button
//               onClick={() => setIsSheetOpen(!isSheetOpen)}
//               className="rounded-full"
//               aria-label="Toggle menu"
//             >
//               <>
//                 {isSheetOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </>
//             </Button>

//             {/* Animated Menu Overlay */}
//             {isSheetOpen && (
//               <>
//                 {/* Backdrop */}
//                 <div
//                   className="animate-in fade-in fixed inset-0 z-60 bg-black/50 backdrop-blur-sm duration-300"
//                   onClick={() => setIsSheetOpen(false)}
//                   onTouchMove={(e) => e.preventDefault()}
//                   style={{ touchAction: "none" }}
//                 />

//                 {/* Menu Panel */}
//                 <div className="bg-background animate-in slide-in-from-right fixed top-0 right-0 z-70 h-screen w-80 text-black shadow-2xl duration-300 dark:text-white">
//                   <div className="flex h-full flex-col overflow-hidden">
//                     {/* Header */}
//                     <div className="flex shrink-0 items-center justify-between border-b p-6">
//                       <h2 className="text-xl font-bold">EventVerse</h2>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => setIsSheetOpen(false)}
//                         className="rounded-full"
//                         aria-label="Close menu"
//                       >
//                         <X className="h-5 w-5" />
//                       </Button>
//                     </div>

//                     {/* Navigation Links with Staggered Animation */}
//                     <nav
//                       className="flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-6"
//                       style={{ WebkitOverflowScrolling: "touch" }}
//                     >
//                       <div className="flex flex-col gap-2">
//                         {[
//                           { label: "Home", url: Routes.web.general.home },
//                           {
//                             label: "Explore Events",
//                             url: Routes.web.general.eventsDiscover,
//                           },
//                           // { label: "Organizers", url: Routes.web.general.organizers.name },
//                           {
//                             label: "Features",
//                             url: Routes.web.general.eventsDiscover,
//                           },
//                           {
//                             label: "For Vendors",
//                             url: Routes.web.vendor.dashboard,
//                           },
//                           {
//                             label: "How It Works",
//                             url: Routes.web.general.eventsDiscover,
//                           },
//                           { label: "Help", url: Routes.web.general.eventsDiscover },
//                         ].map((item, index) => (
//                           <Link
//                             key={item.label}
//                             href={item.url}
//                             onClick={handleLinkClick}
//                             className={cn(
//                               "group relative overflow-hidden rounded-lg px-4 py-3 text-base font-medium transition-all duration-300",
//                               "hover:bg-linear-to-r hover:from-purple-600/10 hover:to-cyan-600/10",
//                               isActiveLink(item.url) &&
//                                 "bg-linear-to-r from-purple-600 to-cyan-600 text-white shadow-lg",
//                             )}
//                             style={{
//                               animation: `slideInFromRight 0.4s ease-out ${index * 0.1}s both`,
//                             }}
//                           >
//                             <span className="relative z-10 flex items-center gap-2">
//                               {item.label}
//                               {/* {isActiveLink(item.url) && (
//                                 <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
//                               )} */}
//                             </span>
//                             {isActiveLink(item.url) && (
//                               <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                             )}
//                           </Link>
//                         ))}
//                       </div>
//                     </nav>

//                     {/* Footer */}
//                     <div className="shrink-0 space-y-3 border-t p-4">
//                       <div className="mb-3 flex items-center justify-between gap-2 border-b pb-3 min-[321px]:hidden">
//                         <HeaderLocationComponent
//                           isDashboardLightMode={isLightModeVariant}
//                           shouldShowDarkBackground={shouldShowDarkBackground}
//                         />
//                         <WebHeaderNotificationBellComponent />
//                       </div>

//                       <ThemeHandleComponent variant="button" />
//                       {/* {userStore?.user ? ( */}
//                       {false ? (
//                         <LogoutComponent />
//                       ) : (
//                         <Button
//                           asChild
//                           className="group relative w-full overflow-hidden rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:cursor-pointer hover:shadow-xl"
//                         >
//                           <Link href={Routes.web.guest.signin}>
//                             <div className="relative z-10 flex items-center justify-center gap-2">
//                               <LogIn className="h-4 w-4" />
//                               <span>Log In</span>
//                             </div>
//                             <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                           </Link>
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//     </>
//   );
// }

// // Header Location Component
// type HeaderLocationComponentProps = {
// 	isDashboardLightMode?: boolean;
// 	shouldShowDarkBackground?: boolean;
// }


// type LocationState = {
//   city: string;
//   region: string;
//   country: string;
//   loading: boolean;
//   error?: string;
// };


// function HeaderLocationComponent({
//   isDashboardLightMode = false,
//   shouldShowDarkBackground = false,
// }: HeaderLocationComponentProps) {
//   const [location, setLocation] = useState<LocationState>({
//     city: "",
//     region: "",
//     country: "",
//     loading: false,
//   });

//   const fetchLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       setLocation((prev) => ({ ...prev, loading: false, error: "Geolocation not supported" }));
//       return;
//     }
//     setLocation((prev) => ({ ...prev, loading: true, error: undefined }));
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const { latitude, longitude } = position.coords;
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           setLocation({
//             city: data.address.city || data.address.town || data.address.village || "",
//             region: data.address.state || "",
//             country: data.address.country_code?.toUpperCase() || "",
//             loading: false,
//           });
//         } catch (e) {
//           setLocation((prev) => ({ ...prev, loading: false, error: "Failed to get location" }));
//         }
//       },
//       () => setLocation((prev) => ({ ...prev, loading: false, error: "Permission denied" }))
//     );
//   }, []);

//   useEffect(() => {
//     queueMicrotask(() => {
//       fetchLocation();
//     });
//   }, [fetchLocation]);

//   const cityName = location.city || "San Francisco";
//   const truncatedCityName = cityName.length >= 14 ? `${cityName.slice(0, 11)}...` : cityName;
//   const region = location.region || "CA";
//   const country = location.country || "US";

//   const textColorClass = shouldShowDarkBackground
//     ? "text-white"
//     : isDashboardLightMode
//       ? "text-gray-900 dark:text-white"
//       : "text-white";

//   return (
//     <div>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             className={`h-8 bg-transparent px-2 ${textColorClass} hover:bg-black/5 min-[2560px]:h-10 min-[2560px]:px-4 lg:h-8 lg:px-2 xl:h-9 xl:px-3 dark:hover:bg-white/10`}
//             disabled={location.loading}
//           >
//             <MapPin className="h-3.5 w-3.5 min-[2560px]:h-5 min-[2560px]:w-5 lg:h-3.5 xl:h-4 xl:w-4" />
//             <span className="hidden items-center gap-1 text-[10px] min-[2560px]:text-base lg:inline-flex lg:text-[11px] xl:text-sm">
//               <span>{truncatedCityName},</span>
//               <span className="uppercase">{region}</span>
//               <span aria-label={country} role="img" className="leading-none">
//                 {country === "US" ? "🇺🇸" : country}
//               </span>
//             </span>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="px-2">
//           <Button
//             variant={"outline"}
//             className="w-full"
//             disabled={location.loading}
//             onClick={fetchLocation}
//           >
//             <MapPin />
//             {location.loading ? "Detecting Location..." : "Use Current Location"}
//           </Button>
//           <Command>
//             <CommandInput placeholder="Search Location" />
//             <CommandList>
//               <CommandEmpty>No framework found.</CommandEmpty>
//               <CommandGroup>
//                 {Array.from({ length: 3 })?.map((_, index) => {
//                   return (
//                     <CommandItem key={index}>
//                       Central Park, New York {index + 1}
//                     </CommandItem>
//                   );
//                 })}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// // Dropdown Theme Handle Component

// interface ThemeHandleComponentProps {
// 	variant?: "dropdown" | "standalone" | "button";
// 	className?: string;
// }

//   function ThemeHandleComponent({
// 	variant = "dropdown",
// 	className,
// }: ThemeHandleComponentProps) {
//   const { setTheme, theme } = useTheme();

//   const mounted = typeof window !== "undefined";
//   const isDarkMode = theme === "dark";

// 	const handleThemeChange = () => {
// 		if (theme === "dark") {
// 			setTheme("light");
// 		} else {
// 			setTheme("dark");
// 		}
// 	};

// 	if (!mounted || !theme) {
// 		return (
// 			<div className={cn("flex items-center gap-2", className)}>
// 				<div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
// 			</div>
// 		);
// 	}

// 	// Standalone variant - for use outside dropdown
// 	if (variant === "standalone") {
// 		return (
// 			<button
// 				onClick={handleThemeChange}
// 				className={cn(
// 					"relative inline-flex h-7 w-14 items-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:border-purple-400 dark:hover:border-purple-500",
// 					className,
// 				)}
// 				aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
// 			>
// 				{/* Toggle thumb */}
// 				<span
// 					className={cn(
// 						"inline-block h-5 w-5 transform rounded-full bg-white dark:bg-slate-700 shadow-lg transition-transform duration-300 flex items-center justify-center",
// 						isDarkMode ? "translate-x-7" : "translate-x-0.5",
// 					)}
// 				>
// 					{isDarkMode ? (
// 						<Moon className="h-3 w-3 text-purple-600 dark:text-purple-400" />
// 					) : (
// 						<Sun className="h-3 w-3 text-amber-500" />
// 					)}
// 				</span>
// 			</button>
// 		);
// 	}

// 	// Button variant - for use in SheetFooter or as a button
// 	if (variant === "button") {
// 		return (
// 			<button
// 				onClick={handleThemeChange}
// 				className={cn(
// 					"flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left",
// 					className,
// 				)}
// 			>
// 				<span className="flex items-center gap-2 font-medium">
// 					{isDarkMode ? (
// 						<>
// 							<Moon className="h-4 w-4" />
// 							<span>Dark Mode</span>
// 						</>
// 					) : (
// 						<>
// 							<Sun className="h-4 w-4" />
// 							<span>Light Mode</span>
// 						</>
// 					)}
// 				</span>
// 				<div className="relative inline-flex h-5 w-9 items-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 transition-colors duration-200">
// 					<span
// 						className={cn(
// 							"inline-block h-3.5 w-3.5 transform rounded-full bg-white dark:bg-slate-600 shadow-sm transition-transform duration-200",
// 							isDarkMode ? "translate-x-[18px]" : "translate-x-0.5",
// 						)}
// 					/>
// 				</div>
// 			</button>
// 		);
// 	}

// 	// Dropdown variant - for use in dropdown menus
// 	return (
// 		<DropdownMenuItem
// 			onSelect={(e) => {
// 				// Prevent dropdown from closing
// 				e.preventDefault();
// 				handleThemeChange();
// 			}}
// 			className="cursor-pointer"
// 			onPointerDown={(e) => {
// 				// Also prevent on pointer down to ensure it doesn't close
// 				e.preventDefault();
// 			}}
// 		>
// 			<div className="flex items-center justify-between w-full">
// 				<span className="flex items-center gap-2">
// 					{isDarkMode ? (
// 						<>
// 							<Moon className="h-4 w-4" />
// 							<span>Dark Mode</span>
// 						</>
// 					) : (
// 						<>
// 							<Sun className="h-4 w-4" />
// 							<span>Light Mode</span>
// 						</>
// 					)}
// 				</span>
// 				<DropdownMenuShortcut>
// 					<div className="relative inline-flex h-5 w-9 items-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 transition-colors duration-200">
// 						<span
// 							className={cn(
// 								"inline-block h-3.5 w-3.5 transform rounded-full bg-white dark:bg-slate-600 shadow-sm transition-transform duration-200",
// 								isDarkMode ? "translate-x-[18px]" : "translate-x-0.5",
// 							)}
// 						/>
// 					</div>
// 				</DropdownMenuShortcut>
// 			</div>
// 		</DropdownMenuItem>
// 	);
// }


// // Logout Component
// function LogoutComponent() {
//   // const router = useRouter();
//   const form = useForm();
//   async function onSubmit() {
   
//   }
//   return (
//     <form
//       className="flex flex-col"
//       onSubmit={form.handleSubmit(onSubmit)}
//     >
//       <Button
//         variant={"destructive"}
//         className="w-full"
//         disabled={form?.formState?.isSubmitting}
//       >
//         {form?.formState?.isSubmitting ? (
//           <Spinner className="" />
//         ) : (
//           <LogOut className="" />
//         )}
//         <span>Logout</span>
//       </Button>
//     </form>
//   );
// }


// // Dropdown Account Component

// function DropdownAccountComponent() {
//   const [user, setUser] = useState<UserModelType>();
//   const fetchUserFN =  {
    
//   }
//   useEffect(() => {
   
//   }, [fetchUserFN]);
//   //
//   return (
//     <DropdownMenu modal={false}>
//       <DropdownMenuTrigger asChild>
//         <Avatar className="h-8 w-8 cursor-pointer min-[2560px]:h-10 min-[2560px]:w-10 lg:h-8 lg:w-8 xl:h-9 xl:w-9">
//           <AvatarImage src="https://github.com/shadcn.png" />
//           <AvatarFallback className="text-xs min-[2560px]:text-base lg:text-xs xl:text-sm">
//             CN
//           </AvatarFallback>
//         </Avatar>
//         {/* <Button variant="outline">Open</Button> */}
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         className="max-w-64 min-w-56"
//         align="start"
//       >
//         {user ? (
//           <>
//             <DropdownMenuLabel className="pb-0">{user?.name}</DropdownMenuLabel>
//             <DropdownMenuLabel className="line-clamp-1 truncate pt-0 font-normal">
//               {user?.email}
//             </DropdownMenuLabel>
//           </>
//         ) : (
//           <>
//             <DropdownMenuLabel className="pb-0">Guest</DropdownMenuLabel>
//             <DropdownMenuLabel className="pt-0 font-normal">
//               Viewing as guest
//             </DropdownMenuLabel>
//           </>
//         )}

//         <DropdownMenuSeparator />

//         <DropdownMenuLabel>Profiles</DropdownMenuLabel>

//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             <span>Switch to Profile 1</span>
//             <DropdownMenuShortcut>
//               <Check />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>

//           <DropdownMenuItem>
//             <span>Switch to Profile 2</span>
//             <DropdownMenuShortcut>
//               <Check />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>

//           <DropdownMenuItem>
//             <span>Switch to Profile 3</span>
//             <DropdownMenuShortcut>
//               <Check />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>

//         <DropdownMenuSeparator />

//         <DropdownMenuLabel>Manage</DropdownMenuLabel>

//         <DropdownMenuGroup>
//           <Link href={Routes.web.auth.dashboard}>
//             <DropdownMenuItem>
//               <span>Dashboard</span>
//               <DropdownMenuShortcut>
//                 <LayoutDashboard />
//               </DropdownMenuShortcut>
//             </DropdownMenuItem>
//           </Link>

//           <Link href={Routes.web.auth.dashboard}>
//             <DropdownMenuItem>
//               <span>Settings</span>
//               <DropdownMenuShortcut>
//                 <Settings />
//               </DropdownMenuShortcut>
//             </DropdownMenuItem>
//           </Link>

//           <ThemeHandleComponent />
//         </DropdownMenuGroup>

//         <DropdownMenuSeparator />

//         <DropdownMenuLabel>Account</DropdownMenuLabel>

//         {user ? (
//           <>
//             <LogoutComponent />
//           </>
//         ) : (
//           <>
//             <DropdownMenuItem asChild>
//               <Link href={Routes.web.guest.signin}>
//                 <span>Log In</span>
//                 <DropdownMenuShortcut>
//                   <LogIn />
//                 </DropdownMenuShortcut>
//               </Link>
//             </DropdownMenuItem>

//             <DropdownMenuItem asChild>
//               <Link href={Routes.web.guest.signup}>
//                 <span>Sign Up</span>
//                 <DropdownMenuShortcut>
//                   <UserPlus />
//                 </DropdownMenuShortcut>
//               </Link>
//             </DropdownMenuItem>
//           </>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
