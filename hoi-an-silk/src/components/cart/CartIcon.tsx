"use client";

import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
  const { cart, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-[var(--gold-primary)]/10 rounded-full transition-colors"
      aria-label="Giỏ hàng"
    >
      <ShoppingBag size={24} className="text-[var(--brown-dark)]" />
      
      <AnimatePresence>
        {cart.itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-[var(--red-primary)] text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
          >
            {cart.itemCount > 99 ? "99+" : cart.itemCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
