"use client";

import { FlexRowComponent } from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";
import { ConstantRoutes } from "@/constants/constants-routes";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { RiDashboardFill } from "react-icons/ri";

export default function BlogHeaderClerkComponent() {
  return (
    <FlexRowComponent>
      <Show when={"signed-in"}>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Dashboard"
              labelIcon={<RiDashboardFill className="size-4" />}
              href={ConstantRoutes.blog.dashboard}
            />
          </UserButton.MenuItems>
        </UserButton>
      </Show>
      <Show when={"signed-out"}>
        <Button asChild>
          <SignInButton />
        </Button>
      </Show>
    </FlexRowComponent>
  );
}
