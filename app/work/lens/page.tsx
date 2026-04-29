import Link from "next/link";
import "../../v2.css";
import { LensCaseStudyContent, getProject } from "@/components/v2/caseStudies";

export const metadata = {
  title: "LENS — Case Study · Anirudh Bhat",
  description: "A schema-driven detail-page framework for credit card management at MobiKwik. 10M+ users impacted, ↓40% support queries.",
};

export default function LensCaseStudy() {
  const accent = getProject("lens")?.accent;
  return (
    <main style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}>
      <LensCaseStudyContent />
      <div className="v2-case">
        <Link href="/" className="v2-case-back v2-case-back--bottom">← Back to home</Link>
      </div>
    </main>
  );
}
