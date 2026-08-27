import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Staggered entrance for hero content, driven entirely by CSS.
 *
 * This used to be a `motion.div` with `initial={{ opacity: 0 }}`, which meant the
 * prerendered HTML shipped `style="opacity:0"` and nothing above the fold became
 * visible until React had hydrated and the animation had run. That put LCP behind
 * the whole client bundle. A CSS keyframe starts as soon as styles resolve, so the
 * content paints on the first frame regardless of when JS arrives.
 */
export default function MotionWrapper({
  children,
  className,
  delay = 0.3,
}: MotionWrapperProps) {
  return (
    <div
      className={cn("relative animate-rise-in", className)}
      style={{ "--rise-in-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
