"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsBlock({ data }: { data: any }) {
  const {
    title = "What Attendees Say",
    subtitle = "Hear from previous event participants",
    testimonials = [],
  } = data || {};

  if (!Array.isArray(testimonials) || testimonials.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>

        <Swiper
          modules={[Pagination, Autoplay, A11y, Keyboard]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          loop={true}
          className="max-w-3xl mx-auto"
        >
          {testimonials.map((t: any, i: number) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-md transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <img
                    src={t.avatar || "https://i.pravatar.cc/100"}
                    alt={t.name || "User"}
                    className="h-20 w-20 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.role} {t.company ? `at ${t.company}` : ""}
                    </p>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 italic">
                      “{t.quote}”
                    </p>
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <span
                          key={si}
                          className={`text-base ${
                            si < (t.rating || 5)
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
