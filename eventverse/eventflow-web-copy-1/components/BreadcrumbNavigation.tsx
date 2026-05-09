"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Routes } from "@/lib/routes";
import { Home } from "lucide-react";
import Link from "next/link";
// import { Link } from "react-router-dom";

interface BreadcrumbNavigationProps {
  dynamicData?: Record<string, unknown>;
  className?: string;
}

const BreadcrumbNavigation = ({
  dynamicData,
  className,
}: BreadcrumbNavigationProps) => {
  const breadcrumbs = useBreadcrumbs(dynamicData);

  // Don't show breadcrumbs on home page or if there's only one item
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className={`py-3 ${className || ""}`}>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <div
              key={item.href}
              className="flex items-center"
            >
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage className="flex items-center gap-1">
                    {index === 0 && <Home className="h-4 w-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={Routes.home}
                      className="flex items-center gap-1 transition-colors hover:text-blue-600"
                    >
                      {index === 0 && <Home className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNavigation;
