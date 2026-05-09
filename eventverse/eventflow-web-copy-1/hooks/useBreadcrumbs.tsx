
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { breadcrumbRoutes } from '@/config/breadcrumbRoutes';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export const useBreadcrumbs = (dynamicData?: Record<string, any>) => {
  const location = useLocation();
  const params = useParams();

  const breadcrumbs = useMemo(() => {
    const currentPath = location.pathname;
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Find the matching route (including dynamic routes)
    const findMatchingRoute = (path: string) => {
      // First try exact match
      if (breadcrumbRoutes[path]) {
        return { route: breadcrumbRoutes[path], exactPath: path };
      }

      // Then try dynamic routes
      for (const [routePath, route] of Object.entries(breadcrumbRoutes)) {
        if (routePath.includes(':')) {
          const routeSegments = routePath.split('/');
          const pathSegments = path.split('/');

          if (routeSegments.length === pathSegments.length) {
            const isMatch = routeSegments.every((segment, index) => {
              return segment.startsWith(':') || segment === pathSegments[index];
            });

            if (isMatch) {
              return { route, exactPath: routePath };
            }
          }
        }
      }

      return null;
    };

    const matchResult = findMatchingRoute(currentPath);
    if (!matchResult) return [];

    const { route, exactPath } = matchResult;

    // Build breadcrumb chain by following parent relationships
    const buildBreadcrumbChain = (currentRoute: typeof route, currentExactPath: string): BreadcrumbItem[] => {
      const items: BreadcrumbItem[] = [];

      // Add parent breadcrumbs first
      if (currentRoute.parent) {
        const parentRoute = breadcrumbRoutes[currentRoute.parent];
        if (parentRoute) {
          items.push(...buildBreadcrumbChain(parentRoute, currentRoute.parent));
        }
      }

      // Add current item
      let label = currentRoute.label;
      if (currentRoute.dynamicLabel && params) {
        label = currentRoute.dynamicLabel(params, dynamicData);
      }

      // Build href - replace dynamic segments with actual values
      let href = currentExactPath;
      if (params && href.includes(':')) {
        Object.entries(params).forEach(([key, value]) => {
          href = href.replace(`:${key}`, value || '');
        });
      }

      items.push({
        label,
        href: href === currentPath ? currentPath : href,
        isActive: href === currentPath
      });

      return items;
    };

    return buildBreadcrumbChain(route, exactPath);
  }, [location.pathname, params, dynamicData]);

  return breadcrumbs;
};
