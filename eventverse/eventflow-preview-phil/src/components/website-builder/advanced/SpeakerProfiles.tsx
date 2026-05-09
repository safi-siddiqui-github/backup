import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Twitter, Linkedin, Globe } from "lucide-react";
import { Speaker } from "@/types/website";

interface SpeakerProfilesProps {
  speakers: Speaker[];
  title?: string;
  description?: string;
  layout?: 'grid' | 'carousel';
  showBio?: boolean;
  maxSpeakers?: number;
}

export const SpeakerProfiles = ({ 
  speakers, 
  title = "Our Speakers", 
  description,
  layout = 'grid',
  showBio = true,
  maxSpeakers 
}: SpeakerProfilesProps) => {
  const displaySpeakers = maxSpeakers ? speakers.slice(0, maxSpeakers) : speakers;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'website': return <Globe className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className={`grid gap-8 ${
          layout === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {displaySpeakers.map((speaker) => (
            <Card key={speaker.id} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">
                        {speaker.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{speaker.title}</p>
                  {speaker.company && (
                    <p className="text-sm font-medium text-primary">{speaker.company}</p>
                  )}
                </div>

                {showBio && speaker.bio && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {speaker.bio}
                  </p>
                )}

                {speaker.sessions && speaker.sessions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium mb-2">Sessions:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {speaker.sessions.slice(0, 2).map((sessionId, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          Session {index + 1}
                        </Badge>
                      ))}
                      {speaker.sessions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{speaker.sessions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {speaker.social && (
                  <div className="flex justify-center gap-2">
                    {Object.entries(speaker.social).map(([platform, url]) => (
                      url && (
                        <Button
                          key={platform}
                          variant="outline"
                          size="sm"
                          className="p-2"
                          asChild
                        >
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {getSocialIcon(platform)}
                          </a>
                        </Button>
                      )
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {maxSpeakers && speakers.length > maxSpeakers && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Speakers ({speakers.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};