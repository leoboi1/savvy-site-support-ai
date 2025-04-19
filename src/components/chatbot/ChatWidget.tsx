
import { useState, useEffect } from "react";
import { ChatWindow } from "./ChatWindow";
import { ChatbotConfig } from "@/types/chatbot-types";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatWidgetProps {
  config: ChatbotConfig;
}

export function ChatWidget({ config }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [pageData, setPageData] = useState<Record<string, any> | null>(null);

  // Position classes based on config
  const positionClasses = config.widgetPosition === "bottom-left"
    ? "bottom-5 left-5" 
    : "bottom-5 right-5";

  useEffect(() => {
    // If configured to load page data, do that when widget is first opened
    if (config.loadPageData && isOpen && !pageData) {
      fetchPageData();
    }
  }, [config.loadPageData, isOpen, pageData]);

  const fetchPageData = () => {
    // In a real implementation, this would:
    // 1. Scan the page's content
    // 2. Extract product details, prices, etc.
    // 3. Load FAQ content and other relevant information
    
    const mockPageData = {
      pageTitle: document.title,
      url: window.location.href,
      products: [],
      meta: {},
      pageText: "",
    };
    
    // Simple extraction of meta tags for demo purposes
    document.querySelectorAll('meta').forEach(meta => {
      if (meta.name && meta.content) {
        mockPageData.meta[meta.name] = meta.content;
      }
    });
    
    // Extract page text (simplified)
    mockPageData.pageText = document.body.innerText.substring(0, 1000);
    
    setPageData(mockPageData);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleReopen = () => {
    setIsMinimized(false);
  };

  return (
    <div className={`fixed ${positionClasses} z-50`}>
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="mb-4 transition-all duration-300 ease-in-out">
          <ChatWindow
            config={config}
            onClose={handleToggle}
            onMinimize={handleMinimize}
          />
        </div>
      )}
      
      {/* Minimized Chat Notification */}
      {isOpen && isMinimized && (
        <div 
          className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer flex items-center gap-2"
          onClick={handleReopen}
        >
          <MessageCircle 
            className="h-5 w-5"
            style={{ color: config.brandColor || "#4F46E5" }}
          />
          <span className="font-medium">Continue your conversation</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Chat Button */}
      <Button
        onClick={handleToggle}
        className="h-12 w-12 rounded-full shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: isOpen ? "#E5E7EB" : (config.brandColor || "#4F46E5"),
          color: isOpen ? "#111827" : "white",
        }}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
