import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdatePasswordComponent() {
  return (
    <div className="flex flex-col w-full max-w-2xl">
      <Card >
        <CardHeader className="text-xl font-semibold">
          <p>Reset Your Password</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">

          <Label>Enter New Password</Label>
          <Input placeholder="********"
          type="text" 
          />
          <p>
            Use 8 or more characters with mix of letters, numbers &symbols
          </p>
        </CardContent>

        <CardContent className="flex flex-col gap-2">

          <Label>Reset Your Pasplasword</Label>
          <Input placeholder="********"
          type="text" 
          />
        <Button  className="bg-purple-600 hover:bg-purple-700">
            Save New Password
        </Button>
        
        </CardContent>
      </Card>

    </div>
  );
}
