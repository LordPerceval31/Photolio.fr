"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=85", label: "Street", category: "Urban" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85", label: "Portrait", category: "People" },
  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=85", label: "Paysage", category: "Nature" },
  { src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85", label: "Studio", category: "Light" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", label: "Montagne", category: "Adventure" },
  { src: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=900&q=85", label: "Automobile", category: "Speed" },
  { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=85", label: "Soirée", category: "Event" },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85", label: "Édito", category: "Fashion" },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const update = () => {
      if (!stripRef.current) return;
      setScrollDistance(stripRef.current.scrollWidth - window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="absolute top-10 tablet:top-14 left-6 tablet:left-14 z-10 pointer-events-none"
        >
          <p className="text-cream/25 text-[10px] uppercase tracking-[0.3em] mb-2">Vos univers</p>
          <h2 className="text-2xl tablet:text-4xl laptop:text-5xl font-extrabold text-cream tracking-tight leading-tight">
            Chaque instant mérite<br />un cadre.
          </h2>
        </motion.div>

        {/* Counter */}
        <motion.div
          className="absolute top-10 tablet:top-14 right-6 tablet:right-14 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-cream/20 text-xs font-mono tracking-widest">
            01 — 0{PHOTOS.length}
          </span>
        </motion.div>

        {/* Photo strip */}
        <motion.div
          ref={stripRef}
          style={{ x }}
          className="flex gap-4 tablet:gap-5 pl-[8vw] pr-[8vw]"
        >
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: EASE }}
              className="relative flex-shrink-0 rounded-xl tablet:rounded-2xl overflow-hidden group"
              style={{
                width: "clamp(180px, 28vw, 440px)",
                height: "clamp(280px, 62vh, 680px)",
              }}
            >
              <Image
                src={photo.src}
                fill
                sizes="(max-width: 640px) 200px, 32vw"
                alt={photo.label}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

              {/* Label */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2.5">
                <span className="text-cream/40 text-[9px] uppercase tracking-[0.25em]">
                  {photo.category}
                </span>
                <span className="w-5 h-px bg-cream/30" />
                <span className="text-cream text-sm font-semibold tracking-wide">
                  {photo.label}
                </span>
              </div>

              {/* Index */}
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <span className="text-cream/50 text-[10px] font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
          <div className="relative w-40 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#558b8b] rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
          <motion.p
            className="text-cream/30 text-[9px] uppercase tracking-[0.35em]"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Faites défiler
          </motion.p>
        </div>
      </div>
    </section>
  );
}
