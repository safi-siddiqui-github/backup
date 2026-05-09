
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import Layout from "./components/Layout";
import Index from "./pages/Index";
import UserDashboard from "./components/UserDashboard";
import PublicEvents from "./pages/PublicEvents";
import EventDetails from "./pages/EventDetails";
import EventManagement from "./pages/EventManagement";
import GuestPortal from "./pages/GuestPortal";
import HostProfile from "./pages/HostProfile";
import GuestShowcase from "./pages/GuestShowcase";
import OrganizationProfile from "./pages/OrganizationProfile";
import Modules from "./pages/Modules";
import ModuleAnalytics from "./pages/ModuleAnalytics";
import ModuleAnnouncements from "./pages/ModuleAnnouncements";
import ModuleBudget from "./pages/ModuleBudget";
import ModuleGames from "./pages/ModuleGames";
import ModuleMedia from "./pages/ModuleMedia";
import ModuleRSVP from "./pages/ModuleRSVP";
import ModuleSchedule from "./pages/ModuleSchedule";
import ModuleSeating from "./pages/ModuleSeating";
import ModuleSurvey from "./pages/ModuleSurvey";
import ModuleWebsiteBuilder from "./pages/ModuleWebsiteBuilder";
import ModuleTicketing from "./pages/ModuleTicketing";
import ModuleTravel from "./pages/ModuleTravel";
import ModuleMarketing from "./pages/ModuleMarketing";
import Settings from "./pages/Settings";
import VendorPortal from "./pages/VendorPortal";
import VendorLanding from "./pages/VendorLanding";
import Calendar from "./pages/Calendar";
import { VendorBoothLocationView } from "./components/vendor/VendorBoothLocationView";
import NotFound from "./pages/NotFound";
import { AuthProvider } from './hooks/useAuth';

import AuthDemo from "./pages/AuthDemo";
import EventCreation from "./pages/EventCreation";
import Auth from "./pages/Auth";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
import Careers from "./pages/Careers";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-event" element={<EventCreation />} />
            <Route path="/events/:eventId/edit" element={<EventCreation />} />
            <Route path="/public-events" element={<PublicEvents />} />
            <Route path="/dashboard" element={<Navigate to="/events" replace />} />
            <Route path="/guest/:eventId" element={<GuestPortal />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/events/:eventId/management" element={<EventManagement />} />
            <Route path="/events/:eventId/guest" element={<GuestPortal />} />
            <Route path="/host/:hostId" element={<HostProfile />} />
            <Route path="/org/:orgId" element={<OrganizationProfile />} />
            <Route path="/guest-showcase" element={<GuestShowcase />} />
            <Route path="/auth-demo" element={<AuthDemo />} />
            <Route path="/vendor-landing" element={<VendorLanding />} />
            <Route path="/vendor/booth-location/:invitationId" element={<VendorBoothLocationView />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            
            {/* Protected Routes with Layout */}
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/events" element={<UserDashboard />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/modules/analytics" element={<ModuleAnalytics />} />
              <Route path="/modules/announcements" element={<ModuleAnnouncements />} />
              <Route path="/modules/budget" element={<ModuleBudget />} />
              <Route path="/modules/games" element={<ModuleGames />} />
              <Route path="/modules/media" element={<ModuleMedia />} />
              <Route path="/modules/rsvp" element={<ModuleRSVP />} />
              <Route path="/modules/schedule" element={<ModuleSchedule />} />
              <Route path="/modules/seating" element={<ModuleSeating />} />
        <Route path="/modules/survey" element={<ModuleSurvey />} />
        <Route path="/modules/website-builder" element={<ModuleWebsiteBuilder />} />
              <Route path="/modules/ticketing" element={<ModuleTicketing />} />
              <Route path="/modules/travel" element={<ModuleTravel />} />
              <Route path="/modules/marketing" element={<ModuleMarketing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/vendor" element={<VendorPortal />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
