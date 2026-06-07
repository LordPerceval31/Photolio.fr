"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const scale = useMotionValue(1);

  const rx = useSpring(mx, { stiffness: 160, damping: 20 });
  const ry = useSpring(my, { stiffness: 160, damping: 20 });
  const ringScale = useSpring(scale, { stiffness: 280, damping: 22 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor]"))
        scale.set(3);
    };

    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor]"))
        scale.set(1);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] mix-blend-difference border border-white/60"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
        }}
      />
    </>
  );
}
