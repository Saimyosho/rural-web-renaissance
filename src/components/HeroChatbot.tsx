import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const HeroChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Sheldon's AI assistant. Ask me anything about AI services, SaaS solutions, or how I can help your business grow! 🚀",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Changed to true - always expanded
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Example questions that show natural language understanding
  const examplePrompts = [
    "What AI services do you offer?",
    "How much does a website cost?",
    "Can you help automate my business?",
    "Tell me about your experience",
    "What's the benefit of AI automation?",
    "Do you work with small businesses?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (promptText?: string) => {
    const messageText = promptText || input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/hf-inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'hero-chat',
          input: messageText,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'd love to help! For immediate assistance, please contact Sheldon directly at SheldonGunby@icloud.com or 724-490-8102. You can also scroll down to see the full service list and portfolio! 📧",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mobile toggle button (shown on mobile only)
  const MobileToggle = () => (
    <Button
      variant="outline"
      className="w-full lg:hidden mb-4 glass border-primary/30 hover:bg-primary/10"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <MessageSquare className="w-4 h-4 mr-2" />
      Chat with AI Assistant
      {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
    </Button>
  );

  const ChatInterface = () => (
    <div className="relative rounded-3xl overflow-hidden h-full flex flex-col z-30">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bridge/5 to-accent/10 animate-gradient-shift" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      {/* Glass container */}
      <div className="relative glass-strong rounded-3xl p-6 border border-primary/30 backdrop-blur-xl shadow-2xl h-full flex flex-col">
        {/* Animated border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-bridge to-accent rounded-3xl opacity-20 blur animate-pulse-slow" />
        
        {/* Header with gradient */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 animate-pulse-slow" />
              <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-bridge to-accent bg-clip-text text-transparent">
                AI Assistant
              </h3>
              <p className="text-xs text-muted-foreground">Powered by Google Gemma-2</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs border-primary/50 bg-primary/5 backdrop-blur">
            <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
            Live
          </Badge>
        </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 mb-4 pr-4 h-64" ref={scrollRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.isUser
                      ? 'bg-gradient-to-r from-primary to-primary-glow text-white'
                      : 'glass border border-border/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="glass border border-border/50 rounded-2xl px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Example prompts */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Try asking:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {examplePrompts.slice(0, 4).map((prompt, i) => (
            <Button
              key={i}
              size="sm"
              variant="ghost"
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="text-xs h-auto py-2 px-3 justify-start text-left hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          placeholder="Ask about services, pricing, expertise..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1 text-sm"
        />
        <Button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          size="icon"
          className="flex-shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* More examples hint */}
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Natural language supported • Ask anything about AI, SaaS, or web development
      </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: Collapsible */}
      <div className="lg:hidden">
        <MobileToggle />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ChatInterface />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden lg:block">
        <ChatInterface />
      </div>
    </>
  );
};

export default HeroChatbot;
