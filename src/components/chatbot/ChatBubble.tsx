
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chatbot-types";
import { Avatar } from "@/components/ui/avatar";

interface ChatBubbleProps {
  message: ChatMessage;
  avatarUrl?: string;
  showTimestamp?: boolean;
}

export function ChatBubble({ message, avatarUrl, showTimestamp = true }: ChatBubbleProps) {
  const isUser = message.role === "user";
  
  return (
    <div className={cn(
      "flex w-full gap-2 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar>
            <div className="h-9 w-9 rounded-full bg-savvy-secondary flex items-center justify-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Bot" className="h-full w-full rounded-full object-cover" />
              ) : (
                <span className="text-white text-sm font-semibold">AI</span>
              )}
            </div>
          </Avatar>
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2",
        isUser ? "bg-savvy-bubble-user" : "bg-savvy-bubble-bot"
      )}>
        <div className="text-sm">{message.content}</div>
        
        {showTimestamp && (
          <div className="text-xs text-muted-foreground mt-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <Avatar>
            <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-semibold">You</span>
            </div>
          </Avatar>
        </div>
      )}
    </div>
  );
}
