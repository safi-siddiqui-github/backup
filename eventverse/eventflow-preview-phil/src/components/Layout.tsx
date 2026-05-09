
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3 } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import BreadcrumbNavigation from "./BreadcrumbNavigation";
import { CalendarPopover } from "./calendar/CalendarPopover";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPublicEventsPage = location.pathname === "/public-events";

  // Don't show header on public events page since it has its own header
  if (isPublicEventsPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              EventVerse
            </Link>
            
            <div className="flex items-center gap-4">
              <Button asChild variant="outline">
                <Link to="/modules">
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Modules
                </Link>
              </Button>
              <Button 
                onClick={() => navigate('/create-event')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
              <CalendarPopover />
              <ProfileDropdown />
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 dark:border-gray-700">
          <BreadcrumbNavigation />
        </div>
      </header>

      {/* Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
