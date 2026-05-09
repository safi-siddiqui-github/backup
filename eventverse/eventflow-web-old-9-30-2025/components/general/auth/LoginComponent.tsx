import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SocialLoginComponent from "./SocialLoginComponent";

export default function LoginComponent() {
  return (
    <div className="flex w-full max-w-2xl flex-col">
      <Card>
        <CardHeader>
          <p className="text-xl font-semibold">Hello! Log in</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Enter Login</Label>
            <Input placeholder="Email / Phone Number" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Enter Password</Label>
            <Input
              placeholder="********"
              type="password"
            />
            <Link
              href={"/login"}
              className="text-right font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex gap-2">
            <Input
              type="checkbox"
              className="size-4"
            />
            <Label>Remember Me</Label>
          </div>

          <Button>Log In</Button>
        </CardContent>

        <CardContent className="flex items-center">
          <hr className="flex-1" />
          <p className="px-10">OR</p>
          <hr className="flex-1" />
        </CardContent>

        <CardContent className="flex flex-col items-center gap-4">
          <SocialLoginComponent />

          <Link href={"/login"}>
            Dont have an account?
            <span className="font-medium"> Sign Up</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
