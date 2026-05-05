import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaApple, FaMicrosoft } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { ImLinkedin } from "react-icons/im";

export default function SocialLoginComponent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <p className="font-medium">OR</p>
        <hr className="flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-4 *:flex *:items-center *:justify-center *:gap-2 *:rounded-md *:border *:p-2 *:font-medium *:shadow *:hover:underline">
        <Link href={"api/auth/google/redirect"}>
          <FcGoogle />
          <span>Google</span>
        </Link>
        <Button>
          <FaMicrosoft />
          <span>Microsoft</span>
        </Button>
        <Button>
          <FaApple />
          <span>Apple</span>
        </Button>
        <Button>
          <ImLinkedin />
          <span>LinkedIn</span>
        </Button>
      </div>
    </div>
  );
}
