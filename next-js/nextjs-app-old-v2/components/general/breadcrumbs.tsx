'use client';

import { AppRoutes } from '@/lib/general/routes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shadcn/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [paths, setPaths] = useState<{ title: string; url: string }[]>();
  const [currentPage, setCurrentPage] = useState<string | undefined>('');

  useEffect(() => {
    if (pathname) {
      let current = '';
      const optimize = pathname
        .split('/')
        .filter((each) => each !== '')
        .map((each) => {
          current += `/${each}`;
          return {
            title: each.charAt(0).toUpperCase() + each.slice(1),
            url: current,
          };
        });

      const lastPath = optimize.pop();
      setCurrentPage(lastPath?.title);
      setPaths(optimize);
    }
  }, [pathname]);

  return (
    <div className='flex items-center p-4'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={AppRoutes.homepage}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {currentPage && <BreadcrumbSeparator />}

          {paths?.map((each, index) => (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={each.url}>{each.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}

          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
