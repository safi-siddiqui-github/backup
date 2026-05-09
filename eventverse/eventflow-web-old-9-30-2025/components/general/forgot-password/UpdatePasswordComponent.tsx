import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdatePasswordComponent() {
  return (
    <div>
      <Card className="flex flex-col gap-2">
        <CardHeader className="text-xl font-medium">
          <p>Reset Your Password</p>
        </CardHeader>

        <CardContent>

          <Label>Enter New Password</Label>
          <Input placeholder="********"
          type="text" 
          />
          <p>
            Use 8 or more characters with mix of letters, numbers &symbols
          </p>
        </CardContent>

        <CardContent>

          <Label>Reset Your Pasplasword</Label>
          <Input placeholder="********"
          type="text" 
          />
        </CardContent>
        <Button>
            Save New Password
        </Button>
        
      </Card>

    </div>
  );
}
