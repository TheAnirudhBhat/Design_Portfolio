import Link from "next/link";
import "../../v2.css";
import "./case-study.css";

export const metadata = {
  title: "LENS — Case Study · Anirudh Bhat",
  description: "A schema-driven detail-page framework for credit card management at MobiKwik. 10M+ users impacted, ↓40% support queries.",
};

export default function LensCaseStudy() {
  return (
    <main>
      <div className="v2-case-cover">
        <img
          src="/images/projects/lens-cover.jpg"
          alt="LENS"
          loading="lazy"
        />
      </div>
      <article className="v2-case">
        <Link href="/" className="v2-case-back">← Back</Link>
        <header className="v2-case-hero" style={{ "--accent": "#8B5CF6" } as React.CSSProperties}>
          <p className="v2-case-meta">Lead Product Designer · MobiKwik · 2023–2024</p>
          <h1 className="v2-case-title">LENS</h1>
          <p className="v2-case-deck">
            A schema-driven detail-page framework that gave structure to credit
            card management at scale — used by 10M+ users, cut support queries
            by ~40%.
          </p>
          <div className="v2-case-stats">
            <div><strong>10M+</strong><span>users impacted</span></div>
            <div><strong>↓40%</strong><span>support queries</span></div>
            <div><strong>30+</strong><span>card variants supported</span></div>
          </div>
        </header>

      <section className="v2-case-section">
        <h2>The problem</h2>
        <p>
          MobiKwik&rsquo;s credit-card detail surface had grown to support
          dozens of card variants — each with different fees, rewards,
          eligibility rules, lifecycle states, and partner co-branding. The
          single hand-coded layout wasn&rsquo;t scaling: every new card meant
          new screens, new edge cases, and a backlog that always lost to
          higher-priority work. Users couldn&rsquo;t find basic information
          about their own card, support tickets piled up, and PMs were
          blocked behind design every time a new variant launched.
        </p>
      </section>

      <section className="v2-case-section">
        <h2>Constraints</h2>
        <ul>
          <li>Card variants change quarterly — designs needed to update without engineering re-work.</li>
          <li>The same surface served first-time card holders and power users with multiple cards.</li>
          <li>Compliance reviewed every visual deviation, adding cycles to every change.</li>
          <li>Mobile-first — the entire experience lives in a 360px column.</li>
        </ul>
      </section>

      <section className="v2-case-section">
        <h2>What I considered</h2>
        <p>
          <strong>Variant-specific layouts.</strong> Each card looks bespoke,
          but maintenance breaks at every product launch.
        </p>
        <p>
          <strong>One rigid layout, all fields visible.</strong> Fast to ship,
          but information overload — most fields irrelevant for any given user.
        </p>
        <p>
          <strong>A schema-driven framework</strong> (chosen). Each card type
          declares a JSON schema that drives the UI. Sections render only when
          data exists. Ordering follows priority rules. The same mobile
          component handles every variant.
        </p>
      </section>

      <section className="v2-case-section">
        <h2>The decision</h2>
        <p>
          The schema approach won because it pushed product complexity off the
          design canvas and into a system everyone could reason about. PMs
          could ship new card variants without re-opening Figma. Support
          queries dropped because each user only saw fields relevant to their
          card. We could A/B test field ordering and visibility without
          redrawing layouts.
        </p>
      </section>

      <section className="v2-case-section">
        <h2>Outcomes</h2>
        <ul className="v2-case-outcomes">
          <li><strong>10M+</strong> users on the framework</li>
          <li><strong>↓40%</strong> support queries on credit-card detail pages</li>
          <li>New card variants launchable in days instead of weeks</li>
          <li>Framework reapplied at slice for credit-card surfaces post-2024</li>
        </ul>
      </section>

      <section className="v2-case-cta-block">
        <p>Want the long version with screens, schemas, and the parts I&rsquo;d redo?</p>
        <a
          href="https://medium.com/mbk-blog/mobikwik-lens-a-product-design-case-study-79592d4e9a00"
          target="_blank"
          rel="noopener noreferrer"
          className="v2-medium-cta"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
            <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.24l5.39 11.823L17.37 3h6.625v.403l-1.917 1.838c-.165.126-.247.333-.213.538v13.498c-.034.204.048.41.213.537l1.872 1.837v.403h-9.418v-.403l1.939-1.882c.19-.19.19-.246.19-.537V7.794L11.225 21.59h-.728L4.97 7.794v9.246c-.052.385.076.774.347 1.052l2.521 3.058v.404H.674v-.404l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" />
          </svg>
          Read on Medium
        </a>
      </section>

      <Link href="/" className="v2-case-back v2-case-back--bottom">← Back to home</Link>
      </article>
    </main>
  );
}
