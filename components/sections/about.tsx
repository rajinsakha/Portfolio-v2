"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import profile from "@/assets/about-img.jpg";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative  h-full  w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden"
          >
            <div className="h-full min-h-[400px] lg:min-h-full lg:h-full w-full relative">
              <Image
                src={profile.src}
                alt="Rajin Sakha"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Front-end Developer with a passion for creating exceptional user
              experiences
            </h3>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm sm:text-base ">
                I&apos;m Rajin Sakha, a detail-oriented Front-end Developer with
                expertise in building responsive and user-friendly web
                applications. With a strong foundation in React.js and Next.js,
                I specialize in creating seamless digital experiences that
                combine aesthetic appeal with functional excellence.
              </p>
              <p className="text-sm sm:text-base ">
                My journey in web development began 5 years ago, and since then,
                I&apos;ve had the opportunity to work on diverse projects
                ranging from e-commerce platforms to complex enterprise
                applications. I thrive in collaborative environments where open
                communication and innovative thinking are valued.
              </p>
              <p className="text-sm sm:text-base ">
                Beyond coding, I&apos;m passionate about staying current with
                emerging technologies and design trends. I believe in continuous
                learning and regularly participate in workshops and online
                courses to enhance my skills and bring fresh perspectives to my
                work.
              </p>
            </div>

            {/* <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <h4 className="font-medium mb-2">Name</h4>
                <p className="text-muted-foreground">Rajin Sakha</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-muted-foreground">contact@example.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Availability</h4>
                <p className="text-muted-foreground">Open to opportunities</p>
              </div>
            </div> */}

            <div className="mt-8">
              <Button size="lg">Download Resume</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
