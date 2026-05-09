import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Department } from "@/data/mockOrganizations";
import { OrganizationMember } from "@/data/mockEmployees";

interface DepartmentCardProps {
  department: Department;
  employees: OrganizationMember[];
  headEmployee?: OrganizationMember;
}

const DepartmentCard = ({ department, employees, headEmployee }: DepartmentCardProps) => {
  const deptEmployees = employees.slice(0, 5);
  
  return (
    <Card className="border-l-4 hover:shadow-lg transition-shadow bg-card" style={{ borderLeftColor: department.color }}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>{department.name}</span>
          <Badge variant="outline">{department.employeeCount} members</Badge>
        </CardTitle>
        <CardDescription>{department.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Department head */}
        {headEmployee && (
          <div className="mb-4">
            <Label className="text-xs text-muted-foreground">Department Head</Label>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={headEmployee.profilePhoto} />
                <AvatarFallback>{headEmployee.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-foreground">{headEmployee.name}</p>
                <p className="text-xs text-muted-foreground">{headEmployee.jobTitle}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Team members preview */}
        <div>
          <Label className="text-xs text-muted-foreground">Team Members</Label>
          <div className="flex -space-x-2 mt-2">
            {deptEmployees.map(emp => (
              <Avatar key={emp.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={emp.profilePhoto} />
                <AvatarFallback>{emp.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
            {department.employeeCount > 5 && (
              <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-foreground">
                +{department.employeeCount - 5}
              </div>
            )}
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-4" size="sm">
          View All Members
        </Button>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
