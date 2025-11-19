"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { STORY_IMAGES } from "@/lib/images";

export default function StoryPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[var(--ivory-dark)] to-[var(--sand)] z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              {/* Background Image */}
              <img
                src={STORY_IMAGES.preview}
                alt="Nghề dệt lụa truyền thống Việt Nam"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to Unsplash if local image not found
                  e.currentTarget.src = STORY_IMAGES.fallback.origin;
                }}
              />

              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brown-primary)]/60 via-transparent to-[var(--gold-primary)]/40" />

              {/* Decorative border */}
              <div className="absolute inset-0 border-8 border-[var(--gold-primary)] opacity-30" />

              {/* Overlay text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <p className="text-[var(--ivory-primary)] text-4xl font-serif font-bold text-center px-8 drop-shadow-lg">
                  300 Năm<br />Lịch Sử<br />Tơ Lụa
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--gold-primary)] opacity-20 rounded-full blur-3xl"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block text-sm text-[var(--gold-dark)] font-semibold tracking-widest uppercase mb-4"
            >
              Câu Chuyện Của Chúng Tôi
            </motion.span>

            <motion.h2
              variants={ANIMATION_VARIANTS.fadeInUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-4xl md:text-5xl font-serif font-bold text-[var(--brown-dark)] mb-6 md:mb-8 leading-tight"
            >
              Hơn Ba Thế Kỷ Lưu Giữ Tinh Hoa Tơ Lụa
            </motion.h2>

            <div className="space-y-5 md:space-y-6 mb-8 md:mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-[var(--brown-primary)] leading-relaxed"
              >
                Từ thế kỷ 17, nghề dệt lụa Hội An đã trở thành biểu tượng của sự tinh xảo
                và sang trọng. Mỗi sợi tơ, mỗi đường dệt đều mang trong mình câu chuyện
                của những bàn tay nghệ nhân tài hoa.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-[var(--brown-primary)] leading-relaxed"
              >
                Chúng tôi tự hào kế thừa và phát huy nghề truyền thống, kết hợp với
                kỹ thuật hiện đại để mang đến những sản phẩm lụa tơ tằm cao cấp nhất,
                giữ trọn vẹn hồn cốt văn hóa Việt.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-8 md:gap-12 lg:gap-16"
            >
              <div className="text-center min-w-[100px]">
                <p className="text-4xl font-serif font-bold text-[var(--gold-dark)] mb-2">300+</p>
                <p className="text-sm text-[var(--brown-light)] leading-relaxed">Năm Lịch Sử</p>
              </div>
              <div className="text-center min-w-[100px]">
                <p className="text-4xl font-serif font-bold text-[var(--gold-dark)] mb-2">100%</p>
                <p className="text-sm text-[var(--brown-light)] leading-relaxed">Thủ Công</p>
              </div>
              <div className="text-center min-w-[100px]">
                <p className="text-4xl font-serif font-bold text-[var(--gold-dark)] mb-2">50+</p>
                <p className="text-sm text-[var(--brown-light)] leading-relaxed">Nghệ Nhân</p>
              </div>
            </motion.div>

            <Link href="/cau-chuyen">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <Button size="lg" variant="primary">
                  Khám Phá Câu Chuyện Đầy Đủ
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
