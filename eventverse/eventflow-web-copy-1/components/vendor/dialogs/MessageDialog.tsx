"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";

interface MessageDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  clientId?: string;
}

const MessageDialog = ({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  clientId,
}: MessageDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [message, setMessage] = useState({
    recipient: clientId || "",
    subject: "",
    content: "",
    type: "chat",
  });
  const { toast } = useToast();

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange = controlledOnOpenChange || setInternalOpen;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending in-app message:", message);
    toast({
      title: "Message sent",
      description: `Your ${message.type === "chat" ? "message" : "call request"} has been sent via the in-app system.`,
    });
    onOpenChange(false);
    setMessage({ recipient: "", subject: "", content: "", type: "chat" });
  };

  const messageTemplates = [
    {
      id: "intro",
      name: "Introduction",
      content:
        "Hi [Client], thank you for your interest in our services. I'd love to discuss your upcoming event...",
    },
    {
      id: "follow-up",
      name: "Follow-up",
      content:
        "Hi [Client], I wanted to follow up on our recent discussion about your event...",
    },
    {
      id: "proposal",
      name: "Proposal Ready",
      content:
        "Hi [Client], I've prepared a customized proposal for your event. Let's schedule a time to review it...",
    },
    {
      id: "thank-you",
      name: "Thank You",
      content:
        "Thank you for choosing our services. We're excited to make your event memorable...",
    },
  ];

  const loadTemplate = (templateId: string) => {
    const template = messageTemplates.find((t) => t.id === templateId);
    if (template) {
      setMessage((prev) => ({ ...prev, content: template.content }));
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>In-App Communication</DialogTitle>
          <DialogDescription>
            Send a message or schedule a call through our secure in-app system
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={message.type}
          onValueChange={(value) =>
            setMessage((prev) => ({ ...prev, type: value }))
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="chat"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Instant Message
            </TabsTrigger>
            <TabsTrigger
              value="call"
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Schedule Call
            </TabsTrigger>
          </TabsList>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="recipient">Client</Label>
              <Select
                value={message.recipient}
                onValueChange={(value) =>
                  setMessage((prev) => ({ ...prev, recipient: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="elite">Elite Events Inc</SelectItem>
                  <SelectItem value="maria">Maria Rodriguez</SelectItem>
                  <SelectItem value="robert">Robert Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent
              value="chat"
              className="space-y-4"
            >
              <div>
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Input
                  id="subject"
                  value={message.subject}
                  onChange={(e) =>
                    setMessage((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="Event discussion, proposal follow-up, etc."
                />
              </div>

              <div>
                <Label>Quick Templates</Label>
                <Select onValueChange={loadTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates.map((template) => (
                      <SelectItem
                        key={template.id}
                        value={template.id}
                      >
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Message</Label>
                <Textarea
                  id="content"
                  value={message.content}
                  onChange={(e) =>
                    setMessage((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Type your message here..."
                  rows={6}
                  required
                />
              </div>

              <div className="rounded bg-blue-50 p-3">
                <p className="text-sm text-blue-800">
                  <MessageSquare className="mr-2 inline h-4 w-4" />
                  Your message will be sent through our secure in-app messaging
                  system. The client will receive a notification and can respond
                  directly in the app.
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="call"
              className="space-y-4"
            >
              <div>
                <Label htmlFor="callSubject">Call Purpose</Label>
                <Input
                  id="callSubject"
                  value={message.subject}
                  onChange={(e) =>
                    setMessage((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  placeholder="Initial consultation, proposal review, etc."
                  required
                />
              </div>

              <div>
                <Label htmlFor="callNotes">Call Notes (Optional)</Label>
                <Textarea
                  id="callNotes"
                  value={message.content}
                  onChange={(e) =>
                    setMessage((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Topics to discuss, questions to ask..."
                  rows={4}
                />
              </div>

              <div className="rounded bg-green-50 p-3">
                <p className="text-sm text-green-800">
                  <Phone className="mr-2 inline h-4 w-4" />A call request will
                  be sent to the client with available time slots. Once
                  confirmed, you&apos;ll both receive the call details through
                  the app.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Call duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Urgency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within a week</SelectItem>
                      <SelectItem value="medium">
                        Medium - Within 2-3 days
                      </SelectItem>
                      <SelectItem value="high">
                        High - Within 24 hours
                      </SelectItem>
                      <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                <Send className="mr-2 h-4 w-4" />
                {message.type === "chat" ? "Send Message" : "Request Call"}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
