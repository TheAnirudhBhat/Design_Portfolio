"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Variant = "blur-fade" | "slide-up" | "scale" | "fade" | "skip";
type Position = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

type LoaderConfig = {
  variant: Variant;
  speed: number;
  position: Position;
};

const DEFAULT_CONFIG: LoaderConfig = {
  variant: "blur-fade",
  speed: 1,
  position: "center",
};

const STORAGE_KEY = "dawave-loader-config";

const BASE_TIMING = {
  intro: 1100,
  morph: 700,
  resolved: 1000,
};

function readConfig(): LoaderConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

function variantMotion(variant: Variant) {
  switch (variant) {
    case "slide-up":
      return {
        exit: { y: 60, opacity: 0 },
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
      };
    case "scale":
      return {
        exit: { scale: 0.7, opacity: 0 },
        initial: { scale: 0.7, opacity: 0 },
        animate: { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 },
      };
    case "fade":
      return {
        exit: { opacity: 0 },
        initial: { opacity: 0 },
        animate: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 },
      };
    case "blur-fade":
    default:
      return {
        exit: { opacity: 0, filter: "blur(24px)" },
        initial: { opacity: 0, filter: "blur(24px)" },
        animate: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 },
      };
  }
}

export default function LoaderScreen() {
  const [config, setConfig] = useState<LoaderConfig>(DEFAULT_CONFIG);
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"intro" | "resolved">("intro");
  const [runId, setRunId] = useState(0);
  const [paused, setPaused] = useState(false);

  // Load config on mount
  useEffect(() => {
    setConfig(readConfig());
  }, []);

  // Listen for replay + pause events from LoaderPanel
  useEffect(() => {
    function handleReplay() {
      setConfig(readConfig());
      setPaused(false);
      setPhase("intro");
      setShow(true);
      setRunId((id) => id + 1);
    }
    function handlePause(e: Event) {
      const detail = (e as CustomEvent).detail as { paused: boolean };
      setPaused(detail.paused);
      // When pausing, ensure loader is visible so user can inspect.
      if (detail.paused) setShow(true);
    }
    window.addEventListener("loader-replay", handleReplay);
    window.addEventListener("loader-pause", handlePause as EventListener);
    return () => {
      window.removeEventListener("loader-replay", handleReplay);
      window.removeEventListener("loader-pause", handlePause as EventListener);
    };
  }, []);

  // Run the loader sequence whenever config or runId changes (skips while paused)
  useEffect(() => {
    if (config.variant === "skip") {
      setShow(false);
      return;
    }
    if (paused) return; // hold on current frame
    const speed = config.speed || 1;
    const intro = BASE_TIMING.intro / speed;
    const total = (BASE_TIMING.intro + BASE_TIMING.morph + BASE_TIMING.resolved) / speed;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("resolved"), intro));
    timers.push(setTimeout(() => setShow(false), total));
    return () => timers.forEach(clearTimeout);
  }, [runId, config, paused]);

  if (config.variant === "skip") return null;

  const motionProps = variantMotion(config.variant);
  const dur = 1.05 / (config.speed || 1);
  const totalSec = ((BASE_TIMING.intro + BASE_TIMING.morph + BASE_TIMING.resolved) / 1000) / (config.speed || 1);
  const exitDur = 0.7 / (config.speed || 1);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={`loader-${runId}`}
          className={`loader-screen loader-pos--${config.position}`}
          exit={{ y: "-100%" }}
          transition={{ duration: exitDur, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-stack">
            <div className="loader-content">
              <AnimatePresence>
                {phase === "intro" ? (
                  <motion.div
                    key="daw4ve"
                    className="loader-text loader-text--single"
                    initial={false}
                    exit={motionProps.exit}
                    transition={{ duration: dur, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span className="loader-da">Da</span>
                    <span className="loader-w4ve">W4ve</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="name"
                    className="loader-text loader-text--stacked"
                    initial={motionProps.initial}
                    animate={motionProps.animate}
                    transition={{ duration: dur, ease: [0.4, 0, 0.2, 1] }}
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
              transition={{ duration: totalSec, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
