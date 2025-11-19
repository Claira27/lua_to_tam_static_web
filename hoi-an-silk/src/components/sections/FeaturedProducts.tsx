"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function FeaturedProducts() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[var(--ivory-primary)] z-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--brown-dark)] mb-4 md:mb-6">
            Bộ Sưu Tập Đặc Sắc
          </h2>
          <p className="text-lg text-[var(--brown-light)] max-w-2xl mx-auto leading-relaxed px-4">
            Những sản phẩm lụa tơ tằm tinh hoa, được chế tác tỉ mỉ từ tay nghệ nhân
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={ANIMATION_VARIANTS.stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-10 md:mb-12"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-96 bg-[var(--stone)] overflow-hidden">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Content - Desktop only */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  <Button variant="primary" size="sm" className="w-full">
                    Xem Chi Tiết
                  </Button>
                </div>

                {/* Mobile Button - Always visible on mobile */}
                <div className="md:hidden absolute inset-0 flex items-end p-6">
                  <Button variant="primary" size="sm" className="w-full opacity-90">
                    Xem Chi Tiết
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 bg-white">
                <span className="text-xs text-[var(--gold-dark)] font-semibold tracking-wider uppercase block mb-3">
                  {product.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-[var(--brown-dark)] mb-3 group-hover:text-[var(--gold-dark)] transition-colors leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-[var(--brown-light)] mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-2xl font-bold text-[var(--red-primary)]">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="mt-4">
                  <AddToCartButton product={product} size="md" className="w-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Link href="/bo-suu-tap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Button size="lg" variant="primary">
              Xem Toàn Bộ Bộ Sưu Tập
            </Button>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
