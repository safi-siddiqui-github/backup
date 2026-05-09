"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Calendar,
  Link2,
  Mail,
  QrCode,
  Send,
  Share,
  Users,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "./EnhancedEventCreationDialog";

const SendInvitations = ({
  formData,
  onBack,
  onNext,
}: {
  formData: EventFormData;
  onBack: () => void;
  onNext: () => void;
}) => {
  const [inviteMethod, setInviteMethod] = useState("link");
  const [emailList, setEmailList] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const eventLink = `https://eventflow.app/invite/${formData?.eventName?.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy link");
    }
  };

  const handleSendInvites = () => {
    const inviteData = {
      method: inviteMethod,
      emailList: emailList
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
      customMessage,
      eventLink,
    };

    console.log("Sending invites:", inviteData);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="font-semibold">Send Invitations</h3>
          <p className="text-sm text-gray-600">Invite your guests</p>
        </div>
      </div>

      <div className="max-h-96 space-y-4 overflow-y-auto">
        {/* Invitation Methods */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">
            Choose Invitation Method
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {/* Share Link */}
            <div
              className={`cursor-pointer rounded-lg border p-4 transition-all ${
                inviteMethod === "link"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setInviteMethod("link")}
            >
              <div className="flex items-center gap-3">
                <Link2 className="h-5 w-5 text-purple-600" />
                <div>
                  <h5 className="font-medium">Share Link</h5>
                  <p className="text-sm text-gray-600">
                    Copy and share event link
                  </p>
                </div>
              </div>

              {inviteMethod === "link" && (
                <div className="mt-4 space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={eventLink}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className={linkCopied ? "bg-green-50 text-green-600" : ""}
                    >
                      {linkCopied ? "Copied!" : "Copy"}
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      QR Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Social Media
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Email Invitations */}
            <div
              className={`cursor-pointer rounded-lg border p-4 transition-all ${
                inviteMethod === "email"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setInviteMethod("email")}
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <h5 className="font-medium">Email Invitations</h5>
                  <p className="text-sm text-gray-600">
                    Send direct email invites
                  </p>
                </div>
              </div>

              {inviteMethod === "email" && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Label>Email Addresses (comma separated)</Label>
                    <textarea
                      placeholder="john@example.com, jane@example.com, ..."
                      className="h-20 w-full resize-none rounded-lg border p-3 text-sm"
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Import from Contacts
                  </Button>
                </div>
              )}
            </div>

            {/* Calendar Integration */}
            <div
              className={`cursor-pointer rounded-lg border p-4 transition-all ${
                inviteMethod === "calendar"
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setInviteMethod("calendar")}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <h5 className="font-medium">Calendar Invites</h5>
                  <p className="text-sm text-gray-600">
                    Send calendar invitations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Message */}
        <div className="space-y-2">
          <Label>Personal Message (Optional)</Label>
          <textarea
            placeholder="Add a personal note to your invitation..."
            className="h-20 w-full resize-none rounded-lg border p-3 text-sm"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </div>

        {/* Invitation Preview */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h5 className="mb-2 font-medium">Invitation Preview</h5>
          <div className="rounded border bg-white p-4 text-sm">
            <p className="font-medium">
              You&apos;re Invited to {formData.eventName}!
            </p>
            <p className="mt-2 text-gray-600">{formData.eventType}</p>
            <p className="text-gray-600">
              📅{" "}
              {formData.startDate
                ? formData.startDate.toLocaleDateString()
                : ""}
            </p>
            <p className="text-gray-600">
              📍 {formData?.locations && formData?.locations[0]?.name}
            </p>
            {customMessage && (
              <p className="mt-3 text-gray-700 italic">
                &quot;{customMessage}&quot;
              </p>
            )}
            <Button
              size="sm"
              className="mt-3"
            >
              RSVP Now
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {inviteMethod === "email" && emailList && (
          <p className="text-center text-sm text-gray-600">
            Ready to send to{" "}
            {emailList.split(",").filter((email) => email.trim()).length}{" "}
            recipients
          </p>
        )}

        <Button
          onClick={handleSendInvites}
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-white hover:from-purple-700 hover:to-blue-700"
        >
          <Send className="mr-2 h-4 w-4" />
          {inviteMethod === "email"
            ? "Send Invitations"
            : "Continue to Confirmation"}
        </Button>
      </div>
    </div>
  );
};

export default SendInvitations;
