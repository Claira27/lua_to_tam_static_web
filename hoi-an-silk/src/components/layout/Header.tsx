"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAVIGATION, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import CartIcon from "@/components/cart/CartIcon";
import CartSidebar from "@/components/cart/CartSidebar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--ivory-primary)]/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      )}
    >
      <nav className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--brown-dark)] group-hover:text-[var(--gold-dark)] transition-colors mb-0">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-xs text-[var(--brown-light)] tracking-widest mt-1">
              {SITE_CONFIG.tagline}
            </p>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.ul
          className="hidden md:flex items-center gap-6 lg:gap-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {NAVIGATION.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="list-none"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-block transition-colors group pb-1 px-2",
                    isActive 
                      ? "text-[var(--gold-dark)] font-semibold" 
                      : "text-[var(--brown-primary)] hover:text-[var(--gold-dark)]"
                  )}
                >
                  <span className="font-medium whitespace-nowrap">{item.name}</span>
                  <span 
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-[var(--gold-primary)] transition-all duration-300 ease-out",
                      isActive 
                        ? "w-full" 
                        : "w-0 group-hover:w-full"
                    )}
                  ></span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Cart Icon & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <CartIcon />
          
          {/* Mobile Menu Button */}
          <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[var(--brown-dark)] hover:text-[var(--gold-dark)] transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--ivory-primary)] border-t border-[var(--stone)]"
          >
            <ul className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 space-y-1">
              {NAVIGATION.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="list-none"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block py-3 px-4 text-lg rounded-lg transition-colors",
                        isActive
                          ? "text-[var(--gold-dark)] bg-[var(--sand)] font-semibold border-l-4 border-[var(--gold-primary)]"
                          : "text-[var(--brown-primary)] hover:text-[var(--gold-dark)] hover:bg-[var(--sand)]"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
