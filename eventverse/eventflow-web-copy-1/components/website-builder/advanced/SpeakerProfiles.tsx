"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Speaker } from "@/types/website";
import { ExternalLink, Globe, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

interface SpeakerProfilesProps {
  speakers: Speaker[];
  title?: string;
  description?: string;
  layout?: "grid" | "carousel";
  showBio?: boolean;
  maxSpeakers?: number;
}

export const SpeakerProfiles = ({
  speakers,
  title = "Our Speakers",
  description,
  layout = "grid",
  showBio = true,
  maxSpeakers,
}: SpeakerProfilesProps) => {
  const displaySpeakers = maxSpeakers
    ? speakers.slice(0, maxSpeakers)
    : speakers;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "website":
        return <Globe className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <section className="bg-muted/30 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {description}
            </p>
          )}
        </div>

        <div
          className={`grid gap-8 ${
            layout === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {displaySpeakers.map((speaker) => (
            <Card
              key={speaker.id}
              className="text-center transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  {speaker.image ? (
                    <>
                      {/* <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                      /> */}

                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                      />
                    </>
                  ) : (
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-600">
                      <span className="text-2xl font-bold text-white">
                        {speaker.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <h3 className="mb-1 text-lg font-bold">{speaker.name}</h3>
                  <p className="text-muted-foreground mb-1 text-sm">
                    {speaker.title}
                  </p>
                  {speaker.company && (
                    <p className="text-primary text-sm font-medium">
                      {speaker.company}
                    </p>
                  )}
                </div>

                {showBio && speaker.bio && (
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                    {speaker.bio}
                  </p>
                )}

                {speaker.sessions && speaker.sessions.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-medium">Sessions:</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {speaker.sessions.slice(0, 2).map((sessionId, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          Session {index + 1}
                        </Badge>
                      ))}
                      {speaker.sessions.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          +{speaker.sessions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {speaker.social && (
                  <div className="flex justify-center gap-2">
                    {Object.entries(speaker.social).map(
                      ([platform, url]) =>
                        url && (
                          <Button
                            key={platform}
                            variant="outline"
                            size="sm"
                            className="p-2"
                            asChild
                          >
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getSocialIcon(platform)}
                            </a>
                          </Button>
                        ),
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {maxSpeakers && speakers.length > maxSpeakers && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
            >
              View All Speakers ({speakers.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
