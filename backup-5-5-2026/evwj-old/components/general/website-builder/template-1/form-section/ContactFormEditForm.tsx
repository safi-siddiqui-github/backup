"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactFormContentTab } from "./ContactFormContentTab";

type Props = {
  initial?: any;
  onSave: (payload: any) => void;
  onCancel?: () => void;
  onClose?: () => void;
};

interface ContactFormData {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
}

export default function ContactFormEditForm({ initial, onSave, onCancel, onClose }: Props) {
  const payload = initial || {};

  // Initialize form data
  const [formData, setFormData] = useState<ContactFormData>({
    title: payload?.title || "Get In Touch",
    subtitle: payload?.subtitle || "We'd love to hear from you",
    nameLabel: payload?.nameLabel || "Name*",
    namePlaceholder: payload?.namePlaceholder || "Your name",
    emailLabel: payload?.emailLabel || "Email*",
    emailPlaceholder: payload?.emailPlaceholder || "your@email.com",
    messageLabel: payload?.messageLabel || "Message*",
    messagePlaceholder: payload?.messagePlaceholder || "Your message",
    submitText: payload?.submitText || "Send Message",
  });

  const handleCancel = () => {
    if (onCancel) onCancel();
    else if (onClose) onClose();
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Edit Contact Form</h2>

      <div className="flex-1 overflow-y-auto px-1">
        <ContactFormContentTab data={formData} onChange={setFormData} />
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
