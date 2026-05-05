"use client";

import { Routes } from "@/lib/lib-routes";
import Image from "next/image";
import Link from "next/link";

type Category = {
  id: string;
  label: string;
  games: number;
  image?: string;
};

export default function CategoryCard({
  category,
  slug,
  gameSlug,
}: {
  category: Category;
  slug?: string;
  gameSlug?: string;
}) {
  const { label, games, image } = category;

  const CardContent = (
    <div className="group relative h-40 cursor-pointer overflow-hidden rounded-2xl border bg-gray-100 shadow transition-transform hover:scale-105 sm:h-[180px] md:h-[200px]">
      {/* Background */}
      {image && (
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
          quality={75}
        />
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/70" />
      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-3 text-center">
        <h3 className="text-lg font-bold text-white drop-shadow-sm md:text-xl">
          {label}
        </h3>
        <span className="mt-2 text-sm text-white/90 sm:text-base">
          {games} game{games > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );

  if (slug && gameSlug) {
    return (
      <Link
        href={`${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}?category=${category.id}`}
        className="block"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
