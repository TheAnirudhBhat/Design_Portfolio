"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data/projects";

export type CaseOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
  accent: string;
};

type Props = {
  caseId: string | null;
  origin: CaseOrigin | null;
  onClose: () => void;
};

const accentByCase: Record<string, string> = {
  lens: "#8B5CF6",
  "upi-onboarding": "#10B981",
  epfo: "#3B82F6",
  xtra: "#F59E0B",
};

const MODAL_MAX_W = 1080;

export default function CaseStudyModal({ caseId, origin, onClose }: Props) {
  useEffect(() => {
    if (!caseId) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [caseId, onClose]);

  const initialMotion = useMemo(() => {
    if (!origin || typeof window === "undefined") return null;
    const targetW = Math.min(MODAL_MAX_W, window.innerWidth - 32);
    const targetH = window.innerHeight * 0.88;
    const cx = origin.x + origin.width / 2;
    const cy = origin.y + origin.height / 2;
    const tx = cx - window.innerWidth / 2;
    const ty = cy - window.innerHeight / 2;
    const sx = origin.width / targetW;
    const sy = origin.height / targetH;
    // No backgroundColor animation — both card and modal share var(--v2-bg-card)
    // / var(--v2-bg) tonality, so the morph is pure size + position. Avoids the
    // accent → bg interpolation that was causing the white-flash glitch.
    return {
      x: tx,
      y: ty,
      scaleX: sx,
      scaleY: sy,
      borderRadius: 16,
    };
  }, [origin]);

  const accent = caseId ? accentByCase[caseId] : undefined;

  return (
    <AnimatePresence>
      {caseId && initialMotion && (
        <motion.div
          className="v2-case-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="v2-case-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Case study"
            initial={initialMotion}
            animate={{
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              borderRadius: 24,
            }}
            exit={initialMotion}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{
              transformOrigin: "center center",
              ...(accent ? ({ "--accent": accent } as React.CSSProperties) : {}),
            }}
          >
            <div className="v2-case-fade v2-case-fade--top" aria-hidden />

            <button
              className="v2-case-close"
              onClick={onClose}
              aria-label="Close case study"
            >
              ×
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              {caseId === "lens" && <LensCaseStudyContent />}
              {caseId === "upi-onboarding" && <UpiCaseStudyContent />}
              {caseId === "epfo" && <EpfoCaseStudyContent />}
              {caseId === "xtra" && <XtraCaseStudyContent />}
            </motion.div>

            <div className="v2-case-fade v2-case-fade--bottom" aria-hidden />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MediumCta({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="v2-medium-cta"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
        <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.24l5.39 11.823L17.37 3h6.625v.403l-1.917 1.838c-.165.126-.247.333-.213.538v13.498c-.034.204.048.41.213.537l1.872 1.837v.403h-9.418v-.403l1.939-1.882c.19-.19.19-.246.19-.537V7.794L11.225 21.59h-.728L4.97 7.794v9.246c-.052.385.076.774.347 1.052l2.521 3.058v.404H.674v-.404l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" />
      </svg>
      Read on Medium
    </a>
  );
}

function ContactCta() {
  return (
    <a href="mailto:hello@dawave.in" className="v2-medium-cta">
      Want the long version? Get in touch →
    </a>
  );
}

function LensCaseStudyContent() {
  const project = projects.find((p) => p.id === "lens");
  return (
    <>
      <div className="v2-case-cover">
        <img
          src={project?.image ?? "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&auto=format&fit=crop"}
          alt={project?.title ?? "Case study cover"}
          loading="lazy"
        />
      </div>
      <article className="v2-case">
        <header className="v2-case-hero">
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
          <MediumCta url="https://medium.com/mbk-blog/mobikwik-lens-a-product-design-case-study-79592d4e9a00" />
        </section>
      </article>
    </>
  );
}

function UpiCaseStudyContent() {
  const project = projects.find((p) => p.id === "upi-onboarding");
  return (
    <>
      <div className="v2-case-cover">
        <img src={project?.image ?? ""} alt={project?.title ?? "UPI Onboarding"} loading="lazy" />
      </div>
      <article className="v2-case">
        <header className="v2-case-hero">
          <p className="v2-case-meta">Senior Product Designer · slice · 2025–Present</p>
          <h1 className="v2-case-title">UPI Onboarding</h1>
          <p className="v2-case-deck">
            Why first-time users were dropping off mid-setup — and what fixed
            it. Redesigned the slice UPI signup flow, cutting onboarding time
            by 4.5x and lifting first-transaction rate by 18%.
          </p>
          <div className="v2-case-stats">
            <div><strong>4.5x</strong><span>faster onboarding</span></div>
            <div><strong>+18%</strong><span>first txn rate</span></div>
            <div><strong>10M+</strong><span>users at scale</span></div>
          </div>
        </header>

        <section className="v2-case-section">
          <h2>The problem</h2>
          <p>
            UPI is the default rail for digital payments in India, but
            first-time setup is dense — users have to verify a bank account,
            create a UPI PIN, and link a primary device, all gated by a
            handful of regulator-mandated steps. At slice we were losing
            users mid-flow at the bank-verification step, with drop-off
            spikes especially on lower-end devices and slower networks.
          </p>
        </section>

        <section className="v2-case-section">
          <h2>Constraints</h2>
          <ul>
            <li>Every step is regulator-mandated — we couldn&rsquo;t skip verification, only re-sequence and re-frame it.</li>
            <li>Multiple bank-API integrations with very different latency and error profiles.</li>
            <li>First-time users — many had never used UPI before, never set a banking PIN before.</li>
            <li>Network-degraded states common — flows had to recover from partial failures gracefully.</li>
          </ul>
        </section>

        <section className="v2-case-section">
          <h2>What I considered</h2>
          <p>
            <strong>Compress the flow into a single screen.</strong> Lower
            cognitive overhead but very brittle — any one failure crashes
            the whole experience.
          </p>
          <p>
            <strong>Show progress upfront, run async.</strong> Users see all
            steps at the start; we run network calls in parallel where the
            regulator allows, and surface failures inline. (Chosen.)
          </p>
        </section>

        <section className="v2-case-section">
          <h2>The decision</h2>
          <p>
            We optimized for <em>perceived</em> speed, not just real speed.
            Showing the user upfront how few steps remained — and what was
            happening in the background — turned a black-box wait into a
            visible journey. Coupled with parallel network calls and
            optimistic UI on safe steps, total time-on-flow dropped from
            ~90 seconds to ~20 seconds.
          </p>
        </section>

        <section className="v2-case-section">
          <h2>Outcomes</h2>
          <ul className="v2-case-outcomes">
            <li><strong>4.5x</strong> faster onboarding (~90s → ~20s)</li>
            <li><strong>+18%</strong> first-transaction conversion within 24h of signup</li>
            <li>Drop-off at bank verification reduced by ~35%</li>
          </ul>
        </section>

        <section className="v2-case-cta-block">
          <p>Want the long version — with the failure-mode flows, the bank-API matrix, and the A/B numbers?</p>
          <ContactCta />
        </section>
      </article>
    </>
  );
}

function EpfoCaseStudyContent() {
  const project = projects.find((p) => p.id === "epfo");
  return (
    <>
      <div className="v2-case-cover">
        <img src={project?.image ?? ""} alt={project?.title ?? "EPFO"} loading="lazy" />
      </div>
      <article className="v2-case">
        <header className="v2-case-hero">
          <p className="v2-case-meta">Product Designer · MobiKwik · 2024</p>
          <h1 className="v2-case-title">EPFO</h1>
          <p className="v2-case-deck">
            Untangling Provident Fund withdrawals for millions of first-time
            digital users. Simplified a notoriously dense government flow,
            cutting support tickets by 27% and lifting conversion by 12%.
          </p>
          <div className="v2-case-stats">
            <div><strong>↓27%</strong><span>support tickets</span></div>
            <div><strong>+12%</strong><span>conversion lift</span></div>
          </div>
        </header>

        <section className="v2-case-section">
          <h2>The problem</h2>
          <p>
            India&rsquo;s Employee Provident Fund (EPF) is one of the
            country&rsquo;s largest savings instruments — and one of the most
            confusing to interact with. Users came to MobiKwik to check their
            balance and request withdrawals, but the underlying EPFO portal
            speaks the language of HR forms and government nomenclature.
            Most users gave up, or filed support tickets asking what their
            own balance even meant.
          </p>
        </section>

        <section className="v2-case-section">
          <h2>Constraints</h2>
          <ul>
            <li>EPFO data is government-issued — we couldn&rsquo;t change what it called things.</li>
            <li>Multiple withdrawal types (full, partial, COVID-era, advance) each have their own eligibility rules.</li>
            <li>Users skewed first-time digital — many had never withdrawn from EPFO before.</li>
          </ul>
        </section>

        <section className="v2-case-section">
          <h2>What I considered</h2>
          <p>
            <strong>Translation layer over EPFO terms.</strong> Mask
            government jargon with plain Hindi/English equivalents — chosen,
            but with a tooltip back to the official name so the user could
            verify against EPFO communications.
          </p>
          <p>
            <strong>Goal-led withdrawal flow.</strong> Instead of asking
            &ldquo;which type of withdrawal?&rdquo;, ask &ldquo;what do you
            want to do with the money?&rdquo; — we map the answer to the
            right withdrawal type silently. (Chosen.)
          </p>
        </section>

        <section className="v2-case-section">
          <h2>The decision</h2>
          <p>
            Speak in the user&rsquo;s language up front, EPFO&rsquo;s
            language only where it had to. Inversion: the form-driven EPFO
            mental model became a goal-driven mental model on our side, and
            we did the translation work in the back-end.
          </p>
        </section>

        <section className="v2-case-section">
          <h2>Outcomes</h2>
          <ul className="v2-case-outcomes">
            <li><strong>↓27%</strong> support tickets on EPFO surfaces</li>
            <li><strong>+12%</strong> withdrawal request conversion</li>
            <li>NPS on the EPFO surface up significantly (from negative to neutral-positive)</li>
          </ul>
        </section>

        <section className="v2-case-cta-block">
          <p>Want the long version with screens, the EPFO field-mapping, and the support-ticket teardown?</p>
          {project?.mediumUrl ? <MediumCta url={project.mediumUrl} /> : <ContactCta />}
        </section>
      </article>
    </>
  );
}

function XtraCaseStudyContent() {
  const project = projects.find((p) => p.id === "xtra");
  return (
    <>
      <div className="v2-case-cover">
        <img src={project?.image ?? ""} alt={project?.title ?? "Xtra"} loading="lazy" />
      </div>
      <article className="v2-case">
        <header className="v2-case-hero">
          <p className="v2-case-meta">Lead Product Designer · MobiKwik · 2023–2024</p>
          <h1 className="v2-case-title">Xtra</h1>
          <p className="v2-case-deck">
            Getting first-time savers to commit ₹150Cr+ in deposits.
            Designed the savings + fixed-deposit experience for users new to
            financial products — lifting retention by 30%.
          </p>
          <div className="v2-case-stats">
            <div><strong>₹150Cr+</strong><span>AUM</span></div>
            <div><strong>+30%</strong><span>retention</span></div>
          </div>
        </header>

        <section className="v2-case-section">
          <h2>The problem</h2>
          <p>
            Saving feels passive. For users who had never opened a fixed
            deposit before, the existing flow asked them to think like a
            banker — pick a tenure, an interest rate, a maturity option,
            an auto-renew choice — before they&rsquo;d even committed
            mentally to saving. Most bounced.
          </p>
        </section>

        <section className="v2-case-section">
          <h2>Constraints</h2>
          <ul>
            <li>RBI-regulated product — terms and disclosures are mandatory at the point of commitment.</li>
            <li>Multiple partner-bank backends, each with slightly different rate cards and tenures.</li>
            <li>First-time savers — financial literacy varies wildly across the user base.</li>
          </ul>
        </section>

        <section className="v2-case-section">
          <h2>What I considered</h2>
          <p>
            <strong>Calculator-first flow.</strong> Show the user how much
            they&rsquo;d earn, then ask them to commit. Works for the
            financially confident, intimidates everyone else.
          </p>
          <p>
            <strong>Goal-led flow.</strong> &ldquo;What are you saving
            for?&rdquo; → we recommend a tenure + amount, with the math
            shown but not blocking. (Chosen.)
          </p>
        </section>

        <section className="v2-case-section">
          <h2>The decision</h2>
          <p>
            Lead with intent, follow with mechanics. By framing the FD
            decision around what the user actually wanted (a vacation, a
            laptop, an emergency fund) rather than the product attributes,
            commitment rates climbed — and so did retention, because users
            had a reason to keep the money in.
          </p>
        </section>

        <section className="v2-case-section">
          <h2>Outcomes</h2>
          <ul className="v2-case-outcomes">
            <li><strong>₹150Cr+</strong> in AUM within the launch year</li>
            <li><strong>+30%</strong> 90-day retention vs the previous flow</li>
            <li>First-time saver share of the cohort up notably</li>
          </ul>
        </section>

        <section className="v2-case-cta-block">
          <p>Want the long version with screens, the goal-mapping, and the partner-bank matrix?</p>
          <ContactCta />
        </section>
      </article>
    </>
  );
}
