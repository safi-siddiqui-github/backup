"use client";
import { TRIVIA_PACKS } from "@/components/general/games/game-data";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/lib-routes";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ImportTemplateDialog from "../ImportTemplateDialog";

interface Props {
  slug: string;
  gameSlug: string;
}

export default function TriviaSuggestionsComponent({ slug, gameSlug }: Props) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesTrivia}${Routes.web.auth.dashboardEventGamesTriviaCustom}`;

  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleImportClick = (template: any) => {
    setSelectedTemplate(template);
    setImportDialogOpen(true);
  };

  const handleImport = (template: any) => {
    // Navigate to custom page with template data
    // This would typically pass template data via state or query params
    window.location.href = `${customHref}?template=${template.id}`;
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <section className="px-4 pt-4 md:px-8">
        <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
          Featured trivia games
        </h1>
        <p className="text-gray-500 dark:text-slate-300">
          Pick a suggested pack to start fast, or create your own custom trivia.
        </p>
      </section>

      {/* Carousel of suggested packs */}
      <section className="w-full px-2 md:px-4">
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
        >
          {TRIVIA_PACKS.map((pack, idx) => (
            <SwiperSlide
              key={pack.id}
              style={{ width: "auto" }}
            >
              <div
                className="relative h-[380px] w-full max-w-[280px] overflow-hidden rounded-3xl p-6 text-white shadow-lg sm:h-[420px] sm:max-w-[300px] md:h-[440px] lg:max-w-[340px]"
                style={{
                  background:
                    idx % 5 === 0
                      ? "linear-gradient(135deg,#ff7a18 0%,#af002d 100%)"
                      : idx % 5 === 1
                        ? "linear-gradient(135deg,#3a1c71 0%,#d76d77 50%,#ffaf7b 100%)"
                        : idx % 5 === 2
                          ? "linear-gradient(135deg,#00c6ff 0%,#0072ff 100%)"
                          : idx % 5 === 3
                            ? "linear-gradient(135deg,#8e2de2 0%,#4a00e0 100%)"
                            : "linear-gradient(135deg,#ff512f 0%,#dd2476 100%)",
                }}
              >
                {/* New ribbon */}
                <div className="absolute top-3 -right-3 rotate-12">
                  <span className="rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-white shadow">
                    New
                  </span>
                </div>

                <h3 className="pr-6 text-xl leading-snug font-extrabold">
                  {pack.title}
                </h3>
                <p className="mt-3 line-clamp-6 pr-2 text-sm leading-relaxed text-white/90">
                  {pack.description}
                </p>

                {/* Pills */}
                <div className="absolute bottom-20 left-6 flex items-center gap-3">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm">
                    😎 2+ players
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm">
                    🧩 {pack.numQuestions} rounds
                  </span>
                </div>

                {/* Import Button */}
                <div className="absolute right-6 bottom-5 left-6">
                  <Button
                    onClick={() => handleImportClick(pack)}
                    className="w-full rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-white"
                  >
                    Import Questions to My Game
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <ImportTemplateDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
        templates={TRIVIA_PACKS}
        gameType="trivia"
      />

      {/* Bottom sticky CTA section */}
      <section className="sticky bottom-2 z-10">
        <div className="mx-2 flex items-center justify-between rounded-2xl bg-linear-to-r from-indigo-700 via-fuchsia-600 to-orange-400 p-3 shadow-lg md:mx-4 md:p-4">
          <div className="text-sm font-semibold text-white md:text-base">
            ✨ Customise your game to match your event
          </div>
          <div className="flex gap-2">
            <Link href={customHref}>
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
