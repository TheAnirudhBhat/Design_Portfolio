import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anirudh Bhat — Senior Product Designer",
  description: "Senior Product Designer at slice, designing payments and money products. Also known as DaW4ve.",
  authors: [{ name: "Anirudh Bhat" }],
  openGraph: {
    title: "Anirudh Bhat — Senior Product Designer",
    description: "Senior Product Designer at slice, designing payments and money products.",
    type: "website",
  },
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
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
