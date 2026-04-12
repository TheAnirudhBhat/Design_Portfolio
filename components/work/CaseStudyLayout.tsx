import GestureNav from "@/components/layout/GestureNav";
import Link from "next/link";

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  role: string;
  company: string;
  timeline: string;
  metric?: string;
  tags?: string[];
  children: React.ReactNode;
}

export default function CaseStudyLayout({
  title,
  subtitle,
  role,
  company,
  timeline,
  metric,
  tags,
  children,
}: CaseStudyLayoutProps) {
  const details = [
    { label: "Role", value: role },
    { label: "Company", value: company },
    { label: "Timeline", value: timeline },
    ...(metric ? [{ label: "Impact", value: metric }] : []),
  ];

  return (
    <article>
      {/* Mobile app bar */}
      <div className="tablet:hidden h-[108px] flex items-end px-[24px] pb-[16px] gap-[8px]">
        <Link href="/" className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.5)]">←</Link>
        <h1 className="text-[16px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">Work</h1>
      </div>

      {/* Cover placeholder */}
      <div className="w-full h-[200px] tablet:h-[360px] desktop:h-[480px] bg-gradient-to-br from-[rgba(211,10,215,0.05)] to-[rgba(211,10,215,0.15)]" />

      {/* Header + Details + Content */}
      <div className="px-[24px] tablet:max-w-[720px] tablet:mx-auto desktop:max-w-[800px]">
        {/* Title */}
        <div className="py-[24px] tablet:py-[32px]">
          <h1 className="text-[32px] leading-[40px] font-medium tablet:text-[clamp(32px,4vw,48px)] text-[rgba(0,0,0,0.9)] mb-[8px]">{title}</h1>
          <p className="text-[16px] leading-[24px] text-[rgba(0,0,0,0.7)]">{subtitle}</p>
        </div>

        {/* Details — mobile: list items */}
        <div className="tablet:hidden">
          <div className="h-[1px] bg-[rgba(0,0,0,0.05)]" />
          {details.map((d, i) => (
            <div key={d.label} className={`flex justify-between py-[16px] ${i < details.length - 1 ? "border-b border-[rgba(0,0,0,0.05)]" : ""}`}>
              <span className="text-[14px] leading-[20px] text-[rgba(0,0,0,0.5)]">{d.label}</span>
              <span className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Details — desktop: inline row */}
        <div className="hidden tablet:flex tablet:gap-[32px] tablet:py-[24px] tablet:border-y tablet:border-[rgba(0,0,0,0.05)]">
          {details.map((d) => (
            <div key={d.label}>
              <p className="text-[12px] leading-[16px] text-[rgba(0,0,0,0.5)] mb-[4px]">{d.label}</p>
              <p className="text-[14px] leading-[20px] font-medium text-[rgba(0,0,0,0.9)]">{d.value}</p>
            </div>
          ))}
        </div>

        {/* MDX content */}
        <div className="prose prose-lg max-w-none py-[32px]">
          {children}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-[8px] pb-[32px]">
            {tags.map((tag) => (
              <span key={tag} className="px-[12px] py-[4px] bg-[#F5F5F5] rounded-[8px] text-[12px] leading-[16px] text-[rgba(0,0,0,0.5)]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Mobile bottom CTA */}
      <div className="tablet:hidden px-[24px] py-[12px] border-t border-[rgba(0,0,0,0.05)]">
        <Link
          href="/"
          className="w-full flex items-center justify-center py-[12px] bg-[#D30AD7] rounded-full text-[14px] leading-[20px] font-medium text-white tracking-[0.28px]"
        >
          Back to home
        </Link>
      </div>

      <GestureNav />
    </article>
  );
}
