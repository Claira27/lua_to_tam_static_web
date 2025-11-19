"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { SITE_CONFIG, ANIMATION_VARIANTS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitMessage("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.");
    setIsSubmitting(false);

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative bg-[var(--ivory-primary)] pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[var(--brown-dark)] mb-4">
            Liên Hệ
          </h1>
          <p className="text-xl text-[var(--brown-light)] max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn tìm được sản phẩm lụa tơ tằm hoàn hảo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold text-[var(--brown-dark)] mb-8">
              Thông Tin Liên Hệ
            </h2>

            <div className="space-y-6 mb-12">
              <ContactInfoItem
                icon={<MapPin size={24} />}
                title="Địa Chỉ"
                content={SITE_CONFIG.address}
              />
              <ContactInfoItem
                icon={<Phone size={24} />}
                title="Số Điện Thoại"
                content={SITE_CONFIG.phone}
                link={`tel:${SITE_CONFIG.phone}`}
              />
              <ContactInfoItem
                icon={<Mail size={24} />}
                title="Email"
                content={SITE_CONFIG.email}
                link={`mailto:${SITE_CONFIG.email}`}
              />
              <ContactInfoItem
                icon={<Clock size={24} />}
                title="Giờ Mở Cửa"
                content="Thứ 2 - Chủ Nhật: 8:00 - 20:00"
              />
            </div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-80 rounded-lg overflow-hidden shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.856168165594!2d108.32493931533166!3d15.879460588894227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295545397c85e52!2zUGjhu5EgQ+G7lSBI4buZaSBBbiwgUXXhuqNuZyBOYW0sIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1731302707455!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Bản đồ Phố Cổ Hội An"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif font-bold text-[var(--brown-dark)] mb-8">
              Gửi Tin Nhắn
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--brown-primary)] mb-2"
                >
                  Họ và Tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[var(--stone)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-transparent bg-white text-[var(--brown-dark)] transition-all"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--brown-primary)] mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[var(--stone)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-transparent bg-white text-[var(--brown-dark)] transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[var(--brown-primary)] mb-2"
                >
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[var(--stone)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-transparent bg-white text-[var(--brown-dark)] transition-all"
                  placeholder="0912 345 678"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--brown-primary)] mb-2"
                >
                  Tin Nhắn *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[var(--stone)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:border-transparent bg-white text-[var(--brown-dark)] transition-all resize-none"
                  placeholder="Tôi muốn tìm hiểu về..."
                />
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                >
                  {submitMessage}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Gửi Tin Nhắn
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[var(--brown-primary)] to-[var(--brown-dark)] rounded-lg p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--ivory-primary)] mb-4">
            Ghé Thăm Showroom Của Chúng Tôi
          </h2>
          <p className="text-lg text-[var(--ivory-dark)] mb-6 max-w-2xl mx-auto">
            Đến trực tiếp showroom để trải nghiệm cảm giác mềm mại của lụa tơ tằm và tìm hiểu về quy trình dệt truyền thống
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[var(--ivory-primary)]">
            <div>
              <p className="text-3xl font-serif font-bold text-[var(--gold-light)]">300+</p>
              <p className="text-sm mt-1">Năm Lịch Sử</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-[var(--gold-light)]">50+</p>
              <p className="text-sm mt-1">Nghệ Nhân</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-[var(--gold-light)]">1000+</p>
              <p className="text-sm mt-1">Khách Hài Lòng</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Contact Info Item Component
function ContactInfoItem({
  icon,
  title,
  content,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}) {
  const Item = (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-[var(--gold-primary)] rounded-lg flex items-center justify-center text-[var(--brown-dark)]">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[var(--brown-dark)] mb-1">{title}</h3>
        <p className="text-[var(--brown-light)]">{content}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        className="block hover:opacity-80 transition-opacity"
      >
        {Item}
      </a>
    );
  }

  return Item;
}
