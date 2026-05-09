import { Apple, Facebook, Instagram, Twitter } from "lucide-react";

export default function SocialLoginComponent() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p>Continue With</p>

      <div className="flex items-center gap-4">
        <Apple />
        <Facebook />
        <Instagram />
        <Twitter />
      </div>
    </div>
  );
}
