
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Users, 
  Star, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Globe,
  UserPlus
} from "lucide-react";

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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
    }
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
      verified: true
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      avatar: "",
      events: 18,
      rating: 4.8,
      followers: 890,
      specialty: "Workshops",
      verified: true
    },
    {
      id: 3,
      name: "Emma Johnson",
      avatar: "",
      events: 32,
      rating: 4.9,
      followers: 2100,
      specialty: "Food & Culture",
      verified: true
    }
  ]);

  const [trendingTopics, setTrendingTopics] = useState([
    { tag: "sustainability", events: 45, growth: "+23%" },
    { tag: "ai-ml", events: 78, growth: "+34%" },
    { tag: "wellness", events: 56, growth: "+18%" },
    { tag: "networking", events: 92, growth: "+12%" },
    { tag: "food-culture", events: 67, growth: "+28%" }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="text-gray-600 mt-2">Discover events, connect with hosts, and build your network</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Join Community
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events, hosts, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover Events</TabsTrigger>
          <TabsTrigger value="hosts">Top Hosts</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="network">My Network</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="grid gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          {event.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback>{event.host.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span>{event.host}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>{event.attendees} attending</span>
                          </div>
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
                          <Heart className="w-4 h-4" />
                          {event.likes}
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                          <MessageCircle className="w-4 h-4" />
                          12
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Join Event</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hosts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topHosts.map((host) => (
              <Card key={host.id}>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarFallback className="text-lg">
                      {host.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{host.name}</h3>
                    {host.verified && (
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{host.specialty}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <div className="font-semibold">{host.events}</div>
                      <div className="text-gray-600">Events</div>
                    </div>
                    <div>
                      <div className="font-semibold flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
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
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">#{topic.tag}</div>
                        <div className="text-sm text-gray-600">{topic.events} events</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-green-600 border-green-600"
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
                  <Globe className="w-5 h-5 text-blue-600" />
                  Popular Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">San Francisco, CA</span>
                    <span className="text-sm text-gray-600">234 events</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">New York, NY</span>
                    <span className="text-sm text-gray-600">198 events</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Austin, TX</span>
                    <span className="text-sm text-gray-600">156 events</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Seattle, WA</span>
                    <span className="text-sm text-gray-600">142 events</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Los Angeles, CA</span>
                    <span className="text-sm text-gray-600">128 events</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Build Your Network</h3>
                <p className="text-gray-600 mb-4">
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
