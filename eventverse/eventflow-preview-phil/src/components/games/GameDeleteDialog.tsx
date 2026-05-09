
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface GameDeleteDialogProps {
  isOpen: boolean;
  gameTitle: string;
  gameStatus: string;
  onConfirm: () => void;
  onClose: () => void;
}

const GameDeleteDialog = ({ isOpen, gameTitle, gameStatus, onConfirm, onClose }: GameDeleteDialogProps) => {
  const isActive = gameStatus === "active";
  const hasData = gameStatus === "completed";

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Game</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{gameTitle}"?
            {isActive && (
              <div className="mt-2 p-2 bg-orange-100 text-orange-800 rounded text-sm">
                <strong>Warning:</strong> This game is currently active. Deleting it will end the game for all participants.
              </div>
            )}
            {hasData && (
              <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">
                <strong>Warning:</strong> This game has participant data that will be permanently lost.
              </div>
            )}
            <div className="mt-2 text-sm text-gray-600">
              This action cannot be undone.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameDeleteDialog;
