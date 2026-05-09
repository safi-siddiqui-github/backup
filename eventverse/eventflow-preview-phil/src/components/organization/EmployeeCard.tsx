import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import { OrganizationMember } from "@/data/mockEmployees";
import { getIntegrationIcon, getRoleIcon, getRoleColor } from "@/lib/organizationUtils";

interface EmployeeCardProps {
  employee: OrganizationMember;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const IntegrationIcon = getIntegrationIcon(employee.addedVia);
  const RoleIcon = getRoleIcon(employee.role);

  return (
    <Card className="hover:shadow-xl transition-all hover:-translate-y-1 bg-card">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar with integration badge */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarImage src={employee.profilePhoto} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {employee.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Integration source badge */}
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 shadow-md border border-border">
              <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                <IntegrationIcon className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate text-foreground">{employee.name}</h3>
            <p className="text-sm text-muted-foreground truncate mb-2">
              {employee.jobTitle}
            </p>
            
            {/* Department and Role badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {employee.department}
              </Badge>
              
              <Badge className={`${getRoleColor(employee.role)} text-white border-0 text-xs`}>
                <RoleIcon className="w-3 h-3 mr-1" />
                {employee.role.replace('_', ' ')}
              </Badge>
            </div>
            
            {/* Contact info */}
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 flex-shrink-0" />
                  <span>{employee.phone}</span>
                </div>
              )}
              {employee.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>{employee.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
