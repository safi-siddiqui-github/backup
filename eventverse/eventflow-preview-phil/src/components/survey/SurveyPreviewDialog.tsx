import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Survey } from "./types";
import SurveyFormRenderer from "./SurveyFormRenderer";

interface SurveyPreviewDialogProps {
  survey: Survey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SurveyPreviewDialog = ({ survey, open, onOpenChange }: SurveyPreviewDialogProps) => {
  if (!survey) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Survey Preview</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <SurveyFormRenderer 
            survey={survey}
            onSubmit={(responses) => {
              console.log("Preview survey submitted:", responses);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyPreviewDialog;