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
      style={{ padding: "clamp(20px, 4vw, 64px)", paddingBottom: 0 }}
    >
      <nav
        style={{
          width: "100%",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: scrolled ? "blur(40px)" : "blur(20px)",
          backgroundColor: scrolled ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.5s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "clamp(14px, 1.8vw, 22px) clamp(24px, 3vw, 48px)",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
            <span
              style={{
                fontSize: "clamp(15px, 1.2vw, 18px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "white",
              }}
            >
              DaW4ve
            </span>
          </Link>

          {/* Center Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(24px, 3vw, 40px)" }}>
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "clamp(13px, 1vw, 15px)",
                    fontWeight: 500,
                    color: isActive ? "white" : "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? "white" : "rgba(255,255,255,0.5)")
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="mailto:coolanirudh3@gmail.com"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "clamp(8px, 1vw, 12px) clamp(16px, 2vw, 28px)",
              fontSize: "clamp(13px, 1vw, 15px)",
              fontWeight: 500,
              color: "white",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            Say Hello
            <span>→</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
