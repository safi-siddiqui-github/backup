import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";

export default function ContactSectionTwoComponent() {
  return (
    <div className="flex flex-col gap-6 py-10 lg:grid lg:grid-cols-2">
      {/*  */}
      {/*  */}
      <div className="flex flex-col gap-4 p-4 text-center lg:text-left">
        {/*  */}
        <p className="text-2xl font-semibold">Contact US</p>
        {/*  */}
        <p className="lg:max-w-64">
          Email, call or complete the form to learn how{" "}
          <span className="font-medium"> Eventverse</span> can solve your
          messaging problem.
        </p>
        {/*  */}
        <div className="flex flex-col gap-5 py-4">
          <p className="flex items-center gap-5">
            <Button className="rounded-4xl bg-purple-600">
              <Mail />{" "}
            </Button>
            connect@eventverse.com
          </p>
          {/*  */}
          <p className="flex items-center gap-5">
            <Button className="rounded-4xl bg-purple-600">
              <Phone />{" "}
            </Button>
            +995 574 04 33 08{" "}
          </p>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <Card>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/*  */}
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
            {/*  */}
            <p>You can reach us anytime</p>
            {/*  */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            {/*  */}
            <Input placeholder="Your Email" />
            {/*  */}
            <Textarea placeholder="How can we help ? " />
            {/*  */}
            <Button className="w-full bg-purple-600">Submit</Button>
          </div>
        </CardContent>
        <CardContent>
          <CardDescription className="text-center tracking-tight">
            By contacting us, you agree to our{" "}
            <span className="font-semibold"> Terms of Service</span> and{" "}
            <span className="font-semibold"> Privacy Policy</span>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
