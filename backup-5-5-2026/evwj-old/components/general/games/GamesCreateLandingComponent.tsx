"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Routes } from "@/lib/lib-routes";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { GAME_TYPES } from "./game-data";

function difficultyColor(level: "Easy" | "Medium" | "Hard") {
  switch (level) {
    case "Easy":
      return "bg-green-200 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-900";
    case "Hard":
      return "bg-red-100 text-red-800";
  }
}

interface Props {
  slug?: string;
  gameSlug?: string;
}

export default function GamesCreateLandingComponent({ slug, gameSlug }: Props) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const visibleGames = useMemo(() => {
    let filtered = GAME_TYPES;

    // Filter by category if provided
    if (categoryParam) {
      filtered = filtered.filter((g) => g.category === categoryParam);
    }

    // Filter by search query
    if (search.trim()) {
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(search.trim().toLowerCase()) ||
          g.tags.some((t) =>
            t.toLowerCase().includes(search.trim().toLowerCase()),
          ),
      );
    }

    return filtered;
  }, [search, categoryParam]);

  const buildTriviaHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesTrivia}`;
  };

  const buildTapRaceHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesTapRace}`;
  };

  const buildScavengerHuntHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesScavengerHunt}`;
  };

  const buildCrowdPuzzleHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesCrowdPuzzle}`;
  };

  const buildDigitalBingoHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesDigitalBingo}`;
  };

  const buildPredictionMasterHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesPredictionMaster}`;
  };

  const buildBattleOfOpinionsHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesBattleOfOpinions}`;
  };

  const buildPuzzleRushHref = () => {
    if (!slug || !gameSlug) return "#";
    return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${Routes.web.auth.dashboardEventGamesPuzzleRush}`;
  };

  return (
    <main className="flex min-h-screen flex-col bg-linear-to-tr from-gray-50 to-white pb-12 dark:from-slate-900 dark:to-slate-800">
      {/* Banner/Header */}
      <section className="mb-12 rounded-b-3xl bg-linear-to-br from-indigo-500 via-fuchsia-400 to-yellow-200 px-4 py-12 shadow-lg md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-white drop-shadow sm:text-4xl md:text-5xl">
            Choose a Game Template
          </h1>
          <p className="mb-8 text-base font-medium text-white sm:text-lg md:text-2xl">
            Pick a template to get started, or craft your own custom game.
          </p>
        </div>
      </section>
      {/* Search/Filter bar */}
      <section className="mx-auto mb-8 flex max-w-4xl flex-col gap-3 px-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search games..."
            className="w-full border border-gray-200 py-2 pl-10 text-base shadow focus:ring-2 focus:ring-indigo-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {categoryParam && (
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-100 px-3 py-1.5 text-sm text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
              Showing games in: {categoryParam}
            </Badge>
            <Link
              href={
                slug && gameSlug
                  ? `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}`
                  : "#"
              }
              className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
      {/* Games Grid */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGames.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400 dark:text-slate-400">
            <span>No games found.</span>
          </div>
        )}
        {useMemo(
          () =>
            visibleGames.map((game) => {
              const isTrivia = game.id === "trivia";
              const isTapRace = game.id === "tap-race";
              const isScavengerHunt = game.id === "Scavenger hunt";
              const isCrowdPuzzle = game.id === "crowd-puzzle";
              const isDigitalBingo = game.id === "digital-bingo";
              const isPredictionMaster = game.id === "prediction-master";
              const isBattleOfOpinions = game.id === "battle-of-opinions";
              const isPuzzleRush = game.id === "puzzle-rush";
              const CardInner = (
                <Card className="group flex h-full cursor-pointer flex-col border-2 border-transparent bg-white! p-5 pb-6 shadow backdrop-blur-sm transition group-hover:border-indigo-200 hover:shadow-2xl dark:bg-slate-800/95!">
                  <div className="mb-3 flex items-center gap-3">
                    {game.icon}
                    <span
                      className={`ml-auto rounded px-2 py-1 text-xs font-bold ${difficultyColor(game.difficulty)}`}
                    >
                      {game.difficulty}
                    </span>
                  </div>
                  <div className="mb-2">
                    <h2 className="mb-1 text-base font-bold text-gray-900 transition group-hover:text-indigo-700 sm:text-lg dark:text-white dark:group-hover:text-indigo-400">
                      {game.title}
                    </h2>
                    <p className="mb-2 text-sm text-gray-600 sm:text-base dark:text-slate-300">
                      {game.description}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              );
              return (isTrivia ||
                isTapRace ||
                isScavengerHunt ||
                isCrowdPuzzle ||
                isDigitalBingo ||
                isPredictionMaster ||
                isBattleOfOpinions ||
                isPuzzleRush) &&
                slug &&
                gameSlug ? (
                <Link
                  key={game.id}
                  href={
                    isTapRace
                      ? buildTapRaceHref()
                      : isScavengerHunt
                        ? buildScavengerHuntHref()
                        : isCrowdPuzzle
                          ? buildCrowdPuzzleHref()
                          : isDigitalBingo
                            ? buildDigitalBingoHref()
                            : isPredictionMaster
                              ? buildPredictionMasterHref()
                              : isBattleOfOpinions
                                ? buildBattleOfOpinionsHref()
                                : isPuzzleRush
                                  ? buildPuzzleRushHref()
                                  : buildTriviaHref()
                  }
                >
                  {CardInner}
                </Link>
              ) : (
                <div key={game.id}>{CardInner}</div>
              );
            }),
          [visibleGames],
        )}
      </section>
    </main>
  );
}
