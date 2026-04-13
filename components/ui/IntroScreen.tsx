"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-white flex items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex items-center gap-[8px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[28px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.9)]">
              da
            </span>
            <span className="text-[28px] font-medium tracking-[-0.02em] text-[#D30AD7]">
              w4ve
            </span>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-[120px] h-[2px] bg-[rgba(0,0,0,0.06)] rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-[#D30AD7] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
