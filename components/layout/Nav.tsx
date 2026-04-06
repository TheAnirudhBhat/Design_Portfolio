"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-10">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-dw-text"
      >
        dawave
      </Link>

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
              className="nav-link group relative text-sm font-medium text-dw-muted transition-colors duration-300 hover:text-dw-text"
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-dw-accent transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
