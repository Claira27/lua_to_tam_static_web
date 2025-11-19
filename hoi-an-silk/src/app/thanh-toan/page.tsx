"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
    paymentMethod: "cod",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SHIPPING_FEE = 30000;
  const FREE_SHIPPING_THRESHOLD = 500000;
  const shippingFee = cart.total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const finalTotal = cart.total + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order ID
    const orderId = `DH${Date.now()}`;

    // Clear cart and redirect
    clearCart();
    router.push(`/dat-hang-thanh-cong?orderId=${orderId}`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--ivory-light)] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={80} className="mx-auto text-[var(--sand)] mb-6" />
          <h2 className="text-2xl font-serif font-bold text-[var(--brown-dark)] mb-4">
            Giỏ hàng trống
          </h2>
          <Link href="/bo-suu-tap">
            <Button variant="primary">Khám Phá Sản Phẩm</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ivory-light)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold text-[var(--brown-dark)] mb-8"
        >
          Thanh Toán
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Thông tin khách hàng */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-serif font-bold text-[var(--brown-dark)] mb-4 flex items-center gap-2">
                  <Truck size={24} />
                  Thông Tin Giao Hàng
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--brown-dark)] mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--sand)] rounded-lg focus:outline-none focus:border-[var(--gold-primary)]"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--brown-dark)] mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--sand)] rounded-lg focus:outline-none focus:border-[var(--gold-primary)]"
                      placeholder="0901234567"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[var(--brown-dark)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--sand)] rounded-lg focus:outline-none focus:border-[var(--gold-primary)]"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[var(--brown-dark)] mb-2">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--sand)] rounded-lg focus:outline-none focus:border-[var(--gold-primary)]"
                      placeholder="Số nhà, tên đường"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--brown-dark)] mb-2">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--sand)] rounded-lg focus:outline-none focus:border-[var(--gold-primary)]"
                      placeholder="Quảng Nam"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--brown-dark)] mb-2">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[var(--sand)] rounded-lg focus:outline-none focus:border-[var(--gold-primary)]"
                      placeholder="Hội An"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[var(--brown-dark)] mb-2">
                      Ghi chú
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-[var(--sand)] rounded-lg focus:outline-none focus:border-[var(--gold-primary)]"
                      placeholder="Ghi chú thêm về đơn hàng..."
                    />
                  </div>
                </div>
              </motion.div>

              {/* Phương thức thanh toán */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-serif font-bold text-[var(--brown-dark)] mb-4 flex items-center gap-2">
                  <CreditCard size={24} />
                  Phương Thức Thanh Toán
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-[var(--sand)] rounded-lg cursor-pointer hover:border-[var(--gold-primary)] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--brown-dark)]">
                        Thanh toán khi nhận hàng (COD)
                      </p>
                      <p className="text-sm text-[var(--brown-light)]">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-[var(--sand)] rounded-lg cursor-pointer hover:border-[var(--gold-primary)] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === "bank_transfer"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--brown-dark)]">
                        Chuyển khoản ngân hàng
                      </p>
                      <p className="text-sm text-[var(--brown-light)]">
                        Chuyển khoản trước, giao hàng sau
                      </p>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-serif font-bold text-[var(--brown-dark)] mb-4">
                  Đơn Hàng
                </h2>

                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded bg-[var(--ivory-light)]">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 bg-[var(--gold-dark)] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--brown-dark)] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-[var(--brown-light)]">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--sand)] pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--brown-light)]">Tạm tính:</span>
                    <span className="font-semibold">{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--brown-light)]">Phí vận chuyển:</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-[var(--gold-dark)]">Miễn phí</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[var(--sand)]">
                    <span className="font-bold text-[var(--brown-dark)]">Tổng:</span>
                    <span className="text-xl font-bold text-[var(--red-primary)]">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full mt-6"
                >
                  {isSubmitting ? (
                    "Đang xử lý..."
                  ) : (
                    <>
                      <Check size={20} className="mr-2" />
                      Xác Nhận Đặt Hàng
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
