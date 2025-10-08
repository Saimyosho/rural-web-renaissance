import { useState, useEffect, useRef } from "react";
import { Bot, User, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export interface Message {
  role: "user" | "bot";
  content: string;
  timestamp?: Date;
}

interface ChatDemoProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  onReset?: () => void;
  agentName: string;
  agentColor: string;
  isTyping?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const ChatDemo = ({
  messages,
  onSendMessage,
  onReset,
  agentName,
  agentColor,
  isTyping = false,
  autoPlay = false,
  autoPlayDelay = 2000,
}: ChatDemoProps) => {
  const [inputValue, setInputValue] = useState("");
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, messages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, autoPlayDelay);

      return () => clearTimeout(timer);
    }
  }, [autoPlay, currentIndex, messages, autoPlayDelay]);

  // Scroll to bottom when new message arrives (within container only)
  useEffect(() => {
    if (containerRef.current && messagesEndRef.current) {
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      container.scrollTo({
        top: scrollHeight,
        behavior: "smooth"
      });
    }
  }, [displayedMessages]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setDisplayedMessages([]);
    setCurrentIndex(0);
    if (onReset) {
      onReset();
    }
  };

  const messagesToShow = autoPlay ? displayedMessages : messages;

  return (
    <div className="flex flex-col h-full bg-background/50 rounded-xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r ${agentColor}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white">{agentName}</div>
            <div className="text-xs text-white/80">AI Assistant</div>
          </div>
        </div>
        {onReset && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-white hover:bg-white/20"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[500px]"
      >
        <AnimatePresence>
          {messagesToShow.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "bot" && (
                <div className={`p-2 rounded-full bg-gradient-to-br ${agentColor} flex-shrink-0`}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "glass border border-border/50 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              {message.role === "user" && (
                <div className="p-2 rounded-full bg-primary flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className={`p-2 rounded-full bg-gradient-to-br ${agentColor}`}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="glass border border-border/50 rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {onSendMessage && (
        <div className="p-4 border-t border-border/50 bg-background/30">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 glass border-border/50"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`bg-gradient-to-r ${agentColor}`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDemo;
