
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, Link2, Mail, Share, QrCode, Calendar, Send } from "lucide-react";

const SendInvitations = ({ formData, onBack, onNext }) => {
  const [inviteMethod, setInviteMethod] = useState("link");
  const [emailList, setEmailList] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const eventLink = `https://eventverse.app/invite/${formData.eventName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

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
      emailList: emailList.split(',').map(email => email.trim()).filter(Boolean),
      customMessage,
      eventLink
    };
    
    console.log("Sending invites:", inviteData);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="font-semibold">Send Invitations</h3>
          <p className="text-sm text-gray-600">Invite your guests</p>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Invitation Methods */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Choose Invitation Method</h4>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Share Link */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                inviteMethod === "link" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setInviteMethod("link")}
            >
              <div className="flex items-center gap-3">
                <Link2 className="w-5 h-5 text-purple-600" />
                <div>
                  <h5 className="font-medium">Share Link</h5>
                  <p className="text-sm text-gray-600">Copy and share event link</p>
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
                    <Button variant="outline" size="sm" className="flex-1">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="w-4 h-4 mr-2" />
                      Social Media
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Email Invitations */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                inviteMethod === "email" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setInviteMethod("email")}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <h5 className="font-medium">Email Invitations</h5>
                  <p className="text-sm text-gray-600">Send direct email invites</p>
                </div>
              </div>
              
              {inviteMethod === "email" && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Label>Email Addresses (comma separated)</Label>
                    <textarea 
                      placeholder="john@example.com, jane@example.com, ..."
                      className="w-full p-3 border rounded-lg resize-none h-20 text-sm"
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                    />
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Import from Contacts
                  </Button>
                </div>
              )}
            </div>

            {/* Calendar Integration */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                inviteMethod === "calendar" ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setInviteMethod("calendar")}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <h5 className="font-medium">Calendar Invites</h5>
                  <p className="text-sm text-gray-600">Send calendar invitations</p>
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
            className="w-full p-3 border rounded-lg resize-none h-20 text-sm"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </div>

        {/* Invitation Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-medium mb-2">Invitation Preview</h5>
          <div className="bg-white p-4 rounded border text-sm">
            <p className="font-medium">You're Invited to {formData.eventName}!</p>
            <p className="text-gray-600 mt-2">{formData.eventType}</p>
            <p className="text-gray-600">📅 {formData.startDate ? formData.startDate.toLocaleDateString() : ""}</p>
            <p className="text-gray-600">📍 {formData.locations[0]?.name}</p>
            {customMessage && (
              <p className="mt-3 text-gray-700 italic">"{customMessage}"</p>
            )}
            <Button size="sm" className="mt-3">RSVP Now</Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {inviteMethod === "email" && emailList && (
          <p className="text-sm text-gray-600 text-center">
            Ready to send to {emailList.split(',').filter(email => email.trim()).length} recipients
          </p>
        )}
        
        <Button 
          onClick={handleSendInvites}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg py-3"
        >
          <Send className="w-4 h-4 mr-2" />
          {inviteMethod === "email" ? "Send Invitations" : "Continue to Confirmation"}
        </Button>
      </div>
    </div>
  );
};

export default SendInvitations;
