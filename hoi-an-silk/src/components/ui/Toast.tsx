"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, ShoppingBag, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  productName: string;
  cartItemCount: number;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  productName, 
  cartItemCount, 
  isVisible, 
  onClose, 
  duration = 10000 
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="fixed top-24 right-6 z-[200] max-w-md w-full sm:w-auto"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] rounded-2xl blur-xl opacity-30 animate-pulse" />
          
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative bg-gradient-to-br from-white via-[var(--ivory-primary)] to-[var(--gold-primary)]/5 rounded-2xl shadow-2xl border border-[var(--gold-primary)]/30 overflow-hidden backdrop-blur-md"
          >
            {/* Decorative corner patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--gold-primary)]/20 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--gold-primary)]/10 to-transparent rounded-tr-full" />
            
            {/* Content */}
            <div className="relative p-5">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="relative flex-shrink-0"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-dark)] rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle size={28} className="text-white" strokeWidth={2.5} />
                  </div>
                  {/* Sparkle effect */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles size={16} className="text-[var(--gold-light)]" fill="currentColor" />
                  </motion.div>
                </motion.div>

                <div className="flex-1 min-w-0 pt-1">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg font-serif font-bold text-[var(--brown-dark)] mb-1 leading-tight"
                  >
                    Thêm vào giỏ thành công!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-sm text-[var(--brown-light)] font-medium line-clamp-2 leading-relaxed"
                  >
                    {productName}
                  </motion.p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex-shrink-0 p-2 hover:bg-[var(--gold-primary)]/10 rounded-full transition-colors"
                  aria-label="Đóng"
                >
                  <X size={18} className="text-[var(--brown-light)]" />
                </motion.button>
              </div>

              {/* Cart Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-white to-[var(--gold-primary)]/5 rounded-xl border border-[var(--gold-primary)]/20 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--gold-primary)]/20 to-[var(--gold-primary)]/5 rounded-lg flex items-center justify-center">
                      <ShoppingBag size={20} className="text-[var(--gold-dark)]" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--brown-light)] font-medium">Tổng trong giỏ</p>
                      <p className="text-[var(--brown-dark)] font-semibold">
                        <motion.span
                          key={cartItemCount}
                          initial={{ scale: 1.5, color: "var(--gold-primary)" }}
                          animate={{ scale: 1, color: "var(--brown-dark)" }}
                          className="text-xl font-bold text-[var(--gold-dark)]"
                        >
                          {cartItemCount}
                        </motion.span>
                        <span className="text-sm ml-1">sản phẩm</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow indicator */}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[var(--gold-primary)]"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold-primary)] to-[var(--gold-light)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
