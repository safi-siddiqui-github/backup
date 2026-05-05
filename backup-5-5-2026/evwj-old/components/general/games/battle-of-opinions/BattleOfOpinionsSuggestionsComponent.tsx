"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { BATTLE_OF_OPINIONS_PACKS } from "../game-data";
import ImportTemplateDialog from "../ImportTemplateDialog";

export default function BattleOfOpinionsSuggestionsComponent({
  slug,
  gameSlug,
}: {
  slug: string;
  gameSlug: string;
}) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesBattleOfOpinions}${Routes.web.auth.dashboardEventGamesBattleOfOpinionsCustom}`;
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleImport = (template: any) => {
    window.location.href = `${customHref}?template=${template.id}`;
  };

  const gradients = [
    "from-orange-500 via-pink-500 to-rose-500",
    "from-amber-500 via-orange-500 to-pink-500",
    "from-rose-500 via-pink-500 to-purple-500",
    "from-fuchsia-500 via-rose-500 to-orange-500",
    "from-pink-500 via-fuchsia-500 to-amber-500",
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Featured Would You Rather Games
          </h1>
          <p className="mt-1 text-sm text-gray-500 md:text-base">
            Pick a pack to get started, or build your own custom set.
          </p>
        </div>
        <Link href={customHref}>
          <Button className="bg-orange-500 text-white hover:bg-orange-600">
            Create Custom Game
          </Button>
        </Link>
      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
      >
        {BATTLE_OF_OPINIONS_PACKS.map((pack, idx) => (
          <SwiperSlide
            key={pack.id}
            style={{ width: "auto" }}
          >
            <Card className="relative h-[360px] w-full max-w-[320px] overflow-hidden rounded-xl border shadow sm:h-[400px] md:h-[420px]">
              <div
                className={`absolute inset-0 bg-linear-to-br ${gradients[idx % gradients.length]} opacity-90`}
              />
              <div className="relative flex h-full flex-col p-5 text-white">
                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-orange-600 shadow sm:text-sm">
                  New
                </div>
                <div className="mt-2">
                  <h3 className="text-xl leading-tight font-extrabold">
                    {pack.title}
                  </h3>
                  <p className="mt-2 line-clamp-4 text-sm text-white/90">
                    {pack.description}
                  </p>
                </div>
                <div className="mt-auto space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wide text-orange-600 uppercase shadow">
                      2-200 Players
                    </span>
                    <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wide text-pink-600 uppercase shadow">
                      {pack.numQuestions} Rounds
                    </span>
                  </div>
                  <Button
                    onClick={() => setImportDialogOpen(true)}
                    className="w-full rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-white"
                  >
                    Import Questions to My Game
                  </Button>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <ImportTemplateDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
        templates={BATTLE_OF_OPINIONS_PACKS}
        gameType="battle-of-opinions"
      />

      <div className="sticky bottom-2 mt-6 flex w-full items-center justify-center">
        <Link href={customHref}>
          <Button className="bg-linear-to-r from-orange-500 via-pink-500 to-rose-500 text-white shadow hover:brightness-110">
            Create Custom Game
          </Button>
        </Link>
      </div>
    </div>
  );
}
