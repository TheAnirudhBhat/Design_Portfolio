export const EASE = {
  entrance: "power2.out",
  transition: "power3.inOut",
  counter: "power1.out",
} as const;

export const DURATION = {
  fast: 0.4,
  default: 0.6,
  slow: 0.8,
  transition: 0.8,
  counter: 1.5,
} as const;

export const STAGGER = {
  fast: 0.03,
  default: 0.05,
  slow: 0.08,
} as const;
