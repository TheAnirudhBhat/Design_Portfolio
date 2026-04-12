"use client";

import Link from "next/link";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Playground", href: "/playground" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Dribbble", href: "https://dribbble.com" },
  { name: "Twitter", href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="hidden tablet:block border-t border-[rgba(0,0,0,0.05)] mt-[64px]">
      <div className="max-w-[1280px] mx-auto px-[24px] desktop:px-[48px] py-[32px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[32px]">
            <span className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">dawave</span>
            <div className="flex gap-[24px]">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] hover:text-[rgba(0,0,0,0.7)] transition-colors duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-[24px]">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)] hover:text-[rgba(0,0,0,0.7)] transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.3)] mt-[24px]">
          Built with slice DLS 2.0 · Designed &amp; coded by Anirudh Bhat
        </p>
      </div>
    </footer>
  );
}
