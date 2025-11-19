"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const SHIPPING_FEE = 30000; // 30,000 VND
  const FREE_SHIPPING_THRESHOLD = 500000; // Free ship trên 500k

  const shippingFee = cart.total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const finalTotal = cart.total + shippingFee;

  return (
    <div className="min-h-screen bg-[var(--ivory-light)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--brown-dark)] mb-2">
            Giỏ Hàng Của Bạn
          </h1>
          <p className="text-[var(--brown-light)]">
            {cart.itemCount > 0 ? `${cart.itemCount} sản phẩm` : "Chưa có sản phẩm"}
          </p>
        </motion.div>

        {cart.items.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-12 text-center"
          >
            <ShoppingBag size={80} className="mx-auto text-[var(--sand)] mb-6" />
            <h2 className="text-2xl font-serif font-bold text-[var(--brown-dark)] mb-4">
              Giỏ Hàng Trống
            </h2>
            <p className="text-[var(--brown-light)] mb-8">
              Hãy khám phá bộ sưu tập lụa tơ tằm cao cấp của chúng tôi
            </p>
            <Link href="/bo-suu-tap">
              <Button size="lg" variant="primary">
                Khám Phá Sản Phẩm
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 flex gap-6"
                >
                  {/* Product Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--ivory-light)]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-[var(--brown-dark)] mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-[var(--brown-light)]">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 hover:bg-[var(--red-primary)]/10 rounded-full transition-colors"
                        aria-label="Xóa sản phẩm"
                      >
                        <Trash2 size={20} className="text-[var(--red-primary)]" />
                      </button>
                    </div>

                    <p className="text-sm text-[var(--brown-light)] mb-4 line-clamp-2">
                      {item.product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-[var(--ivory-light)] rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-white rounded transition-colors"
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={18} className="text-[var(--brown-dark)]" />
                        </button>
                        <span className="w-12 text-center font-bold text-[var(--brown-dark)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-white rounded transition-colors"
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={18} className="text-[var(--brown-dark)]" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-[var(--brown-light)] mb-1">
                          {formatPrice(item.product.price)} x {item.quantity}
                        </p>
                        <p className="text-2xl font-bold text-[var(--red-primary)]">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-2xl font-serif font-bold text-[var(--brown-dark)] mb-6">
                  Tóm Tắt Đơn Hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[var(--brown-dark)]">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">{formatPrice(cart.total)}</span>
                  </div>

                  <div className="flex justify-between text-[var(--brown-dark)]">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-[var(--gold-dark)]">Miễn phí</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  {cart.total < FREE_SHIPPING_THRESHOLD && (
                    <div className="text-sm text-[var(--brown-light)] bg-[var(--gold-primary)]/10 p-3 rounded">
                      Mua thêm{" "}
                      <span className="font-bold text-[var(--gold-dark)]">
                        {formatPrice(FREE_SHIPPING_THRESHOLD - cart.total)}
                      </span>{" "}
                      để được miễn phí vận chuyển!
                    </div>
                  )}

                  <div className="border-t border-[var(--sand)] pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-[var(--brown-dark)]">
                        Tổng cộng:
                      </span>
                      <span className="text-2xl font-bold text-[var(--red-primary)]">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/thanh-toan">
                  <Button size="lg" variant="primary" className="w-full mb-3">
                    Tiến Hành Thanh Toán
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>

                <Link href="/bo-suu-tap">
                  <Button size="lg" variant="outline" className="w-full">
                    Tiếp Tục Mua Sắm
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-[var(--sand)]">
                  <h3 className="font-semibold text-[var(--brown-dark)] mb-3">
                    Chính sách mua hàng
                  </h3>
                  <ul className="text-sm text-[var(--brown-light)] space-y-2">
                    <li>✓ Miễn phí vận chuyển đơn từ 500.000đ</li>
                    <li>✓ Đổi trả trong 7 ngày</li>
                    <li>✓ Thanh toán an toàn</li>
                    <li>✓ Hỗ trợ 24/7</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
