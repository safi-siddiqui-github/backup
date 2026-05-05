"use client";
import { PUZZLE_TEMPLATES } from "@/components/general/games/game-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import { Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ImportTemplateDialog from "../ImportTemplateDialog";

interface Props {
  slug: string;
  gameSlug: string;
}

export default function PuzzleRushSuggestionsComponent({
  slug,
  gameSlug,
}: Props) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesPuzzleRush}${Routes.web.auth.dashboardEventGamesPuzzleRushCustom}`;

  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const buildTemplateHref = (templateId: string) =>
    `${customHref}?template=${templateId}`;

  const handleImport = (template: any) => {
    window.location.href = buildTemplateHref(template.id);
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <section className="px-4 pt-4 md:px-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">Puzzle Rush</h1>
        <p className="mt-2 max-w-3xl text-base text-gray-600 md:text-lg">
          Chain-solve a sequence of mini 2×2 puzzles under time pressure. Pick a
          template to start or create your own custom rush.
        </p>
      </section>

      {/* Ready-to-use Templates */}
      <section className="px-4 md:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Ready-to-Use Templates
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Select from curated images for fast 2×2 rounds. Each round is fixed at
          2×2 pieces with a timer.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PUZZLE_TEMPLATES.map((template) => (
            <Link
              key={template.id}
              href={buildTemplateHref(template.id)}
            >
              <Card className="group cursor-pointer overflow-hidden border-2 transition-shadow hover:border-indigo-300 hover:shadow-lg">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={template.imageUrl}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={false}
                    quality={75}
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`rounded px-2 py-1 text-xs font-bold ${
                        template.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : template.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {template.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-bold text-gray-900">
                    {template.title}
                  </h3>
                  <p className="mb-2 line-clamp-2 text-xs text-gray-600">
                    {template.description}
                  </p>
                  <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                    <span>2×2 rounds</span>
                    <span>{template.category}</span>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setImportDialogOpen(true);
                    }}
                    className="w-full text-xs"
                    size="sm"
                    variant="outline"
                  >
                    Import Puzzles to My Game
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <ImportTemplateDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
        templates={PUZZLE_TEMPLATES}
        gameType="puzzle-rush"
      />

      {/* Custom Create Option */}
      <section className="px-4 md:px-8">
        <Card className="border-2 bg-linear-to-br from-indigo-50 to-fuchsia-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <Upload className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  Create Custom Game
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Start from scratch and design your own sequence of 2×2 timed
                rounds.
              </p>
            </div>
            <div className="shrink-0">
              <Link href={customHref}>
                <Button className="bg-indigo-600 whitespace-nowrap text-white hover:bg-indigo-700">
                  Create Custom Game
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Bottom sticky CTA */}
      <section className="sticky bottom-2 z-10">
        <div className="mx-2 rounded-2xl bg-linear-to-r from-indigo-700 via-purple-600 to-fuchsia-500 p-3 shadow-lg md:mx-4 md:p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white md:text-base">
              ⏱️ Race through 2×2 puzzles in timed rounds
            </div>
            <div className="shrink-0">
              <Link href={customHref}>
                <Button className="bg-white/10 whitespace-nowrap text-white hover:bg-white/20">
                  Create Custom Game
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
