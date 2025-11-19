export const SITE_CONFIG = {
  name: "Hoi An Silk Poetry",
  tagline: "Tinh Hoa Tơ Lụa Việt",
  description: "Khám phá vẻ đẹp truyền thống của lụa tơ tằm Hội An với hơn 300 năm lịch sử",
  url: "https://lua-tho-tam-hoi-an.com",
  email: "contact@lua-tho-tam-hoi-an.vn",
  phone: "+84 123 456 789",
  address: "Làng lụa, Phố Cổ Hội An, Quảng Nam, Việt Nam",
};

export const NAVIGATION = [
  { name: "Trang Chủ", href: "/" },
  { name: "Câu Chuyện", href: "/cau-chuyen" },
  { name: "Bộ Sưu Tập", href: "/bo-suu-tap" },
  { name: "Liên Hệ", href: "/lien-he" },
];

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const }
    }
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};
