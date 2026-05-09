
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorAuthProps {
  onAuthenticated: (vendor: VendorUser) => void;
}

const VendorAuth = ({ onAuthenticated }: VendorAuthProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    businessName: "",
    email: "",
    password: "",
    category: "",
    phone: "",
    location: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    "Venue", "Catering", "Entertainment", "Photography", "Videography",
    "Florist", "Decoration", "Transportation", "Audio/Visual", "Security",
    "Cleaning", "Rental", "Wedding Planning", "Beauty Services", "Other"
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const vendor: VendorUser = {
        id: Date.now().toString(),
        businessName: "Demo Vendor Business",
        email: loginData.email,
        category: "Catering",
        status: "active",
        profileComplete: true
      };

      onAuthenticated(vendor);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in to your vendor account.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.businessName || !signupData.email || !signupData.password || !signupData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      const vendor: VendorUser = {
        id: Date.now().toString(),
        businessName: signupData.businessName,
        email: signupData.email,
        category: signupData.category,
        status: "pending",
        profileComplete: false
      };

      onAuthenticated(vendor);
      
      // Show special message for venue vendors
      if (signupData.category === "Venue") {
        toast({
          title: "Venue Account Created!",
          description: "Welcome! You can now design your venue layouts with our advanced drawing tools.",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Welcome to the vendor portal. Please complete your profile.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Vendor Portal</h1>
          <p className="text-gray-600 mt-2">Grow your business with EventVerse</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Access Your Account</CardTitle>
            <CardDescription>
              Sign in to manage your business or create a new vendor account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@business.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="business-name"
                        placeholder="Your Business Name"
                        value={signupData.businessName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, businessName: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@business.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Business Category *</Label>
                    <Select value={signupData.category} onValueChange={(value) => setSignupData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1-555-0123"
                          value={signupData.phone}
                          onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="location"
                          placeholder="City, State"
                          value={signupData.location}
                          onChange={(e) => setSignupData(prev => ({ ...prev, location: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a secure password"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Vendor Account"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorAuth;
