"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { ChatMessage, findBestMatch } from "@/data/chatbot-knowledge";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Xin chào! Tôi là trợ lý ảo của Lụa Tơ Tằm Hội An. Tôi có thể giúp bạn về sản phẩm, giá cả, lịch sử và nhiều thông tin khác. Bạn cần hỗ trợ gì?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse = findBestMatch(inputValue);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300",
          "bg-[var(--gold-primary)] text-[var(--brown-dark)] hover:bg-[var(--gold-dark)] hover:scale-110",
          isOpen && "hidden"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[calc(100vh-8rem)] bg-[var(--ivory-light)] rounded-lg shadow-2xl flex flex-col overflow-hidden border-2 border-[var(--gold-primary)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--brown-primary)] to-[var(--brown-dark)] text-[var(--ivory-primary)] p-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg">Trợ Lý Ảo</h3>
                <p className="text-xs text-[var(--gold-light)]">Lụa Thơ Tằm Hội An</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-[var(--brown-light)] p-2 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg shadow-sm",
                      message.sender === "user"
                        ? "bg-[var(--gold-primary)] text-[var(--brown-dark)]"
                        : "bg-white text-[var(--brown-primary)] border border-[var(--stone)]"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs mt-1 opacity-60">
                      {message.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-[var(--brown-primary)] p-3 rounded-lg shadow-sm border border-[var(--stone)]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-[var(--gold-primary)] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[var(--gold-primary)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-[var(--gold-primary)] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--stone)] bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 px-4 py-2 border border-[var(--stone)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] bg-[var(--ivory-light)] text-[var(--brown-dark)]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-[var(--gold-primary)] text-[var(--brown-dark)] rounded-lg hover:bg-[var(--gold-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
