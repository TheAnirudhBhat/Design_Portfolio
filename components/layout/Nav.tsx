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
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        style={{
          /* ── Container morph ── */
          maxWidth: scrolled ? "1100px" : "100%",
          margin: "0 auto",
          borderRadius: scrolled ? "9999px" : "0",
          /* ── Position offset ── */
          marginTop: scrolled ? "16px" : "0",
          marginLeft: scrolled ? "auto" : "0",
          marginRight: scrolled ? "auto" : "0",
          /* ── Glass effect ── */
          backgroundColor: scrolled
            ? "rgba(14, 14, 22, 0.6)"
            : "rgba(10, 10, 15, 0.4)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          borderTop: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "none",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "none",
          /* ── Transition ── */
          transition: "all 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: scrolled
              ? "12px 28px"
              : "20px 32px",
            transition: "padding 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, textDecoration: "none" }}>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "white",
              }}
            >
              DaW4ve
            </span>
          </Link>

          {/* Center Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
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
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isActive ? "white" : "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "white")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "white"
                      : "rgba(255,255,255,0.45)")
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
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "8px 20px",
              fontSize: "13px",
              fontWeight: 500,
              color: "white",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
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
