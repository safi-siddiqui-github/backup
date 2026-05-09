
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  name: string;
  status: 'completed' | 'needs-setup' | 'optional' | 'not-configured';
  description: string;
  estimatedTime?: string;
  nextSteps?: string[];
}

interface Props {
  selectedModules: string[];
  moduleConfigurations: Record<string, any>;
  eventType: string;
}

const ModuleCompletionTracker = ({ selectedModules, moduleConfigurations, eventType }: Props) => {
  // Define module requirements and status
  const getModuleStatus = (moduleId: string): Module => {
    const baseModules: Record<string, Omit<Module, 'status'>> = {
      schedules: {
        id: 'schedules',
        name: 'Schedules & Timeline',
        description: 'Event schedule and timeline management',
        estimatedTime: '5 mins',
        nextSteps: ['Add event sessions', 'Set up notifications']
      },
      announcements: {
        id: 'announcements',
        name: 'Announcements',
        description: 'Send updates to your guests',
        estimatedTime: '2 mins',
        nextSteps: ['Create welcome message', 'Set up auto-notifications']
      },
      rsvp: {
        id: 'rsvp',
        name: 'RSVP Management',
        description: 'Guest management and responses',
        estimatedTime: '10 mins',
        nextSteps: ['Add guest list', 'Configure RSVP form', 'Set response deadline']
      },
      seating: {
        id: 'seating',
        name: 'Seating Arrangements',
        description: 'Table and seating management',
        estimatedTime: '15 mins',
        nextSteps: ['Create venue layout', 'Assign guests to tables']
      },
      ticketing: {
        id: 'ticketing',
        name: 'Ticketing & Check-in',
        description: 'Ticket sales and event check-in',
        estimatedTime: '12 mins',
        nextSteps: ['Set ticket prices', 'Configure check-in system']
      },
      budgeting: {
        id: 'budgeting',
        name: 'Budget & Vendors',
        description: 'Cost tracking and vendor management',
        estimatedTime: '8 mins',
        nextSteps: ['Set budget categories', 'Add initial expenses']
      },
      media: {
        id: 'media',
        name: 'Media & Albums',
        description: 'Photo sharing and albums',
        estimatedTime: '5 mins',
        nextSteps: ['Create photo albums', 'Generate QR codes']
      },
      analytics: {
        id: 'analytics',
        name: 'Analytics & Reporting',
        description: 'Event insights and metrics',
        estimatedTime: '3 mins',
        nextSteps: ['Enable tracking', 'Set up reports']
      },
      games: {
        id: 'games',
        name: 'Games & Activities',
        description: 'Interactive guest entertainment',
        estimatedTime: '7 mins',
        nextSteps: ['Choose games', 'Set up activities']
      },
      survey: {
        id: 'survey',
        name: 'Survey & Feedback',
        description: 'Collect guest feedback',
        estimatedTime: '5 mins',
        nextSteps: ['Create feedback forms', 'Set up post-event survey']
      }
    };

    const moduleInfo = baseModules[moduleId];
    if (!moduleInfo) return { ...moduleInfo, status: 'not-configured' };

    // Determine status based on configuration
    let status: Module['status'] = 'not-configured';
    
    if (moduleId === 'schedules' || moduleId === 'announcements') {
      // Core modules - always need basic setup
      status = moduleConfigurations[moduleId] ? 'completed' : 'needs-setup';
    } else if (moduleId === 'rsvp' || moduleId === 'ticketing') {
      // Guest management - critical for most events
      status = moduleConfigurations[moduleId] ? 'completed' : 'needs-setup';
    } else {
      // Optional modules
      status = moduleConfigurations[moduleId] ? 'completed' : 'optional';
    }

    return { ...moduleInfo, status };
  };

  const modules = selectedModules.map(getModuleStatus);
  
  const completedCount = modules.filter(m => m.status === 'completed').length;
  const needsSetupCount = modules.filter(m => m.status === 'needs-setup').length;
  const optionalCount = modules.filter(m => m.status === 'optional').length;

  const getStatusIcon = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs-setup':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'optional':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Configured</Badge>;
      case 'needs-setup':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Needs Setup</Badge>;
      case 'optional':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Optional Setup</Badge>;
      default:
        return <Badge variant="outline">Not Configured</Badge>;
    }
  };

  const getStatusColor = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'needs-setup':
        return 'border-amber-200 bg-amber-50';
      case 'optional':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-800">Module Configuration Status</h3>
            <div className="text-sm text-purple-700">
              {completedCount} of {modules.length} modules configured
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{needsSetupCount}</div>
              <div className="text-sm text-amber-700">Needs Setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{optionalCount}</div>
              <div className="text-sm text-blue-700">Optional</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / modules.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Module List */}
      <div className="space-y-3">
        {modules.map((module) => (
          <Card key={module.id} className={cn("transition-all duration-200", getStatusColor(module.status))}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(module.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{module.name}</h4>
                      {getStatusBadge(module.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                    
                    {module.status !== 'completed' && module.nextSteps && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Next steps: </span>
                        {module.nextSteps.slice(0, 2).join(' • ')}
                        {module.nextSteps.length > 2 && ' • ...'}
                      </div>
                    )}
                  </div>
                </div>
                
                {module.estimatedTime && module.status !== 'completed' && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {module.estimatedTime}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Setup Guidance */}
      {needsSetupCount > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Setup Required</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {needsSetupCount} module{needsSetupCount > 1 ? 's' : ''} need{needsSetupCount === 1 ? 's' : ''} configuration 
              before your event is ready. You can set these up after creating your event.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModuleCompletionTracker;
