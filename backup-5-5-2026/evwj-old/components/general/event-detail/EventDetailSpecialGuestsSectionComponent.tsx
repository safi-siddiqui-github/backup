import { Images } from "@/lib/lib-images";
import Image from "next/image";

export default function EventDetailSpecialGuestsSectionComponent({
  slug,
}: {
  slug?: string;
}) {
  const specialGuests = [
    {
      name: "John Doe",
      role: "Headliner",
      image: Images.mock,
      bio: "Award-winning artist with over 20 years of experience",
    },
    {
      name: "Jane Smith",
      role: "Featured Artist",
      image: Images.mock,
      bio: "Rising star in the music industry",
    },
    {
      name: "Mike Johnson",
      role: "Special Guest",
      image: Images.mock,
      bio: "Renowned producer and composer",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">Special Guests & Lineup</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specialGuests.map((guest, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-lg border border-gray-800 p-4"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={guest.image}
                  alt={guest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{guest.name}</p>
                  <p className="text-sm text-purple-400">{guest.role}</p>
                </div>
                <p className="text-sm text-gray-300">{guest.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
