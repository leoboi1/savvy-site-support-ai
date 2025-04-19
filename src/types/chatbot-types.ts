
export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  userId?: string;
  userName?: string;
  userEmail?: string;
  startedAt: Date;
  lastActivity: Date;
  resolved: boolean;
  metadata?: Record<string, unknown>;
}

export interface ChatbotConfig {
  apiKey?: string;
  brandName: string;
  brandColor?: string;
  welcomeMessage: string;
  placeholderText?: string;
  initialPromptsEnabled?: boolean;
  initialPrompts?: string[];
  widgetPosition?: "bottom-right" | "bottom-left";
  widgetIcon?: "chat" | "message" | "help" | "custom";
  customIcon?: string;
  theme?: "light" | "dark" | "auto";
  avatarUrl?: string;
  loadPageData?: boolean;
  allowAttachments?: boolean;
  showTimestamp?: boolean;
  persistHistory?: boolean;
}

export interface ChatAnalytics {
  totalSessions: number;
  averageSessionDuration: number;
  queryResolutionRate: number;
  commonQueries: {
    query: string;
    count: number;
  }[];
  userSatisfactionScore: number;
  peakUsageTimes: {
    hour: number;
    count: number;
  }[];
}
