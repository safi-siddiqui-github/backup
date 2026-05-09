import { Section } from "@/types/website";
import { SessionsGrid } from "./advanced/SessionsGrid";
import { SpeakerProfiles } from "./advanced/SpeakerProfiles";
import { PricingTable } from "./advanced/PricingTable";
import { MultiDaySchedule } from "./advanced/MultiDaySchedule";
import { RSVPFormSection } from "./sections/RSVPFormSection";
import { ScheduleTimelineSection } from "./sections/ScheduleTimelineSection";
import { TicketingSection } from "./sections/TicketingSection";
import { SocialFeedSection } from "./sections/SocialFeedSection";
import { InteractiveGallery } from "./sections/InteractiveGallery";
import { CountdownTimer } from "./sections/CountdownTimer";

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
    backgroundImage: styling?.backgroundImage ? `url(${styling.backgroundImage})` : undefined,
    backgroundPosition: styling?.backgroundPosition,
    backgroundSize: styling?.backgroundSize,
    width: styling?.width || 'auto',
    height: styling?.height || 'auto',
    minHeight: styling?.minHeight || 'auto',
    maxWidth: styling?.maxWidth,
    maxHeight: styling?.maxHeight,
    position: 'relative' as const,
    overflow: 'hidden',
  };

  switch (type) {
    case 'hero':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="relative scroll-mt-4"
        >
          {styling.backgroundImage && (
            <div className="absolute inset-0 bg-black/40 z-0" />
          )}
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content.title}
            </h1>
            {content.subtitle && (
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {content.subtitle}
              </p>
            )}
            {content.description && (
              <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
                {content.description}
              </p>
            )}
            {content.buttons && content.buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center">
                {content.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      button.style === 'primary'
                        ? 'bg-primary text-primary-foreground hover:opacity-90'
                        : button.style === 'secondary'
                        ? 'bg-secondary text-secondary-foreground hover:opacity-90'
                        : 'border-2 border-current hover:bg-current hover:text-background'
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

    case 'about':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-16 px-4 scroll-mt-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{content.title}</h2>
            <p className="text-lg text-muted-foreground">{content.description}</p>
          </div>
        </section>
      );

    case 'text':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-12 px-4 scroll-mt-4"
        >
          <div className="max-w-4xl mx-auto">
            {content.title && (
              <h2 className="text-3xl font-bold mb-6 text-center">{content.title}</h2>
            )}
            {content.content && (
              <div className="prose prose-lg mx-auto">
                <p>{content.content}</p>
              </div>
            )}
          </div>
        </section>
      );

    case 'image':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-12 px-4 scroll-mt-4"
        >
          <div className="max-w-6xl mx-auto">
            {content.title && (
              <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
            )}
            {content.images && content.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case 'gallery':
      return (
        <InteractiveGallery
          title={content.title}
          description={content.description}
          images={content.images}
          style={containerStyle}
        />
      );

    case 'contact':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-16 px-4 scroll-mt-4"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
              {content.description && (
                <p className="text-lg text-muted-foreground">{content.description}</p>
              )}
            </div>
            {content.formFields && (
              <form className="space-y-6">
                {content.formFields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        required={field.required}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>
      );

    case 'countdown':
      return (
        <CountdownTimer
          title={content.title}
          description={content.description}
          targetDate={content.data?.targetDate}
          style={containerStyle}
        />
      );

    case 'countdown-timer':
      return (
        <CountdownTimer
          title={content.title}
          description={content.description}
          targetDate={content.targetDate}
          style={containerStyle}
        />
      );

    case 'map':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-16 px-4 scroll-mt-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
              {content.description && (
                <p className="text-lg text-muted-foreground">{content.description}</p>
              )}
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive Map Coming Soon</p>
            </div>
          </div>
        </section>
      );

    // Advanced Components
    case 'sessions-grid':
      return content.sessions ? (
        <SessionsGrid 
          sessions={content.sessions}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case 'speaker-profiles':
      return content.speakers ? (
        <SpeakerProfiles 
          speakers={content.speakers}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case 'pricing-table':
      return content.pricing ? (
        <PricingTable 
          pricing={content.pricing}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case 'multi-day-schedule':
      return content.schedule ? (
        <MultiDaySchedule 
          schedule={content.schedule}
          title={content.title}
          description={content.description}
        />
      ) : null;

    case 'testimonials':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-16 px-4 scroll-mt-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
              {content.description && (
                <p className="text-lg text-muted-foreground">{content.description}</p>
              )}
            </div>
            {content.testimonials && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="flex gap-4 mb-4">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                    {testimonial.rating && (
                      <div className="flex gap-1 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'}>
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

    case 'sponsor-showcase':
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-16 px-4 scroll-mt-4"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
              {content.description && (
                <p className="text-lg text-muted-foreground">{content.description}</p>
              )}
            </div>
            {content.sponsors && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {content.sponsors.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-16 object-contain mb-4 filter grayscale group-hover:grayscale-0 transition-all"
                    />
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {sponsor.name}
                    </h4>
                    {sponsor.description && (
                      <p className="text-sm text-muted-foreground mt-1">
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

    case 'rsvp':
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

    case 'schedule':
      return (
        <ScheduleTimelineSection
          title={content.title}
          description={content.description}
          schedule={content.schedule}
          style={containerStyle}
        />
      );

    case 'ticketing':
      return (
        <TicketingSection
          title={content.title}
          description={content.description}
          ticketTypes={content.data?.ticketTypes}
          style={containerStyle}
        />
      );

    case 'social-feed':
      return (
        <SocialFeedSection
          title={content.title}
          description={content.description}
          hashtag={content.data?.hashtag}
          platforms={content.data?.platforms}
          style={containerStyle}
        />
      );

    case 'navigation-buttons':
      // Navigation buttons are now handled by the sticky header
      return null;

    default:
      return (
        <section 
          data-section-id={section.id} 
          style={containerStyle} 
          className="py-12 px-4 scroll-mt-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              {content.title || `${type} Section`}
            </h2>
            <p className="text-muted-foreground">
              {content.description || `This is a ${type} section. Content coming soon.`}
            </p>
          </div>
        </section>
      );
  }
};