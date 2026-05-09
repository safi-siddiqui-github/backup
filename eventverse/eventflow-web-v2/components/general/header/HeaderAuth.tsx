import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import CreateEventDialog from "../event/CreateEventDialog";
import CreateEventTrigger from "../event/CreateEventTrigger";
import HeaderDropdown from "./HeaderDropdown";

export default function HeaderAuth() {
  return (
    <div className="">
      <SignedOut>
        <SignInButton>
          <Button variant={"outline"}>
            <LogIn />
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-2">
          {/* <UserButton /> */}
          <CreateEventTrigger />

          <HeaderDropdown />

          <CreateEventDialog />
        </div>
      </SignedIn>
    </div>
  );
}
