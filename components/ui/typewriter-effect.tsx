"use client";

import type React from "react";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  words: { text: string }[];
  className?: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Base typing speed
  const pauseDuration = 1500; // Pause duration after each word

  useEffect(() => {
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
  ]);

  return (
    <span
      className={`font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl ${className}`}
    >
      {currentText}
    </span>
  );
};
