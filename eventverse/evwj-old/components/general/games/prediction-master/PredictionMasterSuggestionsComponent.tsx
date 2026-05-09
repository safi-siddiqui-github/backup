"use client";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/lib-routes";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ImportTemplateDialog from "../ImportTemplateDialog";
import { PREDICTION_PACKS } from "../game-data";

interface Props {
  slug: string;
  gameSlug: string;
}

const QUESTION_SUGGESTIONS: {
  id: string;
  question: string;
  options: [string, string, string, string];
  duration: number;
}[] = [
  {
    id: "next-song",
    question: "What will be the next song played?",
    options: ["Pop hit", "Classic rock", "Afrobeats", "Ballad"],
    duration: 15,
  },
  {
    id: "arrival-time",
    question: "When will the VIP arrive?",
    options: ["In 5 min", "In 10 min", "In 15 min", "After 20 min"],
    duration: 20,
  },
  {
    id: "games-winner",
    question: "Who will win the next mini-game?",
    options: ["Table A", "Table B", "Table C", "Table D"],
    duration: 15,
  },
  {
    id: "dessert-first",
    question: "Which dessert will be served first?",
    options: ["Cake", "Ice cream", "Fruit platter", "Cupcakes"],
    duration: 15,
  },
  {
    id: "dance-style",
    question: "What dance style will start the floor?",
    options: ["Waltz", "Hip-hop", "Amapiano", "Salsa"],
    duration: 15,
  },
  {
    id: "speech-length",
    question: "How long will the next speech be?",
    options: ["< 2 min", "2-4 min", "5-7 min", "> 7 min"],
    duration: 20,
  },
  {
    id: "photo-booth",
    question: "What prop will be used most at the photo booth?",
    options: ["Funny glasses", "Hats", "Signs", "Feather boas"],
    duration: 15,
  },
  {
    id: "surprise",
    question: "What will the surprise be?",
    options: ["Confetti", "Guest performance", "Fireworks", "Giveaways"],
    duration: 20,
  },
  {
    id: "color-theme",
    question: "Which color will appear next in lights?",
    options: ["Purple", "Blue", "Gold", "Pink"],
    duration: 10,
  },
  {
    id: "finale",
    question: "What will the finale include?",
    options: ["Dance circle", "Group photo", "Song medley", "Fireworks"],
    duration: 25,
  },
];

export default function PredictionMasterSuggestionsComponent({
  slug,
  gameSlug,
}: Props) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesPredictionMaster}${Routes.web.auth.dashboardEventGamesPredictionMasterCustom}`;

  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleImport = (template: any) => {
    window.location.href = `${customHref}?template=${template.id}`;
  };

  return (
    <div className="mt-30 flex flex-col gap-6 py-4">
      {/* Header */}
      <section className="px-4 pt-4 md:px-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">
          Featured Prediction Games
        </h1>
        <p className="text-gray-500">
          Pick a template to start fast, or create custom prediction questions.
        </p>
      </section>

      {/* Carousel of example questions */}
      <section className="w-full px-2 md:px-4">
        <Swiper
          spaceBetween={8}
          slidesPerView={"auto"}
        >
          {QUESTION_SUGGESTIONS.map((item, idx) => (
            <SwiperSlide
              key={item.id}
              style={{ width: "auto" }}
            >
              <div
                className="relative h-80 w-[280px] overflow-hidden rounded-3xl p-6 text-white shadow-lg sm:h-[340px] sm:w-[300px] md:h-[360px] lg:w-[340px]"
                style={{
                  background:
                    idx % 5 === 0
                      ? "linear-gradient(135deg,#d946ef 0%,#7c3aed 100%)" // fuchsia -> purple
                      : idx % 5 === 1
                        ? "linear-gradient(135deg,#ec4899 0%,#ef4444 100%)" // pink -> red
                        : idx % 5 === 2
                          ? "linear-gradient(135deg,#9333ea 0%,#f97316 100%)" // purple -> orange
                          : idx % 5 === 3
                            ? "linear-gradient(135deg,#a21caf 0%,#6d28d9 100%)" // fuchsia deep -> indigo
                            : "linear-gradient(135deg,#f43f5e 0%,#8b5cf6 100%)", // rose -> violet
                }}
              >
                {/* New ribbon */}
                <div className="absolute top-3 -right-3 rotate-12">
                  <span className="rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-white shadow">
                    New
                  </span>
                </div>

                <h3 className="pr-6 text-lg leading-snug font-extrabold">
                  {item.question}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-2 pr-2 text-sm">
                  {item.options.map((op, i) => (
                    <div
                      key={i}
                      className={
                        "rounded-lg px-3 py-2 font-semibold text-white/95 shadow " +
                        (i === 0
                          ? "bg-orange-500/90"
                          : i === 1
                            ? "bg-fuchsia-600/90"
                            : i === 2
                              ? "bg-purple-600/90"
                              : "bg-rose-600/90")
                      }
                    >
                      {op}
                    </div>
                  ))}
                </div>

                {/* Pills */}
                <div className="absolute bottom-20 left-6 flex items-center gap-3">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm">
                    ✍️ Example
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm">
                    ⏱️ {item.duration}s
                  </span>
                </div>

                {/* Import Button */}
                <div className="absolute right-6 bottom-5 left-6">
                  <Button
                    onClick={() => setImportDialogOpen(true)}
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
        templates={PREDICTION_PACKS}
        gameType="prediction-master"
      />

      {/* Bottom sticky CTA section */}
      <section className="sticky bottom-2 z-10">
        <div className="mx-2 flex items-center justify-between rounded-2xl bg-linear-to-r from-fuchsia-600 via-purple-600 to-pink-500 p-3 shadow-lg md:mx-4 md:p-4">
          <div className="text-sm font-semibold text-white md:text-base">
            ✨ Create custom predictions tailored to your event
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
