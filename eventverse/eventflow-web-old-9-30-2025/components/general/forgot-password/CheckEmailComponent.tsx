import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function CheckEmailComponent() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Card>
        <CardHeader>
          <Mail />
        </CardHeader>

        <CardHeader>
          <p className="text-xl font-medium">Write Your Email Address</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p>To Reset Your Password, Please Insert your password below</p>
          <Input
            placeholder="Enter Email Address"
            type="text"
          />
          <Button>Sign Up</Button>
        </CardContent>
      </Card>
    </div>
  );
}
