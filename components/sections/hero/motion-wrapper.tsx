"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionWrapper({
  children,
  className,
  delay = 0.3,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay,
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}
