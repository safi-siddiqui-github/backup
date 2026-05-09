"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Filter,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  Share2,
  Star,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

const CommunityHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const [featuredEvents, setFeaturedEvents] = useState([
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      host: "Sarah Chen",
      hostAvatar: "",
      location: "San Francisco, CA",
      date: "Jan 25, 2024",
      attendees: 450,
      likes: 89,
      category: "Technology",
      featured: true,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Sustainable Living Workshop",
      host: "Mike Rodriguez",
      hostAvatar: "",
      location: "Austin, TX",
      date: "Feb 2, 2024",
      attendees: 120,
      likes: 34,
      category: "Lifestyle",
      featured: true,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Local Food Festival",
      host: "Emma Johnson",
      hostAvatar: "",
      location: "Portland, OR",
      date: "Feb 10, 2024",
      attendees: 800,
      likes: 156,
      category: "Food & Drink",
      featured: true,
      image: "/placeholder.svg",
    },
  ]);

  const [topHosts, setTopHosts] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "",
      events: 24,
      rating: 4.9,
      followers: 1250,
      specialty: "Tech Events",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      avatar: "",
      events: 18,
      rating: 4.8,
      followers: 890,
      specialty: "Workshops",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Johnson",
      avatar: "",
      events: 32,
      rating: 4.9,
      followers: 2100,
      specialty: "Food & Culture",
      verified: true,
    },
  ]);

  const [trendingTopics, setTrendingTopics] = useState([
    { tag: "sustainability", events: 45, growth: "+23%" },
    { tag: "ai-ml", events: 78, growth: "+34%" },
    { tag: "wellness", events: 56, growth: "+18%" },
    { tag: "networking", events: 92, growth: "+12%" },
    { tag: "food-culture", events: 67, growth: "+28%" },
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="mt-2 text-gray-600">
            Discover events, connect with hosts, and build your network
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Join Community
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search events, hosts, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs
        defaultValue="discover"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover Events</TabsTrigger>
          <TabsTrigger value="hosts">Top Hosts</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="network">My Network</TabsTrigger>
        </TabsList>

        <TabsContent
          value="discover"
          className="space-y-6"
        >
          <div className="grid gap-6">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-48 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="text-xl font-semibold">
                            {event.title}
                          </h3>
                          {event.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>
                                {event.host
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{event.host}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span>{event.attendees} attending</span>
                          </div>
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
                          <Heart className="h-4 w-4" />
                          {event.likes}
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                          <MessageCircle className="h-4 w-4" />
                          12
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          View Details
                        </Button>
                        <Button size="sm">Join Event</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="hosts"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topHosts.map((host) => (
              <Card key={host.id}>
                <CardContent className="p-6 text-center">
                  <Avatar className="mx-auto mb-4 h-20 w-20">
                    <AvatarFallback className="text-lg">
                      {host.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <h3 className="text-lg font-semibold">{host.name}</h3>
                    {host.verified && (
                      <Badge
                        variant="outline"
                        className="border-blue-600 text-blue-600"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="mb-4 text-sm text-gray-600">{host.specialty}</p>
                  <div className="mb-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">{host.events}</div>
                      <div className="text-gray-600">Events</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 font-semibold">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {host.rating}
                      </div>
                      <div className="text-gray-600">Rating</div>
                    </div>
                    <div>
                      <div className="font-semibold">{host.followers}</div>
                      <div className="text-gray-600">Followers</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                    >
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="trending"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div>
                        <div className="font-medium">#{topic.tag}</div>
                        <div className="text-sm text-gray-600">
                          {topic.events} events
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-green-600 text-green-600"
                      >
                        {topic.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Popular Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">San Francisco, CA</span>
                    <span className="text-sm text-gray-600">234 events</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">New York, NY</span>
                    <span className="text-sm text-gray-600">198 events</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Austin, TX</span>
                    <span className="text-sm text-gray-600">156 events</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Seattle, WA</span>
                    <span className="text-sm text-gray-600">142 events</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Los Angeles, CA</span>
                    <span className="text-sm text-gray-600">128 events</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="network"
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>My Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Build Your Network
                </h3>
                <p className="mb-4 text-gray-600">
                  Follow hosts and connect with fellow event enthusiasts
                </p>
                <Button>Discover People to Follow</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityHub;
