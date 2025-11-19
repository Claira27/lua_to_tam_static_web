"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function CartSidebar() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top when sidebar opens
  useEffect(() => {
    if (isCartOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isCartOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full sm:w-[450px] bg-white z-[101] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--sand)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-[var(--gold-dark)]" size={24} />
                <h2 className="text-xl font-serif font-bold text-[var(--brown-dark)]">
                  Giỏ Hàng
                </h2>
                <span className="text-sm text-[var(--brown-light)]">
                  ({cart.itemCount} sản phẩm)
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-[var(--sand)] rounded-full transition-colors"
                aria-label="Đóng giỏ hàng"
              >
                <X size={24} className="text-[var(--brown-dark)]" />
              </button>
            </div>

            {/* Cart Items */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                  <ShoppingBag size={64} className="text-[var(--sand)] mb-4" />
                  <p className="text-lg font-medium text-[var(--brown-light)] mb-2">
                    Giỏ hàng trống
                  </p>
                  <p className="text-sm text-[var(--brown-light)] mb-6">
                    Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
                  </p>
                  <Button onClick={closeCart} variant="primary">
                    Tiếp Tục Mua Sắm
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-[var(--ivory-light)] rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[var(--brown-dark)] mb-1 line-clamp-2 leading-snug">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-[var(--brown-light)] mb-2">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded transition-colors"
                            aria-label="Giảm số lượng"
                          >
                            <Minus size={16} className="text-[var(--brown-dark)]" />
                          </button>
                          <span className="w-8 text-center font-medium text-[var(--brown-dark)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded transition-colors"
                            aria-label="Tăng số lượng"
                          >
                            <Plus size={16} className="text-[var(--brown-dark)]" />
                          </button>
                        </div>
                      </div>

                      {/* Remove & Price */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 hover:bg-[var(--red-primary)]/10 rounded transition-colors"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 size={18} className="text-[var(--red-primary)]" />
                        </button>
                        <p className="font-bold text-[var(--brown-dark)]">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              </div>
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-[var(--sand)] p-6 space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-[var(--brown-dark)]">Tạm tính:</span>
                  <span className="font-bold text-[var(--brown-dark)]">
                    {formatPrice(cart.total)}
                  </span>
                </div>

                <p className="text-sm text-[var(--brown-light)] text-center">
                  Phí vận chuyển sẽ được tính ở bước thanh toán
                </p>

                {/* Buttons */}
                <div className="space-y-2">
                  <Link href="/thanh-toan" onClick={closeCart}>
                    <Button size="lg" variant="primary" className="w-full">
                      Thanh Toán
                    </Button>
                  </Link>
                  <Link href="/gio-hang" onClick={closeCart}>
                    <Button size="lg" variant="outline" className="w-full">
                      Xem Giỏ Hàng
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
