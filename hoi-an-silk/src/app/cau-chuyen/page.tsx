"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { getStoryImage } from "@/lib/images";

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  // Auto play/pause and mute/unmute based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video đang trong viewport - bật âm thanh và play
            video.muted = false;
            video.play().catch(() => {
              // Nếu browser chặn, fallback về muted
              video.muted = true;
              video.play();
            });
          } else {
            // Video không trong viewport - tắt âm thanh
            video.muted = true;
          }
        });
      },
      {
        threshold: 0.5, // Khi 50% video hiển thị
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--ivory-primary)]">
      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Fallback background gradient (chỉ hiện khi video chưa load) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brown-primary)] via-[var(--gold-primary)] to-[var(--brown-dark)] -z-10" />
          
          {/* Video */}
          <video
            ref={videoRef}
            key="story-video"
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            poster="https://images.unsplash.com/photo-1610701076302-32ad96e05c6e?w=1920&h=1080&fit=crop&q=80"
            onLoadedData={() => {
              console.log('✅ Video loaded successfully');
              // IntersectionObserver sẽ xử lý play/mute
            }}
            onError={(e) => {
              console.error('❌ Video failed to load:', e);
              console.log('Kiểm tra: /videos/silk-story.mp4');
            }}
            onCanPlay={() => {
              console.log('🎬 Video can play');
            }}
          >
            <source src="/videos/silk-story.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-6 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-[var(--ivory-primary)] mb-6 drop-shadow-2xl">
            Câu Chuyện
          </h1>
          <p className="text-2xl md:text-3xl text-[var(--gold-light)] font-serif italic drop-shadow-xl">
            Ba thế kỷ lưu giữ tinh hoa tơ lụa Việt Nam
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-6">
          {/* Story 1: Origins */}
          <StoryBlock
            title="Khởi Nguồn - Thế Kỷ 17"
            subtitle="Từ Những Sợi Tơ Đầu Tiên"
            content={[
              "Nghề dệt lụa Hội An bắt đầu từ thế kỷ 17, khi những thương nhân và nghệ nhân từ Trung Quốc, Nhật Bản mang theo kỹ thuật dệt lụa tinh xảo đến phố cổ.",
              "Hòa quyện với bàn tay khéo léo của người Việt, nghề dệt lụa Hội An dần hình thành phong cách riêng biệt, kết hợp tinh hoa của nhiều nền văn hóa.",
              "Mỗi sợi tơ được kéo từ kén tằm, mỗi đường dệt đều chứa đựng tâm huyết và kỹ năng được truyền thừa qua nhiều thế hệ."
            ]}
            align="left"
          />

          {/* Story 2: Golden Age */}
          <StoryBlock
            title="Hoàng Kim - Thế Kỷ 18-19"
            subtitle="Thịnh Vượng Của Nghề Lụa"
            content={[
              "Vào thế kỷ 18-19, Hội An trở thành trung tâm thương mại quốc tế quan trọng. Lụa Hội An được xuất khẩu đến nhiều quốc gia, nổi tiếng với chất lượng cao và họa tiết độc đáo.",
              "Các làng nghề dệt lụa phát triển mạnh mẽ, với hàng nghìn gia đình tham gia vào quy trình từ nuôi tằm, kéo tơ đến dệt vải và thêu thùa.",
              "Đây là thời kỳ các kỹ thuật dệt truyền thống được hoàn thiện, tạo nên những sản phẩm lụa có giá trị nghệ thuật cao."
            ]}
            align="right"
          />

          {/* Story 3: Preservation */}
          <StoryBlock
            title="Gìn Giữ - Thế Kỷ 20"
            subtitle="Bảo Tồn Di Sản"
            content={[
              "Qua những biến động lịch sử, nghề dệt lụa Hội An đã trải qua nhiều thăng trầm. Nhưng nhờ sự nỗ lực của các thế hệ nghệ nhân, nghề truyền thống vẫn được gìn giữ và phát triển.",
              "Các gia đình nghề lụa kiên trì giữ lại những kỹ thuật dệt thủ công, từ chối bỏ rơi phương pháp truyền thống dù công nghiệp hóa phát triển.",
              "Hội An được UNESCO công nhận là Di sản Văn hóa Thế giới, tạo động lực mới cho việc bảo tồn và phát triển nghề dệt lụa."
            ]}
            align="left"
          />

          {/* Story 4: Modern Day */}
          <StoryBlock
            title="Hiện Đại - Thế Kỷ 21"
            subtitle="Kết Hợp Truyền Thống & Hiện Đại"
            content={[
              "Ngày nay, chúng tôi tự hào kế thừa và phát huy nghề truyền thống. Kết hợp kỹ thuật dệt thủ công với công nghệ hiện đại, chúng tôi tạo ra những sản phẩm lụa cao cấp, đáp ứng tiêu chuẩn quốc tế.",
              "Mỗi sản phẩm đều là tác phẩm nghệ thuật độc bản, mang đậm dấu ấn văn hóa Việt Nam nhưng vẫn phù hợp với xu hướng thời trang đương đại.",
              "Chúng tôi cam kết giữ gìn 100% quy trình thủ công trong các công đoạn quan trọng, đảm bảo chất lượng và giá trị văn hóa của mỗi sản phẩm."
            ]}
            align="right"
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--ivory-dark)] to-[var(--sand)] z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--brown-dark)] mb-4">
              Quy Trình Dệt Lụa Truyền Thống
            </h2>
            <p className="text-lg text-[var(--brown-light)] max-w-2xl mx-auto">
              Từ nuôi tằm đến thành phẩm, mỗi bước đều cần sự tỉ mỉ và tâm huyết
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Nuôi Tằm", desc: "Chăm sóc tằm từ trứng đến kén, đảm bảo chất lượng tơ tốt nhất" },
              { step: "02", title: "Kéo Tơ", desc: "Kéo sợi tơ từ kén một cách cẩn thận, giữ nguyên độ mềm mại tự nhiên" },
              { step: "03", title: "Dệt Vải", desc: "Dệt thủ công trên khung cửi truyền thống, tạo độ đều và chắc chắn" },
              { step: "04", title: "Hoàn Thiện", desc: "Nhuộm màu, thêu thùa và hoàn thiện sản phẩm với kỹ thuật tinh xảo" },
            ].map((process, index) => (
              <ProcessCard key={index} {...process} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--brown-dark)] mb-4">
              Giá Trị Cốt Lõi
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Truyền Thống",
                desc: "Giữ gìn và phát huy những giá trị văn hóa truyền thống của nghề dệt lụa Việt Nam",
                icon: "🏛️"
              },
              {
                title: "Chất Lượng",
                desc: "Cam kết mang đến sản phẩm cao cấp nhất, từ nguyên liệu đến quy trình sản xuất",
                icon: "⭐"
              },
              {
                title: "Bền Vững",
                desc: "Sản xuất thân thiện môi trường, hỗ trợ cộng đồng nghệ nhân địa phương",
                icon: "🌿"
              },
            ].map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Story Block Component
function StoryBlock({ title, subtitle, content, align }: {
  title: string;
  subtitle: string;
  content: string[];
  align: "left" | "right";
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === "left" ? -50 : 50 }}
      transition={{ duration: 0.8 }}
      className={`mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${align === "right" ? "lg:flex-row-reverse" : ""}`}
    >
      <div className={`${align === "right" ? "lg:col-start-2" : ""}`}>
        <span className="text-sm text-[var(--gold-dark)] font-semibold tracking-widest uppercase">
          {subtitle}
        </span>
        <h3 className="text-4xl md:text-5xl font-serif font-bold text-[var(--brown-dark)] mt-2 mb-6">
          {title}
        </h3>
        <div className="space-y-4">
          {content.map((paragraph, idx) => (
            <p key={idx} className="text-lg text-[var(--brown-primary)] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className={`relative h-96 ${align === "right" ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        <div className="relative h-full rounded-lg overflow-hidden shadow-xl">
          <img
            src={getStoryImage(title)}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-light)]/30 to-[var(--brown-light)]/30" />
        </div>
      </div>
    </motion.div>
  );
}

// Process Card Component
function ProcessCard({ step, title, desc, index }: {
  step: string;
  title: string;
  desc: string;
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--gold-primary)] flex items-center justify-center">
        <span className="text-3xl font-serif font-bold text-[var(--brown-dark)]">{step}</span>
      </div>
      <h3 className="text-2xl font-serif font-bold text-[var(--brown-dark)] mb-3">{title}</h3>
      <p className="text-[var(--brown-light)] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// Value Card Component
function ValueCard({ title, desc, icon, index }: {
  title: string;
  desc: string;
  icon: string;
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-serif font-bold text-[var(--brown-dark)] mb-3">{title}</h3>
      <p className="text-[var(--brown-light)] leading-relaxed">{desc}</p>
    </motion.div>
  );
}
