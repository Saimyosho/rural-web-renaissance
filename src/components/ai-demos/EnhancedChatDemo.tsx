import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp?: Date;
}

interface EnhancedChatDemoProps {
  agentName: string;
  agentColor: string;
  apiEndpoint?: string; // e.g., '/api/ai-agents/booking'
  initialMessage: string;
  placeholder?: string;
  onComplete?: (state: Record<string, unknown>) => void;
}

export default function EnhancedChatDemo({
  agentName,
  agentColor,
  apiEndpoint,
  initialMessage,
  placeholder = "Type your message...",
  onComplete
}: EnhancedChatDemoProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', content: initialMessage, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);

    // If no API endpoint, show a demo message
    if (!apiEndpoint) {
      setIsLoading(true);
      setTimeout(() => {
        const botMessage: ChatMessage = {
          role: 'bot',
          content: `This is a demo response to: "${userMessage.content}"\n\nIn production, this would connect to a real AI agent!`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Call real API
    setIsLoading(true);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        role: 'bot',
        content: data.message || data.response || 'Sorry, I didn\'t understand that.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Check if conversation is completed
      if (data.completed) {
        setIsCompleted(true);
        onComplete?.(data.state || {});
      }

    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
      
      const errorMessage: ChatMessage = {
        role: 'bot',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{ role: 'bot', content: initialMessage, timestamp: new Date() }]);
    setInput('');
    setError(null);
    setIsCompleted(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
                  message.role === 'user'
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "glass border border-primary/20"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass border border-primary/20 rounded-lg px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">
                {agentName} is typing...
              </span>
            </div>
          </motion.div>
        )}

        {/* Completion Indicator */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className="glass border-2 border-green-500/50 rounded-lg px-6 py-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Completed! ✨
              </span>
            </div>
          </motion.div>
        )}

        {/* Error Indicator */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <div className="glass border-2 border-red-500/50 rounded-lg px-6 py-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-600 dark:text-red-400">
                {error}
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-primary/20 p-4 bg-background/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading || isCompleted}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isCompleted}
            className={cn(
              "bg-gradient-to-r",
              agentColor
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Helpful hint */}
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {isCompleted 
            ? "Click reset to start over" 
            : "Press Enter to send • Try natural language"}
        </p>
      </div>
    </div>
  );
}
