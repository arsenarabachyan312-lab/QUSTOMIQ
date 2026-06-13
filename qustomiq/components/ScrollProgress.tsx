"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 2,
        background: "#10B981",
        scaleX,
        transformOrigin: "left",
        zIndex: 10002,
        boxShadow: "0 0 8px rgba(16,185,129,0.6)",
      }}
    />
  );
}
