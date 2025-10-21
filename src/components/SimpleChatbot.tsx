import { useState, useRef, useEffect, useMemo } from "react";
import { Send, Sparkles, Loader2, Crown, Zap } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const SimpleChatbot = () => {
  // Generate a unique session ID for this chat session
  const sessionId = useMemo(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, []);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Sheldon's AI assistant. Ask me anything about AI services, web development, or how I can help your business! 🚀",
      isUser: false,
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll within the chat container, not the whole page
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "nearest",  // Don't scroll the page, only the container
        inline: "nearest"
      });
    }
  }, [messages]);

  const handleSend = async () => {
    const messageText = input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: messageText,
          conversationHistory,
          sessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text,
          isUser: false,
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'd love to help! For immediate assistance, contact Sheldon at SheldonGunby@icloud.com or 724-490-8102. Scroll down to see the full portfolio! 📧",
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "What AI services do you offer?",
    "How much does a website cost?",
    "Can you help automate my business?",
    "Tell me about your experience",
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Premium Header with Animated Gradient */}
      <div className="relative bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-violet-900/40 px-4 md:px-6 py-3 md:py-5 border-b border-purple-500/20 backdrop-blur-sm">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent animate-shimmer" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse-slow">
              <Crown className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-purple-500/20 blur-xl animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-xl bg-gradient-to-r from-amber-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                Premium AI Assistant
              </h3>
              <p className="hidden sm:flex text-xs text-purple-300/80 items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-400" />
                Powered by ChatGPT-4 • Enterprise-Grade
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            <span className="text-xs font-medium text-emerald-300">Online</span>
          </div>
        </div>
      </div>

      {/* Messages with Premium Styling */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={`max-w-[90%] md:max-w-[85%] rounded-xl md:rounded-2xl px-3 py-2.5 md:px-5 md:py-3.5 shadow-lg ${
                message.isUser
                  ? 'bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-600 text-white ml-auto border border-purple-400/30 shadow-purple-500/30'
                  : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-slate-100 backdrop-blur-sm border border-purple-500/20 shadow-purple-900/20'
              }`}
            >
              <p className="text-xs md:text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl md:rounded-2xl px-3 py-2.5 md:px-5 md:py-3.5 border border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin text-purple-400" />
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Premium Quick Prompts */}
      <div className="px-3 md:px-6 pb-3 md:pb-4">
        <p className="text-xs text-purple-300/70 mb-2 md:mb-3 flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Suggested prompts:</span>
          <span className="sm:hidden">Quick prompts:</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(prompt);
                setTimeout(() => handleSend(), 100);
              }}
              disabled={isLoading}
              className="group text-xs text-left px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 hover:from-purple-900/40 hover:to-indigo-900/40 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/20"
            >
              <span className="text-slate-300 group-hover:text-purple-200 transition-colors line-clamp-2">
                {prompt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Input Section */}
      <div className="border-t border-purple-500/20 p-3 md:p-5 bg-gradient-to-r from-slate-900/50 via-purple-900/20 to-slate-900/50 backdrop-blur-sm">
        <div className="flex gap-2 md:gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask about services, pricing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full px-3 py-2.5 md:px-5 md:py-3.5 rounded-lg md:rounded-xl bg-slate-900/60 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 text-xs md:text-sm text-slate-100 placeholder-slate-400 transition-all duration-300 backdrop-blur-sm"
            />
            <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 pointer-events-none" />
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="group relative px-4 py-2.5 md:px-6 md:py-3.5 rounded-lg md:rounded-xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white font-semibold hover:from-amber-400 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 md:gap-2 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:animate-shimmer" />
            {isLoading ? (
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin relative z-10" />
            ) : (
              <>
                <Send className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="hidden sm:inline relative z-10">Send</span>
              </>
            )}
          </button>
        </div>
        <p className="hidden sm:flex text-xs text-purple-300/60 mt-3 text-center items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400/70" />
          <span>Enterprise AI • Secure & Private • 24/7 Available</span>
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thumb-purple-500\\/20::-webkit-scrollbar-thumb {
          background-color: rgba(168, 85, 247, 0.2);
          border-radius: 3px;
        }
        .scrollbar-thumb-purple-500\\/20::-webkit-scrollbar-thumb:hover {
          background-color: rgba(168, 85, 247, 0.4);
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background: transparent; }
      `}} />
    </div>
  );
};

export default SimpleChatbot;
