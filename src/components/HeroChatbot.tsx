import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, Bot, User, Zap, Lock, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const HeroChatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm Sheldon's AI assistant. Ask me about AI services, pricing, tech stack, or how I can help transform your business!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_FREE_MESSAGES = 5;
  const remainingMessages = user ? Infinity : Math.max(0, MAX_FREE_MESSAGES - messageCount);

  const examplePrompts = [
    "What AI services do you offer?",
    "How much does a custom website cost?",
    "Can you build me a SaaS platform?",
    "Tell me about your tech stack",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (promptText?: string) => {
    const messageText = promptText || input.trim();
    if (!messageText || isLoading) return;

    // Check message limit for non-authenticated users
    if (!user && messageCount >= MAX_FREE_MESSAGES) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        text: "You've reached your free message limit! Sign up to continue chatting and unlock unlimited AI assistance. 🚀",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    // Increment message count for non-authenticated users
    if (!user) {
      setMessageCount(prev => prev + 1);
    }

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
      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: messageText }),
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
        text: "I'd love to help! For immediate assistance, contact Sheldon at SheldonGunby@icloud.com or 724-490-8102. 📧",
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

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-bridge to-accent rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
            <Bot className="w-6 h-6 text-white" />
            {!user && remainingMessages < MAX_FREE_MESSAGES && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {remainingMessages}
              </div>
            )}
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Floating background effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-bridge/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
      
      {/* Main container */}
      <div className="relative bg-background/95 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-2xl overflow-hidden">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-bridge to-accent opacity-10 animate-gradient-shift" />
        
        {/* Header */}
        <div className="relative border-b border-border/50 bg-gradient-to-r from-primary/5 via-bridge/5 to-accent/5 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </motion.div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-bridge to-accent bg-clip-text text-transparent">
                  AI Assistant
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="text-xs border-primary/50 bg-primary/10 px-2 py-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    GPT-3.5
                  </Badge>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            
            {/* Message counter for non-authenticated users */}
            {!user && (
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className="border-primary/50 bg-primary/10">
                  <Zap className="w-3 h-3 mr-1" />
                  {remainingMessages}/{MAX_FREE_MESSAGES} free
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="h-6 px-2 text-xs lg:hidden"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[400px] sm:max-h-[500px] scroll-smooth"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.3,
                  delay: index === messages.length - 1 ? 0.1 : 0,
                }}
                className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-primary to-accent' 
                    : 'bg-gradient-to-br from-muted to-muted-foreground/20'
                }`}>
                  {message.isUser ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-foreground" />
                  )}
                </div>

                {/* Message bubble */}
                <div className={`flex-1 max-w-[80%] sm:max-w-[85%] ${message.isUser ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block rounded-2xl px-4 py-3 ${
                      message.isUser
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                        : 'bg-muted/50 backdrop-blur-sm border border-border/50 text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-foreground" />
              </div>
              <div className="bg-muted/50 backdrop-blur-sm border border-border/50 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-bridge"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-accent"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Limit reached message */}
          {!user && remainingMessages === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20"
            >
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">Unlock Unlimited AI Chat</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Sign up to continue chatting and get full access to AI assistance!
                  </p>
                  <div className="flex gap-2">
                    <Link to="/signup">
                      <Button size="sm" className="text-xs h-8">
                        Sign Up Free
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick prompts */}
        {messages.length === 1 && (
          <div className="px-4 sm:px-6 pb-4">
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Quick questions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {examplePrompts.map((prompt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading || (!user && remainingMessages === 0)}
                  className="text-xs h-auto py-2.5 px-3 justify-start text-left hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                >
                  <span className="truncate">{prompt}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-border/50 bg-muted/30 p-4 sm:p-6">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder={
                !user && remainingMessages === 0
                  ? "Sign up to continue chatting..."
                  : "Ask me anything..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || (!user && remainingMessages === 0)}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
            />
            <Button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim() || (!user && remainingMessages === 0)}
              size="icon"
              className="flex-shrink-0 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by ChatGPT
            </span>
            {!user && (
              <span className="font-medium">
                {remainingMessages} {remainingMessages === 1 ? 'message' : 'messages'} left
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Minimize button (desktop) */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMinimized(true)}
        className="absolute -top-2 -right-2 hidden lg:flex h-8 w-8 p-0 rounded-full bg-background border border-border shadow-lg hover:bg-muted"
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export default HeroChatbot;
