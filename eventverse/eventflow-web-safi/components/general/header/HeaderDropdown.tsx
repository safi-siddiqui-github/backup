"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Routes } from "@/lib/routes";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard, LogIn, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function HeaderDropdown() {
  const { isSignedIn, user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-10 rounded-full bg-black text-white">
        DD
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 w-52 bg-white">
        <DropdownMenuLabel className="flex flex-col">
          {isSignedIn ? (
            <>
              <p className="">{user?.fullName}</p>
              <p className="text-xs font-normal">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </>
          ) : (
            <>
              User
              <p className="text-xs font-normal">john@gmail.com</p>
            </>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={Routes.dashboard}>
              <LayoutDashboard />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={Routes.setting}>
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {isSignedIn ? (
          <SignOutButton>
            <div className="flex items-center gap-2 rounded p-2 text-sm hover:bg-zinc-100">
              <LogOut className="size-4 text-zinc-500" />
              Sign Out
            </div>
          </SignOutButton>
        ) : (
          <SignInButton>
            <div className="flex items-center gap-2 rounded p-2 text-sm hover:bg-zinc-100">
              <LogIn className="size-4 text-zinc-500" />
              Sign In
            </div>
          </SignInButton>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
