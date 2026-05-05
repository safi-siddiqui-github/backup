"use client";

import { Images } from "@/lib/lib-images";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SpecialGuest {
  id: string;
  image: string;
  name: string;
  title: string;
  bio?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}

export default function EventDetailSpecialGuestComponent() {
  const specialGuests: SpecialGuest[] = useMemo(
    () => [
      {
        id: "1",
        image: Images.avatarOne,
        name: "John Doe",
        title: "Keynote Speaker",
        bio: "Renowned technology innovator with over 15 years of experience in AI and machine learning. John has been at the forefront of digital transformation, helping companies leverage cutting-edge technologies to drive growth and innovation.",
        instagram: "https://instagram.com/johndoe",
        facebook: "https://facebook.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
      },
      {
        id: "2",
        image: Images.avatarTwo,
        name: "Jane Smith",
        title: "Industry Expert",
        bio: "Leading entrepreneur and founder of multiple successful tech startups. Jane is passionate about empowering the next generation of innovators and has mentored hundreds of aspiring entrepreneurs.",
        instagram: "https://instagram.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        twitter: "https://twitter.com/janesmith",
      },
      {
        id: "3",
        image: Images.avatarThree,
        name: "Michael Chen",
        title: "Thought Leader",
        bio: "Award-winning author and consultant specializing in digital transformation. Michael has published several best-selling books on technology and business strategy.",
        linkedin: "https://linkedin.com/in/michaelchen",
        twitter: "https://twitter.com/michaelchen",
      },
      {
        id: "4",
        image: Images.avatarFour,
        name: "Sarah Johnson",
        title: "Creative Director",
        bio: "Visionary creative director with expertise in brand strategy and visual storytelling. Sarah has worked with Fortune 500 companies to create compelling brand experiences.",
        instagram: "https://instagram.com/sarahjohnson",
        linkedin: "https://linkedin.com/in/sarahjohnson",
      },
      {
        id: "5",
        image: Images.avatarFive,
        name: "David Williams",
        title: "Tech Evangelist",
        bio: "Passionate advocate for emerging technologies and their impact on society. David regularly speaks at international conferences and contributes to major tech publications.",
        twitter: "https://twitter.com/davidwilliams",
        linkedin: "https://linkedin.com/in/davidwilliams",
      },
      {
        id: "6",
        image: Images.avatarOne,
        name: "Emily Rodriguez",
        title: "Product Strategist",
        bio: "Expert in product development and user experience design. Emily has led product teams at top tech companies, creating products used by millions worldwide.",
        instagram: "https://instagram.com/emilyrodriguez",
        linkedin: "https://linkedin.com/in/emilyrodriguez",
      },
      {
        id: "7",
        image: Images.avatarTwo,
        name: "Robert Taylor",
        title: "Data Scientist",
        bio: "Pioneering data scientist with expertise in machine learning and predictive analytics. Robert has developed algorithms that have transformed business operations across industries.",
        linkedin: "https://linkedin.com/in/roberttaylor",
        twitter: "https://twitter.com/roberttaylor",
      },
      {
        id: "8",
        image: Images.avatarThree,
        name: "Lisa Anderson",
        title: "Marketing Guru",
        bio: "Strategic marketing leader with a track record of building successful brands. Lisa has helped companies achieve exponential growth through innovative marketing strategies.",
        instagram: "https://instagram.com/lisaanderson",
        facebook: "https://facebook.com/lisaanderson",
        linkedin: "https://linkedin.com/in/lisaanderson",
      },
      {
        id: "9",
        image: Images.avatarFour,
        name: "James Wilson",
        title: "Innovation Consultant",
        bio: "Consultant specializing in helping organizations foster innovation and adapt to changing market conditions. James has worked with startups and established enterprises alike.",
        linkedin: "https://linkedin.com/in/jameswilson",
        twitter: "https://twitter.com/jameswilson",
      },
      {
        id: "10",
        image: Images.avatarFive,
        name: "Maria Garcia",
        title: "UX Designer",
        bio: "Award-winning UX designer focused on creating intuitive and accessible digital experiences. Maria's designs have improved user engagement and satisfaction for numerous products.",
        instagram: "https://instagram.com/mariagarcia",
        linkedin: "https://linkedin.com/in/mariagarcia",
      },
    ],
    [],
  );
  const [showMore, setShowMore] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<SpecialGuest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleShowMore = useCallback(() => {
    setShowMore(!showMore);
  }, [showMore]);

  const handleCardClick = useCallback((guest: SpecialGuest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
          Special Guests
        </p>

        <div
          className={cn(
            "2xs:grid-cols-2 grid h-56 grid-cols-1 gap-4 overflow-hidden md:grid-cols-4",
            {
              "bg-linear-to-b from-white/0 from-60% to-black": !showMore,
              "h-fit": showMore,
            },
          )}
        >
          {specialGuests?.map((guest) => {
            return (
              <div
                key={guest.id}
                onClick={() => handleCardClick(guest)}
                className="flex h-44 flex-col overflow-hidden rounded-xl bg-cover bg-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/50"
                style={{ backgroundImage: `url(${guest.image})` }}
              >
                <div className="flex flex-1 flex-col items-center justify-end gap-2 bg-linear-to-b from-50% to-black pb-2 text-white">
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-semibold">{guest.name}</p>
                    <p className="text-sm tracking-tight">{guest.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {guest.instagram && (
                      <Link
                        href={guest.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-white/50 bg-white/10 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        <FaInstagram className="size-4" />
                      </Link>
                    )}
                    {guest.facebook && (
                      <Link
                        href={guest.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-white/50 bg-white/10 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        <FaFacebook className="size-4" />
                      </Link>
                    )}
                    {guest.linkedin && (
                      <Link
                        href={guest.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-white/50 bg-white/10 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        <FaLinkedin className="size-4" />
                      </Link>
                    )}
                    {guest.twitter && (
                      <Link
                        href={guest.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-white/50 bg-white/10 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        <FaXTwitter className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleShowMore}
            className="cursor-pointer rounded-md bg-black/5 px-4 py-2 text-sm font-semibold hover:underline dark:bg-white/5"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>

      {/* Guest Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedGuest && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div
                    className="h-20 w-20 rounded-full bg-cover bg-center border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
                    style={{ backgroundImage: `url(${selectedGuest.image})` }}
                  />
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold">
                      {selectedGuest.name}
                    </DialogTitle>
                    <p className="text-muted-foreground mt-1 text-lg">
                      {selectedGuest.title}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                {selectedGuest.bio && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Biography
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedGuest.bio}
                    </p>
                  </div>
                )}
                {(selectedGuest.instagram ||
                  selectedGuest.facebook ||
                  selectedGuest.linkedin ||
                  selectedGuest.twitter) && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Connect
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedGuest.instagram && (
                        <Link
                          href={selectedGuest.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaInstagram className="size-4" />
                          <span>Instagram</span>
                        </Link>
                      )}
                      {selectedGuest.facebook && (
                        <Link
                          href={selectedGuest.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaFacebook className="size-4" />
                          <span>Facebook</span>
                        </Link>
                      )}
                      {selectedGuest.linkedin && (
                        <Link
                          href={selectedGuest.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaLinkedin className="size-4" />
                          <span>LinkedIn</span>
                        </Link>
                      )}
                      {selectedGuest.twitter && (
                        <Link
                          href={selectedGuest.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FaXTwitter className="size-4" />
                          <span>Twitter</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
