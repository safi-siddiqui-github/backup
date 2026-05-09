import { useEffect, useState } from "react";

export interface Announcement {
  id?: string;
  eventId?: string;
  type?:
    | "announcement"
    | "urgent"
    | "schedule-change"
    | "weather"
    | "parking"
    | "safety";
  title?: string;
  content?: string;
  priority?: "high" | "medium" | "low";
  timestamp?: Date;
  isRead?: boolean;
  targetAudience?: "all" | "vip" | "general";
  deliveryStatus?: "draft" | "sent" | "scheduled";
  readCount?: number;
  totalRecipients?: number;
}

export const useAnnouncementStorage = (eventId: string) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`announcements_${eventId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setAnnouncements(
        parsed.map((a: { timestamp: string | number | Date }) => ({
          ...a,
          timestamp: new Date(a.timestamp),
        })),
      );
    }
  }, [eventId]);

  const saveToStorage = (newAnnouncements: Announcement[]) => {
    localStorage.setItem(
      `announcements_${eventId}`,
      JSON.stringify(newAnnouncements),
    );
    setAnnouncements(newAnnouncements);
  };

  const createAnnouncement = (
    // announcementData: Omit<
    //   Announcement,
    //   | "id"
    //   | "eventId"
    //   | "timestamp"
    //   | "isRead"
    //   | "readCount"
    //   | "totalRecipients"
    // >,
    announcementData: Partial<Announcement>,
  ) => {
    const newAnnouncement: Partial<Announcement> = {
      id: `announcement_${Date.now()}`,
      eventId,
      timestamp: new Date(),
      isRead: false,
      readCount: Math.floor(Math.random() * 50) + 10, // Simulated read count
      totalRecipients: Math.floor(Math.random() * 100) + 50, // Simulated recipient count
      ...announcementData,
    };

    const updatedAnnouncements = [newAnnouncement, ...announcements];
    saveToStorage(updatedAnnouncements);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    const updatedAnnouncements = announcements.map((announcement) =>
      announcement.id === id ? { ...announcement, ...updates } : announcement,
    );
    saveToStorage(updatedAnnouncements);
  };

  const deleteAnnouncement = (id: string) => {
    const updatedAnnouncements = announcements.filter(
      (announcement) => announcement.id !== id,
    );
    saveToStorage(updatedAnnouncements);
  };

  return {
    announcements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  };
};
