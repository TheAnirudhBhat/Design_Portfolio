"use client";

export default function NoiseBackground() {
  return (
    <>
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 0%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background: "linear-gradient(135deg, #0a0a2e 0%, #1a1a6e 20%, #2040a0 40%, #1855c0 60%, #1040a0 80%, #0a0a3a 100%)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 20s ease infinite",
        }}
      />
    </>
  );
}
