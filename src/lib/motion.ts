"use client";

import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/* Shared motion vocabulary so every animation on the site feels the same */
export const ease = { in: "power2.in", out: "power3.out", soft: "power2.out" };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** scale a duration to 0 for reduced-motion users */
export const dur = (seconds: number) => (prefersReducedMotion() ? 0 : seconds);

/* Keeps an overlay mounted after `open` turns false so it can animate out;
   call `unmount` from the exit tween's onComplete. */
export function usePresence(open: boolean) {
  const [mounted, setMounted] = useState(open);
  if (open && !mounted) setMounted(true);
  return { mounted, unmount: () => setMounted(false) };
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
