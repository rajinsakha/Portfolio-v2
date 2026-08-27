"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";

interface TypewriterEffectProps {
  words: { text: string }[];
  className?: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Seed with the first word so the server HTML and the first client render agree.
  // useReducedMotion() cannot read matchMedia during SSR, so the two render branches
  // below must produce identical output on first paint or reduced-motion users hit a
  // hydration mismatch. Starting "fully typed" is also a valid loop entry: the first
  // effect tick sees currentText === fullText and moves straight into the delete phase.
  const [currentText, setCurrentText] = useState(words[0]?.text ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Base typing speed
  const pauseDuration = 1500; // Pause duration after each word

  useEffect(() => {
    // Skip the typing animation entirely when the user prefers reduced motion.
    if (shouldReduceMotion) return;

    const type = () => {
      const i = currentWordIndex % words.length;
      const fullText = words[i].text;

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(75); // Slightly faster when deleting
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTypingSpeed(pauseDuration);
        setIsDeleting(true);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setTypingSpeed(500); // Small delay before typing next word
      }
    };

    const timer = setTimeout(() => type(), typingSpeed);

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    pauseDuration,
    typingSpeed,
    shouldReduceMotion,
  ]);

  return (
    <span
      className={`font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl ${className}`}
    >
      {shouldReduceMotion ? words[0]?.text : currentText}
    </span>
  );
};
