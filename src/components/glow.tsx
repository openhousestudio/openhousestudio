"use client";

import { motion, useReducedMotion } from "motion/react";

export function Glow() {
  const reduce = useReducedMotion();

  const blob = (color: string, x: number, y: number, duration: number) =>
    reduce ? (
      <div
        className="absolute h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: color, left: x, top: y, opacity: 0.2 }}
      />
    ) : (
      <motion.div
        aria-hidden
        className="absolute h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: color, left: x, top: y, opacity: 0.2 }}
        animate={{ x: [0, 140, 0], y: [0, 64, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
    );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blob("#E9DFCF", -120, -160, 22)}
      {blob("#C4643F", 320, -240, 26)}
    </div>
  );
}
