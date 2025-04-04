"use client";
import { motion } from "motion/react";


interface SectionHeadingProps {
  title: string;
  subtitle: string;
  alignment?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "center",
}: SectionHeadingProps) {
  const alignmentClasses =
    alignment === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignmentClasses}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
      >
        {title}
        <span className="text-primary">.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-3 text-muted-foreground"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
