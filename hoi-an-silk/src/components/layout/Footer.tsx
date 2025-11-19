"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG, NAVIGATION } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="bg-[var(--brown-dark)] text-[var(--ivory-primary)] pt-16 md:pt-20 lg:pt-24 pb-8">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-[var(--gold-primary)] mb-4 md:mb-5">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-[var(--ivory-dark)] mb-4 md:mb-5 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <p className="text-sm text-[var(--stone)] leading-relaxed">
              Lưu giữ tinh hoa tơ lụa truyền thống Việt Nam
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-[var(--gold-primary)] mb-4 md:mb-5">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {NAVIGATION.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="list-none">
                    <Link
                      href={item.href}
                      className={cn(
                        "transition-colors inline-block py-1",
                        isActive
                          ? "text-[var(--gold-light)] font-semibold"
                          : "text-[var(--ivory-dark)] hover:text-[var(--gold-light)]"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-[var(--gold-primary)] mb-4 md:mb-5">
              Liên Hệ
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 list-none">
                <MapPin size={20} className="text-[var(--gold-light)] flex-shrink-0 mt-1" />
                <span className="text-[var(--ivory-dark)]">{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-3 list-none">
                <Phone size={20} className="text-[var(--gold-light)] flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-[var(--ivory-dark)] hover:text-[var(--gold-light)] transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 list-none">
                <Mail size={20} className="text-[var(--gold-light)] flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-[var(--ivory-dark)] hover:text-[var(--gold-light)] transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--brown-light)] pt-8 text-center">
          <p className="text-[var(--stone)] text-sm leading-relaxed">
            &copy; {currentYear} {SITE_CONFIG.name}. Bản quyền thuộc về chúng tôi.
          </p>
          <p className="text-[var(--stone)] text-xs mt-3 leading-relaxed">
            Được thiết kế với tình yêu cho nghề thủ công truyền thống Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
