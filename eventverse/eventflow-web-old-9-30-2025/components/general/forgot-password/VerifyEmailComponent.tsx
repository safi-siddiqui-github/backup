import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function VerifyEmailComponent() {
  return (
    <div>

      <Card className="flex flex-col gap-2">

        <CardHeader>
          <Mail />
        <p>
            Check Your Email
        </p>
        </CardHeader>

        <CardContent>
          <p>
            We have sent a link to reset your password to your email address:
          </p>
          <span>Name.surname12@gmail.com</span>
            <p>
              Please check your inbox and follow the instructions to create a new password.
            </p>

        <Button className="w-full">
          Resend Link
        </Button>
        </CardContent>
      </Card>
    </div>
  );
}
