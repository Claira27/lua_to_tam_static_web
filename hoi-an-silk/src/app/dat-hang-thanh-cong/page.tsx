"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, Phone, Mail, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const id = searchParams.get("orderId");
    setOrderId(id || "");
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--ivory-light)] to-[var(--sand)] pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <CheckCircle size={80} className="text-green-500 relative" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-serif font-bold text-[var(--brown-dark)] mb-4"
          >
            Đặt Hàng Thành Công!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[var(--brown-light)] mb-8"
          >
            Cảm ơn bạn đã tin tưởng và lựa chọn {SITE_CONFIG.name}
          </motion.p>

          {/* Order ID */}
          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[var(--gold-primary)]/10 border-2 border-[var(--gold-primary)]/30 rounded-lg p-6 mb-8"
            >
              <p className="text-sm text-[var(--brown-light)] mb-2">Mã đơn hàng của bạn</p>
              <p className="text-2xl font-bold text-[var(--gold-dark)] font-mono">
                {orderId}
              </p>
            </motion.div>
          )}

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[var(--ivory-light)] rounded-lg p-6 mb-8 text-left"
          >
            <h2 className="font-serif font-bold text-[var(--brown-dark)] mb-4 flex items-center gap-2">
              <Package size={24} />
              Thông Tin Đơn Hàng
            </h2>
            <ul className="space-y-3 text-[var(--brown-dark)]">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Đơn hàng của bạn đã được tiếp nhận và đang được xử lý</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Chúng tôi sẽ gọi điện xác nhận trong vòng 24h</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Email xác nhận đã được gửi đến hộp thư của bạn</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Thời gian giao hàng dự kiến: 3-5 ngày làm việc</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="border-t border-[var(--sand)] pt-6 mb-8"
          >
            <h3 className="font-semibold text-[var(--brown-dark)] mb-4">
              Cần hỗ trợ? Liên hệ chúng tôi:
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center gap-2 text-[var(--gold-dark)] hover:text-[var(--gold-primary)] transition-colors"
              >
                <Phone size={18} />
                {SITE_CONFIG.contact.phone}
              </a>
              <span className="hidden sm:inline text-[var(--sand)]">|</span>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2 text-[var(--gold-dark)] hover:text-[var(--gold-primary)] transition-colors"
              >
                <Mail size={18} />
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button variant="primary" size="lg">
                <Home size={20} className="mr-2" />
                Về Trang Chủ
              </Button>
            </Link>
            <Link href="/bo-suu-tap">
              <Button variant="outline" size="lg">
                Tiếp Tục Mua Sắm
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
