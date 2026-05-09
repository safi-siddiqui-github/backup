
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Home } from "lucide-react";

interface BreadcrumbNavigationProps {
  dynamicData?: Record<string, any>;
  className?: string;
}

const BreadcrumbNavigation = ({ dynamicData, className }: BreadcrumbNavigationProps) => {
  const breadcrumbs = useBreadcrumbs(dynamicData);

  // Don't show breadcrumbs on home page or if there's only one item
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className={`py-3 ${className || ''}`}>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage className="flex items-center gap-1">
                    {index === 0 && <Home className="w-4 h-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={item.href} 
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                    >
                      {index === 0 && <Home className="w-4 h-4" />}
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
