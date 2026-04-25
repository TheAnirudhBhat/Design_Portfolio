"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMING = {
  intro: 1100,
  morph: 700,    // crossfade window between phases
  resolved: 1000,
};
const TOTAL = TIMING.intro + TIMING.morph + TIMING.resolved;

type Phase = "intro" | "resolved";

export default function LoaderScreen() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("resolved"), TIMING.intro));
    timers.push(setTimeout(() => setShow(false), TOTAL));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="loader-screen"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-stack">
            <div className="loader-content">
              {/* Both children animate simultaneously (no mode="wait"),
                  so DaW4ve fades out WHILE ANIRUDH fades in — one continuous
                  blur cross-fade with no empty gap in the middle */}
              <AnimatePresence>
                {phase === "intro" ? (
                  <motion.div
                    key="daw4ve"
                    className="loader-text loader-text--single"
                    initial={false}
                    exit={{ opacity: 0, filter: "blur(24px)" }}
                    transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span className="loader-da">Da</span>
                    <span className="loader-w4ve">W4ve</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="name"
                    className="loader-text loader-text--stacked"
                    initial={{ opacity: 0, filter: "blur(24px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span className="loader-line loader-line--white">ANIRUDH</span>
                    <span className="loader-line loader-line--magenta">BHAT</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              className="loader-progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: TOTAL / 1000, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
