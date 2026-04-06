"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiquidGlass } from "@liquidglass/react";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Play" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: "clamp(16px, 3vw, 44px)",
        paddingBottom: 0,
      }}
    >
      <LiquidGlass
        borderRadius={100}
        blur={0.5}
        contrast={1.05}
        saturation={1.3}
        brightness={1.1}
        shadowIntensity={0.15}
        displacementScale={10}
        elasticity={0.3}
        className="w-full"
      >
        <div
          className="flex items-center justify-between"
          style={{
            padding: "clamp(10px, 1.2vw, 14px) clamp(20px, 2.5vw, 32px)",
          }}
        >
          {/* Logo — left */}
          <Link href="/" className="shrink-0">
            <span className="text-base font-extrabold tracking-tight text-white">
              DaW4ve
            </span>
          </Link>

          {/* Nav Links — center */}
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
                  className={`text-[14px] font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA — right */}
          <Link
            href="/about"
            className="shrink-0 flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2 text-[14px] font-medium text-white transition-all duration-300 hover:bg-white/20"
          >
            Say Hello
            <span className="text-sm">→</span>
          </Link>
        </div>
      </LiquidGlass>
    </div>
  );
}
