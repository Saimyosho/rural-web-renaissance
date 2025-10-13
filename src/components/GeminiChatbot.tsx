import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, Send, Sparkles, X, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useTypingEffect } from "@/hooks/use-typing-effect";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const GeminiChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const genAI = useRef<GoogleGenerativeAI | null>(null);

  // Initialize Gemini AI
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("API Key exists:", !!apiKey);
    if (apiKey) {
      try {
        genAI.current = new GoogleGenerativeAI(apiKey);
        console.log("Gemini AI initialized successfully");
      } catch (error) {
        console.error("Error initializing Gemini:", error);
      }
    } else {
      console.error("VITE_GEMINI_API_KEY not found in environment variables");
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

  // Suggested prompts
  const suggestedPrompts = [
    "How can AI help my small business?",
    "What AI agents do you offer?",
    "Tell me about your pricing",
    "Can you build custom AI solutions?"
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (!genAI.current) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Configuration error: API key not loaded. Please refresh the page or contact support.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");

    try {
      const model = genAI.current.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // System context about the business
      const context = `You are an AI assistant for a web development and AI integration company called Rural Web Renaissance. 
      The company specializes in:
      - Building modern, professional websites for small businesses
      - Integrating AI agents for automation (bookings, reviews, social media, lead capture)
      - Custom AI solutions using tools like OpenAI, Anthropic Claude, Microsoft Copilot, etc.
      - Pricing starts at $250-350/month for single AI agents, with custom packages available
      - Free website offer for rural businesses in Missouri
      - Located in rural areas, serving small businesses everywhere
      
      Be helpful, friendly, and concise. Focus on how AI can solve their business problems.
      If asked about specific capabilities, mention the AI agent categories: Productivity, Enterprise, Developer, Creative, and Vertical specialists.`;

      const prompt = `${context}\n\nUser: ${input}\n\nAssistant:`;
      
      const result = await model.generateContentStream(prompt);
      
      let fullText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        setStreamingMessage(fullText);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: fullText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamingMessage("");
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const err = error as { message?: string; status?: number };
      console.error("Error details:", err.message, err.status);
      
      let errorMsg = "I apologize, but I'm having trouble connecting right now. ";
      
      if (err.message?.includes("API_KEY_INVALID") || err.status === 400) {
        errorMsg += "There seems to be an API configuration issue. Please contact us directly at hello@ruralwebrenaissance.com";
      } else if (err.status === 429) {
        errorMsg += "We've hit our usage limit. Please try again in a few moments or contact us at hello@ruralwebrenaissance.com";
      } else {
        errorMsg += "Please try again or contact us directly at hello@ruralwebrenaissance.com";
      }
      
      const errorMessage: Message = {
        role: "assistant",
        content: errorMsg,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="glass-strong border-primary/20 shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh]">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">AI Assistant</h3>
                    <p className="text-white/80 text-xs">Powered by Gemini</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Hi! I'm your AI assistant</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ask me anything about our AI solutions!
                    </p>
                    <div className="space-y-2">
                      {suggestedPrompts.map((prompt, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start text-xs"
                          onClick={() => {
                            setInput(prompt);
                            setTimeout(() => sendMessage(), 100);
                          }}
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message, i) => (
                  <MessageBubble key={i} message={message} />
                ))}

                {streamingMessage && (
                  <MessageBubble
                    message={{
                      role: "assistant",
                      content: streamingMessage,
                      timestamp: new Date()
                    }}
                    isStreaming
                  />
                )}

                {isLoading && !streamingMessage && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    </div>
                    <span>AI is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-primary/20">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="min-h-[60px] resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Message Bubble Component
const MessageBubble = ({ message, isStreaming }: { message: Message; isStreaming?: boolean }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? "bg-gradient-to-r from-primary to-accent text-white"
            : "glass border border-primary/20"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {isStreaming && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1 h-4 bg-current ml-1"
          />
        )}
      </div>
    </motion.div>
  );
};

export default GeminiChatbot;
