import { Routes } from "@/lib/lib-routes";
import Link from "next/link";
import { FaApple, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImLinkedin } from "react-icons/im";

export default function WebGuestSocialLoginComponent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <p className="font-medium">OR</p>
        <hr className="flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-4 *:flex *:items-center *:justify-center *:gap-2 *:rounded-md *:border *:p-2 *:font-medium *:shadow *:hover:underline">
        <Link
          prefetch={false}
          href={`/api${Routes?.api?.web.guest?.socialSigninGoogleRedirect}`}
        >
          <FcGoogle />
          <span>Google</span>
        </Link>
        <Link
          prefetch={false}
          href={`/api${Routes?.api?.web.guest?.socialSigninMicrosoftRedirect}`}
        >
          <FaMicrosoft />
          <span>Microsoft</span>
        </Link>
        <Link
          prefetch={false}
          href={`/api${Routes?.api?.web.guest?.socialSigninGoogleRedirect}`}
        >
          <FaApple />
          <span>Apple</span>
        </Link>
        <Link
          prefetch={false}
          href={`/api${Routes?.api?.web.guest?.socialSigninGoogleRedirect}`}
        >
          <ImLinkedin />
          <span>LinkedIn</span>
        </Link>
      </div>
    </div>
  );
}
