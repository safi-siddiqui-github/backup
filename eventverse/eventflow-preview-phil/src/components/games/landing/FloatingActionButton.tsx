import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-6 right-6 rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-110 transition-all z-50 animate-bounce"
      style={{ animationDuration: '2s' }}
    >
      <Plus className="w-6 h-6 mr-2" />
      Create Game
    </Button>
  );
};

export default FloatingActionButton;
