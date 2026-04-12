"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Playground", href: "/playground" },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="hidden tablet:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.05)]">
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-[64px] px-[24px] desktop:px-[48px]">
        <Link
          href="/"
          className="font-medium text-[16px] leading-[20px] text-[rgba(0,0,0,0.9)] tracking-wide"
        >
          dawave
        </Link>
        <div className="flex items-center gap-[32px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-[8px]"
            >
              <span
                className={`text-[14px] leading-[20px] font-medium transition-colors duration-150 ${
                  isActive(link.href)
                    ? "text-[rgba(0,0,0,0.9)]"
                    : "text-[rgba(0,0,0,0.5)] hover:text-[rgba(0,0,0,0.7)]"
                }`}
              >
                {link.name}
              </span>
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D30AD7] rounded-full"
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </Link>
          ))}
        </div>
        <a
          href="mailto:hello@dawave.in"
          className="inline-flex items-center justify-center px-[16px] py-[8px] bg-[rgba(0,0,0,0.9)] rounded-full text-[14px] leading-[20px] font-medium text-white hover:bg-[rgba(0,0,0,0.7)] transition-colors duration-150"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
