import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Search,
  Star,
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  User,
  Tag
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import EnhancedConferenceCalendar from "@/components/conference/EnhancedConferenceCalendar";

interface ConferenceSession {
  id: string;
  title: string;
  description: string;
  speakers: string[];
  track: string;
  trackColor: string;
  type: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registered: number;
  waitlist: number;
  level: string;
  tags: string[];
  isKeynote?: boolean;
  prerequisites?: string[];
}

interface ConferenceGuestScheduleProps {
  event: any;
  guest: any;
}

const ConferenceGuestSchedule = ({ event, guest }: ConferenceGuestScheduleProps) => {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrack, setFilterTrack] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [activeView, setActiveView] = useState("schedule");
  const { toast } = useToast();

  // Rich mock conference data
  const mockSessions: ConferenceSession[] = [
    // Day 1 - September 10
    {
      id: "keynote-1",
      title: "The Future of AI: Beyond 2024",
      description: "Exploring breakthrough developments in artificial intelligence and their impact on technology and society.",
      speakers: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
      track: "Keynote",
      trackColor: "bg-purple-600",
      type: "keynote",
      day: "2024-09-10",
      startTime: "09:00",
      endTime: "10:00",
      location: "Main Auditorium",
      capacity: 2500,
      registered: 2485,
      waitlist: 150,
      level: "all",
      tags: ["ai", "future", "technology"],
      isKeynote: true
    },
    {
      id: "ai-1",
      title: "Building Production-Ready ML Pipelines",
      description: "Hands-on workshop for creating scalable machine learning pipelines using modern MLOps practices.",
      speakers: ["Alex Johnson", "Maria Garcia"],
      track: "AI & Machine Learning",
      trackColor: "bg-blue-600",
      type: "workshop",
      day: "2024-09-10",
      startTime: "10:30",
      endTime: "12:00",
      location: "Workshop Room A",
      capacity: 80,
      registered: 78,
      waitlist: 25,
      level: "intermediate",
      tags: ["ml", "mlops", "production", "hands-on"],
      prerequisites: ["Basic Python knowledge", "ML fundamentals"]
    },
    {
      id: "cloud-1",
      title: "Kubernetes Security Best Practices",
      description: "Deep dive into securing containerized applications and Kubernetes clusters in production environments.",
      speakers: ["David Kim", "Lisa Wong"],
      track: "Cloud & DevOps",
      trackColor: "bg-green-600",
      type: "session",
      day: "2024-09-10",
      startTime: "10:30",
      endTime: "11:30",
      location: "Conference Room B",
      capacity: 150,
      registered: 142,
      waitlist: 8,
      level: "advanced",
      tags: ["kubernetes", "security", "devops", "containers"]
    },
    {
      id: "frontend-1",
      title: "React 19: What's New and Breaking",
      description: "Comprehensive overview of React 19 features, breaking changes, and migration strategies.",
      speakers: ["Emma Thompson", "Carlos Rodriguez"],
      track: "Frontend Development",
      trackColor: "bg-orange-600",
      type: "session",
      day: "2024-09-10",
      startTime: "11:45",
      endTime: "12:45",
      location: "Tech Theater",
      capacity: 200,
      registered: 195,
      waitlist: 45,
      level: "intermediate",
      tags: ["react", "frontend", "javascript", "web"]
    },
    {
      id: "networking-1",
      title: "Coffee & Code - Morning Networking",
      description: "Informal networking session with refreshments and open discussions.",
      speakers: [],
      track: "Networking",
      trackColor: "bg-gray-600",
      type: "networking",
      day: "2024-09-10",
      startTime: "10:00",
      endTime: "10:30",
      location: "Main Lobby",
      capacity: 500,
      registered: 380,
      waitlist: 0,
      level: "all",
      tags: ["networking", "coffee", "break"]
    },
    {
      id: "data-1",
      title: "Real-time Analytics with Apache Kafka",
      description: "Building scalable real-time data processing systems using Kafka and stream processing.",
      speakers: ["John Smith", "Rachel Lee"],
      track: "Data Science",
      trackColor: "bg-teal-600",
      type: "workshop",
      day: "2024-09-10",
      startTime: "14:00",
      endTime: "16:00",
      location: "Data Lab",
      capacity: 60,
      registered: 55,
      waitlist: 12,
      level: "intermediate",
      tags: ["kafka", "streaming", "analytics", "big-data"]
    },
    {
      id: "security-1",
      title: "Zero Trust Architecture Implementation",
      description: "Practical guide to implementing zero trust security models in enterprise environments.",
      speakers: ["Michelle Brown", "Robert Taylor"],
      track: "Security",
      trackColor: "bg-red-600",
      type: "session",
      day: "2024-09-10",
      startTime: "14:00",
      endTime: "15:00",
      location: "Security Theater",
      capacity: 120,
      registered: 115,
      waitlist: 5,
      level: "advanced",
      tags: ["security", "zero-trust", "enterprise", "architecture"]
    },
    {
      id: "panel-1",
      title: "The Future of Remote Work in Tech",
      description: "Industry leaders discuss the evolution of remote work culture and its impact on technology teams.",
      speakers: ["Various Industry Leaders"],
      track: "Leadership",
      trackColor: "bg-indigo-600",
      type: "panel",
      day: "2024-09-10",
      startTime: "15:30",
      endTime: "16:30",
      location: "Main Auditorium",
      capacity: 2500,
      registered: 1850,
      waitlist: 0,
      level: "all",
      tags: ["leadership", "remote-work", "culture", "management"]
    },

    // Day 2 - September 11
    {
      id: "keynote-2",
      title: "Quantum Computing: From Lab to Production",
      description: "Breakthrough developments in quantum computing and their practical applications in enterprise environments.",
      speakers: ["Dr. Amanda Wilson", "Prof. James Chen"],
      track: "Keynote",
      trackColor: "bg-purple-600",
      type: "keynote",
      day: "2024-09-11",
      startTime: "09:00",
      endTime: "10:00",
      location: "Main Auditorium",
      capacity: 2500,
      registered: 2456,
      waitlist: 89,
      level: "all",
      tags: ["quantum", "computing", "innovation"],
      isKeynote: true
    },
    {
      id: "ai-2",
      title: "LLM Fine-tuning for Enterprise Applications",
      description: "Advanced techniques for customizing large language models for specific business use cases.",
      speakers: ["Dr. Kevin Park", "Sarah Mitchell"],
      track: "AI & Machine Learning",
      trackColor: "bg-blue-600",
      type: "workshop",
      day: "2024-09-11",
      startTime: "10:30",
      endTime: "12:30",
      location: "AI Lab",
      capacity: 40,
      registered: 40,
      waitlist: 67,
      level: "advanced",
      tags: ["llm", "fine-tuning", "enterprise", "nlp"],
      prerequisites: ["ML experience", "Python proficiency"]
    },
    {
      id: "frontend-2",
      title: "Progressive Web Apps: Beyond the Basics",
      description: "Advanced PWA techniques including offline synchronization, push notifications, and performance optimization.",
      speakers: ["Jennifer Adams", "Mark Thompson"],
      track: "Frontend Development",
      trackColor: "bg-orange-600",
      type: "session",
      day: "2024-09-11",
      startTime: "10:30",
      endTime: "11:30",
      location: "Web Theater",
      capacity: 180,
      registered: 175,
      waitlist: 22,
      level: "intermediate",
      tags: ["pwa", "offline", "performance", "mobile"]
    },
    {
      id: "cloud-2",
      title: "Multi-Cloud Strategy and Implementation",
      description: "Best practices for designing and managing applications across multiple cloud providers.",
      speakers: ["Thomas Wilson", "Diana Rodriguez"],
      track: "Cloud & DevOps",
      trackColor: "bg-green-600",
      type: "session",
      day: "2024-09-11",
      startTime: "11:45",
      endTime: "12:45",
      location: "Cloud Theater",
      capacity: 160,
      registered: 148,
      waitlist: 18,
      level: "intermediate",
      tags: ["multi-cloud", "strategy", "architecture", "cloud"]
    },

    // Day 3 - September 12
    {
      id: "keynote-3",
      title: "Sustainable Technology: Building for Tomorrow",
      description: "How technology companies are leading the charge in environmental sustainability and green computing.",
      speakers: ["Dr. Elena Vasquez", "Green Tech Leaders Panel"],
      track: "Keynote",
      trackColor: "bg-purple-600",
      type: "keynote",
      day: "2024-09-12",
      startTime: "09:00",
      endTime: "10:00",
      location: "Main Auditorium",
      capacity: 2500,
      registered: 2234,
      waitlist: 45,
      level: "all",
      tags: ["sustainability", "green-tech", "environment"],
      isKeynote: true
    },
    {
      id: "data-2",
      title: "AI-Powered Data Visualization Techniques",
      description: "Creating intelligent, interactive data visualizations using machine learning and modern web technologies.",
      speakers: ["Ryan Chang", "Alice Murphy"],
      track: "Data Science",
      trackColor: "bg-teal-600",
      type: "workshop",
      day: "2024-09-12",
      startTime: "10:30",
      endTime: "12:00",
      location: "Visualization Lab",
      capacity: 70,
      registered: 68,
      waitlist: 15,
      level: "intermediate",
      tags: ["visualization", "ai", "data", "interactive"]
    },
    {
      id: "security-2",
      title: "API Security in the Age of Microservices",
      description: "Comprehensive strategies for securing APIs in distributed microservice architectures.",
      speakers: ["Michael Foster", "Laura Kim"],
      track: "Security",
      trackColor: "bg-red-600",
      type: "session",
      day: "2024-09-12",
      startTime: "14:00",
      endTime: "15:00",
      location: "Security Theater",
      capacity: 120,
      registered: 118,
      waitlist: 8,
      level: "advanced",
      tags: ["api", "microservices", "security", "architecture"]
    }
  ];

  const tracks = Array.from(new Set(mockSessions.map(s => s.track)));
  const levels = Array.from(new Set(mockSessions.map(s => s.level)));

  // Filter sessions based on search and filters
  const filteredSessions = useMemo(() => {
    return mockSessions.filter(session => {
      const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.speakers.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTrack = filterTrack === "all" || session.track === filterTrack;
      const matchesLevel = filterLevel === "all" || session.level === filterLevel;
      
      return matchesSearch && matchesTrack && matchesLevel;
    });
  }, [searchTerm, filterTrack, filterLevel]);

  // Get selected sessions for calendar
  const mySchedule = useMemo(() => {
    return mockSessions.filter(session => selectedSessions.includes(session.id));
  }, [selectedSessions]);

  const handleSessionToggle = (sessionId: string) => {
    const session = mockSessions.find(s => s.id === sessionId);
    if (!session) return;

    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(prev => prev.filter(id => id !== sessionId));
      toast({
        title: "Session Removed",
        description: `Removed "${session.title}" from your schedule`
      });
    } else {
      // Check for conflicts
      const conflicts = mySchedule.filter(mySession => {
        if (mySession.day !== session.day) return false;
        
        const sessionStart = parseInt(session.startTime.replace(':', ''));
        const sessionEnd = parseInt(session.endTime.replace(':', ''));
        const myStart = parseInt(mySession.startTime.replace(':', ''));
        const myEnd = parseInt(mySession.endTime.replace(':', ''));
        
        return sessionStart < myEnd && sessionEnd > myStart;
      });

      if (conflicts.length > 0) {
        toast({
          title: "Schedule Conflict",
          description: `This session conflicts with "${conflicts[0].title}"`,
          variant: "destructive"
        });
        return;
      }

      if (session.registered >= session.capacity) {
        toast({
          title: "Session Full",
          description: `"${session.title}" is at capacity. You've been added to the waitlist.`,
          variant: "default"
        });
      } else {
        toast({
          title: "Session Added",
          description: `Added "${session.title}" to your schedule`
        });
      }

      setSelectedSessions(prev => [...prev, sessionId]);
    }
  };

  const renderSessionCard = (session: ConferenceSession, compact = false) => {
    const isSelected = selectedSessions.includes(session.id);
    const isFull = session.registered >= session.capacity;
    const fillPercentage = (session.registered / session.capacity) * 100;

    return (
      <Card key={session.id} className={`${compact ? 'p-3' : 'p-4'} ${isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}>
        <CardContent className="p-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`${compact ? 'text-sm' : 'text-base'} font-semibold`}>{session.title}</h4>
                {session.isKeynote && <Star className="w-4 h-4 text-yellow-500" />}
                {isSelected && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
              <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'} mb-2`}>{session.description}</p>
              
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className={`${session.trackColor} text-white text-xs`}>
                  {session.track}
                </Badge>
                <Badge variant="outline" className="text-xs">{session.level}</Badge>
                <Badge variant="outline" className="text-xs">{session.type}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(parseISO(session.day), "MMM d")}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {session.startTime} - {session.endTime}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {session.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {session.registered}/{session.capacity}
                  {session.waitlist > 0 && ` (+${session.waitlist} waitlist)`}
                </div>
              </div>

              {session.speakers.length > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <User className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{session.speakers.join(", ")}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <Button
                size="sm"
                variant={isSelected ? "destructive" : isFull ? "secondary" : "default"}
                onClick={() => handleSessionToggle(session.id)}
                className="text-xs"
              >
                {isSelected ? <Minus className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                {isSelected ? "Remove" : isFull ? "Waitlist" : "Add"}
              </Button>
              
              {fillPercentage > 80 && (
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-600">{Math.round(fillPercentage)}% full</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">TechCon 2024 Schedule</h2>
        <p className="text-gray-600">Build your personalized conference experience</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {selectedSessions.length} sessions selected
          </Badge>
          <Badge variant="outline">{mySchedule.length > 0 ? 'Schedule created' : 'No sessions yet'}</Badge>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="browse">Browse Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          {mySchedule.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent className="p-0">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions selected yet</h3>
                <p className="text-gray-600 mb-4">Browse sessions and add them to create your personalized schedule</p>
                <Button onClick={() => setActiveView("browse")}>Browse Sessions</Button>
              </CardContent>
            </Card>
          ) : (
            <EnhancedConferenceCalendar 
              sessions={mockSessions}
              selectedSessions={selectedSessions}
              onSessionToggle={handleSessionToggle}
            />
          )}
        </TabsContent>

        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search sessions, speakers, topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterTrack} onValueChange={setFilterTrack}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Tracks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tracks</SelectItem>
                {tracks.map(track => (
                  <SelectItem key={track} value={track}>{track}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {filteredSessions.map(session => renderSessionCard(session))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConferenceGuestSchedule;
