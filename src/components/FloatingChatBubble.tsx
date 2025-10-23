import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleChatbot from "./SimpleChatbot";

const FloatingChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed z-[9999] bottom-20 md:bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] md:h-[650px] shadow-2xl"
            >
              <div className="relative h-full">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center border-2 border-white"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Chatbot */}
                <SimpleChatbot />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-purple-600 to-indigo-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group"
            aria-label="Open AI chat"
          >
            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-purple-500 opacity-75 animate-ping" />
            
            {/* Icon */}
            <MessageCircle className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatBubble;
