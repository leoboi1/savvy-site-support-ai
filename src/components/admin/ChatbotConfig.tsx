
import { useState } from "react";
import { ChatbotConfig } from "@/types/chatbot-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ChatbotConfiguratorProps {
  config: ChatbotConfig;
  onUpdate: (newConfig: ChatbotConfig) => void;
  onGenerateCode: () => void;
}

export function ChatbotConfigurator({ config, onUpdate, onGenerateCode }: ChatbotConfiguratorProps) {
  const [currentConfig, setCurrentConfig] = useState<ChatbotConfig>(config);
  const [promptInput, setPromptInput] = useState("");

  const handleChange = (key: keyof ChatbotConfig, value: any) => {
    setCurrentConfig({
      ...currentConfig,
      [key]: value
    });
  };

  const handleSave = () => {
    onUpdate(currentConfig);
  };

  const handleAddPrompt = () => {
    if (promptInput.trim()) {
      const updatedPrompts = [
        ...(currentConfig.initialPrompts || []),
        promptInput.trim()
      ];
      
      setCurrentConfig({
        ...currentConfig,
        initialPrompts: updatedPrompts
      });
      
      setPromptInput("");
    }
  };

  const handleRemovePrompt = (index: number) => {
    const updatedPrompts = [...(currentConfig.initialPrompts || [])];
    updatedPrompts.splice(index, 1);
    setCurrentConfig({
      ...currentConfig,
      initialPrompts: updatedPrompts
    });
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="behavior">Behavior</TabsTrigger>
        <TabsTrigger value="integration">Integration</TabsTrigger>
      </TabsList>
      
      {/* General Tab */}
      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Chatbot Identity</CardTitle>
            <CardDescription>Configure how your chatbot presents itself to users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input 
                id="brandName"
                value={currentConfig.brandName}
                onChange={(e) => handleChange("brandName", e.target.value)}
                placeholder="Your Company Name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea 
                id="welcomeMessage"
                value={currentConfig.welcomeMessage}
                onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                placeholder="Hi! How can I help you today?"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="inputPlaceholder">Input Placeholder</Label>
              <Input 
                id="inputPlaceholder"
                value={currentConfig.placeholderText}
                onChange={(e) => handleChange("placeholderText", e.target.value)}
                placeholder="Type your question..."
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Connect to your AI provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input 
                id="apiKey"
                value={currentConfig.apiKey || ""}
                onChange={(e) => handleChange("apiKey", e.target.value)}
                type="password"
                placeholder="Enter your API key"
              />
              <p className="text-sm text-muted-foreground">Your API key is securely stored and never exposed to visitors.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Appearance Tab */}
      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Visual Customization</CardTitle>
            <CardDescription>Customize how your chatbot looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="brandColor">Brand Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="brandColor"
                  value={currentConfig.brandColor || "#4F46E5"}
                  onChange={(e) => handleChange("brandColor", e.target.value)}
                  placeholder="#4F46E5"
                  className="flex-1"
                />
                <div 
                  className="h-10 w-10 rounded border"
                  style={{ backgroundColor: currentConfig.brandColor || "#4F46E5" }}
                ></div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="theme">Theme</Label>
              <Select 
                value={currentConfig.theme || "light"}
                onValueChange={(value) => handleChange("theme", value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto (Match user's system)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="avatarUrl">Bot Avatar URL</Label>
              <Input 
                id="avatarUrl"
                value={currentConfig.avatarUrl || ""}
                onChange={(e) => handleChange("avatarUrl", e.target.value)}
                placeholder="https://example.com/avatar.png"
              />
              <p className="text-sm text-muted-foreground">Leave empty to use default avatar</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="position">Widget Position</Label>
              <Select 
                value={currentConfig.widgetPosition || "bottom-right"}
                onValueChange={(value) => handleChange("widgetPosition", value as "bottom-right" | "bottom-left")}
              >
                <SelectTrigger id="position">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Behavior Tab */}
      <TabsContent value="behavior" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Interaction Settings</CardTitle>
            <CardDescription>Configure how your chatbot interacts with users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showTimestamp">Show Message Timestamps</Label>
                <p className="text-sm text-muted-foreground">Display time for each message</p>
              </div>
              <Switch 
                id="showTimestamp" 
                checked={currentConfig.showTimestamp || false}
                onCheckedChange={(checked) => handleChange("showTimestamp", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="persistHistory">Persist Chat History</Label>
                <p className="text-sm text-muted-foreground">Remember conversations between sessions</p>
              </div>
              <Switch 
                id="persistHistory" 
                checked={currentConfig.persistHistory || false}
                onCheckedChange={(checked) => handleChange("persistHistory", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowAttachments">Allow File Attachments</Label>
                <p className="text-sm text-muted-foreground">Let users upload files</p>
              </div>
              <Switch 
                id="allowAttachments" 
                checked={currentConfig.allowAttachments || false}
                onCheckedChange={(checked) => handleChange("allowAttachments", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="loadPageData">Scan Page Content</Label>
                <p className="text-sm text-muted-foreground">Analyze current page for context</p>
              </div>
              <Switch 
                id="loadPageData" 
                checked={currentConfig.loadPageData || false}
                onCheckedChange={(checked) => handleChange("loadPageData", checked)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Suggested Prompts</CardTitle>
            <CardDescription>Quick options for users to select</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="initialPromptsEnabled">Enable Suggested Prompts</Label>
                <p className="text-sm text-muted-foreground">Show quick options to users</p>
              </div>
              <Switch 
                id="initialPromptsEnabled" 
                checked={currentConfig.initialPromptsEnabled || false}
                onCheckedChange={(checked) => handleChange("initialPromptsEnabled", checked)}
              />
            </div>
            
            {currentConfig.initialPromptsEnabled && (
              <div className="space-y-3 mt-4">
                <div className="flex gap-2">
                  <Input 
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="Enter a suggested prompt"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddPrompt}>Add</Button>
                </div>
                
                <div className="space-y-2 mt-3">
                  {(currentConfig.initialPrompts || []).map((prompt, index) => (
                    <div key={index} className="flex justify-between items-center bg-muted rounded p-2">
                      <span className="text-sm">{prompt}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemovePrompt(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Integration Tab */}
      <TabsContent value="integration" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Website Integration</CardTitle>
            <CardDescription>Add Savvy to your website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-3">
                After saving your configuration, generate the code and add it to your website.
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={onGenerateCode}
              >
                Generate Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>Save Configuration</Button>
      </div>
    </Tabs>
  );
}
