"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0].text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const typingInterval = setTimeout(() => {
      if (isDeleting) {
        // If deleting, remove the last character
        setCurrentWord((prev) => prev.slice(0, -1));
        setTypingSpeed(50); // Faster when deleting

        // If all characters are deleted, move to the next word
        if (currentWord.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(150); // Reset typing speed
        }
      } else {
        // If typing, add the next character
        const fullWord = words[currentWordIndex].text;
        setCurrentWord((prev) => fullWord.slice(0, prev.length + 1));
        setTypingSpeed(150); // Normal typing speed

        // If the word is complete, pause before deleting
        if (currentWord.length === fullWord.length) {
          setTypingSpeed(2000); // Pause at the end of the word
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(typingInterval);
  }, [currentWord, currentWordIndex, isDeleting, typingSpeed, words]);

  return (
    <div className={cn("flex items-center", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="inline-block"
        >
          {currentWord}
        </motion.div>
      </AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn(
          "ml-1 inline-block h-4 w-[2px] rounded-full bg-primary",
          cursorClassName
        )}
      />
    </div>
  );
};
