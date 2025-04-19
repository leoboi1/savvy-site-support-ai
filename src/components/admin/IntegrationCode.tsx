
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface IntegrationCodeProps {
  apiKey: string;
  onBack: () => void;
}

export function IntegrationCode({ apiKey, onBack }: IntegrationCodeProps) {
  const [copied, setCopied] = useState(false);
  
  const scriptCode = `<script>
  (function() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://cdn.savvy-ai.com/widget.js";
    s.setAttribute("data-api-key", "${apiKey}");
    document.head.appendChild(s);
  })();
</script>`;

  const pluginCode = `// WordPress Plugin Installation
1. Download the Savvy AI Chatbot plugin
2. Go to your WordPress dashboard
3. Navigate to Plugins > Add New > Upload Plugin
4. Select the downloaded file and click "Install Now"
5. Activate the plugin
6. Go to Savvy AI settings and enter your API key: ${apiKey}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add to your website</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="script">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="script">Script Tag</TabsTrigger>
            <TabsTrigger value="cms">CMS Plugins</TabsTrigger>
          </TabsList>
          
          <TabsContent value="script" className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Add this code snippet just before the closing &lt;/body&gt; tag on every page where you want the chatbot to appear.
            </p>
            
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                {scriptCode}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(scriptCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="cms" className="space-y-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">WordPress</h3>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    {pluginCode}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(pluginCode)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Shopify</h3>
                <p className="text-muted-foreground">
                  1. Go to your Shopify admin panel<br />
                  2. Navigate to Online Store &gt; Themes<br />
                  3. Click "Actions" &gt; "Edit code"<br />
                  4. Find the theme.liquid file<br />
                  5. Paste the script code above just before the closing &lt;/body&gt; tag<br />
                  6. Click "Save"
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Button variant="outline" onClick={onBack}>
            Back to Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
