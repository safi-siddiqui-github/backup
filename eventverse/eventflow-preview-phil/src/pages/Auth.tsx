import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthBrandingSide from "@/components/auth/AuthBrandingSide";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import OnboardingWizard from "@/components/auth/OnboardingWizard";
import { User } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [newUser, setNewUser] = useState<User | null>(null);

  const handleAuthenticated = (user: User) => {
    if (user.needsOnboarding) {
      setNewUser(user);
      setShowOnboarding(true);
    } else {
      login(user as any);
      navigate('/events');
    }
  };

  const handleOnboardingComplete = (preferences: any) => {
    if (newUser) {
      const completeUser = {
        ...newUser,
        preferences,
        needsOnboarding: false
      };
      login(completeUser as any);
      
      if (preferences.wantsTour && preferences.tourType === 'interactive') {
        navigate('/events?tour=start');
      } else {
        navigate('/events');
      }
    }
  };

  if (showOnboarding && newUser) {
    return <OnboardingWizard user={newUser} onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Full Background */}
      <AuthBrandingSide />

      {/* Centered Auth Forms */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 bg-background/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-border/50">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to EventVerse</h1>
            <p className="text-muted-foreground mt-2">Sign in to continue or create a new account</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-6 mt-6">
              <SocialLoginButtons onAuthenticated={handleAuthenticated} />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
                </div>
              </div>

              <SignInForm onAuthenticated={handleAuthenticated} />
            </TabsContent>

            <TabsContent value="signup" className="space-y-6 mt-6">
              <SocialLoginButtons onAuthenticated={handleAuthenticated} />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or sign up with email</span>
                </div>
              </div>

              <SignUpForm onAuthenticated={handleAuthenticated} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
