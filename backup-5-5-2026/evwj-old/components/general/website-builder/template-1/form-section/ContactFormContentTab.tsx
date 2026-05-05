"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormContentTabData {
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

interface ContactFormContentTabProps {
  data: ContactFormContentTabData;
  onChange: (data: ContactFormContentTabData) => void;
}

export function ContactFormContentTab({ data, onChange }: ContactFormContentTabProps) {
  const updateData = (updates: Partial<ContactFormContentTabData>) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-inner">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {data.title || "Get In Touch"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {data.subtitle || "We'd love to hear from you"}
            </p>
          </div>
          
          {/* Form Preview */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {data.nameLabel || "Name*"}
              </p>
              <div className="h-9 rounded border border-slate-200 dark:border-slate-700 px-3 flex items-center text-xs text-slate-400">
                {data.namePlaceholder || "Your name"}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {data.emailLabel || "Email*"}
              </p>
              <div className="h-9 rounded border border-slate-200 dark:border-slate-700 px-3 flex items-center text-xs text-slate-400">
                {data.emailPlaceholder || "your@email.com"}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {data.messageLabel || "Message*"}
              </p>
              <div className="h-20 rounded border border-slate-200 dark:border-slate-700 px-3 py-2 flex items-start text-xs text-slate-400">
                {data.messagePlaceholder || "Your message"}
              </div>
            </div>
            
            <button className="w-full h-9 bg-slate-900 text-white text-xs rounded">
              {data.submitText || "Send Message"}
            </button>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Form Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="form-title">Title</Label>
          <Input
            id="form-title"
            type="text"
            placeholder="Get In Touch"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="form-subtitle">Subtitle</Label>
          <Input
            id="form-subtitle"
            type="text"
            placeholder="We'd love to hear from you"
            value={data.subtitle}
            onChange={(e) => updateData({ subtitle: e.target.value })}
          />
        </div>
      </div>

      {/* Name Field */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Name Field</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name-label">Label</Label>
            <Input
              id="name-label"
              type="text"
              placeholder="Name*"
              value={data.nameLabel}
              onChange={(e) => updateData({ nameLabel: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name-placeholder">Placeholder</Label>
            <Input
              id="name-placeholder"
              type="text"
              placeholder="Your name"
              value={data.namePlaceholder}
              onChange={(e) => updateData({ namePlaceholder: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Email Field</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email-label">Label</Label>
            <Input
              id="email-label"
              type="text"
              placeholder="Email*"
              value={data.emailLabel}
              onChange={(e) => updateData({ emailLabel: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-placeholder">Placeholder</Label>
            <Input
              id="email-placeholder"
              type="text"
              placeholder="your@email.com"
              value={data.emailPlaceholder}
              onChange={(e) => updateData({ emailPlaceholder: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Message Field */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Message Field</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="message-label">Label</Label>
            <Input
              id="message-label"
              type="text"
              placeholder="Message*"
              value={data.messageLabel}
              onChange={(e) => updateData({ messageLabel: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-placeholder">Placeholder</Label>
            <Input
              id="message-placeholder"
              type="text"
              placeholder="Your message"
              value={data.messagePlaceholder}
              onChange={(e) => updateData({ messagePlaceholder: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-3 border rounded-lg p-4">
        <h3 className="font-semibold text-sm">Submit Button</h3>
        
        <div className="space-y-2">
          <Label htmlFor="submit-text">Button Text</Label>
          <Input
            id="submit-text"
            type="text"
            placeholder="Send Message"
            value={data.submitText}
            onChange={(e) => updateData({ submitText: e.target.value })}
          />
        </div>

        {/* Button Preview */}
        <div className="space-y-2">
          <Label>Button Preview</Label>
          <div className="border rounded-md p-4 bg-muted flex items-center justify-center">
            <button className="px-6 py-2 rounded-md font-medium bg-slate-900 text-white">
              {data.submitText || "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
