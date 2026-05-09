
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Users, Shield, CreditCard, Bell } from "lucide-react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";
import { GeneralSettings } from "./settings/GeneralSettings";
import { TeamSettings } from "./settings/TeamSettings";
import { SecuritySettings } from "./settings/SecuritySettings";
import { BillingSettings } from "./settings/BillingSettings";
import { NotificationSettings } from "./settings/NotificationSettings";

type SettingsTab = 'general' | 'team' | 'security' | 'billing' | 'notifications';

interface OrganizationSettingsProps {
  onBack: () => void;
}

export const OrganizationSettings = ({ onBack }: OrganizationSettingsProps) => {
  const { user, organization } = useStandaloneAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  if (!user || !organization) return null;

  const tabs = [
    { id: 'general' as const, label: 'General', icon: Settings },
    { id: 'team' as const, label: 'Team', icon: Users },
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'billing' as const, label: 'Billing', icon: CreditCard },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'team':
        return <TeamSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Organization Settings</h1>
            <p className="text-gray-600">{organization.name}</p>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};
