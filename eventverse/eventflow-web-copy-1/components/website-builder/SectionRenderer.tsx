"use client";

import { Section } from "@/types/website";
import Image from "next/image";
import { MultiDaySchedule } from "./advanced/MultiDaySchedule";
import { PricingTable } from "./advanced/PricingTable";
import { SessionsGrid } from "./advanced/SessionsGrid";
import { SpeakerProfiles } from "./advanced/SpeakerProfiles";
import { CountdownTimer } from "./sections/CountdownTimer";
import { InteractiveGallery } from "./sections/InteractiveGallery";
import { RSVPFormSection } from "./sections/RSVPFormSection";
import { ScheduleTimelineSection } from "./sections/ScheduleTimelineSection";
import { SocialFeedSection } from "./sections/SocialFeedSection";
import { TicketingSection } from "./sections/TicketingSection";

interface SectionRendererProps {
  section: Section;
}

export const SectionRenderer = ({ section }: SectionRendererProps) => {
  const { type, content, styling } = section;

  const containerStyle: React.CSSProperties = {
    backgroundColor: styling?.backgroundColor,
    color: styling?.textColor,
    padding: styling?.padding,
    margin: styling?.margin,
    borderRadius: styling?.borderRadius,
    backgroundImage: styling?.backgroundImage
      ? `url(${styling.backgroundImage})`
      : undefined,
    backgroundPosition: styling?.backgroundPosition,
    backgroundSize: styling?.backgroundSize,
    width: styling?.width || "auto",
    height: styling?.height || "auto",
    minHeight: styling?.minHeight || "auto",
    maxWidth: styling?.maxWidth,
    maxHeight: styling?.maxHeight,
    position: "relative" as const,
    overflow: "hidden",
  };

  switch (type) {
    case "hero":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="relative scroll-mt-4"
        >
          {styling.backgroundImage && (
            <div className="absolute inset-0 z-0 bg-black/40" />
          )}
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              {content.title}
            </h1>
            {content.subtitle && (
              <p className="mb-8 text-xl opacity-90 md:text-2xl">
                {content.subtitle}
              </p>
            )}
            {content.description && (
              <p className="mx-auto mb-12 max-w-2xl text-lg opacity-80">
                {content.description}
              </p>
            )}
            {content.buttons && content.buttons.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {content.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`rounded-lg px-8 py-3 font-semibold transition-all ${
                      button.style === "primary"
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : button.style === "secondary"
                          ? "bg-secondary text-secondary-foreground hover:opacity-90"
                          : "hover:text-background border-2 border-current hover:bg-current"
                    }`}
                    target={button.target}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case "about":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-16"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold">{content.title}</h2>
            <p className="text-muted-foreground text-lg">
              {content.description}
            </p>
          </div>
        </section>
      );

    case "text":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-12"
        >
          <div className="mx-auto max-w-4xl">
            {content.title && (
              <h2 className="mb-6 text-center text-3xl font-bold">
                {content.title}
              </h2>
            )}
            {content.content && (
              <div className="prose prose-lg mx-auto">
                <p>{content.content}</p>
              </div>
            )}
          </div>
        </section>
      );

    case "image":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-12"
        >
          <div className="mx-auto max-w-6xl">
            {content.title && (
              <h2 className="mb-8 text-center text-3xl font-bold">
                {content.title}
              </h2>
            )}
            {content.images && content.images.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {content.images.map((image, index) => (
                  <>
                    {/* <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="h-64 w-full rounded-lg object-cover shadow-md"
                    /> */}

                    <Image
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="h-64 w-full rounded-lg object-cover shadow-md"
                    />
                  </>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case "gallery":
      return (
        <InteractiveGallery
          title={content.title}
          description={content.description}
          images={content.images}
          style={containerStyle}
        />
      );

    case "contact":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-16"
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
              {content.description && (
                <p className="text-muted-foreground text-lg">
                  {content.description}
                </p>
              )}
            </div>
            {content.formFields && (
              <form className="space-y-6">
                {content.formFields.map((field) => (
                  <div key={field.id}>
                    <label className="mb-2 block text-sm font-medium">
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                        className="border-input focus:ring-primary w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                      />
                    ) : field.type === "select" ? (
                      <select
                        required={field.required}
                        className="border-input focus:ring-primary w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option, index) => (
                          <option
                            key={index}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="border-input focus:ring-primary w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground w-full rounded-md py-3 font-semibold transition-opacity hover:opacity-90"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>
      );

    case "countdown":
      return (
        <CountdownTimer
          title={content.title}
          description={content.description}
          targetDate={content.data?.targetDate}
          style={containerStyle}
        />
      );

    case "countdown-timer":
      return (
        <CountdownTimer
          title={content.title}
          description={content.description}
          targetDate={content.targetDate}
          style={containerStyle}
        />
      );

    case "map":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
              {content.description && (
                <p className="text-muted-foreground text-lg">
                  {content.description}
                </p>
              )}
            </div>
            <div className="bg-muted flex aspect-video items-center justify-center rounded-lg">
              <p className="text-muted-foreground">
                Interactive Map Coming Soon
              </p>
            </div>
          </div>
        </section>
      );

    // Advanced Components
    case "sessions-grid":
      return content.sessions ? (
        <SessionsGrid
          sessions={content.sessions}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case "speaker-profiles":
      return content.speakers ? (
        <SpeakerProfiles
          speakers={content.speakers}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case "pricing-table":
      return content.pricing ? (
        <PricingTable
          pricing={content.pricing}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case "multi-day-schedule":
      return content.schedule ? (
        <MultiDaySchedule
          schedule={content.schedule}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case "testimonials":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
              {content.description && (
                <p className="text-muted-foreground text-lg">
                  {content.description}
                </p>
              )}
            </div>
            {content.testimonials && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {content.testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-card rounded-lg p-6 shadow-sm"
                  >
                    <div className="mb-4 flex gap-4">
                      {testimonial.image ? (
                        <>
                          {/* <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover"
                          /> */}

                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </>
                      ) : (
                        <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    {testimonial.rating && (
                      <div className="mt-3 flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < testimonial.rating!
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case "sponsor-showcase":
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
              {content.description && (
                <p className="text-muted-foreground text-lg">
                  {content.description}
                </p>
              )}
            </div>
            {content.sponsors && (
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
                {content.sponsors.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    {/* <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="mb-4 h-16 w-full object-contain grayscale filter transition-all group-hover:grayscale-0"
                    /> */}

                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="mb-4 h-16 w-full object-contain grayscale filter transition-all group-hover:grayscale-0"
                    />

                    <h4 className="group-hover:text-primary font-semibold transition-colors">
                      {sponsor.name}
                    </h4>
                    {sponsor.description && (
                      <p className="text-muted-foreground mt-1 text-sm">
                        {sponsor.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case "rsvp":
      return (
        <RSVPFormSection
          title={content.title}
          description={content.description}
          eventDate={content.data?.eventDate}
          eventLocation={content.data?.eventLocation}
          maxGuests={content.data?.maxGuests}
          style={containerStyle}
        />
      );

    case "schedule":
      return (
        <ScheduleTimelineSection
          title={content.title}
          description={content.description}
          schedule={content.schedule}
          style={containerStyle}
        />
      );

    case "ticketing":
      return (
        <TicketingSection
          title={content.title}
          description={content.description}
          ticketTypes={content.data?.ticketTypes}
          style={containerStyle}
        />
      );

    case "social-feed":
      return (
        <SocialFeedSection
          title={content.title}
          description={content.description}
          hashtag={content.data?.hashtag}
          platforms={content.data?.platforms}
          style={containerStyle}
        />
      );

    case "navigation-buttons":
      // Navigation buttons are now handled by the sticky header
      return null;

    default:
      return (
        <section
          data-section-id={section.id}
          style={containerStyle}
          className="scroll-mt-4 px-4 py-12"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold">
              {content.title || `${type} Section`}
            </h2>
            <p className="text-muted-foreground">
              {content.description ||
                `This is a ${type} section. Content coming soon.`}
            </p>
          </div>
        </section>
      );
  }
};
