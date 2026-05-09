"use client";

import LogoutComponent from "@/app/(web)/(auth)/_components/LogoutComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AxiosClient } from "@/lib/lib-axios";
import { AxiosAmplifyResponseHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { UserModelType } from "@/type/type-model";
import { FetchUserAttributesOutput } from "aws-amplify/auth";
import {
  Building2,
  LayoutDashboard,
  LogIn,
  Settings,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ThemeHandleComponent from "../theme/ThemeHandleComponent";

export function DropdownAccountComponent() {
  const [user, setUser] = useState<UserModelType>();
  const fetchUserFN = useCallback(async () => {
    const axiosRes =
      await AxiosAmplifyResponseHelper<FetchUserAttributesOutput>(
        async () => await AxiosClient.post(Routes.api.userFetchUserAttribute),
      );
    setUser(axiosRes?.data);
  }, [setUser]);
  useEffect(() => {
    fetchUserFN();
  }, [fetchUserFN]);
  //
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer min-[2560px]:h-10 min-[2560px]:w-10 lg:h-8 lg:w-8 xl:h-9 xl:w-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-xs min-[2560px]:text-base lg:text-xs xl:text-sm">
            CN
          </AvatarFallback>
        </Avatar>
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="max-w-64 min-w-56"
        align="start"
      >
        {user ? (
          <>
            <DropdownMenuLabel className="pb-0">{user?.name}</DropdownMenuLabel>
            <DropdownMenuLabel className="line-clamp-1 truncate pt-0 font-normal">
              {user?.email}
            </DropdownMenuLabel>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="pb-0">Guest</DropdownMenuLabel>
            <DropdownMenuLabel className="pt-0 font-normal">
              Viewing as guest
            </DropdownMenuLabel>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href={Routes.web.vendor.dashboard}>
            <DropdownMenuItem>
              <span>Switch to Vendor Profile</span>
              <DropdownMenuShortcut>
                <Building2 className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Manage</DropdownMenuLabel>

        <DropdownMenuGroup>
          <Link href={Routes.web.auth.dashboard}>
            <DropdownMenuItem>
              <span>Dashboard</span>
              <DropdownMenuShortcut>
                <LayoutDashboard />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <Link href={Routes.web.auth.dashboardSettings}>
            <DropdownMenuItem>
              <span>Settings</span>
              <DropdownMenuShortcut>
                <Settings />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <ThemeHandleComponent />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Account</DropdownMenuLabel>

        {user ? (
          <>
            <LogoutComponent />
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href={Routes.web.guest.signin}>
                <span>Log In</span>
                <DropdownMenuShortcut>
                  <LogIn />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={Routes.web.guest.signup}>
                <span>Sign Up</span>
                <DropdownMenuShortcut>
                  <UserPlus />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
