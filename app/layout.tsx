import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import NoiseBackground from "@/components/canvas/NoiseBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import Nav from "@/components/layout/Nav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "dawave — Anirudh Bhat | Product Designer",
  description:
    "Product Designer crafting intuitive, scalable experiences in fintech. Payments, investing, and trust.",
  openGraph: {
    title: "dawave — Anirudh Bhat | Product Designer",
    description:
      "Product Designer crafting intuitive, scalable experiences in fintech.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-display bg-bg text-text-primary antialiased">
        <NoiseBackground />
        <CustomCursor />
        <Nav />
        <SmoothScroll>
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
