import { calculatePasswordStrength } from "@/lib/authUtils";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  if (!password) return null;
  
  const strength = calculatePasswordStrength(password);
  
  return (
    <div className="space-y-2 mt-2">
      <Progress value={strength.percentage} className="h-2" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span 
          className="font-medium"
          style={{ color: strength.color }}
        >
          {strength.label}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
