import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { pathConstants } from '@/constants/pathConstants';
import { ChartBarStacked, Hammer } from 'lucide-react';
import Link from 'next/link';
import LogoutFormComponent from '../form/LogoutFormComponent';
import { ModeToggleComponent } from '../provider/ModeToggleComponent';

export function SidebarComponent() {
  const items = [
    {
      mainHref: pathConstants.categories.read,
      mainTitle: 'Categories',
      mainIcon: <ChartBarStacked />,
      subMenu: [
        {
          title: 'Create',
          href: pathConstants.categories.create,
        },
        {
          title: 'Recover',
          href: pathConstants.categories.recover,
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={pathConstants.dashboard}>
                <Hammer className="size-14" />
                <span className="font-medium">SVESAP</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/*  */}
        <SidebarGroup>
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <SidebarGroupContent>
            {items?.map(({ mainHref, mainIcon, mainTitle, subMenu }, index) => (
              <SidebarMenu key={`menu-${index}`}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={mainHref}>
                      {mainIcon}
                      <span>{mainTitle}</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuSub>
                    {subMenu?.map(({ href, title }, index) => (
                      <SidebarMenuSubItem key={`sub-${index}`}>
                        <SidebarMenuSubButton asChild>
                          <Link href={href}>{title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                  {/*  */}
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ModeToggleComponent />
        <LogoutFormComponent />
      </SidebarFooter>
    </Sidebar>
  );
}
