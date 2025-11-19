# 🎋 Website Lụa Tơ Tằm Hội An

Website tĩnh cao cấp giới thiệu sản phẩm lụa tơ tằm truyền thống Hội An, được thiết kế theo tiêu chuẩn Frontend Senior với phong cách cổ kính, classic nhưng hiện đại và eye-catching.

## ✨ Đặc Điểm Nổi Bật

### 🎨 Design & UX
- **Phong cách Classic Modern**: Kết hợp màu sắc cổ điển (vàng, nâu, đỏ son, trắng ngà) với layout hiện đại
- **Typography nghệ thuật**: Font pairing giữa Playfair Display (serif) và Inter (sans-serif)
- **Animations mượt mà**: Parallax scrolling, scroll-triggered animations, micro-interactions
- **Responsive hoàn hảo**: Tối ưu cho mọi thiết bị từ mobile đến desktop

### 🚀 Công Nghệ

**Core Stack:**
- **Next.js 16** - React framework với App Router và SSG
- **TypeScript** - Type safety và better DX
- **Tailwind CSS v4** - Utility-first CSS với custom theme

**Animation & Interaction:**
- **Framer Motion** - Advanced animations và gestures
- **GSAP** - Professional timeline animations (sẵn sàng sử dụng)
- **React Intersection Observer** - Scroll-triggered effects

## 🎯 Các Trang

- **Trang Chủ** (`/`) - Hero video, parallax scrolling, featured products
- **Câu Chuyện** (`/cau-chuyen`) - Timeline lịch sử, scroll-triggered narration
- **Bộ Sưu Tập** (`/bo-suu-tap`) - Product grid với filters và hover effects
- **Liên Hệ** (`/lien-he`) - Contact form, animated map
- **Chatbot** (Global) - AI chatbot giả lập với knowledge base

## 🛠️ Cài Đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Start production server
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## 📁 Cấu Trúc Dự Án

```
hoi-an-silk/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, Featured Products, Story
│   │   ├── ui/                # Button, Card
│   │   └── chatbot/           # Chatbot component
│   ├── lib/                   # Utils, constants
│   └── data/                  # Products, chatbot knowledge
└── public/
    ├── images/                # Thêm ảnh vào đây
    └── videos/                # Thêm video vào đây
```

## 🎨 Tùy Chỉnh

### Màu Sắc
Edit `src/app/globals.css`:
```css
:root {
  --gold-primary: #D4AF37;
  --brown-primary: #5C4033;
  --red-primary: #8B0000;
  --ivory-primary: #FFFFF0;
}
```

### Sản Phẩm
Edit `src/data/products.ts`:
```typescript
export const PRODUCTS: Product[] = [
  {
    id: "product-id",
    name: "Tên sản phẩm",
    category: "Khăn Lụa",
    price: 850000,
    // ...
  },
];
```

### Chatbot
Edit `src/data/chatbot-knowledge.ts`:
```typescript
export const CHATBOT_KNOWLEDGE: KnowledgeItem[] = [
  {
    keywords: ["giá", "price"],
    response: "Câu trả lời..."
  },
];
```

## 📝 Thêm Nội Dung

### Thêm Video/Ảnh
1. Thêm file vào `public/images/` hoặc `public/videos/`
2. Sử dụng trong component:
```tsx
<Image src="/images/product.jpg" alt="Product" width={800} height={600} />
<video src="/videos/hero.mp4" autoPlay loop muted playsInline />
```

### Animations
```tsx
// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Static Export
```bash
# next.config.ts
output: 'export'

npm run build
# Deploy folder: out/
```

## 🎁 Tính Năng Nâng Cao (Optional)

- **E-commerce**: Thêm shopping cart, payment gateway
- **CMS**: Tích hợp Strapi/Contentful
- **SEO**: Metadata, sitemap, structured data
- **Analytics**: Google Analytics, Vercel Analytics

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📄 License

Copyright © 2024 Lụa Tơ Tằm Hội An. All rights reserved.

---

**Được thiết kế và phát triển với tình yêu cho nghề thủ công truyền thống Việt Nam** 🇻🇳
