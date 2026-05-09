import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle } from "lucide-react";

interface Permission {
  name: string;
  description: string;
}

interface PermissionsDisplayProps {
  permissions: Permission[];
}

const PermissionsDisplay = ({ permissions }: PermissionsDisplayProps) => {
  return (
    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Required Permissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This integration needs the following permissions to function properly:
        </p>
        <div className="space-y-2">
          {permissions.map((permission, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{permission.name}</p>
                <p className="text-xs text-muted-foreground">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionsDisplay;
