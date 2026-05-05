"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getModuleConfig, type ModuleType } from "@/lib/config/moduleRegistry";
import { Routes } from "@/lib/lib-routes";
import { ClientPropType } from "@/type";
import { Box } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ElementType, useEffect, useMemo, useState } from "react";

interface EventDashboardModuleCardComponentProps extends ClientPropType {
  moduleType: ModuleType;
}

export default function EventDashboardModuleCardComponent({
  actionResponseDataType,
  slug,
  moduleType,
}: EventDashboardModuleCardComponentProps) {
  //
  const router = useRouter();
  const moduleConfig = getModuleConfig(moduleType);
  const moduleKey = moduleConfig?.getModuleKey() || "";
  const moduleData =
    actionResponseDataType?.[moduleKey as keyof typeof actionResponseDataType];
  //
  const [pageData, setPageData] = useState<{
    eventModule?: {
      parentName?: string | null;
      name?: string | null;
      description?: string | null;
      icon?: ElementType | null;
      iconBtnBg?: string | null;
      cardBorCol?: string | null;
      slug?: string | null;
      href?: string | null;
      hrefType?: string | null;
      hrefSlug?: string | null;
    };
  }>({
    eventModule: {
      parentName: "Category...",
      name: "Title...",
      description: "Description...",
      iconBtnBg: "bg-secondary",
      slug: "test-module",
      // href: `${Routes.web.auth.dashboard.name}${Routes.web.auth.dashboard.events.name}/${slug}`,
      href: `${Routes.web.auth.dashboardEventDetail}/${slug}`,
    },
  });
  //
  const memoizedIcon = useMemo(() => {
    const Icon = pageData?.eventModule?.icon ?? Box;
    return Icon ? <Icon className="size-14 text-white" /> : null;
  }, [pageData?.eventModule?.icon]);
  //
  useEffect(() => {
    //
    if (!moduleConfig) {
      return;
    }

    // If module exists in database, use its data
    if (moduleData) {
      const moduleWithCategory = moduleData as { moduleCategory?: { parent?: { name: string }, name: string, description?: string } };

      setPageData({
        eventModule: {
          parentName: moduleWithCategory?.moduleCategory?.parent?.name,
          name: moduleWithCategory?.moduleCategory?.name,
          description: moduleWithCategory?.moduleCategory?.description,
          icon: moduleConfig.icon,
          iconBtnBg: moduleConfig.iconBtnBg,
          cardBorCol: moduleConfig.cardBorCol,
          hrefType: moduleConfig.hrefType,
          hrefSlug: "test",
        },
      });
    } else {
      setPageData({
        eventModule: {
          parentName: "Event Management",
          name:
            moduleConfig.moduleCategorySlug
              ?.replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()) || "Module",
          description: `Manage your event's ${moduleConfig.moduleCategorySlug?.replace(/-/g, " ") || "module"}`,
          icon: moduleConfig.icon,
          iconBtnBg: moduleConfig.iconBtnBg,
          cardBorCol: moduleConfig.cardBorCol,
          hrefType: moduleConfig.hrefType,
          hrefSlug: "test", // Will link to setup page
        },
      });
    }
    //
  }, [slug, moduleConfig, moduleData]);
  //
  return (
    <div className="flex flex-col overflow-hidden xl:p-3">
      {/*  */}

      {/*  */}
      <div>
        {/*  */}
        <Link
          href={`${Routes.web.auth.dashboardEventDetail}/${slug}/${pageData?.eventModule?.hrefType}/${pageData?.eventModule?.hrefSlug}`}
        >
          <Card
            className={`group bg-link-to-br rounded-md border-slate-700/50 from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-sm transition-all ease-linear hover:-translate-y-1 hover:border-slate-600/70 hover:from-slate-800/95 hover:via-slate-700/85 hover:shadow-xl xl:hover:scale-105 ${pageData?.eventModule?.cardBorCol}`}
          >
            <CardContent className="flex flex-col items-center gap-2.5 text-center">
              <div
                className={`rounded-md p-4 ${pageData?.eventModule?.iconBtnBg}`}
              >
                {memoizedIcon}
              </div>
              <CardTitle className="text-white">
                {pageData?.eventModule?.name}
              </CardTitle>
              <Badge
                variant={"secondary"}
                className="border-green-500/30 bg-green-600/20 text-green-300"
              >
                Free
              </Badge>
              <Badge
                variant={"outline"}
                className="border-slate-600/50 text-slate-300"
              >
                {pageData?.eventModule?.parentName}
              </Badge>
              <p className="max-w-xs text-sm tracking-tight text-slate-300">
                {pageData?.eventModule?.description}
              </p>
            </CardContent>
          </Card>
        </Link>
        {/*  */}
      </div>
      {/*  */}

      {/*  */}
    </div>
  );
}
