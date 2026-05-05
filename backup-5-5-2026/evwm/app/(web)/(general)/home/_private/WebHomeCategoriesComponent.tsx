"use client";
import { useMemo } from "react";
import {
  Music,
  Code,
  UtensilsCrossed,
  Palette,
  Briefcase,
  Dumbbell,
  Film,
  GraduationCap,
  Users,
  Ghost,
  Home,
  Sun,
  Mic,
  Martini,
  UserPlus,
  Wrench,
  Radio,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { getEventsByCategory } from "../../_private/web-home-healper";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Music: Music,
  Technology: Code,
  "Food & Drink": UtensilsCrossed,
  "Art & Culture": Palette,
  Business: Briefcase,
  Sports: Dumbbell,
  Entertainment: Film,
  Education: GraduationCap,
  Social: Users,
  Halloween: Ghost,
  "Themed & House Parties": Home,
  "Outdoor Parties and Festivals": Sun,
  "Concerts and Live Performances": Mic,
  "Nightlife & Clubbing": Martini,
  "Meetups & Socials": UserPlus,
  "Workshops & Conventions": Wrench,
  "Raves & EDM": Radio,
  "Fashion & Lifestyle": Shirt,
};

// Curated list of categories to display
const DISPLAY_CATEGORIES = [
  "Music",
  "Technology",
  "Food & Drink",
  "Art & Culture",
  "Business",
  "Sports",
  "Entertainment",
  "Education",
  "Social",
  "Halloween",
  "Themed & House Parties",
  "Outdoor Parties and Festivals",
  "Concerts and Live Performances",
  "Nightlife & Clubbing",
  "Meetups & Socials",
  "Workshops & Conventions",
  "Raves & EDM",
  "Fashion & Lifestyle",
];

export const CATEGORY_IMAGES: Record<string, string> = {
  Music:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",
  Technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop",
  "Food & Drink":
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=800&fit=crop",
  "Art & Culture":
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
  Business:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop",
  Sports:
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=800&fit=crop",
  Entertainment:
    "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=800&fit=crop",
  Education:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=800&fit=crop",
  Social:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=800&fit=crop",
  Halloween:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
  "Themed & House Parties":
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=800&fit=crop",
  "Outdoor Parties and Festivals":
    "https://images.unsplash.com/photo-1478146896981-9c8611b3a05b?w=800&h=800&fit=crop",
  "Concerts and Live Performances":
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",
  "Nightlife & Clubbing":
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop",
  "Meetups & Socials":
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop",
  "Workshops & Conventions":
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop",
  "Raves & EDM":
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=800&fit=crop",
  "Fashion & Lifestyle":
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop",
};

export default function WebHomeCategoriesComponent() {
  const categoriesWithCounts = useMemo(() => {
    return DISPLAY_CATEGORIES.map((category) => {
      const events = getEventsByCategory(category);
      const Icon = CATEGORY_ICONS[category] || Users;
      const imageUrl = CATEGORY_IMAGES[category] || "";
      return {
        name: category,
        icon: Icon,
        count: events.length,
        imageUrl,
      };
    });
  }, []);

  // Set background images using data-bg attribute and CSS
  useEffect(() => {
    const buttons =
      document.querySelectorAll<HTMLButtonElement>("button[data-bg]");
    buttons.forEach((btn) => {
      const bg = btn.getAttribute("data-bg");
      if (bg) {
        btn.style.backgroundImage = `url(${bg})`;
      } else {
        btn.style.backgroundImage = "";
      }
    });
  }, [categoriesWithCounts]);

  return (
    <div className="flex flex-col gap-5 md:*:nth-1:text-center md:*:nth-2:text-center container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-bold">
        Explore Event Categories
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 md:text-lg lg:text-xl">
        Whatever your vibe, we&apos;ve got you covered
      </p>

      {/* Category Squares Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {categoriesWithCounts.map((category) => {
          return (
            <button
              key={category.name}
              type="button"
              className={`group curp relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-gray-200/50 p-4 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800/50 dark:hover:border-gray-700 ${category.imageUrl ? "category-bg" : ""}`}
              data-bg={category.imageUrl || undefined}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50 dark:bg-black/60 dark:group-hover:bg-black/70" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="text-center text-sm font-semibold text-white drop-shadow-md">
                  {category.name}
                </span>
                <span className="text-xs text-white/90 drop-shadow-sm">
                  {category.count} {category.count === 1 ? "event" : "events"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
