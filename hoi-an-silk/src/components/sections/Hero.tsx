"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { HERO_IMAGES } from "@/lib/images";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brown-primary)]/70 via-[var(--gold-primary)]/50 to-[var(--red-primary)]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[var(--ivory-primary)] mb-6 md:mb-8 leading-tight drop-shadow-2xl">
            Lụa Thơ Tằm Hội An
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--gold-light)] mt-3 md:mt-4 drop-shadow-2xl font-normal">Mềm như thơ - đậm hồn phố Hội</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base md:text-lg lg:text-xl text-[var(--ivory-primary)] mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4"
        >
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link href="/bo-suu-tap">
            <Button size="lg" variant="primary">
              Khám Phá Bộ Sưu Tập
            </Button>
          </Link>
          <Link href="/cau-chuyen">
            <Button size="lg" variant="outline">
              Tìm Hiểu Câu Chuyện
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Di chuyển ra ngoài và xuống thấp hơn */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform z-20"
        aria-label="Cuộn xuống"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-[var(--ivory-primary)] drop-shadow-lg"
        >
          <span className="text-sm mb-2 tracking-widest font-medium">CUỘN XUỐNG</span>
          <ChevronDown size={24} className="drop-shadow-lg" />
        </motion.div>
      </motion.button>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--ivory-dark)] to-transparent pointer-events-none" />
    </section>
  );
}
