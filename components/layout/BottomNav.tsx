"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pods = [
  { name: "Home", href: "/", icon: "⌂" },
  { name: "Work", href: "/work", icon: "◈" },
  { name: "About", href: "/about", icon: "○" },
  { name: "Play", href: "/playground", icon: "△" },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 tablet:hidden">
      <div className="bg-gradient-to-b from-transparent to-white pt-[24px]">
        <div className="flex items-center justify-center gap-[24px] px-[24px] pb-[8px]">
          {pods.map((pod) => (
            <Link
              key={pod.href}
              href={pod.href}
              className={`
                flex items-center justify-center rounded-full transition-all duration-200
                ${
                  isActive(pod.href)
                    ? "size-[64px] bg-white shadow-[0_0_16px_rgba(0,0,0,0.12)]"
                    : "size-[40px] bg-black/10"
                }
              `}
            >
              <span
                className={`
                  leading-none
                  ${isActive(pod.href) ? "text-[32px]" : "text-[20px]"}
                `}
              >
                {pod.icon}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center py-[8px]">
          <div className="w-[128px] h-[4px] rounded-full bg-[rgba(0,0,0,0.3)]" />
        </div>
      </div>
    </nav>
  );
}
