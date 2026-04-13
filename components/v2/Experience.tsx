"use client";

const experience = [
  {
    company: "slice",
    logoText: "s",
    logoColor: "#D30AD7",
    date: "Jan 2026 – Present",
    roles: [
      { title: "Senior Product Designer", period: "Jan 2026 – Present" },
    ],
    projects: [
      { name: "UPI Payments", desc: "Leading end-to-end UPI payment flows across the slice app." },
      { name: "Credit Card Management", desc: "LENS framework — schema-driven detail pages for 10M+ users." },
      { name: "Savings (FDs)", desc: "Designing the fixed deposit experience for first-time savers." },
      { name: "DLS 2.0", desc: "Contributing to slice's design system, 80+ components." },
    ],
  },
  {
    company: "MobiKwik",
    logoText: "M",
    logoColor: "#00B9F5",
    date: "2022 – 2026",
    roles: [
      { title: "Lead Product Designer", period: "2024 – 2026" },
      { title: "Product Designer", period: "2022 – 2024" },
    ],
    projects: [
      { name: "Xtra 2.0", desc: "Savings & FD vertical. ₹150Cr+ AUM, +30% retention." },
      { name: "EPFO Dashboard", desc: "Simplified PF withdrawal. 27% fewer support tickets." },
      { name: "UPI Onboarding", desc: "First-time setup flow. 4.5x faster onboarding, +18% first txn." },
      { name: "Design System", desc: "50+ components, ~80% adoption across product teams." },
    ],
  },
  {
    company: "Freelance",
    logoText: "F",
    logoColor: "#888888",
    date: "2020 – 2022",
    roles: [
      { title: "UI/UX Designer", period: "2020 – 2022" },
    ],
    projects: [
      { name: "D2C Startups", desc: "End-to-end product design for early-stage consumer brands." },
      { name: "Branding", desc: "Visual identity systems for 3 startups." },
      { name: "Slyricly", desc: "Music discovery app — concept to shipped MVP." },
    ],
  },
];

export default function Experience() {
  return (
    <section className="v2-experience">
      <h2 className="v2-section-title" id="experience">Experience</h2>

      <div className="v2-exp-list">
        {experience.map((exp) => (
          <div className="v2-exp-block" key={exp.company}>
            <div className="v2-exp-header">
              <div className="v2-exp-company-row">
                <span className="v2-exp-logo" style={{ background: exp.logoColor }}>{exp.logoText}</span>
                <h3 className="v2-exp-company">{exp.company}</h3>
              </div>
              <span className="v2-exp-date">{exp.date}</span>
            </div>
            <div className="v2-exp-body">
              <div className="v2-exp-col">
                <h4>Role</h4>
                {exp.roles.map((r) => (
                  <div key={r.title}>
                    <p className="v2-exp-role-primary">{r.title}</p>
                    <p className="v2-exp-role-note">{r.period}</p>
                  </div>
                ))}
              </div>
              <div className="v2-exp-col v2-exp-col--projects">
                <h4>Key Projects</h4>
                {exp.projects.map((p) => (
                  <p key={p.name}><strong>{p.name}</strong>: {p.desc}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
