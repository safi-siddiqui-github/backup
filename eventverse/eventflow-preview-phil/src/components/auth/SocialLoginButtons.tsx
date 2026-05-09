import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";
import { useState } from "react";
import { mockSocialUsers } from "@/data/mockAuthResponses";
import { User } from "@/types/auth";

interface SocialLoginButtonsProps {
  onAuthenticated: (user: User) => void;
}

const SocialLoginButtons = ({ onAuthenticated }: SocialLoginButtonsProps) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSocialLogin = async (provider: keyof typeof mockSocialUsers) => {
    setLoadingProvider(provider);
    
    // Simulate OAuth flow
    setTimeout(() => {
      const user = mockSocialUsers[provider];
      onAuthenticated(user);
      setLoadingProvider(null);
    }, 1500);
  };

  const providers = [
    {
      id: 'google' as const,
      name: 'Google',
      icon: Chrome,
      className: 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
    },
    {
      id: 'microsoft' as const,
      name: 'Microsoft',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
          <path fill="#f25022" d="M0 0h11v11H0z"/>
          <path fill="#00a4ef" d="M12 0h11v11H12z"/>
          <path fill="#7fba00" d="M0 12h11v11H0z"/>
          <path fill="#ffb900" d="M12 12h11v11H12z"/>
        </svg>
      ),
      className: 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
    },
    {
      id: 'apple' as const,
      name: 'Apple',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
      ),
      className: 'bg-black hover:bg-gray-900 text-white border-2 border-black'
    },
    {
      id: 'github' as const,
      name: 'GitHub',
      icon: Github,
      className: 'bg-gray-900 hover:bg-gray-800 text-white border-2 border-gray-900'
    },
    {
      id: 'linkedin' as const,
      name: 'LinkedIn',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
        </svg>
      ),
      className: 'bg-[#0A66C2] hover:bg-[#004182] text-white border-2 border-[#0A66C2]'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {providers.slice(0, 2).map((provider) => {
          const Icon = provider.icon;
          return (
            <Button
              key={provider.id}
              type="button"
              variant="outline"
              className={`w-full ${provider.className}`}
              onClick={() => handleSocialLogin(provider.id)}
              disabled={loadingProvider !== null}
            >
              {loadingProvider === provider.id ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
              <span className="ml-2">{provider.name}</span>
            </Button>
          );
        })}
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {providers.slice(2).map((provider) => {
          const Icon = provider.icon;
          return (
            <Button
              key={provider.id}
              type="button"
              variant="outline"
              className={`w-full ${provider.className}`}
              onClick={() => handleSocialLogin(provider.id)}
              disabled={loadingProvider !== null}
            >
              {loadingProvider === provider.id ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLoginButtons;
