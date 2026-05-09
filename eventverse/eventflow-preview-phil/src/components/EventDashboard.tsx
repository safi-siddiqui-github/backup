import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Share, CloudSun, User, Edit, Lock, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { moduleRegistry, getModuleById } from "@/config/moduleRegistry";
import ModuleActivationDialog from "./ModuleActivationDialog";
import { useToast } from "@/hooks/use-toast";
import { GoLiveTracker } from "./event-dashboard/GoLiveTracker";

const EventDashboard = ({ event, onBack, onEdit }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activationModule, setActivationModule] = useState(null);
  const [eventModules, setEventModules] = useState(event.selectedModules);

  // Ensure announcements module is always included
  const allSelectedModules = eventModules.includes("announcements") 
    ? eventModules 
    : [...eventModules, "announcements"];

  const handleModuleActivation = (moduleId) => {
    const updatedModules = [...eventModules, moduleId];
    setEventModules(updatedModules);
    
    // Update the event object for persistence
    event.selectedModules = updatedModules;
    
    toast({
      title: "Module Activated",
      description: `${getModuleById(moduleId)?.name} is now available for your event.`,
    });
  };

  const formatEventDate = () => {
    if (event.endDate && event.endDate !== event.startDate) {
      return `${format(event.startDate, "MMM d")} - ${format(event.endDate, "MMM d, yyyy")}`;
    }
    return format(event.startDate, "MMMM d, yyyy");
  };

  const handleModuleClick = (moduleId) => {
    // Handle legacy module ID mappings for consistency
    const moduleMapping = {
      "schedules": "schedule",
      "budgeting": "budget"
    };
    
    const mappedId = moduleMapping[moduleId] || moduleId;
    
    // Navigate to module page with event context
    navigate(`/modules/${mappedId}?eventId=${event.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Go Live Tracker */}
      <GoLiveTracker event={event} />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-accent/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{event.eventName}</h1>
                <p className="text-muted-foreground">{event.eventType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Status Badges */}
              <div className="flex gap-2">
                <Badge 
                  variant="secondary" 
                  className={
                    event.status === 'published' 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }
                >
                  {event.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={
                    event.isPublic 
                      ? "bg-blue-100 text-blue-800 border-blue-200" 
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }
                >
                  <div className="flex items-center gap-1">
                    {event.isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {event.isPublic ? 'Public' : 'Private'}
                  </div>
                </Badge>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onEdit}
                  className="border-border hover:bg-accent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Event
                </Button>
                <Button variant="outline" size="sm" className="border-border hover:bg-accent">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="border-border hover:bg-accent">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Event Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.description && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-foreground leading-relaxed">{event.description}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{formatEventDate()}</p>
                    {event.time && <p className="text-sm text-muted-foreground">at {event.time}</p>}
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 px-3 py-2 rounded-lg border border-border">
                    <CloudSun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-800 dark:text-blue-200 text-sm font-medium">{event.weather?.temperature}°C</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">Locations:</h3>
                  {event.locations.map((location, index) => (
                    <div key={index} className="relative group">
                      <div className="bg-muted p-3 rounded-lg border border-border hover:bg-accent/40 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-foreground">{location.name}</p>
                          <div className="flex items-center gap-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                location.source === 'marketplace' 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300' 
                                  : location.source === 'manual'
                                  ? 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/50 dark:text-gray-300'
                                  : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300'
                              }`}
                            >
                              {location.source === 'marketplace' ? '🏪 Marketplace' : location.source === 'manual' ? '✏️ Custom' : '📍 Location'}
                            </Badge>
                            {location.sections && location.sections.length > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {location.sections.length} section{location.sections.length !== 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {location.address && <p className="text-muted-foreground text-sm">{location.address}</p>}
                        {location.source === 'marketplace' && location.vendorName && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">by {location.vendorName}</p>
                        )}
                      </div>
                      
                      {/* Hover Tooltip for Sections */}
                      {location.sections && location.sections.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <h4 className="font-medium text-sm text-foreground mb-2">Sections in {location.name}</h4>
                          <div className="space-y-2">
                            {location.sections.map((section, sectionIndex) => (
                              <div key={sectionIndex} className="flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-medium text-foreground">{section.name}</span>
                                  {section.description && (
                                    <span className="text-muted-foreground ml-2">• {section.description}</span>
                                  )}
                                </div>
                                {section.capacity && (
                                  <Badge variant="outline" className="text-xs">
                                    {section.capacity} capacity
                                  </Badge>
                                )}
                              </div>
                            ))}
                            <div className="border-t pt-2 mt-2">
                              <span className="text-xs text-muted-foreground">
                                Total capacity: {location.sections.reduce((sum, section) => sum + (section.capacity || 0), 0) || 'Not specified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-muted-foreground text-sm">Status:</span>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800">
                    Planning
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">RSVPs</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Schedule Items</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Budget Spent</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">$0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modules Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Event Modules</h2>
              <p className="text-muted-foreground">Manage all aspects of your event</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(() => {
                // Separate selected and unselected modules
                const selectedModules = moduleRegistry.filter((moduleData) => {
                  const moduleMapping = { "schedule": "schedules", "budget": "budgeting" };
                  const eventModuleId = moduleMapping[moduleData.id] || moduleData.id;
                  return allSelectedModules.includes(eventModuleId) || allSelectedModules.includes(moduleData.id);
                });
                
                const unselectedModules = moduleRegistry.filter((moduleData) => {
                  const moduleMapping = { "schedule": "schedules", "budget": "budgeting" };
                  const eventModuleId = moduleMapping[moduleData.id] || moduleData.id;
                  return !(allSelectedModules.includes(eventModuleId) || allSelectedModules.includes(moduleData.id));
                });
                
                // Combine with selected modules first
                const sortedModules = [...selectedModules, ...unselectedModules];
                
                return sortedModules.map((moduleData) => {
                // Handle legacy module ID mappings for selected modules
                const moduleMapping = {
                  "schedule": "schedules", 
                  "budget": "budgeting"
                };
                
                const eventModuleId = moduleMapping[moduleData.id] || moduleData.id;
                const isSelected = allSelectedModules.includes(eventModuleId) || allSelectedModules.includes(moduleData.id);
                const Icon = moduleData.icon;
                const isFree = moduleData.id === "schedule" || moduleData.id === "announcements" || moduleData.id === "rsvp";

                return (
                  <Card
                    key={moduleData.id}
                    onClick={() => {
                      if (isSelected) {
                        handleModuleClick(eventModuleId);
                      } else {
                        setActivationModule(moduleData);
                      }
                    }}
                    className={`
                      shadow-md border-border transition-all duration-300 cursor-pointer group
                      ${isSelected 
                        ? "bg-card hover:shadow-xl hover:-translate-y-1 hover:border-primary/50" 
                        : "bg-card/50 opacity-60 grayscale-[0.5] hover:opacity-75 hover:grayscale-[0.2] relative"
                      }
                    `}
                  >
                    {/* Lock Overlay for Unselected Modules */}
                    {!isSelected && (
                      <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg">
                          <Lock className="w-6 h-6 text-gray-600" />
                        </div>
                      </div>
                    )}
                    
                    {/* Lock Icon in Corner for Locked Modules */}
                    {!isSelected && (
                      <div className="absolute top-3 right-3 bg-gray-500/80 backdrop-blur-sm rounded-full p-1.5 z-20">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                        isSelected 
                          ? (isFree ? 'bg-success shadow-lg shadow-success/30' : moduleData.color + ' shadow-lg')
                          : 'bg-muted'
                      }`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className={`text-lg ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {moduleData.name}
                      </CardTitle>
                      {isSelected && isFree && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 w-fit mx-auto border-green-200">
                          Free
                        </Badge>
                      )}
                      {!isSelected && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 w-fit mx-auto text-xs">
                          Activate
                        </Badge>
                      )}
                      <Badge variant="outline" className={`w-fit mx-auto text-xs ${isSelected ? 'border-border' : 'border-gray-300'}`}>
                        {moduleData.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className={`text-sm ${isSelected ? 'text-muted-foreground' : 'text-gray-500'}`}>
                        {moduleData.description}
                      </p>
                    </CardContent>
                  </Card>
                );
                });
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Module Activation Dialog */}
      <ModuleActivationDialog
        open={!!activationModule}
        onClose={() => setActivationModule(null)}
        module={activationModule}
        onActivate={handleModuleActivation}
      />
    </div>
  );
};

export default EventDashboard;
