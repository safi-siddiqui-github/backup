"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import { ArrowLeft, Calendar, Edit, Play, Trash2 } from "lucide-react";
import Link from "next/link";
import { mockMyGames, MyGame } from "./mock-games-data";

interface Props {
  slug?: string;
  gameSlug?: string;
}

function getGameTypeLabel(gameType: string): string {
  const labels: Record<string, string> = {
    trivia: "Trivia",
    "crowd-puzzle": "Crowd Puzzle",
    "prediction-master": "Prediction Master",
    "digital-bingo": "Digital Bingo",
    "tap-race": "Tap Race",
    "battle-of-opinions": "Battle of Opinions",
    "puzzle-rush": "Puzzle Rush",
    "scavenger-hunt": "Scavenger Hunt",
  };
  return labels[gameType] || gameType;
}

function getGameCustomRoute(gameType: string): string {
  const routeMap: Record<string, string> = {
    trivia: Routes.web.auth.dashboardEventGamesTriviaCustom,
    "tap-race": Routes.web.auth.dashboardEventGamesTapRaceCustom,
    "Scavenger hunt": Routes.web.auth.dashboardEventGamesScavengerHuntCustom,
    "crowd-puzzle": Routes.web.auth.dashboardEventGamesCrowdPuzzleCustom,
    "digital-bingo": Routes.web.auth.dashboardEventGamesDigitalBingoCustom,
    "prediction-master":
      Routes.web.auth.dashboardEventGamesPredictionMasterCustom,
    "battle-of-opinions":
      Routes.web.auth.dashboardEventGamesBattleOfOpinionsCustom,
    "puzzle-rush": Routes.web.auth.dashboardEventGamesPuzzleRushCustom,
  };
  return routeMap[gameType] || Routes.web.auth.dashboardEventGamesTriviaCustom;
}

function buildStartGameHref(
  game: MyGame,
  slug?: string,
  gameSlug?: string,
): string {
  if (!slug || !gameSlug) return "#";
  const gameCustomRoute = getGameCustomRoute(game.gameType);
  return `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}/${gameCustomRoute}?gameId=${game.id}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function MyGamesComponent({ slug, gameSlug }: Props) {
  const games = mockMyGames;

  const backHref =
    slug && gameSlug
      ? `${Routes.web.auth.dashboardEventDetail}/${slug}/games/${gameSlug}`
      : "#";

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Games
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
          My Games
        </h1>
        <p className="mt-2 text-base text-gray-600 sm:text-lg dark:text-slate-400">
          Manage your created games. Edit, publish, or delete them here.
        </p>
      </div>

      {/* Games Grid */}
      {games.length === 0 ? (
        <Card className="p-12 text-center">
          <CardContent>
            <p className="text-lg text-gray-500 dark:text-slate-400">
              You haven't created any games yet.
            </p>
            <Link href={backHref}>
              <Button
                className="mt-4"
                variant="outline"
              >
                Create Your First Game
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Card
              key={game.id}
              className="flex flex-col border-2 border-transparent transition hover:border-indigo-200 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-bold sm:text-lg">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm sm:text-base">
                      {game.description || "No description"}
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    {getGameTypeLabel(game.gameType)}
                  </Badge>
                  <Badge
                    className={
                      game.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }
                  >
                    {game.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm sm:text-base">
                      Created: {formatDate(game.createdAt)}
                    </span>
                  </div>
                  {game.updatedAt.getTime() !== game.createdAt.getTime() && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm sm:text-base">
                        Updated: {formatDate(game.updatedAt)}
                      </span>
                    </div>
                  )}
                  {game.rounds && (
                    <div className="text-xs sm:text-sm">
                      {game.rounds.count} round
                      {game.rounds.count !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 border-t pt-4">
                <Link
                  href={buildStartGameHref(game, slug, gameSlug)}
                  className="w-full"
                >
                  <Button
                    size="sm"
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Game
                  </Button>
                </Link>
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      // TODO: Navigate to edit page
                      console.log("Edit game", game.id);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                    onClick={() => {
                      // TODO: Delete game
                      console.log("Delete game", game.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
