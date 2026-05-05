"use client";

import { DeleteCookieHelper } from "@/lib/lib-cookie";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Label } from "@/shadcn/ui/label";
import { Spinner } from "@/shadcn/ui/spinner";
import { Switch } from "@/shadcn/ui/switch";
import { useUserStore } from "@/store/store-user";
import {
  BoxIcon,
  CircleDollarSignIcon,
  HouseIcon,
  LayoutDashboardIcon,
  LockIcon,
  LogInIcon,
  LogOutIcon,
  MoonIcon,
  PlusCircleIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function WebHeaderDropdownComponent() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col">
      {user?.email ? (
        user?.emailVerified ? (
          <DropdownAuthMenuComponent />
        ) : (
          <DropdownAuthUnverifiedMenuComponent />
        )
      ) : (
        <DropdownGuestMenuComponent />
      )}
    </div>
  );
}

function AvatarComponent() {
  const { user } = useUserStore();
  return (
    <Avatar className="size-9">
      <AvatarImage
        // src="https://github.com/shadcn.png"
        className="object-cover"
        // src={userStore?.user?.avatar ?? Images?.asset?.user?.clark}
        src={
          user?.email
            ? Images?.asset?.user?.clark
            : Images?.asset?.user?.placeholder
        }
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

function DropdownGuestMenuComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <AvatarComponent />
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
      >
        <DropdownMenuLabel>EventVerse</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EventDropDownGroupComponent />
        <DropdownMenuSeparator />
        <GeneralDropDownGroupComponent />
        <DropdownMenuSeparator />
        <GuestActionDropDownGroupComponent />
        <DropdownMenuSeparator />
        <ModeToggleActionGroupComponent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownAuthMenuComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <AvatarComponent />
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
      >
        <AuthAboutDropDownGroupComponent />
        <DropdownMenuSeparator />
        <EventDropDownGroupComponent />
        <DropdownMenuSeparator />
        <AuthNavVerifiedDropDownGroupComponent />
        <DropdownMenuSeparator />
        <GeneralDropDownGroupComponent />
        <DropdownMenuSeparator />
        <AuthActionDropDownGroupComponent />
        <DropdownMenuSeparator />
        <ModeToggleActionGroupComponent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownAuthUnverifiedMenuComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <AvatarComponent />
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
      >
        <AuthAboutDropDownGroupComponent />
        <DropdownMenuSeparator />
        <EventDropDownGroupComponent />
        <DropdownMenuSeparator />
        <AuthNavUnverifiedDropDownGroupComponent />
        <DropdownMenuSeparator />
        <GeneralDropDownGroupComponent />
        <DropdownMenuSeparator />
        <AuthActionDropDownGroupComponent />
        <DropdownMenuSeparator />
        <ModeToggleActionGroupComponent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthAboutDropDownGroupComponent() {
  const { user } = useUserStore();
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>
        {user?.firstname} {user?.lastname}
      </DropdownMenuLabel>
      <DropdownMenuItem disabled>{user?.email}</DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function AuthNavUnverifiedDropDownGroupComponent() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Navigate</DropdownMenuLabel>
      <DropdownMenuItem disabled>
        Dashboard
        <DropdownMenuShortcut>
          <LockIcon />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        Profile
        <DropdownMenuShortcut>
          <LockIcon />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        Billing
        <DropdownMenuShortcut>
          <LockIcon />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function AuthNavVerifiedDropDownGroupComponent() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Navigate</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.auth.dashboard}>
          Dashboard
          <DropdownMenuShortcut>
            <LayoutDashboardIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.auth.dashboard}>
          Profile
          <DropdownMenuShortcut>
            <UserIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.auth.dashboard}>
          Billing
          <DropdownMenuShortcut>
            <CircleDollarSignIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function GuestActionDropDownGroupComponent() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.guest?.signin}>
          Sign In
          <DropdownMenuShortcut>
            <LogInIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.guest?.signup}>
          Sign Up
          <DropdownMenuShortcut>
            <LogInIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function AuthActionDropDownGroupComponent() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <LogoutFormComponent />
    </DropdownMenuGroup>
  );
}

function LogoutFormComponent() {
  const router = useRouter();
  const userStore = useUserStore();
  const form = useForm();
  async function onSubmit() {
    await DeleteCookieHelper();
    userStore?.setUser(undefined);
    router.push(Routes.web.guest.signin);
  }
  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Button
        type="submit"
        variant={"destructive"}
        disabled={form?.formState?.isSubmitting}
      >
        Logout
        {form?.formState?.isSubmitting ? <Spinner /> : <LogOutIcon />}
      </Button>
    </form>
  );
}

function EventDropDownGroupComponent() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Events</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.general?.eventsCreateBasic}>
          Create
          <DropdownMenuShortcut>
            <PlusCircleIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.general?.eventsDiscover}>
          Discover
          <DropdownMenuShortcut>
            <BoxIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function GeneralDropDownGroupComponent() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Quick Pages</DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={Routes?.web?.general?.home}>
          Home
          <DropdownMenuShortcut>
            <HouseIcon />
          </DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Features
        <DropdownMenuShortcut>
          <BoxIcon />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function ModeToggleActionGroupComponent() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Mode</DropdownMenuLabel>

      <div className="hover:bg-foreground/4 dark:hover:bg-foreground/9 rounded-sm p-2">
        <Label className="flex items-center justify-between font-normal">
          <span className="flex items-center gap-2">
            {isDark ? (
              <>
                Dark Mode <MoonIcon size={16} />
              </>
            ) : (
              <>
                Light Mode <SunIcon size={16} />
              </>
            )}
          </span>

          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </Label>
      </div>
    </DropdownMenuGroup>
  );
}
