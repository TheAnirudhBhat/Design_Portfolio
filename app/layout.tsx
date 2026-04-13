import type { Metadata } from "next";
import "./globals.css";

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
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&family=Gasoek+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-white text-[rgba(0,0,0,0.9)]">
        {children}
      </body>
    </html>
  );
}
