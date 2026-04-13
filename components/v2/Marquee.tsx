"use client";

const items = [
  "slice", "UPI Payments", "Credit Cards", "Savings & FDs",
  "MobiKwik", "Design Systems", "Young India", "Fintech",
];

// Pre-computed — no allocation per render
const track = [...items, ...items, ...items];

export default function Marquee() {
  return (
    <div className="v2-marquee">
      <div className="v2-marquee-track">
        {track.map((item, i) => (
          <span key={i}>
            <span className="v2-marquee-item">{item}</span>
            <span className="v2-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
