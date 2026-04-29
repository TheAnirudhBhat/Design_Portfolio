"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseContentById, getProject } from "./caseStudies";

export type CaseOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  caseId: string | null;
  origin: CaseOrigin | null;
  onClose: () => void;
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
    return {
      x: cx - window.innerWidth / 2,
      y: cy - window.innerHeight / 2,
      scaleX: origin.width / targetW,
      scaleY: origin.height / targetH,
      borderRadius: 16,
    };
  }, [origin]);

  const accent = caseId ? getProject(caseId)?.accent : undefined;
  const Content = caseId ? caseContentById[caseId] : undefined;

  return (
    <AnimatePresence>
      {caseId && initialMotion && Content && (
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
              <Content />
            </motion.div>

            <div className="v2-case-fade v2-case-fade--bottom" aria-hidden />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
