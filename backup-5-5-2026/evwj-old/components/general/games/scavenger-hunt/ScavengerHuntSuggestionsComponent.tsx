"use client";
import { SCAVENGER_HUNT_TEMPLATES } from "@/components/general/games/game-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Routes } from "@/lib/lib-routes";
import { Camera, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ImportTemplateDialog from "../ImportTemplateDialog";

interface Props {
  slug: string;
  gameSlug: string;
}

export default function ScavengerHuntSuggestionsComponent({
  slug,
  gameSlug,
}: Props) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesScavengerHunt}${Routes.web.auth.dashboardEventGamesScavengerHuntCustom}`;

  const [judgeType, setJudgeType] = useState<"ai" | "host">("ai");
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const buildCustomHref = () => {
    return `${customHref}?judgeType=${judgeType}`;
  };

  const handleImport = (template: any) => {
    window.location.href = `${buildCustomHref()}&template=${template.id}`;
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <section className="px-4 pt-4 md:px-8">
        <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
          Scavenger Hunt Setup
        </h1>
        <p className="mt-2 max-w-3xl text-base text-gray-600 md:text-lg dark:text-slate-300">
          Create exciting photo challenges for your guests! They`&apos;`ll race
          to capture specific items or moments, and you can choose whether AI or
          you (the host) will judge the submissions.
        </p>
      </section>

      {/* Judge Selection */}
      <section className="px-4 md:px-8">
        <Card className="bg-Linear-to-br border-2 bg-white from-purple-50 to-pink-50 p-6 backdrop-blur-sm dark:bg-slate-800/95! dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Choose Your Judge
              </h2>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Select who will evaluate the photo submissions from your guests.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select
                value={judgeType}
                onValueChange={(value: "ai" | "host") => setJudgeType(value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      <span>AI Judge</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="host">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span>Host Judge</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-white p-4 backdrop-blur-sm dark:bg-slate-800/95!">
            <div className="flex items-start gap-3">
              {judgeType === "ai" ? (
                <>
                  <Sparkles className="mt-0.5 h-5 w-5 text-purple-500 dark:text-purple-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      AI Judge
                    </p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
                      AI automatically evaluates photos based on the challenge
                      criteria. Fast, fair, and consistent scoring.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <User className="mt-0.5 h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Host Judge
                    </p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
                      You manually review and score each submission. Perfect for
                      creative challenges where personal judgment matters.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* Template Suggestions */}
      <section className="px-4 md:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Quick Start Templates
        </h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-slate-300">
          Choose a template to get started, or create your own custom hunt.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCAVENGER_HUNT_TEMPLATES.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer border-2 bg-white p-5 backdrop-blur-sm transition-shadow hover:border-purple-300 hover:shadow-lg dark:bg-slate-800/95!"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2">
                  <Camera className="h-5 w-5 text-purple-600" />
                </div>
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
              <p className="mb-3 text-sm text-gray-600 dark:text-slate-300">
                {template.description}
              </p>
              <div className="mb-3 text-xs text-gray-500 dark:text-slate-400">
                ~{Math.floor(template.estimatedTime / 60)} min
              </div>
              <Button
                onClick={() => setImportDialogOpen(true)}
                className="w-full text-xs"
                size="sm"
                variant="outline"
              >
                Import Items to My Game
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <ImportTemplateDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
        templates={SCAVENGER_HUNT_TEMPLATES}
        gameType="scavenger-hunt"
      />

      {/* Bottom sticky CTA section */}
      <section className="sticky bottom-2 z-10">
        <div className="mx-2 flex items-center justify-between rounded-2xl bg-linear-to-r from-purple-700 via-pink-600 to-orange-400 p-3 shadow-lg md:mx-4 md:p-4">
          <div className="text-sm font-semibold text-white md:text-base">
            ✨ Create your custom scavenger hunt challenge
          </div>
          <div className="flex gap-2">
            <Link href={buildCustomHref()}>
              <Button className="rounded-full bg-orange-500 px-4 text-white hover:bg-orange-600 md:px-6">
                Create Custom Game
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
