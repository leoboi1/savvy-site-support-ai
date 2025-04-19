
import { useState, FormEvent } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholderText?: string;
  allowAttachments?: boolean;
  disabled?: boolean;
  suggestedQueries?: string[];
}

export function ChatInput({
  onSendMessage,
  placeholderText = "Type your message...",
  allowAttachments = false,
  disabled = false,
  suggestedQueries = [],
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t">
      {suggestedQueries.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedQueries.map((query, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onSendMessage(query)}
              className="text-xs"
            >
              {query}
            </Button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholderText}
          disabled={disabled}
          className="flex-1"
        />
        
        {allowAttachments && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="outline"
                disabled={disabled}
                className="flex-shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Attach file</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="bg-savvy-primary hover:bg-savvy-primary/90 flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
