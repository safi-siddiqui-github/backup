
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Users, 
  Star, 
  Building2,
  Award,
  Clock,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Verified,
  Share,
  MessageSquare,
  Shield,
  Zap,
  CheckCircle,
  Trophy,
  Heart,
  BookOpen,
  Camera,
  ExternalLink,
  Maximize,
  Minimize
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface PublicProfilePreviewProps {
  className?: string;
}

const PublicProfilePreview = ({ className = "" }: PublicProfilePreviewProps) => {
  const { user } = useAuth();
  
  // State for minimize/maximize functionality
  const [isProfileMinimized, setIsProfileMinimized] = useState(false);
  const [isStatsMinimized, setIsStatsMinimized] = useState(false);
  const [isReviewsMinimized, setIsReviewsMinimized] = useState(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedProfileState = localStorage.getItem('profile-minimized');
    const savedStatsState = localStorage.getItem('stats-minimized');
    const savedReviewsState = localStorage.getItem('reviews-minimized');
    
    if (savedProfileState) setIsProfileMinimized(JSON.parse(savedProfileState));
    if (savedStatsState) setIsStatsMinimized(JSON.parse(savedStatsState));
    if (savedReviewsState) setIsReviewsMinimized(JSON.parse(savedReviewsState));
  }, []);

  // Save preferences to localStorage
  const toggleProfileMinimized = () => {
    const newState = !isProfileMinimized;
    setIsProfileMinimized(newState);
    localStorage.setItem('profile-minimized', JSON.stringify(newState));
  };

  const toggleStatsMinimized = () => {
    const newState = !isStatsMinimized;
    setIsStatsMinimized(newState);
    localStorage.setItem('stats-minimized', JSON.stringify(newState));
  };

  const toggleReviewsMinimized = () => {
    const newState = !isReviewsMinimized;
    setIsReviewsMinimized(newState);
    localStorage.setItem('reviews-minimized', JSON.stringify(newState));
  };

  if (!user) return null;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'twitter': return <Twitter className="w-4 h-4 text-blue-400" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-700" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const formatJoinDate = (date: Date | undefined) => {
    if (!date) return 'Recently';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Enhanced mock data for reviews
  const mockReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Alexandra transformed our corporate retreat into an absolutely magical experience. Every detail was meticulously planned and executed flawlessly. The venue coordination, catering, and team-building activities exceeded all our expectations!",
      event: "Tech Summit Corporate Retreat 2024",
      date: "2024-11-15",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      role: "CEO, TechFlow Solutions"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Working with Alexandra was a dream come true. She took our vision for our wedding and made it even more beautiful than we imagined. Professional, organized, and incredibly creative. We received countless compliments from our guests!",
      event: "Chen-Williams Wedding Celebration",
      date: "2024-10-20",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Groom"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Alexandra's attention to sustainability while maintaining luxury was exactly what we needed for our charity gala. She managed 300+ guests seamlessly and the event raised 40% more than our target. Absolutely phenomenal!",
      event: "Ocean Conservation Charity Gala",
      date: "2024-09-10",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      role: "Director, Ocean Foundation"
    }
  ];

  // Enhanced portfolio with more detailed events
  const mockPortfolio = [
    {
      id: 1,
      title: "Luxury Vineyard Wedding at Napa Valley",
      type: "Wedding",
      date: "October 2024",
      attendees: 180,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
      description: "Elegant outdoor ceremony with panoramic vineyard views, featuring sustainable florals and farm-to-table reception",
      budget: "$85,000",
      highlights: ["Sustainable practices", "Live wine tasting", "String quartet"]
    },
    {
      id: 2,
      title: "Global Tech Innovation Summit",
      type: "Conference",
      date: "September 2024",
      attendees: 750,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      description: "Three-day technology conference with international keynote speakers and interactive workshops",
      budget: "$150,000",
      highlights: ["15 keynote speakers", "AI exhibition", "Global networking"]
    },
    {
      id: 3,
      title: "Annual Charity Gala at SF Museum",
      type: "Charity Event",
      date: "November 2024",
      attendees: 300,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
      description: "Black-tie fundraising event with live entertainment and silent auction",
      budget: "$60,000",
      highlights: ["$500K raised", "Celebrity host", "Live orchestra"]
    },
    {
      id: 4,
      title: "Product Launch Extravaganza",
      type: "Corporate",
      date: "August 2024",
      attendees: 400,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
      description: "High-energy product launch with interactive demos and VIP experiences",
      budget: "$95,000",
      highlights: ["AR demonstrations", "Influencer presence", "Live streaming"]
    }
  ];

  return (
    <div className={`max-w-5xl mx-auto space-y-8 ${className}`}>
      {/* Hero Section */}
      <Card className="overflow-hidden shadow-2xl border-0">
        {/* Cover Photo */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          {user.coverPhoto && (
            <img 
              src={user.coverPhoto} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={toggleProfileMinimized}
              className="bg-white/95 hover:bg-white text-gray-900 shadow-lg backdrop-blur-sm"
              aria-label={isProfileMinimized ? "Expand profile" : "Minimize profile"}
            >
              {isProfileMinimized ? (
                <Maximize className="w-4 h-4 mr-2" />
              ) : (
                <Minimize className="w-4 h-4 mr-2" />
              )}
              {isProfileMinimized ? "Expand" : "Minimize"}
            </Button>
            <Button size="sm" className="bg-white/95 hover:bg-white text-gray-900 shadow-lg backdrop-blur-sm">
              <Share className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Host
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <CardContent className="pt-0 px-8 pb-8">
          <div className={`transition-all duration-300 ease-in-out ${isProfileMinimized ? '' : '-mt-20'} relative`}>
            {isProfileMinimized ? (
              /* Minimized Profile Layout */
              <div className="flex items-center gap-6 py-6">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src={user.profilePhoto} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    {user.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.averageRating && user.averageRating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{user.averageRating.toFixed(1)} • {mockReviews.length} reviews</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            ) : (
              /* Full Profile Layout */
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Avatar & Basic Info */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Avatar className="w-40 h-40 border-6 border-white shadow-2xl ring-4 ring-blue-100">
                      <AvatarImage src={user.profilePhoto} alt={user.name} />
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {user.verificationStatus?.identity && (
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-3 shadow-lg">
                        <Verified className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1 lg:mt-20">
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                    <div className="flex-1">
                      {/* Header Info */}
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-3">
                          <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 text-sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verified Host
                          </Badge>
                          <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 px-4 py-2 text-sm">
                            <Trophy className="w-4 h-4 mr-2" />
                            Premium Host
                          </Badge>
                        </div>
                        
                        {user.jobTitle && user.company && (
                          <p className="text-xl text-gray-600 mb-3">
                            {user.jobTitle} at {user.company}
                          </p>
                        )}

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Identity Verified</span>
                          </div>
                          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">{user.responseRate}% Response Rate</span>
                          </div>
                          <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                            <Trophy className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">{user.yearsHosting}+ Years Experience</span>
                          </div>
                          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">&lt;2h Response Time</span>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-6 text-gray-600 mb-4">
                          {user.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5" />
                              <span>{user.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>Member since {formatJoinDate(user.joinDate)}</span>
                          </div>
                          {user.averageRating && user.averageRating > 0 && (
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{user.averageRating.toFixed(1)} • {mockReviews.length} reviews</span>
                            </div>
                          )}
                        </div>

                        {/* Bio */}
                        {user.bio && (
                          <p className="text-gray-700 leading-relaxed text-lg mb-6">{user.bio}</p>
                        )}
                      </div>

                      {/* Contact & Social */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Contact Options */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Get in Touch</h4>
                        <div className="space-y-3">
                          {user.isPublicOrganizer ? (
                            <>
                              <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" size="lg">
                                <MessageSquare className="w-5 h-5 mr-3" />
                                Book My Services
                              </Button>
                              <Button variant="outline" className="w-full justify-start" size="lg">
                                <MessageSquare className="w-5 h-5 mr-3" />
                                Send Message
                              </Button>
                            </>
                          ) : (
                            <Button className="w-full justify-start" size="lg">
                              <MessageSquare className="w-5 h-5 mr-3" />
                              Send Message
                            </Button>
                          )}
                          {user.phone && (
                            <Button variant="outline" className="w-full justify-start" size="lg">
                              <Phone className="w-5 h-5 mr-3" />
                              Call Now
                            </Button>
                          )}
                          {user.website && (
                            <Button variant="outline" className="w-full justify-start" size="lg">
                              <ExternalLink className="w-5 h-5 mr-3" />
                              Visit Website
                            </Button>
                          )}
                        </div>
                      </div>

                        {/* Social Links */}
                        {user.socialLinks && Object.keys(user.socialLinks).length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Follow Me</h4>
                            <div className="space-y-2">
                              {Object.entries(user.socialLinks).map(([platform, url]) => {
                                if (!url) return null;
                                return (
                                  <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                                  >
                                    {getSocialIcon(platform)}
                                    <span className="capitalize font-medium">{platform}</span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Performance Overview</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleStatsMinimized}
              className="h-8 w-8 p-0"
              aria-label={isStatsMinimized ? "Expand stats" : "Minimize stats"}
            >
              {isStatsMinimized ? (
                <Maximize className="w-4 h-4" />
              ) : (
                <Minimize className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`transition-all duration-300 ease-in-out ${isStatsMinimized ? 'h-16 overflow-hidden' : ''}`}>
            {isStatsMinimized ? (
              <div className="flex items-center justify-center text-gray-600 text-lg">
                <span className="font-medium">{user.totalEventsHosted || 156} Events</span>
                <span className="mx-3">•</span>
                <span className="font-medium">{user.totalAttendeesHosted?.toLocaleString() || '18,750'} Attendees</span>
                <span className="mx-3">•</span>
                <span className="font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {user.averageRating || 4.9}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">{user.totalEventsHosted || 156}</div>
                  <div className="text-sm text-blue-700">Events Hosted</div>
                </Card>

                <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
                  <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-900 mb-1">{user.totalAttendeesHosted?.toLocaleString() || '18,750'}</div>
                  <div className="text-sm text-green-700">Happy Attendees</div>
                </Card>

                <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg">
                  <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-900 mb-1">{user.averageRating || 4.9}</div>
                  <div className="text-sm text-yellow-700">Average Rating</div>
                </Card>

                <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
                  <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-900 mb-1">{user.profileViews?.toLocaleString() || '2,847'}</div>
                  <div className="text-sm text-purple-700">Profile Views</div>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Section */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Featured Events Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockPortfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-black/70 text-white">
                    {item.type}
                  </Badge>
                  <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                    {item.budget}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{item.date}</span>
                    <span>{item.attendees} attendees</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              Client Testimonials
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleReviewsMinimized}
              className="h-8 w-8 p-0"
              aria-label={isReviewsMinimized ? "Expand reviews" : "Minimize reviews"}
            >
              {isReviewsMinimized ? (
                <Maximize className="w-4 h-4" />
              ) : (
                <Minimize className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`transition-all duration-300 ease-in-out ${isReviewsMinimized ? 'h-16 overflow-hidden' : ''}`}>
            {isReviewsMinimized ? (
              <div className="flex items-center justify-center text-gray-600 text-lg">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">{user.averageRating || 4.9}</span>
                  <span className="text-gray-500">({mockReviews.length} reviews)</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="bg-gray-50 border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={review.avatar} alt={review.name} />
                          <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium text-gray-900">{review.name}</div>
                              <div className="text-sm text-gray-600">{review.role}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3 italic leading-relaxed">"{review.comment}"</p>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{review.event}</span> • {review.date}
                          </div>
                        </div>
                      </div>
                     </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Event Organizer Services Section */}
      {user.isPublicOrganizer && user.organizerProfile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services Overview */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Event Organizing Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Information */}
              {user.organizerProfile.businessName && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Business</h4>
                  <p className="text-gray-700">{user.organizerProfile.businessName}</p>
                  {user.organizerProfile.businessLicense && (
                    <p className="text-sm text-gray-500">License: {user.organizerProfile.businessLicense}</p>
                  )}
                </div>
              )}

              {/* Event Types */}
              {user.organizerProfile.eventTypes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Event Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.organizerProfile.eventTypes.map((type, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Areas */}
              {user.organizerProfile.serviceAreas.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Service Areas</h4>
                  <div className="space-y-1">
                    {user.organizerProfile.serviceAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              {user.organizerProfile.priceRange && user.organizerProfile.priceRange.min > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Investment Range</h4>
                  <p className="text-lg font-semibold text-green-600">
                    ${user.organizerProfile.priceRange.min.toLocaleString()} - ${user.organizerProfile.priceRange.max.toLocaleString()} {user.organizerProfile.priceRange.currency}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Information */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Booking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Advance Booking */}
              {user.organizerProfile.bookingPreferences?.advanceBookingDays && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Advance Booking</h4>
                  <p className="text-gray-700">
                    {user.organizerProfile.bookingPreferences.advanceBookingDays} days minimum notice required
                  </p>
                </div>
              )}

              {/* Deposit Information */}
              {user.organizerProfile.bookingPreferences?.depositRequired && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">Deposit Required</span>
                </div>
              )}

              {/* Availability */}
              {user.organizerProfile.availability?.daysAvailable.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Available Days</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.organizerProfile.availability.daysAvailable.map((day, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cancellation Policy */}
              {user.organizerProfile.bookingPreferences?.cancellationPolicy && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {user.organizerProfile.bookingPreferences.cancellationPolicy}
                  </p>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="pt-4 border-t space-y-2">
                {user.organizerProfile.insuranceInfo && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Fully Insured</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Background Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Professional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specializations */}
        {user.specializations && user.specializations.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Event Specializations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {user.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-2">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications */}
        {user.certifications && user.certifications.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Certifications & Awards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PublicProfilePreview;
