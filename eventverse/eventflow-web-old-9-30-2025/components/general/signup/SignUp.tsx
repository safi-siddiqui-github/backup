import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  return (
    <div>
      <Card>
        <CardHeader>
          <p>Hello !</p>
          <p>Create Account</p>
        </CardHeader>

        <CardContent>
          <div className="flex">
            <div>
              <Label>
                Full Name
                <Input
                  placeholder="Full Name"
                  type="text"
                />
              </Label>
            </div>

            <div>
              <Label>
                Enter Your Email
                <Input
                  placeholder="Enter Your Email"
                  type="text"
                />
              </Label>
            </div>
          </div>

          <div>
            <Label>
              Phone Number
              <Input
                placeholder="Phone Number"
                type="text"
              />
            </Label>
          </div>

          <div className="flex">
            <div>
              <Label>
                Enter Your Password
                <Input
                  placeholder="Enter Your Password"
                  type="text"
                />
              </Label>
            </div>

            <div>
              <Label>
                Repeat Password
                <Input
                  placeholder="Repeat Password"
                  type="text"
                />
              </Label>
            </div>
          </div>
        </CardContent>

        <CardContent className="flex items-center">
          <Input className="size-4 "
          
          type="checkbox"/>
          <p>
            By creating an account, I agree to the
            <span>Terms and Conditions</span>
          </p>
        </CardContent>
            <Button>
                Sign Up
            </Button>
        <CardContent className="flex items-center">
          <hr className="flex-1" />
          <p className="px-10">OR</p>
          <hr className="flex-1" />
        </CardContent>

        <CardContent className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <p>Continue With</p>

            <div className="flex items-center gap-4">
              <Apple />
              <Facebook />
              <Instagram />
              <Twitter />
            </div>
          </div>

          <p>
            Already have an account{" "}
            <Link
              href={"/login"}
              className="font-medium"
            >
              Log In
            </Link>
          </p>
        </CardContent>

      </Card>
    </div>
  );
}
