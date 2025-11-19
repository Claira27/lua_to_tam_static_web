"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Filter } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProducts = selectedCategory === "Tất cả"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

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
            Bộ Sưu Tập
          </h1>
          <p className="text-xl text-[var(--brown-light)] max-w-2xl mx-auto">
            Khám phá những sản phẩm lụa tơ tằm tinh xảo, được chế tác bằng tay từ nghệ nhân Hội An
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Filter size={20} className="text-[var(--gold-dark)]" />
            <span className="text-sm text-[var(--brown-primary)] font-medium uppercase tracking-wider">
              Lọc theo danh mục
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {PRODUCT_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[var(--gold-primary)] text-[var(--brown-dark)] shadow-lg"
                    : "bg-white text-[var(--brown-primary)] hover:bg-[var(--ivory-dark)] border border-[var(--stone)]"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[var(--brown-light)] mb-8"
        >
          Hiển thị {filteredProducts.length} sản phẩm
        </motion.p>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-2xl text-[var(--brown-light)] font-serif">
              Không tìm thấy sản phẩm nào trong danh mục này
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center bg-gradient-to-r from-[var(--brown-primary)] to-[var(--brown-dark)] rounded-lg p-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--ivory-primary)] mb-4">
            Không Tìm Thấy Sản Phẩm Phù Hợp?
          </h2>
          <p className="text-lg text-[var(--ivory-dark)] mb-6 max-w-2xl mx-auto">
            Chúng tôi cung cấp dịch vụ thiết kế và may đo theo yêu cầu. Liên hệ ngay để được tư vấn!
          </p>
          <Link href="/lien-he">
            <Button size="lg" variant="primary">
              Liên Hệ Tư Vấn
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-[var(--red-primary)] text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
            Nổi Bật
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-[var(--stone)]">
        {/* Product Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />

        {/* Hover Actions - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex absolute inset-0 items-end p-6"
        >
          <Button variant="primary" size="sm" className="w-full">
            Xem Chi Tiết
          </Button>
        </motion.div>

        {/* Mobile Button - Always visible */}
        <div className="md:hidden absolute inset-0 flex items-end p-6">
          <Button variant="primary" size="sm" className="w-full opacity-90">
            Xem Chi Tiết
          </Button>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--gold-primary)] opacity-20 blur-2xl" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <span className="text-xs text-[var(--gold-dark)] font-semibold tracking-wider uppercase">
          {product.category}
        </span>

        <h3 className="text-2xl font-serif font-bold text-[var(--brown-dark)] mt-2 mb-3 group-hover:text-[var(--gold-dark)] transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-[var(--brown-light)] mb-4 leading-relaxed line-clamp-3">
          {product.description}
        </p>

        <div className="mb-4">
          <p className="text-2xl font-bold text-[var(--red-primary)] mb-3">
            {formatPrice(product.price)}
          </p>
          <AddToCartButton product={product} size="md" className="w-full" />
        </div>

        <div className="flex items-center justify-center pt-4 border-t border-[var(--sand)]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-[var(--gold-dark)] hover:text-[var(--gold-primary)] transition-colors flex items-center gap-2 text-sm"
            aria-label="Add to wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Yêu thích</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
