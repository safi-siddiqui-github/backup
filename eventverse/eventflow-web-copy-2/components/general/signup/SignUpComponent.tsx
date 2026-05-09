import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function SignUpComponent() {
  return (
    <div>
      <Card className="flex flex-col gap-10">
        <CardHeader className="flex flex-col gap-2 font-semibold">
          <p>Hello !</p>
          <p>Create Account</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Full Name"
                type="text"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label>Enter Your Email</Label>
              <Input
                placeholder="Enter Your Email"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Phone Number</Label>

            <Input
              placeholder="Phone Number"
              type="text"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <Label>Enter Your Password</Label>
              <Input
                placeholder="Enter Your Password"
                type="text"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label>Repeat Password</Label>
              <Input
                placeholder="Repeat Password"
                type="text"
              />
            </div>
          </div>
        </CardContent>

        <CardContent className="flex items-center gap-2">
          <Input
            className="size-4"
            type="checkbox"
          />
          <p>
            By creating an account, I agree to the
            <span className="text-purple-600"> Terms and Conditions</span>
          </p>
        </CardContent>
        {/*  */}
        {/*  */}
        <CardContent>
          <Button className="bg-purple-600 hover:bg-purple-700 w-full">Sign Up</Button>
          </CardContent>
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
              className="font-medium hover:bg-purple-600"
            >
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
