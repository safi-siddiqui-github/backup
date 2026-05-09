import DashboardTabs from "@/components/general/dashboard/DashboardTabs";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 p-4 md:px-10 md:py-8">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold md:text-3xl md:font-bold">
            Dashboard
          </p>
          <Badge>
            <Trophy />
            Level 3
          </Badge>
        </div>
        <p className="">Manage your events and track your achievements</p>
      </div>

      <DashboardTabs />
    </div>
  );
}
