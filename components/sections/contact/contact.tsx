"use client";

import type React from "react";

import { motion } from "motion/react";

import { SectionHeading } from "@/components/ui/section-heading";

import { contactItems } from "@/constants/contact-data";
import ContactItem from "./contact-item";
import ContactForm from "./contact-form";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading title="Get In Touch" subtitle="Tell me what you're building" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-2xl font-normal mb-6">Send me the brief</h3>
            <p className="text-muted-foreground mb-8">
              I&apos;m based in Nepal (UTC+5:45) and work
              with clients in Nepal and worldwide.
            </p>

            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <ContactItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  content={item.content}
                  href={item.href}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
