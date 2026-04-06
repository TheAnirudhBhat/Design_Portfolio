"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Play" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: "clamp(16px, 3vw, 44px)", paddingBottom: 0 }}
    >
      <nav
        className={`w-full rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-black/50 backdrop-blur-2xl border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-white/[0.06] backdrop-blur-xl border-white/[0.08]"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-3">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-base font-extrabold tracking-tight text-white">
              DaW4ve
            </span>
          </Link>

          {/* Center Links */}
          <div className="flex items-center gap-8">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="mailto:coolanirudh3@gmail.com"
            className="shrink-0 flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          >
            Say Hello
            <span>→</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
