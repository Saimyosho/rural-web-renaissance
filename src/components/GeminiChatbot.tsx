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

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");

    // Fallback responses if API fails  
    const fallbackResponses: Record<string, string> = {
      "how can ai help": "Hey! So AI can honestly be a game-changer for small businesses 😊 Think about all those repetitive tasks eating up your day - answering the same questions over and over, booking appointments at weird hours, responding to reviews, keeping social media active...\n\nWe've got 5 different AI agents that handle this stuff automatically:\n- **BookingBot** (24/7 appointments)\n- **ReviewReplier** (auto-responds to reviews)\n- **SocialBot** (daily social posts)\n- **LeadCapture** (website chat)\n- **MenuMaster** (restaurant orders)\n\nMost start around $250-350/month and honestly pay for themselves pretty quick. What kind of tasks are eating up YOUR time?",
      "what ai agents": "Great question! We've got 5 AI agents that each handle different stuff:\n\n**BookingBot** ($300-450/mo) - Takes appointments 24/7, even at 2am. Sends reminders, collects deposits, basically never sleeps 😴\n\n**ReviewReplier** ($150-250/mo) - Responds to every Google/Yelp review. Good ones get thank-yous, bad ones get handled diplomatically\n\n**SocialBot** ($300-500/mo) - Posts to Instagram/Facebook daily with your content. No more \"oh crap I forgot to post\"\n\n**LeadCapture** ($200-350/mo) - Chats with website visitors, qualifies leads, catches the hot ones immediately\n\n**MenuMaster** ($250-450/mo) - For restaurants - takes orders via text, handles dietary stuff, updates wait times\n\nEach one saves like 10-25 hours a week. Which one sounds most useful for you?",
      "pricing": "So pricing depends on what you need, but here's the breakdown:\n\n💼 **Essential** ($250-350/mo) - Pick one AI agent, we set it up, train it, you're good to go\n\n🚀 **Professional** ($500-700/mo) - Two agents working together. Most popular option honestly\n\n⭐ **Enterprise** ($1000+/mo) - Three or more agents, full custom setup, basically we go all-in\n\nAll of 'em include setup, training, support, and tweaking things as you go. Oh and if you're a rural Missouri business, you get a FREE website too! 🎉\n\nWhat's your biggest headache right now?",
      "custom": "Oh absolutely! We LOVE custom projects 😊\n\nWe can hook up premium AI tools (ChatGPT, Claude, Microsoft Copilot, whatever makes sense), build totally custom agents for your specific workflow, connect everything to your existing systems... basically if you can dream it up, we can probably build it.\n\nLike we've done custom stuff for contractors tracking leads, salons with complicated booking rules, restaurants with wild delivery zones... you name it.\n\nWhat kind of automation are you thinking about? Let's chat about it!"
    };

    try {
      if (!genAI.current) {
        console.warn("Gemini API not initialized, using fallback responses");
        throw new Error("API_NOT_INITIALIZED");
      }
      const model = genAI.current.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // System context about the business
      const context = `You're a friendly, down-to-earth AI assistant for Rural Web Renaissance. Talk like a real person - use casual language, contractions, and be genuinely enthusiastic about helping small businesses. No corporate speak!

      What we do:
      - Build awesome websites for small businesses (especially rural Missouri ones - they get FREE sites!)
      - Create AI agents that actually save business owners tons of time
      - Set up automation for booking, reviews, social media, customer chat, etc.
      - Pricing ranges from $250-$1000+/month depending on what they need

      Be conversational and relatable. Share real examples, use emojis when it feels right 😊, and talk about how this genuinely helps people run their businesses better. Ask follow-up questions to understand what they actually need. Be helpful without being salesy - just a helpful neighbor who knows tech!`;

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
      console.error("Error calling Gemini API, using fallback:", error);
      const err = error as { message?: string; status?: number };
      console.error("Error details:", err.message, err.status);
      
      // Try to match user input with fallback responses
      const inputLower = currentInput.toLowerCase();
      let responseText = "";
      
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (inputLower.includes(key)) {
          responseText = response;
          break;
        }
      }
      
      // Default fallback if no match
      if (!responseText) {
        responseText = "Haha, okay so full transparency here... 😅\n\n" +
          "This AI chatbot is still a work in progress! I'm just one guy with a dream, building this thing between client projects. Getting the AI fully trained isn't exactly at the top of my to-do list yet, but hey - thanks for giving it a shot!\n\n" +
          "Real talk though, I DO build some pretty awesome stuff:\n" +
          "🤖 AI agents that actually work\n" +
          "💻 Custom websites that don't suck\n" +
          "🎯 Automation that saves you actual time\n\n" +
          "If you want to chat about a real project, shoot me an email: **Sheldongunby@icloud.com**\n\n" +
          "I promise I'm way better at building things than I am at training chatbots 😂";
      }
      
      // Simulate typing effect
      const words = responseText.split(" ");
      let currentText = "";
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? " " : "") + words[i];
        setStreamingMessage(currentText);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      const assistantMessage: Message = {
        role: "assistant",
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setStreamingMessage("");
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
