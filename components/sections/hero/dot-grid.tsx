"use client";

import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef } from "react";

gsap.registerPlugin(InertiaPlugin);

/**
 * Interactive dot grid for the hero backdrop.
 *
 * Adapted from React Bits, with three changes the original doesn't make:
 *  - the render loop idles when nothing is moving and stops entirely when the
 *    hero is off-screen or the tab is hidden;
 *  - the click shockwave only fires for clicks inside the hero, not for every
 *    click on the page;
 *  - colours come from the active theme rather than a hardcoded purple.
 *
 * Eligibility (reduced motion, pointer type, viewport) is decided by the
 * parent, so this component always animates once mounted.
 */

const DOT_SIZE = 6;
const GAP = 22;
const PROXIMITY = 150;
const SPEED_TRIGGER = 100;
const SHOCK_RADIUS = 220;
const SHOCK_STRENGTH = 4;
const MAX_SPEED = 5000;
const RESISTANCE = 750;
const RETURN_DURATION = 1.5;

type Dot = {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  inertiaApplied: boolean;
};

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function throttle<T extends (...args: never[]) => void>(fn: T, limit: number) {
  let last = 0;
  return (...args: Parameters<T>) => {
    const now = performance.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    }
  };
}

export default function DotGrid() {
  const { resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: -1e5,
    y: -1e5,
    lastDrawnX: -1e5,
    lastDrawnY: -1e5,
    lastTime: 0,
    lastClientX: 0,
    lastClientY: 0,
  });
  // Visibility is read inside the rAF loop and mutated from observers, so it
  // lives in a ref rather than state - flipping it must not re-render.
  const visibleRef = useRef(true);

  // --primary and the dot colour differ per theme, so both are resolved from
  // the theme rather than baked in. Hex, because the canvas interpolates in
  // sRGB and can't read the oklch tokens directly.
  const isDark = resolvedTheme === "dark";
  const baseColor = isDark ? "#212121" : "#e4e4e7";
  const activeColor = isDark ? "#e9504d" : "#cc3336";

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, DOT_SIZE / 2, 0, Math.PI * 2);
    return p;
  }, []);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    if (!width || !height) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = DOT_SIZE + GAP;
    const cols = Math.floor((width + GAP) / cell);
    const rows = Math.floor((height + GAP) / cell);
    const startX = (width - (cell * cols - GAP)) / 2 + DOT_SIZE / 2;
    const startY = (height - (cell * rows - GAP)) / 2 + DOT_SIZE / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          inertiaApplied: false,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  // Render loop. Redraws only when the pointer has moved or a dot is still
  // settling, so a hero nobody is touching costs nothing.
  useEffect(() => {
    if (!circlePath) return;
    let rafId = 0;
    let forceDraw = true;
    const proxSq = PROXIMITY * PROXIMITY;

    const frame = () => {
      rafId = requestAnimationFrame(frame);
      if (!visibleRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const pointer = pointerRef.current;
      const pointerMoved =
        pointer.x !== pointer.lastDrawnX || pointer.y !== pointer.lastDrawnY;
      const settling = dotsRef.current.some(
        (d) => d.xOffset !== 0 || d.yOffset !== 0,
      );
      if (!forceDraw && !pointerMoved && !settling) return;

      forceDraw = false;
      pointer.lastDrawnX = pointer.x;
      pointer.lastDrawnY = pointer.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of dotsRef.current) {
        const dx = dot.cx - pointer.x;
        const dy = dot.cy - pointer.y;
        const dsq = dx * dx + dy * dy;

        let fill = baseColor;
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / PROXIMITY;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          fill = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(dot.cx + dot.xOffset, dot.cy + dot.yOffset);
        ctx.fillStyle = fill;
        ctx.fill(circlePath);
        ctx.restore();
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [baseColor, baseRgb, activeRgb, circlePath]);

  // Size the grid, and pause the loop when the hero scrolls away or the tab
  // goes to the background.
  useEffect(() => {
    buildGrid();

    const resizeObserver = new ResizeObserver(buildGrid);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting && !document.hidden;
      },
      { rootMargin: "100px" },
    );
    if (wrapperRef.current) intersectionObserver.observe(wrapperRef.current);

    const onVisibilityChange = () => {
      if (document.hidden) visibleRef.current = false;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [buildGrid]);

  // Pointer interaction. Both handlers sit on window because the canvas is
  // pointer-events-none and the hero content sits above it, but each one
  // bounds-checks against the canvas so the rest of the page is unaffected.
  useEffect(() => {
    const push = (dot: Dot, pushX: number, pushY: number) => {
      dot.inertiaApplied = true;
      gsap.killTweensOf(dot);
      gsap.to(dot, {
        inertia: { xOffset: pushX, yOffset: pushY, resistance: RESISTANCE },
        onComplete: () => {
          gsap.to(dot, {
            xOffset: 0,
            yOffset: 0,
            duration: RETURN_DURATION,
            ease: "elastic.out(1,0.75)",
            onComplete: () => {
              dot.inertiaApplied = false;
            },
          });
        },
      });
    };

    const localPoint = (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !visibleRef.current) return null;
      const rect = canvas.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onMove = (e: MouseEvent) => {
      const pointer = pointerRef.current;
      const point = localPoint(e.clientX, e.clientY);
      if (!point) {
        // Park the pointer far away so proximity tint fades out on exit.
        pointer.x = -1e5;
        pointer.y = -1e5;
        return;
      }

      const now = performance.now();
      const dt = pointer.lastTime ? now - pointer.lastTime : 16;
      let vx = ((e.clientX - pointer.lastClientX) / dt) * 1000;
      let vy = ((e.clientY - pointer.lastClientY) / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > MAX_SPEED) {
        const scale = MAX_SPEED / speed;
        vx *= scale;
        vy *= scale;
        speed = MAX_SPEED;
      }
      pointer.lastTime = now;
      pointer.lastClientX = e.clientX;
      pointer.lastClientY = e.clientY;
      pointer.x = point.x;
      pointer.y = point.y;

      if (speed <= SPEED_TRIGGER) return;
      for (const dot of dotsRef.current) {
        if (dot.inertiaApplied) continue;
        const dist = Math.hypot(dot.cx - point.x, dot.cy - point.y);
        if (dist >= PROXIMITY) continue;
        push(dot, dot.cx - point.x + vx * 0.005, dot.cy - point.y + vy * 0.005);
      }
    };

    const onClick = (e: MouseEvent) => {
      const point = localPoint(e.clientX, e.clientY);
      if (!point) return;
      for (const dot of dotsRef.current) {
        if (dot.inertiaApplied) continue;
        const dist = Math.hypot(dot.cx - point.x, dot.cy - point.y);
        if (dist >= SHOCK_RADIUS) continue;
        const falloff = Math.max(0, 1 - dist / SHOCK_RADIUS);
        push(
          dot,
          (dot.cx - point.x) * SHOCK_STRENGTH * falloff,
          (dot.cy - point.y) * SHOCK_STRENGTH * falloff,
        );
      }
    };

    const throttledMove = throttle(onMove, 32);
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-dot-grid=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
