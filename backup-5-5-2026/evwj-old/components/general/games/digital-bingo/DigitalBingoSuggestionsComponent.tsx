"use client";
import { BINGO_TEMPLATES } from "@/components/general/games/game-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import { Brain, Grid2x2, Grid3x3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ImportTemplateDialog from "../ImportTemplateDialog";

interface Props {
  slug: string;
  gameSlug: string;
}

export default function DigitalBingoSuggestionsComponent({
  slug,
  gameSlug,
}: Props) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesDigitalBingo}${Routes.web.auth.dashboardEventGamesDigitalBingoCustom}`;

  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const buildTemplateHref = (templateId: string) => {
    return `${customHref}?template=${templateId}`;
  };

  const handleImport = (template: any) => {
    window.location.href = buildTemplateHref(template.id);
  };

  const getSizeIcon = (size: string) => {
    if (size === "3x3") return <Grid2x2 className="h-5 w-5 text-red-500" />;
    if (size === "4x4") return <Grid3x3 className="h-5 w-5 text-red-500" />;
    return <Grid3x3 className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <section className="px-4 pt-4 md:px-8">
        <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
          Digital Bingo Setup
        </h1>
        <p className="mt-2 max-w-3xl text-base text-gray-600 md:text-lg dark:text-slate-300">
          Create exciting bingo games for your guests! Choose from classic
          templates or customize your own cards with numbers, words, or phrases.
          Perfect for group competitions and engagement.
        </p>
      </section>

      {/* Bingo Templates */}
      <section className="px-4 md:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Ready-to-Use Bingo Templates
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-slate-300">
          Select a template to get started quickly, or create your own custom
          bingo game.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BINGO_TEMPLATES.map((template) => (
            <Link
              key={template.id}
              href={buildTemplateHref(template.id)}
            >
              <Card className="group cursor-pointer border-2 bg-white! p-5 backdrop-blur-sm transition-shadow hover:border-red-300 hover:shadow-lg dark:bg-slate-800/95!">
                <div className="mb-3 flex items-center gap-3">
                  {getSizeIcon(template.cardSize)}
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
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                  {template.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-slate-300">
                  {template.description}
                </p>
                <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
                  <span>{template.cardSize}</span>
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
                  Import Configuration to My Game
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <ImportTemplateDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
        templates={BINGO_TEMPLATES}
        gameType="digital-bingo"
      />

      {/* Custom Create Option */}
      <section className="px-4 md:px-8">
        <Card className="border-2 bg-white! bg-linear-to-br from-red-50 to-pink-50 p-6 backdrop-blur-sm dark:bg-slate-800/95! dark:from-red-900/20 dark:to-pink-900/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <Brain className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Create Custom Bingo
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Design your own bingo cards with custom numbers, words, or
                phrases. Perfect for themed events!
              </p>
            </div>
            <div className="shrink-0">
              <Link href={customHref}>
                <Button className="gap-2 bg-red-600 whitespace-nowrap text-white hover:bg-red-700">
                  <Brain className="h-4 w-4" />
                  Create Custom Bingo
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Bottom sticky CTA section */}
      <section className="sticky bottom-2 z-10">
        <div className="mx-2 flex items-center justify-between rounded-2xl bg-linear-to-r from-red-700 via-pink-600 to-orange-400 p-3 shadow-lg md:mx-4 md:p-4">
          <div className="text-sm font-semibold text-white md:text-base">
            🎲 Create an engaging bingo experience for your guests
          </div>
        </div>
      </section>
    </div>
  );
}
