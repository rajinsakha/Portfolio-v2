"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog as DialogPrimitive } from "radix-ui";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";

const navItems = [
  { name: "Home", href: "/", id: "home" },
  { name: "About", href: "/#about", id: "about" },
  { name: "Skills", href: "/#skills", id: "skills" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Experience", href: "/#experience", id: "experience" },
  { name: "Contact", href: "/#contact", id: "contact" },
];

const RESUME_URL = "/RajinSakha_Resume.pdf";
const RESUME_FILE_NAME = "RajinSakha_Resume.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Every nav item now points at a homepage section, so highlighting only
  // applies on the homepage itself.
  const isActiveItem = (id: string) =>
    pathname === "/" && activeSection === id;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = navItems
      .filter((item) => item.id !== "home")
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        } else if (window.scrollY < 100) {
          setActiveSection("home");
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // The menu is mobile-only. If the viewport grows past the breakpoint while
  // it is open, close it so its focus trap and scroll lock don't linger
  // invisibly behind the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    // The header only positions the pill; pointer-events-none lets clicks
    // pass through the empty strip on either side of it.
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-300",
        scrolled ? "pt-2" : "pt-3 md:pt-4"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex max-w-4xl items-center justify-between rounded-full border px-4 py-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 md:px-5",
          scrolled
            ? "border-border bg-background/80 shadow-lg shadow-black/5"
            : "border-border/50 bg-background/50"
        )}
      >
        <Link href="/" className="flex items-center gap-2 rounded-full">
          <span className="font-display text-2xl">
            Rajin<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-3">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActiveItem(item.id);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
                      active ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-muted"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 400, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ModeToggle />
          <Button size="sm" className="rounded-full" asChild>
            <a href={RESUME_URL} download={RESUME_FILE_NAME}>
              Resume
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation. Radix Dialog supplies the modal behaviour a
            menu overlay needs: focus moves in and is trapped, Escape closes,
            focus returns to the trigger, and the page behind is hidden from
            assistive tech and scroll-locked. */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
              <DialogPrimitive.Content
                aria-describedby={undefined}
                className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-background outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 md:hidden"
              >
                <DialogPrimitive.Title className="sr-only">
                  Navigation menu
                </DialogPrimitive.Title>

                <div className="container flex min-h-full flex-col">
                  <div className="flex items-center justify-between py-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-display text-2xl">
                        Rajin<span className="text-primary">.</span>
                      </span>
                    </Link>
                    <DialogPrimitive.Close asChild>
                      <Button variant="ghost" size="icon" aria-label="Close menu">
                        <X className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </DialogPrimitive.Close>
                  </div>

                  <nav
                    aria-label="Main"
                    className="flex flex-1 flex-col items-center justify-center gap-8"
                  >
                    <ul className="flex flex-col items-center gap-6">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            aria-current={
                              isActiveItem(item.id) ? "location" : undefined
                            }
                            className={cn(
                              "text-lg font-medium transition-colors hover:text-primary",
                              isActiveItem(item.id)
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Button asChild>
                      <a
                        href={RESUME_URL}
                        download={RESUME_FILE_NAME}
                        onClick={() => setIsOpen(false)}
                      >
                        Resume
                      </a>
                    </Button>
                  </nav>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
