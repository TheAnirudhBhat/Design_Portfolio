import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import NoiseBackground from "@/components/canvas/NoiseBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import Nav from "@/components/layout/Nav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DaW4ve — Anirudh Bhat | Product Designer",
  description:
    "Product Designer crafting intuitive, scalable experiences in fintech. Payments, investing, and trust.",
  openGraph: {
    title: "DaW4ve — Anirudh Bhat | Product Designer",
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
    <html lang="en" className={figtree.variable}>
      <body className="font-display bg-dw-bg text-dw-text antialiased">
        <NoiseBackground />
        <CustomCursor />
        <Nav />
        <SmoothScroll>
          <PageTransition>
            <main className="relative z-10">{children}</main>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
