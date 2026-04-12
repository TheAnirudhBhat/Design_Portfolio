import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import BottomNav from "@/components/layout/BottomNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "dawave — Product Designer",
  description: "Senior Product Designer at slice. Designing UPI payments and banking products for young India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-white text-[rgba(0,0,0,0.9)]">
        <SmoothScroll>
          <Nav />
          <PageTransition>
            <main className="min-h-screen pb-[140px] tablet:pb-0">
              {children}
            </main>
          </PageTransition>
          <BottomNav />
        </SmoothScroll>
      </body>
    </html>
  );
}
