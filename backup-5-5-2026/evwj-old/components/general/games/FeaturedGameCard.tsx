"use client";

import { Routes } from "@/lib/lib-routes";
import Image from "next/image";
import Link from "next/link";

type FeaturedGame = {
  id: string;
  title: string;
  image?: string;
  difficulty: string;
  description: string;
};

type Props = {
  game: FeaturedGame;
  slug?: string;
  gameSlug?: string;
};

export default function FeaturedGameCard({ game, slug, gameSlug }: Props) {
  const imageUrl =
    game.image ||
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80";

  // Map game IDs to their route paths
  const getGameRoute = (gameId: string): string => {
    const routeMap: Record<string, string> = {
      trivia: Routes.web.auth.dashboardEventGamesTrivia,
      "tap-race": Routes.web.auth.dashboardEventGamesTapRace,
      "Scavenger hunt": Routes.web.auth.dashboardEventGamesScavengerHunt,
      "crowd-puzzle": Routes.web.auth.dashboardEventGamesCrowdPuzzle,
      "digital-bingo": Routes.web.auth.dashboardEventGamesDigitalBingo,
      "prediction-master": Routes.web.auth.dashboardEventGamesPredictionMaster,
      "battle-of-opinions": Routes.web.auth.dashboardEventGamesBattleOfOpinions,
      "puzzle-rush": Routes.web.auth.dashboardEventGamesPuzzleRush,
    };
    return routeMap[gameId] || Routes.web.auth.dashboardEventGamesTrivia;
  };

  const buildHref = () => {
    if (!slug || !gameSlug) return "#";
    const gameRoute = getGameRoute(game.id);
    // return `${Routes.web.auth.dashboardEventDetail}/${slug}/${Routes.web.auth.dashboard.events.gamesActivities.name}/${gameSlug}/${Routes.web.auth.dashboard.events.gamesActivities.create}/${gameRoute}`;
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}${gameRoute}`;
  };

  const href = buildHref();

  return (
    <div className="group relative flex h-[280px] flex-col overflow-hidden rounded-3xl border bg-black/5 shadow-lg transition-transform duration-300 hover:scale-105 sm:h-80 md:h-[360px]">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={false}
          quality={80}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10 transition-all duration-300 group-hover:bg-purple-600/40" />
      </div>
      <div className="relative z-10 flex h-full flex-col p-5">
        <div>
          <h3 className="text-lg font-extrabold text-white drop-shadow md:text-xl">
            {game.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/90">
            {game.description}
          </p>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-white/90">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 backdrop-blur">
            😎 2-500
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 backdrop-blur">
            ⏱ 3-10min
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 backdrop-blur">
            ⭐ {game.difficulty}
          </span>
        </div>
        <div className="mt-auto pt-4">
          <div className="w-full">
            <Link
              href={href}
              className="cursor-pointer"
            >
              <button className="mx-auto block w-full max-w-xs cursor-pointer rounded-xl bg-white py-2 font-semibold text-gray-900 shadow transition-shadow hover:bg-gray-100">
                Try This
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
