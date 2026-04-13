import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "daW4ve — Product Designer | v2",
  description:
    "Senior Product Designer at slice. Designing UPI payments and banking products for young India.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
