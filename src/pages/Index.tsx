
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatbotConfig, ChatAnalytics } from "@/types/chatbot-types";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { ChatbotConfigurator } from "@/components/admin/ChatbotConfig";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { IntegrationCode } from "@/components/admin/IntegrationCode";

const defaultConfig: ChatbotConfig = {
  brandName: "Savvy AI",
  brandColor: "#4F46E5",
  welcomeMessage: "👋 Hi there! I'm your AI assistant. How can I help you today?",
  placeholderText: "Type your question...",
  initialPromptsEnabled: true,
  initialPrompts: [
    "How do I track my order?",
    "What's your return policy?",
    "Do you offer international shipping?"
  ],
  widgetPosition: "bottom-right",
  widgetIcon: "chat",
  theme: "light",
  showTimestamp: true,
  persistHistory: true,
  loadPageData: true
};

// Mock analytics data
const mockAnalytics: ChatAnalytics = {
  totalSessions: 1243,
  averageSessionDuration: 3.7,
  queryResolutionRate: 89,
  commonQueries: [
    { query: "What's your return policy?", count: 156 },
    { query: "How do I track my order?", count: 134 },
    { query: "Do you ship internationally?", count: 98 },
    { query: "How long is delivery?", count: 76 },
    { query: "Can I change my order?", count: 65 }
  ],
  userSatisfactionScore: 4.7,
  peakUsageTimes: [
    { hour: 8, count: 45 },
    { hour: 9, count: 67 },
    { hour: 10, count: 89 },
    { hour: 11, count: 102 },
    { hour: 12, count: 134 },
    { hour: 13, count: 156 },
    { hour: 14, count: 143 },
    { hour: 15, count: 132 },
    { hour: 16, count: 121 },
    { hour: 17, count: 87 },
    { hour: 18, count: 65 },
    { hour: 19, count: 43 },
    { hour: 20, count: 32 },
    { hour: 21, count: 21 }
  ]
};

const Index = () => {
  const [config, setConfig] = useState<ChatbotConfig>(defaultConfig);
  const [showingCode, setShowingCode] = useState(false);

  const handleUpdateConfig = (newConfig: ChatbotConfig) => {
    setConfig(newConfig);
    // In a real app, this would save to a database
    console.log("Updated config:", newConfig);
  };

  const handleGenerateCode = () => {
    setShowingCode(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-savvy-primary flex items-center justify-center">
              <span className="text-white font-semibold">S</span>
            </div>
            <span className="font-bold text-xl">Savvy AI</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Site Owner Dashboard</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Customer Support AI Dashboard</h1>
        
        <Tabs defaultValue="configure" className="space-y-6">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          {/* Configuration Tab */}
          <TabsContent value="configure" className="space-y-6">
            {showingCode ? (
              <IntegrationCode 
                apiKey={"sk-demo-" + Math.random().toString(36).substring(2, 10)}
                onBack={() => setShowingCode(false)}
              />
            ) : (
              <ChatbotConfigurator 
                config={config}
                onUpdate={handleUpdateConfig}
                onGenerateCode={handleGenerateCode}
              />
            )}
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard analytics={mockAnalytics} />
          </TabsContent>
          
          {/* Preview Tab */}
          <TabsContent value="preview">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-3xl h-[600px] rounded-lg border overflow-hidden mb-8 relative bg-white">
                <div className="h-12 border-b flex items-center px-4">
                  <span className="text-sm text-muted-foreground">https://your-website.com</span>
                </div>
                <div className="p-8 h-[calc(100%-3rem)] overflow-y-auto">
                  <div className="text-center py-16">
                    <h2 className="text-2xl font-bold">Your Website Content</h2>
                    <p className="text-muted-foreground mt-2">This is a preview of how the chat widget will appear on your site.</p>
                  </div>
                </div>
                
                {/* The chat widget will appear in the bottom corner */}
                <ChatWidget config={config} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; 2025 Savvy AI - Customer Support Automation
        </div>
      </footer>
    </div>
  );
};

export default Index;
