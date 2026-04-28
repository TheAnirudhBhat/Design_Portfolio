"use client";

import { useEffect, useRef, useState } from "react";

const fullText =
  "I design payments and money products. Most recently for young India at slice. My work lives where complex finance meets first-time users, turning dense systems into experiences that feel effortless.";

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      idx.current += 1;
      setDisplayed(fullText.slice(0, idx.current));
      if (idx.current >= fullText.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="v2-hero">
      <div className="v2-hero-content">
        <p className={`v2-blurb ${done ? "" : "v2-blurb--typing"}`}>
          {displayed}
          {!done && <span className="v2-caret" />}
        </p>
      </div>
    </div>
  );
}
