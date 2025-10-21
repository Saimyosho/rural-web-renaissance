import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  FileText, 
  Sparkles,
  Check,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type DemoTab = "review" | "content";

const AIToolsDemoTabs = () => {
  const [activeTab, setActiveTab] = useState<DemoTab>("review");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const tabs = [
    {
      id: "review" as DemoTab,
      label: "Review Agent",
      icon: <MessageSquare className="w-4 h-4" />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: "content" as DemoTab,
      label: "Content Writer",
      icon: <FileText className="w-4 h-4" />,
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  const handleTryTool = async () => {
    setIsProcessing(true);
    setShowResult(false);
    setError("");
    
    try {
      const response = await fetch('/api/hf-inference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: activeTab === 'review' ? 'review-response' : 'content-generation',
          input: activeTab === 'review' 
            ? "Great service! The team was professional and completed the work on time."
            : { topic: "Spring Sale", format: "Email" }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedText(data.text);
        setShowResult(true);
      } else {
        throw new Error(data.error || 'Failed to generate response');
      }
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to AI service');
      // Show fallback demo on error
      setGeneratedText(
        activeTab === 'review' 
          ? "Thank you so much for the wonderful review, Sarah! We're thrilled to hear you had a great experience with our team. Your satisfaction is our priority! 🌟"
          : "Subject: Spring into Savings! 🌸\n\nHi there! Spring is here and we're celebrating with amazing deals just for you. Don't miss out on our exclusive offers..."
      );
      setShowResult(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setShowResult(false);
              setIsProcessing(false);
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 relative group flex-1 justify-center",
              activeTab === tab.id
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-accent/50 text-muted-foreground"
            )}
          >
            {tab.icon}
            <span className="text-sm">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {/* Review Agent Demo */}
          {activeTab === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                {/* Sample Review */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">Sarah M.</span>
                  </div>
                  <p className="text-sm">
                    "Great service! The team was professional and completed the work on time."
                  </p>
                </div>

                {/* AI Responses */}
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      AI-Generated Response:
                    </p>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <p className="text-sm">
                        {generatedText || "Thank you so much for the wonderful review, Sarah! We're thrilled to hear you had a great experience with our team. Your satisfaction is our priority! 🌟"}
                      </p>
                    </div>
                    {error && (
                      <p className="text-xs text-orange-500 mt-1">
                        ⚠️ Using demo mode: {error}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      <Check className="w-3 h-3 inline mr-1 text-emerald-500" />
                      Powered by HuggingFace AI
                    </p>
                  </motion.div>
                )}
              </div>

              <Button
                onClick={handleTryTool}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Response...
                  </>
                ) : (
                  <>
                    Try Review Agent
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Content Writer Demo */}
          {activeTab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                {/* Input Preview */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Topic</p>
                    <p className="text-sm font-medium">Spring Sale</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Format</p>
                    <p className="text-sm font-medium">Email</p>
                  </div>
                </div>

                {/* Generated Content */}
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/30 min-h-[120px]"
                  >
                    <p className="text-xs font-medium text-violet-600 mb-2">
                      ✨ Generated Email:
                    </p>
                    <div className="text-sm space-y-2">
                      {generatedText ? (
                        <div className="whitespace-pre-wrap">{generatedText}</div>
                      ) : (
                        <>
                          <p className="font-semibold">Subject: Spring into Savings! 🌸</p>
                          <p className="text-muted-foreground">
                            Hi there! Spring is here and we're celebrating with amazing deals just for you. Don't miss out on our exclusive offers...
                          </p>
                        </>
                      )}
                      <div className="pt-2 border-t border-violet-500/20">
                        <p className="text-xs text-muted-foreground">
                          <Check className="w-3 h-3 inline mr-1 text-violet-500" />
                          Powered by HuggingFace AI
                        </p>
                        {error && (
                          <p className="text-xs text-orange-500 mt-1">
                            ⚠️ Using demo mode: {error}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <Button
                onClick={handleTryTool}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:shadow-lg"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Writing Content...
                  </>
                ) : (
                  <>
                    Try Content Writer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-center text-muted-foreground mt-4 pt-4 border-t border-border"
      >
        <Sparkles className="w-3 h-3 inline mr-1" />
        Live demos • Free to use • No signup required
      </motion.p>
    </div>
  );
};

export default AIToolsDemoTabs;
