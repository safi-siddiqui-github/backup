// Common chat message interface
export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "vendor" | "client";
  timestamp: string;
  isRead?: boolean;
}

