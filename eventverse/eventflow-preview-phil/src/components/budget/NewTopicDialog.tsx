import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewTopicDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateTopic: (title: string, category: string, message: string) => void;
  vendorName: string;
}

const NewTopicDialog = ({ open, onClose, onCreateTopic, vendorName }: NewTopicDialogProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");

  const handleCreate = () => {
    if (title.trim() && message.trim()) {
      onCreateTopic(title, category, message);
      setTitle("");
      setCategory("general");
      setMessage("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start New Topic</DialogTitle>
          <DialogDescription>
            Create a new conversation thread with {vendorName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="topic-title">Topic Title</Label>
            <Input
              id="topic-title"
              placeholder="e.g., Menu preferences discussion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="topic-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic-message">Initial Message</Label>
            <Textarea
              id="topic-message"
              placeholder="Start the conversation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!title.trim() || !message.trim()}>
            Create Topic
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTopicDialog;
