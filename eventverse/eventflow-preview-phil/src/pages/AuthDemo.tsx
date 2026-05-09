
import { useState } from "react";
import { StandaloneAuthProvider } from "@/components/auth-demo/StandaloneAuthProvider";
import { AuthDemoRouter } from "@/components/auth-demo/AuthDemoRouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";

const AuthDemo = () => {
  const [demoStarted, setDemoStarted] = useState(false);

  if (!demoStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enhanced Authentication System Demo
            </CardTitle>
            <p className="text-gray-600 mt-4">
              Experience our new multi-tier authentication system with individual and business accounts, 
              role-based permissions, and team management capabilities.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 border rounded-lg bg-white">
                <User className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Individual Accounts</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Personal event planning with full access to all features
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Personal dashboard</li>
                  <li>• Create unlimited events</li>
                  <li>• Access all modules</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg bg-white">
                <Building2 className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Business Organizations</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Team collaboration with role-based access control
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Admin, Viewer, Check-in roles</li>
                  <li>• Team member management</li>
                  <li>• Permission-based access</li>
                </ul>
              </div>
            </div>

            <Button 
              onClick={() => setDemoStarted(true)}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Authentication Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <StandaloneAuthProvider>
      <AuthDemoRouter />
    </StandaloneAuthProvider>
  );
};

export default AuthDemo;
