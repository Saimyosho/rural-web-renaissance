import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Wand2, Download, RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

const VirtualDesignDemo = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  const examplePrompts = [
    "A modern kitchen with white cabinets and marble countertops",
    "A cozy living room with a fireplace and large windows",
    "A minimalist bedroom with wooden floors and neutral colors",
    "A contemporary bathroom with a walk-in shower and floating vanity",
    "An outdoor patio with comfortable seating and string lights"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate an image");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setRetryAfter(null);

    try {
      const response = await fetch('/api/virtual-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          model: 'stabilityai/stable-diffusion-xl-base-1.0'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503 && data.retryAfter) {
          setRetryAfter(data.retryAfter);
          setError(data.error || "Model is loading. Please try again in a moment.");
        } else {
          setError(data.error || "Failed to generate image");
        }
        return;
      }

      if (data.success && data.imageUrl) {
        setGeneratedImage({
          url: data.imageUrl,
          prompt: data.prompt,
          timestamp: Date.now()
        });
        setError(null);
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage.url;
    link.download = `virtual-design-${generatedImage.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRetry = () => {
    setError(null);
    setRetryAfter(null);
    handleGenerate();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">AI Virtual Design Generator</CardTitle>
                <CardDescription>
                  Describe your vision and watch AI create stunning design visualizations
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium">
                Describe Your Design Vision
              </label>
              <Textarea
                id="prompt"
                placeholder="e.g., A modern living room with minimalist furniture, natural light, and plants..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={isGenerating}
              />
            </div>

            {/* Example Prompts */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(example)}
                    disabled={isGenerating}
                    className="text-xs hover:bg-primary/10"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-primary via-bridge to-accent hover:shadow-glow transition-all duration-500"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Design...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Design
                </>
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="flex items-center justify-between">
                  <span>{error}</span>
                  {retryAfter && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRetry}
                      className="ml-4"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Generated Image */}
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative rounded-lg overflow-hidden border border-primary/20">
                  <img
                    src={generatedImage.url}
                    alt={generatedImage.prompt}
                    className="w-full h-auto"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground flex-1">
                    <span className="font-medium">Prompt:</span> {generatedImage.prompt}
                  </p>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Info Section */}
            <div className="pt-6 border-t border-border">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                How It Works
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">1. Describe</p>
                  <p>Write a detailed description of your design vision</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">2. Generate</p>
                  <p>AI creates a visualization based on your prompt</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">3. Download</p>
                  <p>Save and share your AI-generated design</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VirtualDesignDemo;
