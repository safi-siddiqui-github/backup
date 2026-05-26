import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "../ui/sonner";

export default function AppAddonComponent() {
  return (
    <>
      <VercelComponent />
      <ShadcnComponent />
    </>
  );
}

const VercelComponent = () => {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

const ShadcnComponent = () => {
  return <Toaster />;
};
