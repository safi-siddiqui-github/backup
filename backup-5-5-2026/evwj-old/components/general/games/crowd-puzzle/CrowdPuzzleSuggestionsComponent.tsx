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

export default function CrowdPuzzleSuggestionsComponent({
  slug,
  gameSlug,
}: Props) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesCrowdPuzzle}${Routes.web.auth.dashboardEventGamesCrowdPuzzleCustom}`;

  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const buildTemplateHref = (templateId: string) => {
    return `${customHref}?template=${templateId}`;
  };

  const handleImport = (template: any) => {
    window.location.href = buildTemplateHref(template.id);
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <section className="px-4 pt-4 md:px-8">
        <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
          Crowd Puzzle Setup
        </h1>
        <p className="mt-2 max-w-3xl text-base text-gray-600 md:text-lg dark:text-slate-300">
          Create a collaborative jigsaw puzzle experience! Choose a ready-to-use
          image or upload your own. Guests will work together to solve the
          puzzle piece by piece.
        </p>
      </section>

      {/* Ready-to-use Templates */}
      <section className="px-4 md:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Ready-to-Use Puzzle Images
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-slate-300">
          Select from our curated collection of beautiful puzzle images, or
          upload your own custom image.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PUZZLE_TEMPLATES.map((template) => (
            <Link
              key={template.id}
              href={buildTemplateHref(template.id)}
            >
              <Card className="group cursor-pointer overflow-hidden border-2 bg-white! backdrop-blur-sm transition-shadow hover:border-green-300 hover:shadow-lg dark:bg-slate-800/95!">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-slate-700">
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
                  <h3 className="mb-1 font-bold text-gray-900 dark:text-white">
                    {template.title}
                  </h3>
                  <p className="mb-2 line-clamp-2 text-xs text-gray-600 dark:text-slate-300">
                    {template.description}
                  </p>
                  <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                    <span>{template.pieces} pieces</span>
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
                    Import Puzzle to My Game
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
        gameType="crowd-puzzle"
      />

      {/* Custom Upload Option */}
      <section className="px-4 md:px-8">
        <Card className="border-2 bg-white! bg-linear-to-br from-green-50 to-emerald-50 p-6 backdrop-blur-sm dark:bg-slate-800/95! dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <Upload className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Upload Your Own Image
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Use your own photo or image to create a personalized puzzle
                experience for your guests.
              </p>
            </div>
            <div className="shrink-0">
              <Link href={customHref}>
                <Button className="gap-2 bg-green-600 whitespace-nowrap text-white hover:bg-green-700">
                  <Upload className="h-4 w-4" />
                  Upload Custom Image
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Bottom sticky CTA section */}
      <section className="sticky bottom-2 z-10">
        <div className="mx-2 flex items-center justify-between rounded-2xl bg-linear-to-r from-green-700 via-emerald-600 to-teal-400 p-3 shadow-lg md:mx-4 md:p-4">
          <div className="text-sm font-semibold text-white md:text-base">
            🧩 Create a collaborative puzzle experience
          </div>
          <div className="shrink-0">
            <Link href={customHref}>
              <Button className="gap-2 bg-green-600 whitespace-nowrap text-white hover:bg-green-700">
                <Upload className="h-4 w-4" />
                Upload Custom Image
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
