"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, User } from "lucide-react";
import { useState } from "react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";

interface StandaloneSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneSignupModal = ({
  isOpen,
  onClose,
}: StandaloneSignupModalProps) => {
  const { signup, login } = useStandaloneAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("individual");

  const [individualData, setIndividualData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleIndividualSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (individualData.password !== individualData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name: individualData.name,
        email: individualData.email,
        accountType: "individual",
      });
      onClose();
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (businessData.password !== businessData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name: businessData.name,
        email: businessData.email,
        accountType: "business",
      });
      onClose();
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password);
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Enhanced Authentication System
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="login">Sign In</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <Card>
              <CardHeader className="text-center">
                <User className="mx-auto mb-2 h-12 w-12 text-blue-600" />
                <CardTitle>Individual Account</CardTitle>
                <CardDescription>
                  Perfect for personal event planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleIndividualSignup}
                  className="space-y-4"
                >
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={individualData.name}
                      onChange={(e) =>
                        setIndividualData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={individualData.email}
                      onChange={(e) =>
                        setIndividualData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={individualData.password}
                      onChange={(e) =>
                        setIndividualData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={individualData.confirmPassword}
                      onChange={(e) =>
                        setIndividualData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Creating Account..."
                      : "Create Individual Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader className="text-center">
                <Building2 className="mx-auto mb-2 h-12 w-12 text-purple-600" />
                <CardTitle>Business Account</CardTitle>
                <CardDescription>
                  Team collaboration with role-based access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleBusinessSignup}
                  className="space-y-4"
                >
                  <div>
                    <Label>Your Name</Label>
                    <Input
                      value={businessData.name}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Work Email</Label>
                    <Input
                      type="email"
                      value={businessData.email}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={businessData.companyName}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={businessData.password}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={businessData.confirmPassword}
                      onChange={(e) =>
                        setBusinessData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Creating Account..."
                      : "Create Business Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card>
              <CardHeader className="text-center">
                <Mail className="mx-auto mb-2 h-12 w-12 text-green-600" />
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Welcome back to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
