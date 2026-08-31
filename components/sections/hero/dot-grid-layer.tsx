"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Loaded on demand: the canvas is decoration, so it must never sit in the
// bundle the hero needs in order to paint.
const DotGrid = dynamic(() => import("./dot-grid"), { ssr: false });

// Coarse pointers can't hover, and the grid is a hover effect. Small screens
// skip it too: a full-bleed canvas is the wrong thing to spend a phone's
// battery on. Both fall back to the static CSS dots.
const ELIGIBLE = "(min-width: 768px) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export default function DotGridLayer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const eligible = window.matchMedia(ELIGIBLE);
    const reduced = window.matchMedia(REDUCED_MOTION);

    const sync = () => setEnabled(eligible.matches && !reduced.matches);
    sync();

    eligible.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      eligible.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;
  return <DotGrid />;
}
