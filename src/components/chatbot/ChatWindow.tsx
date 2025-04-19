
import { useState, useEffect, useRef } from "react";
import { X, MessageSquare, Minimize } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { ChatMessage, ChatbotConfig } from "@/types/chatbot-types";

interface ChatWindowProps {
  config: ChatbotConfig;
  onClose: () => void;
  onMinimize: () => void;
}

export function ChatWindow({ config, onClose, onMinimize }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: config.welcomeMessage,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock function to simulate API call to AI service
  const fetchAIResponse = async (userMessage: string): Promise<string> => {
    // In a real implementation, this would call your AI service
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          "I can help you with that! Could you provide more details?",
          `Based on the information from your website, ${config.brandName} typically processes orders within 1-2 business days.`,
          "Let me check the product information for you. It looks like this item is currently in stock.",
          "According to your return policy, customers can return items within 30 days of purchase.",
          "Is there anything else I can help you with today?",
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1000);
    });
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Get AI response
      const response = await fetchAIResponse(content);
      
      // Add AI message
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "Sorry, I'm having trouble processing your request right now. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[350px] h-[500px] max-h-[80vh]">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 border-b"
        style={{ backgroundColor: config.brandColor || "#4F46E5" }}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-white" />
          <h3 className="font-medium text-white">
            {config.brandName} Support
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onMinimize} className="h-7 w-7 text-white hover:bg-white/20">
            <Minimize className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            avatarUrl={config.avatarUrl}
            showTimestamp={config.showTimestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        placeholderText={config.placeholderText || "Type your question..."}
        disabled={loading}
        suggestedQueries={config.initialPromptsEnabled ? config.initialPrompts : []}
      />
    </div>
  );
}
