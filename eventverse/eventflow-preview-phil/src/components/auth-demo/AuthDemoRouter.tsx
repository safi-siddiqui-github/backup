
import { useState } from "react";
import { useStandaloneAuth } from "./StandaloneAuthProvider";
import { StandaloneSignupModal } from "./StandaloneSignupModal";
import { RoleBasedDashboard } from "./RoleBasedDashboard";
import { OrganizationSetupWizard } from "./OrganizationSetupWizard";
import { TeamManagementDemo } from "./TeamManagementDemo";
import { OrganizationSettings } from "./OrganizationSettings";

type DemoPage = 'auth' | 'org-setup' | 'dashboard' | 'team-management' | 'org-settings';

export const AuthDemoRouter = () => {
  const { user, organization } = useStandaloneAuth();
  const [currentPage, setCurrentPage] = useState<DemoPage>('auth');
  const [showSignup, setShowSignup] = useState(false);

  // If no user, show authentication
  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Authentication Demo</h1>
            <p className="text-gray-600 mb-8">Sign up to experience the new authentication system</p>
            <button
              onClick={() => setShowSignup(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </div>
        <StandaloneSignupModal 
          isOpen={showSignup} 
          onClose={() => setShowSignup(false)} 
        />
      </>
    );
  }

  // If business user but no organization, show org setup
  if (user.accountType === 'business' && !organization && currentPage !== 'org-setup') {
    return <OrganizationSetupWizard onComplete={() => setCurrentPage('dashboard')} />;
  }

  // Route to different pages based on current page
  switch (currentPage) {
    case 'org-setup':
      return <OrganizationSetupWizard onComplete={() => setCurrentPage('dashboard')} />;
    case 'team-management':
      return <TeamManagementDemo onBack={() => setCurrentPage('dashboard')} />;
    case 'org-settings':
      return <OrganizationSettings onBack={() => setCurrentPage('dashboard')} />;
    case 'dashboard':
    default:
      return <RoleBasedDashboard onNavigate={setCurrentPage} />;
  }
};
