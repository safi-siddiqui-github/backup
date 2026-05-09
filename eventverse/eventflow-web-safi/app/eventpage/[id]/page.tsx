"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DetailEvent from "@/components/general/eventpage/DetailEvent";

// Event data (same as in the main page)
const events = [
  {
    id: 1,
    image: "/featured1.png",
    title: "Summer Music Festival 2025",
    date: "16 Jun, 2025",
    time: "6:00 PM",
    location: "Central Park, New York",
    category: "Music",
    price: "$99.99",
    attendees: 2500,
    rating: 4.8,
    description: "Join us for an unforgettable summer music experience with top artists and amazing performances.",
    fullDescription: "Experience the ultimate summer music festival featuring world-renowned artists, incredible stage productions, and an atmosphere that will leave you breathless. This year's lineup includes Grammy-winning performers, emerging talents, and special surprise guests. With multiple stages, food vendors, and interactive experiences, this is more than just a concert - it's a complete musical journey.",
    organizer: "Music Events Inc.",
    tags: ["Live Music", "Outdoor", "Festival", "Summer", "Concert"],
    isFavorite: false
  },
  {
    id: 2,
    image: "/featured2.jpg",
    title: "Tech Conference 2025",
    date: "22 Jul, 2025",
    time: "9:00 AM",
    location: "Convention Center, San Francisco",
    category: "Technology",
    price: "$149.99",
    attendees: 1200,
    rating: 4.9,
    description: "Explore the latest in technology with industry leaders and innovative solutions.",
    fullDescription: "Join industry leaders, innovators, and tech enthusiasts for a comprehensive exploration of cutting-edge technologies. This conference features keynote presentations, hands-on workshops, networking sessions, and product demonstrations from leading tech companies.",
    organizer: "Tech Innovators LLC",
    tags: ["Technology", "Conference", "Networking", "Innovation", "Workshop"],
    isFavorite: false
  },
  {
    id: 3,
    image: "/keyfeatured3.png",
    title: "Art Workshop Series",
    date: "05 Aug, 2025",
    time: "2:00 PM",
    location: "Museum of Art, Chicago",
    category: "Art",
    price: "$79.99",
    attendees: 45,
    rating: 4.7,
    description: "Learn from professional artists and create your own masterpieces in this hands-on workshop.",
    fullDescription: "Immerse yourself in the world of art with our comprehensive workshop series. Learn various techniques from professional artists, experiment with different mediums, and create your own masterpieces in a supportive and inspiring environment.",
    organizer: "Art Academy",
    tags: ["Art", "Workshop", "Creative", "Learning", "Hands-on"],
    isFavorite: false
  },
  {
    id: 4,
    image: "/keyfeatured4.png",
    title: "Food & Wine Festival",
    date: "18 Sep, 2025",
    time: "12:00 PM",
    location: "Downtown Plaza, Miami",
    category: "Food",
    price: "$89.99",
    attendees: 800,
    rating: 4.6,
    description: "Indulge in exquisite cuisine and fine wines from renowned chefs and wineries.",
    fullDescription: "Experience a culinary journey like no other with our Food & Wine Festival. Sample dishes from award-winning chefs, taste premium wines from top wineries, and enjoy live cooking demonstrations and wine tastings.",
    organizer: "Culinary Events Group",
    tags: ["Food", "Wine", "Culinary", "Tasting", "Festival"],
    isFavorite: false
  },
  {
    id: 5,
    image: "/transevnt1.jpg",
    title: "Business Networking Event",
    date: "25 Oct, 2025",
    time: "6:30 PM",
    location: "Business Center, Los Angeles",
    category: "Business",
    price: "$65.99",
    attendees: 300,
    rating: 4.5,
    description: "Connect with industry professionals and expand your business network.",
    fullDescription: "Join us for an exclusive networking event designed to connect business professionals, entrepreneurs, and industry leaders. Enjoy cocktails, appetizers, and meaningful conversations that could lead to your next big opportunity.",
    organizer: "Business Network Pro",
    tags: ["Networking", "Business", "Professional", "Career", "Connections"],
    isFavorite: false
  },
  {
    id: 6,
    image: "/featured3.png",
    title: "Sports Championship",
    date: "12 Nov, 2025",
    time: "3:00 PM",
    location: "Stadium, Boston",
    category: "Sports",
    price: "$45.99",
    attendees: 5000,
    rating: 4.8,
    description: "Witness the ultimate sports championship with top athletes competing for glory.",
    fullDescription: "Experience the thrill of championship sports with top athletes competing for ultimate glory. This event features multiple sports competitions, live commentary, and an electrifying atmosphere that will keep you on the edge of your seat.",
    organizer: "Sports Events Corp",
    tags: ["Sports", "Championship", "Competition", "Athletes", "Live Action"],
    isFavorite: false
  },
  {
    id: 7,
    image: "/featured1.png",
    title: "Winter Music Concert",
    date: "15 Dec, 2025",
    time: "7:00 PM",
    location: "Madison Square Garden, New York",
    category: "Music",
    price: "$129.99",
    attendees: 18000,
    rating: 4.9,
    description: "Experience the magic of winter with our spectacular music concert featuring top artists.",
    fullDescription: "Experience the magic of winter with our spectacular music concert featuring top artists and incredible stage productions. This winter concert promises to be an unforgettable musical journey with world-class performances.",
    organizer: "Winter Music Productions",
    tags: ["Music", "Winter", "Concert", "Indoor", "Spectacular"],
    isFavorite: false
  },
  {
    id: 8,
    image: "/featured2.jpg",
    title: "AI & Machine Learning Summit",
    date: "20 Jan, 2026",
    time: "9:00 AM",
    location: "Tech Hub, Silicon Valley",
    category: "Technology",
    price: "$199.99",
    attendees: 800,
    rating: 4.7,
    description: "Explore the future of AI and machine learning with industry experts and innovators.",
    fullDescription: "Explore the future of AI and machine learning with industry experts and innovators. This summit features cutting-edge presentations, hands-on workshops, and networking opportunities with leading AI professionals.",
    organizer: "AI Innovation Labs",
    tags: ["AI", "Machine Learning", "Technology", "Innovation", "Future"],
    isFavorite: false
  },
  {
    id: 9,
    image: "/keyfeatured3.png",
    title: "Photography Masterclass",
    date: "05 Feb, 2026",
    time: "10:00 AM",
    location: "Creative Studio, Los Angeles",
    category: "Art",
    price: "$89.99",
    attendees: 30,
    rating: 4.8,
    description: "Learn advanced photography techniques from professional photographers in this intensive workshop.",
    fullDescription: "Learn advanced photography techniques from professional photographers in this intensive workshop. Master composition, lighting, and post-processing techniques while working with professional equipment and models.",
    organizer: "Creative Photography Academy",
    tags: ["Photography", "Workshop", "Creative", "Learning", "Professional"],
    isFavorite: false
  }
];

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventId = parseInt(params.id as string);
    const foundEvent = events.find(e => e.id === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // Event not found, redirect to events page
      router.push('/eventpage');
    }
    setLoading(false);
  }, [params.id, router]);

  const handleBack = () => {
    router.push('/eventpage');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return <DetailEvent event={event} onBack={handleBack} />;
}
