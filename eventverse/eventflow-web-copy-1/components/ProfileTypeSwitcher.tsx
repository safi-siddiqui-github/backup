import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, ToggleLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ProfileTypeSwitcherProps {
  className?: string;
}

const ProfileTypeSwitcher = ({ className = "" }: ProfileTypeSwitcherProps) => {
  const { user, switchProfileType } = useAuth();

  if (!user) return null;

  const handleSwitch = (type: 'personal' | 'professional') => {
    switchProfileType(type);
  };

  return (
    <Card className={`gradient-card ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <ToggleLeft className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Profile Type</h3>
          <Badge variant="outline" className="ml-auto">
            {user.activeProfileType === 'personal' ? 'Personal' : 'Professional'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={user.activeProfileType === 'personal' ? 'default' : 'outline'}
            className="flex items-center gap-3 h-auto p-4 justify-start"
            onClick={() => handleSwitch('personal')}
          >
            <User className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Personal Profile</div>
              <div className="text-xs opacity-70">
                Show your personal interests and social connections
              </div>
            </div>
          </Button>
          
          <Button
            variant={user.activeProfileType === 'professional' ? 'default' : 'outline'}
            className="flex items-center gap-3 h-auto p-4 justify-start"
            onClick={() => handleSwitch('professional')}
          >
            <Briefcase className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Professional Profile</div>
              <div className="text-xs opacity-70">
                Showcase your business and event expertise
              </div>
            </div>
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Switch between personal and professional profiles to control what information 
            is displayed to different audiences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTypeSwitcher;