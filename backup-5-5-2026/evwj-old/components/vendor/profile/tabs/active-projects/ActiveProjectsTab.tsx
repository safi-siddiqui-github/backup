"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Users,
  DollarSign,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnalyticsCard from "./AnalyticsCard";
import ProjectCard from "./ProjectCard";
import { MOCK_ANALYTICS, MOCK_PROJECTS } from "./mock-data";

export default function ActiveProjectsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Paginated projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return MOCK_PROJECTS.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(MOCK_PROJECTS.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Active Projects
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Monitor progress across all your client engagements
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          icon={Users}
          label="Active Projects"
          value={MOCK_ANALYTICS.activeProjects}
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <AnalyticsCard
          icon={DollarSign}
          label="Total Value"
          value={`$${MOCK_ANALYTICS.totalValue.toLocaleString()}`}
          iconColor="text-green-600 dark:text-green-400"
        />
        <AnalyticsCard
          icon={Clock}
          label="Due This Week"
          value={MOCK_ANALYTICS.dueThisWeek}
          iconColor="text-orange-600 dark:text-orange-400"
        />
        <AnalyticsCard
          icon={AlertTriangle}
          label="At Risk"
          value={MOCK_ANALYTICS.atRisk}
          iconColor="text-red-600 dark:text-red-400"
        />
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination */}
      {MOCK_PROJECTS.length > 0 && (
        <Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  Items per page:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(endIndex, MOCK_PROJECTS.length)} of{" "}
                  {MOCK_PROJECTS.length}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-2 text-sm text-gray-600 dark:text-slate-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages, prev + 1),
                      )
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

